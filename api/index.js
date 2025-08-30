// Main API server for HireAdam Dynamic CV
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Import route handlers
const personasRoutes = require('./personas');
const klofiRoutes = require('./klofi');
const cvRoutes = require('./cv');

// API Routes
app.use('/api/personas', personasRoutes);
app.use('/api/klofi', klofiRoutes);
app.use('/api/cv', cvRoutes);

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/cv', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'cv.html'));
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'HireAdam Dynamic CV API is running',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// For Vercel serverless functions
if (process.env.VERCEL) {
    module.exports = app;
} else {
    // For local development
    app.listen(PORT, () => {
        console.log(`🚀 HireAdam Dynamic CV API running on port ${PORT}`);
        console.log(`📱 Visit: http://localhost:${PORT}`);
    });
}
