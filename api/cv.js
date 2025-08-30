// CV Data API endpoint
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Get CV data
router.get('/', (req, res) => {
    try {
        const cvPath = path.join(__dirname, '..', 'data', 'adam-cv.json');
        const cvData = JSON.parse(fs.readFileSync(cvPath, 'utf8'));
        
        console.log('📄 CV data loaded successfully');
        res.json(cvData);
    } catch (error) {
        console.error('❌ Error loading CV data:', error);
        res.status(500).json({ error: 'Failed to load CV data' });
    }
});

module.exports = router;
