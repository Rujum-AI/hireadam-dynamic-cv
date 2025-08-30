// Personas API endpoint
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Get all personas
router.get('/', (req, res) => {
    try {
        const personasPath = path.join(__dirname, '..', 'data', 'personas.json');
        const personasData = JSON.parse(fs.readFileSync(personasPath, 'utf8'));
        
        console.log('📋 Personas data loaded successfully');
        res.json(personasData.personas);
    } catch (error) {
        console.error('❌ Error loading personas:', error);
        res.status(500).json({ error: 'Failed to load personas' });
    }
});

// Get specific persona
router.get('/:id', (req, res) => {
    try {
        const personasPath = path.join(__dirname, '..', 'data', 'personas.json');
        const personasData = JSON.parse(fs.readFileSync(personasPath, 'utf8'));
        
        const persona = personasData.personas.find(p => p.id === req.params.id);
        
        if (!persona) {
            return res.status(404).json({ error: 'Persona not found' });
        }
        
        console.log(`👤 Persona ${req.params.id} loaded successfully`);
        res.json(persona);
    } catch (error) {
        console.error('❌ Error loading persona:', error);
        res.status(500).json({ error: 'Failed to load persona' });
    }
});

module.exports = router;
