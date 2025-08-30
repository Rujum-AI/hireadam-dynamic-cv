import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const cvPath = path.join(process.cwd(), 'data', 'adam-cv.json');
    const cvData = JSON.parse(fs.readFileSync(cvPath, 'utf8'));
    
    res.status(200).json(cvData);
  } catch (error) {
    console.error('Error loading CV:', error);
    res.status(500).json({ error: 'Failed to load CV data' });
  }
}
