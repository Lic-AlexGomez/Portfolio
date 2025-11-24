const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Tabla de usuarios
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabla de perfil
  db.run(`CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    summary TEXT,
    bio TEXT,
    photo TEXT,
    cv_file TEXT,
    phone TEXT,
    email TEXT,
    linkedin TEXT,
    github TEXT,
    years_experience INTEGER,
    projects_count INTEGER DEFAULT 0,
    location TEXT,
    available BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabla de proyectos
  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    long_description TEXT,
    image TEXT,
    demo_url TEXT,
    github_url TEXT,
    category TEXT DEFAULT 'web',
    technologies TEXT,
    status TEXT DEFAULT 'completed',
    featured BOOLEAN DEFAULT 0,
    active BOOLEAN DEFAULT 1,
    start_date DATE,
    end_date DATE,
    client TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabla de habilidades
  db.run(`CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    level INTEGER DEFAULT 80,
    icon TEXT,
    is_main_stack BOOLEAN DEFAULT 0,
    active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabla de experiencias
  db.run(`CREATE TABLE IF NOT EXISTS experiences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    current BOOLEAN DEFAULT 0,
    description TEXT,
    technologies TEXT,
    achievements TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabla de certificaciones
  db.run(`CREATE TABLE IF NOT EXISTS certifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date DATE,
    expiry_date DATE,
    credential_id TEXT,
    credential_url TEXT,
    image TEXT,
    active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabla de mensajes de contacto
  db.run(`CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread',
    replied BOOLEAN DEFAULT 0,
    ip_address TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabla de testimonios
  db.run(`CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    position TEXT,
    company TEXT,
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    image TEXT,
    linkedin_url TEXT,
    active BOOLEAN DEFAULT 1,
    featured BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insertar admin por defecto
  const adminPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'Admin123!', 10);
  db.run(`INSERT OR IGNORE INTO users (email, password, role) VALUES (?, ?, ?)`, 
    [process.env.ADMIN_EMAIL || 'admin@portfolio.com', adminPassword, 'admin']);

  // Perfil inicial
  db.run(`INSERT OR IGNORE INTO profile (id, name, title, summary, bio, email, github, linkedin, years_experience, projects_count, location) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [
      'Alex Desarrollador', 
      'Desarrollador Full Stack', 
      'Desarrollador apasionado por crear soluciones innovadoras con React y Node.js',
      'Soy un desarrollador full stack con experiencia en tecnologías modernas como React, Node.js, TypeScript y bases de datos. Me especializo en crear aplicaciones web escalables y eficientes que resuelven problemas reales.',
      'admin@portfolio.com',
      'https://github.com/tuusuario',
      'https://linkedin.com/in/tuusuario',
      3,
      20,
      'Madrid, España'
    ]);

  console.log('✅ Base de datos inicializada correctamente');
});

db.close();