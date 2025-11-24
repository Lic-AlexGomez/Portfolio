# 🚀 Portafolio Profesional - React + Vite + Node.js + SQLite

Un portafolio moderno y completo construido con las últimas tecnologías web.

## ✨ Stack Tecnológico

### Frontend
- **React 18** - Biblioteca de UI moderna
- **Vite** - Build tool ultra rápido
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos utility-first
- **Framer Motion** - Animaciones fluidas
- **React Query** - Gestión de estado del servidor
- **React Hook Form** - Manejo de formularios
- **Lucide React** - Iconos modernos

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web minimalista
- **SQLite** - Base de datos ligera
- **JWT** - Autenticación segura
- **Bcrypt** - Encriptación de contraseñas
- **Multer** - Subida de archivos

## 🚀 Instalación Rápida

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd portfolio-react
```

### 2. Instalar dependencias

**Backend:**
```bash
cd backend
npm install
npm run setup  # Inicializa DB + datos de ejemplo
```

**Frontend:**
```bash
cd frontend
npm install
```

### 3. Iniciar el desarrollo

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 4. Acceder a la aplicación
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **Admin Panel**: http://localhost:3001/admin/login

## 🔐 Credenciales por Defecto

- **Email**: admin@portfolio.com
- **Contraseña**: Admin123!

## 📁 Estructura del Proyecto

```
portfolio-react/
├── frontend/                 # React + Vite
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   │   ├── ui/         # Componentes base (Button, Card, etc.)
│   │   │   ├── layout/     # Layout components (Header, Footer)
│   │   │   └── sections/   # Secciones de la página
│   │   ├── pages/          # Páginas principales
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API calls
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utilidades
│   ├── package.json
│   └── vite.config.ts
├── backend/                 # Node.js + Express
│   ├── database/           # SQLite + scripts
│   ├── routes/             # API endpoints
│   ├── middleware/         # Middlewares
│   ├── models/             # Modelos de datos
│   └── uploads/            # Archivos subidos
└── README.md
```

## 🎯 Características Principales

### ✅ Para Reclutadores
- Información completa del desarrollador
- Proyectos con demos en vivo y código fuente
- Habilidades técnicas organizadas
- CV descargable
- Experiencia profesional detallada

### ✅ Para Usuarios
- Diseño responsive y moderno
- Modo oscuro/claro automático
- Animaciones suaves con Framer Motion
- Navegación intuitiva
- Carga rápida con Vite

### ✅ Para Administradores
- Panel de administración completo
- Gestión de proyectos y habilidades
- Sistema de mensajes
- Autenticación segura con JWT
- Subida de archivos

## 🛠️ Desarrollo

### Comandos Útiles

**Frontend:**
```bash
npm run dev      # Desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Linting
```

**Backend:**
```bash
npm run dev      # Desarrollo con nodemon
npm start        # Producción
npm run init-db  # Inicializar base de datos
npm run sample-data  # Insertar datos de ejemplo
```

### Agregar Nuevos Componentes

1. **Componente UI básico:**
```bash
# Crear en src/components/ui/
touch src/components/ui/NewComponent.tsx
```

2. **Sección de página:**
```bash
# Crear en src/components/sections/
touch src/components/sections/NewSection.tsx
```

3. **Página completa:**
```bash
# Crear en src/pages/
touch src/pages/NewPage.tsx
```

### API Endpoints

**Públicos:**
- `GET /api/profile` - Información del perfil
- `GET /api/projects` - Lista de proyectos
- `GET /api/skills` - Habilidades técnicas
- `POST /api/contact` - Enviar mensaje

**Privados (requieren autenticación):**
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/verify` - Verificar token

## 🎨 Personalización

### Cambiar Colores
Edita `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',  // Color principal
        600: '#2563eb',
      },
    },
  },
}
```

### Agregar Animaciones
Usa Framer Motion:
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Contenido animado
</motion.div>
```

### Nuevas Rutas API
1. Crear archivo en `backend/routes/`
2. Agregar en `server.js`:
```js
app.use('/api/nueva-ruta', require('./routes/nueva-ruta'));
```

## 🚀 Despliegue

### Frontend (Netlify/Vercel)
```bash
npm run build
# Subir carpeta dist/
```

### Backend (Railway/Render)
```bash
# Configurar variables de entorno
# Subir código del backend
```

### Variables de Entorno Producción
```env
NODE_ENV=production
PORT=3000
JWT_SECRET=tu_secret_super_seguro
FRONTEND_URL=https://tu-dominio.com
```

## 🔧 Solución de Problemas

### Error de CORS
- Verifica que `FRONTEND_URL` en `.env` sea correcta
- Asegúrate de que ambos servidores estén corriendo

### Error de Base de Datos
```bash
cd backend
npm run init-db  # Recrear base de datos
```

### Error de Dependencias
```bash
# Limpiar node_modules
rm -rf node_modules package-lock.json
npm install
```

## 📞 Soporte

- **Documentación**: Este README
- **Issues**: GitHub Issues
- **Email**: admin@portfolio.com

---

**¡Tu portafolio moderno con React está listo! 🎉**

Tecnologías de vanguardia + Diseño profesional + Funcionalidad completa = Éxito garantizado 🚀