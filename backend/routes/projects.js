const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../models/Database');
const { authenticateToken: auth } = require('../middleware/auth');

const router = express.Router();

// Configurar multer para subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/projects');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'project-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes'));
    }
  }
});

// Obtener todos los proyectos públicos
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let sql = 'SELECT * FROM projects WHERE active = 1';
    const params = [];

    if (category && category !== 'all') {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (featured === 'true') {
      sql += ' AND featured = 1';
    }

    sql += ' ORDER BY featured DESC, created_at DESC';

    const projects = await db.query(sql, params);
    
    projects.forEach(project => {
      if (project.technologies) {
        try {
          project.technologies = JSON.parse(project.technologies);
        } catch (e) {
          project.technologies = project.technologies.split(',').map(t => t.trim());
        }
      } else {
        project.technologies = [];
      }
      
      if (project.image) {
        project.image = `/uploads/projects/${project.image}`;
      }
    });

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener proyecto por ID
router.get('/:id', async (req, res) => {
  try {
    const project = await db.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    
    if (project.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    const projectData = project[0];
    if (projectData.technologies) {
      try {
        projectData.technologies = JSON.parse(projectData.technologies);
      } catch (e) {
        projectData.technologies = projectData.technologies.split(',').map(t => t.trim());
      }
    }

    if (projectData.image) {
      projectData.image = `/uploads/projects/${projectData.image}`;
    }

    res.json(projectData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Crear nuevo proyecto (Admin)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, category, technologies, demo_url, github_url, featured } = req.body;
    
    const sql = `
      INSERT INTO projects (title, description, category, technologies, demo_url, github_url, featured, image, active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    `;
    
    const params = [
      title,
      description,
      category || 'web',
      technologies || '[]',
      demo_url || null,
      github_url || null,
      featured === 'true' ? 1 : 0,
      req.file ? req.file.filename : null
    ];

    const result = await db.run(sql, params);
    
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Proyecto creado exitosamente' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar proyecto (Admin)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, category, technologies, demo_url, github_url, featured } = req.body;
    
    let sql = `
      UPDATE projects 
      SET title = ?, description = ?, category = ?, technologies = ?, 
          demo_url = ?, github_url = ?, featured = ?, updated_at = CURRENT_TIMESTAMP
    `;
    
    let params = [
      title,
      description,
      category || 'web',
      technologies || '[]',
      demo_url || null,
      github_url || null,
      featured === 'true' ? 1 : 0
    ];

    if (req.file) {
      sql += ', image = ?';
      params.push(req.file.filename);
    }

    sql += ' WHERE id = ?';
    params.push(req.params.id);

    await db.run(sql, params);
    
    res.json({ message: 'Proyecto actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar proyecto (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.run('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ message: 'Proyecto eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;