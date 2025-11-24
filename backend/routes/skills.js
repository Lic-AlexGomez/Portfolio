const express = require('express');
const db = require('../models/Database');

const router = express.Router();

// Obtener todas las habilidades públicas
router.get('/', async (req, res) => {
  try {
    const skills = await db.query('SELECT * FROM skills WHERE active = 1 ORDER BY category, level DESC');
    res.json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;