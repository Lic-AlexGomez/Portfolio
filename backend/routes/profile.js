const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const db = require('../models/Database');
const { authenticateToken: auth } = require('../middleware/auth');

// Configuración de multer para fotos de perfil
const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads/profile');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile-${Date.now()}${ext}`);
  }
});

// Configuración de multer para CV
const cvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads/cv');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `cv-${Date.now()}.pdf`);
  }
});

const uploadPhoto = multer({ 
  storage: photoStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes'));
    }
  }
});

const uploadCV = multer({ 
  storage: cvStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos PDF'));
    }
  }
});

const router = express.Router();

// Obtener perfil público
router.get('/', async (req, res) => {
  try {
    const profile = await db.get('SELECT * FROM profile WHERE id = 1');
    if (!profile) {
      return res.status(404).json({ 
        name: 'Tu Nombre',
        title: 'Desarrollador Full Stack',
        summary: 'Desarrollador apasionado por crear soluciones innovadoras.',
        bio: 'Desarrollador con experiencia en tecnologías modernas.',
        email: 'admin@portfolio.com',
        github: 'https://github.com/tuusuario',
        linkedin: 'https://linkedin.com/in/tuusuario',
        years_experience: 3,
        projects_count: 20,
        location: 'España'
      });
    }
    
    if (profile.photo) {
      profile.photo = `/uploads/profile/${profile.photo}`;
    }
    
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Descargar CV
router.get('/cv', async (req, res) => {
  try {
    const profile = await db.get('SELECT cv_file FROM profile WHERE id = 1');
    
    if (profile?.cv_file) {
      const cvPath = path.join(__dirname, '../uploads/cv', profile.cv_file);
      if (fs.existsSync(cvPath)) {
        res.download(cvPath, 'CV-Desarrollador.pdf');
        return;
      }
    }
    
    res.status(404).json({ error: 'CV no disponible' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener experiencias
router.get('/experiences', async (req, res) => {
  try {
    const experiences = await db.query('SELECT * FROM experiences ORDER BY start_date DESC') || [];
    
    experiences.forEach(exp => {
      if (exp.technologies) {
        try {
          exp.technologies = JSON.parse(exp.technologies);
        } catch (e) {
          exp.technologies = exp.technologies.split(',').map(t => t.trim());
        }
      }
    });
    
    res.json(experiences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Subir foto de perfil (Admin)
router.post('/upload-photo', auth, uploadPhoto.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ninguna imagen' });
    }

    const filename = req.file.filename;
    
    // Eliminar foto anterior si existe
    const currentProfile = await db.get('SELECT photo FROM profile WHERE id = 1');
    if (currentProfile?.photo) {
      const oldPath = path.join(__dirname, '../uploads/profile', currentProfile.photo);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Actualizar base de datos
    await db.run('UPDATE profile SET photo = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1', [filename]);
    
    res.json({ 
      message: 'Foto subida exitosamente',
      photo: `/uploads/profile/${filename}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error subiendo la foto' });
  }
});

// Subir CV (Admin)
router.post('/upload-cv', auth, uploadCV.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo' });
    }

    const filename = req.file.filename;
    
    // Eliminar CV anterior si existe
    const currentProfile = await db.get('SELECT cv_file FROM profile WHERE id = 1');
    if (currentProfile?.cv_file) {
      const oldPath = path.join(__dirname, '../uploads/cv', currentProfile.cv_file);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Actualizar base de datos
    await db.run('UPDATE profile SET cv_file = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1', [filename]);
    
    res.json({ 
      message: 'CV subido exitosamente',
      cv: `/uploads/cv/${filename}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error subiendo el CV' });
  }
});

// Actualizar perfil (Admin)
router.put('/', auth, async (req, res) => {
  try {
    const { name, title, summary, bio, email, github, linkedin, location } = req.body;
    
    const sql = `
      UPDATE profile 
      SET name = ?, title = ?, summary = ?, bio = ?, email = ?, 
          github = ?, linkedin = ?, location = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `;
    
    await db.run(sql, [name, title, summary, bio, email, github, linkedin, location]);
    
    res.json({ message: 'Perfil actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;