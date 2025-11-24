const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  console.log('Insertando datos de ejemplo...');
  
  // Insertar proyectos de ejemplo
  const projects = [
    {
      title: 'E-commerce React',
      description: 'Plataforma de comercio electrónico completa con React y Node.js',
      category: 'web',
      technologies: JSON.stringify(['React', 'Node.js', 'Express', 'SQLite', 'Tailwind CSS']),
      featured: 1,
      demo_url: 'https://demo-ecommerce.com',
      github_url: 'https://github.com/usuario/ecommerce-react'
    },
    {
      title: 'Dashboard Analytics',
      description: 'Dashboard interactivo para visualización de datos con gráficos en tiempo real',
      category: 'web',
      technologies: JSON.stringify(['React', 'TypeScript', 'Chart.js', 'Node.js']),
      featured: 1,
      demo_url: 'https://demo-dashboard.com',
      github_url: 'https://github.com/usuario/analytics-dashboard'
    },
    {
      title: 'App Móvil React Native',
      description: 'Aplicación móvil multiplataforma con React Native',
      category: 'app',
      technologies: JSON.stringify(['React Native', 'TypeScript', 'Firebase']),
      featured: 0,
      github_url: 'https://github.com/usuario/mobile-app'
    },
    {
      title: 'Sistema de Gestión',
      description: 'Sistema completo de gestión empresarial con múltiples módulos',
      category: 'web',
      technologies: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'JWT']),
      featured: 0,
      demo_url: 'https://demo-sistema.com',
      github_url: 'https://github.com/usuario/sistema-gestion'
    }
  ];
  
  projects.forEach(project => {
    db.run(`INSERT OR IGNORE INTO projects (
      title, description, category, technologies, featured, demo_url, github_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [project.title, project.description, project.category, project.technologies,
     project.featured, project.demo_url, project.github_url]);
  });

  // Insertar habilidades de ejemplo
  const skills = [
    ['React', 'Frontend', 90, '⚛️'],
    ['TypeScript', 'Frontend', 85, '📚'],
    ['JavaScript', 'Frontend', 90, '📜'],
    ['Tailwind CSS', 'Frontend', 90, '🎨'],
    ['Node.js', 'Backend', 85, '🟢'],
    ['Express', 'Backend', 80, '🚀'],
    ['SQLite', 'Backend', 75, '🗄️'],
    ['JWT', 'Backend', 80, '🔐'],
    ['Git', 'Herramientas', 85, '📝'],
    ['VS Code', 'Herramientas', 90, '💻'],
    ['Figma', 'Herramientas', 70, '🎨'],
    ['Postman', 'Herramientas', 75, '📨']
  ];
  
  skills.forEach(([name, category, level, icon]) => {
    db.run(`INSERT OR IGNORE INTO skills (name, category, level, icon) VALUES (?, ?, ?, ?)`,
      [name, category, level, icon]);
  });

  // Insertar experiencias de ejemplo
  const experiences = [
    {
      title: 'Desarrollador Full Stack',
      company: 'Tech Solutions',
      location: 'Madrid, España',
      start_date: '2022-01-01',
      end_date: null,
      current: 1,
      description: 'Desarrollo de aplicaciones web modernas con React, Node.js y bases de datos relacionales. Liderazgo de proyectos y mentorización de desarrolladores junior.',
      technologies: JSON.stringify(['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'])
    },
    {
      title: 'Desarrollador Frontend',
      company: 'Digital Agency',
      location: 'Barcelona, España',
      start_date: '2021-06-01',
      end_date: '2021-12-31',
      current: 0,
      description: 'Creación de interfaces de usuario responsivas y optimizadas. Colaboración estrecha con equipos de diseño y backend.',
      technologies: JSON.stringify(['React', 'CSS3', 'JavaScript', 'Figma'])
    }
  ];

  experiences.forEach(exp => {
    db.run(`INSERT OR IGNORE INTO experiences (
      title, company, location, start_date, end_date, current, description, technologies
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [exp.title, exp.company, exp.location, exp.start_date, exp.end_date, exp.current, exp.description, exp.technologies]);
  });

  // Insertar testimonios de ejemplo
  const testimonials = [
    {
      name: 'María García',
      position: 'Product Manager',
      company: 'Tech Corp',
      content: 'Excelente desarrollador, muy profesional y con gran atención al detalle. Entregó el proyecto a tiempo y superó nuestras expectativas.',
      rating: 5,
      featured: 1
    },
    {
      name: 'Carlos Ruiz',
      position: 'CTO',
      company: 'StartupXYZ',
      content: 'Trabajar con él fue una experiencia fantástica. Su conocimiento técnico y capacidad de comunicación son excepcionales.',
      rating: 5,
      featured: 1
    }
  ];

  testimonials.forEach(testimonial => {
    db.run(`INSERT OR IGNORE INTO testimonials (
      name, position, company, content, rating, featured
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [testimonial.name, testimonial.position, testimonial.company, testimonial.content, testimonial.rating, testimonial.featured]);
  });
  
  console.log('✅ Datos de ejemplo insertados correctamente');
});

db.close();