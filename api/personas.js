// Personas API - Serverless function
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    // Read personas.json file
    const personasPath = path.join(process.cwd(), 'data', 'personas.json');
    const personasData = JSON.parse(fs.readFileSync(personasPath, 'utf8'));
    
    console.log('📋 Personas loaded successfully');
    res.json(personasData.personas);
  } catch (error) {
    console.error('❌ Error loading personas:', error);
    res.status(500).json({ error: 'Failed to load personas', details: error.message });
  }
};
