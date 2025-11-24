const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../models/Database');
const { authenticateToken: auth } = require('../middleware/auth');

const router = express.Router();

// Enviar mensaje de contacto
router.post('/', [
  body('name').notEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('message').notEmpty().trim().escape(),
  body('subject').optional().trim().escape()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;
    const ip_address = req.ip || req.connection.remoteAddress;
    const user_agent = req.get('User-Agent');

    await db.run(`
      INSERT INTO contact_messages (name, email, subject, message, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [name, email, subject || 'Mensaje desde portafolio', message, ip_address, user_agent]);

    res.json({ message: 'Mensaje enviado correctamente. Te responderé pronto.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener mensajes (Admin)
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;
    
    let sql = 'SELECT * FROM contact_messages';
    const params = [];
    
    if (status) {
      sql += ' WHERE status = ?';
      params.push(status);
    }
    
    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    
    const messages = await db.query(sql, params);
    
    // Contar total
    const countSql = status ? 
      'SELECT COUNT(*) as total FROM contact_messages WHERE status = ?' :
      'SELECT COUNT(*) as total FROM contact_messages';
    const countParams = status ? [status] : [];
    const totalResult = await db.get(countSql, countParams);
    
    res.json({
      messages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalResult.total,
        pages: Math.ceil(totalResult.total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Marcar mensaje como leído (Admin)
router.put('/:id/read', auth, async (req, res) => {
  try {
    await db.run(
      'UPDATE contact_messages SET status = "read", updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [req.params.id]
    );
    
    res.json({ message: 'Mensaje marcado como leído' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar mensaje (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.run('DELETE FROM contact_messages WHERE id = ?', [req.params.id]);
    res.json({ message: 'Mensaje eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;