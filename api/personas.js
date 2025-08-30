import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const personasPath = path.join(process.cwd(), 'data', 'personas.json');
    const personasData = JSON.parse(fs.readFileSync(personasPath, 'utf8'));
    
    res.status(200).json(personasData.personas);
  } catch (error) {
    console.error('Error loading personas:', error);
    res.status(500).json({ error: 'Failed to load personas' });
  }
}
