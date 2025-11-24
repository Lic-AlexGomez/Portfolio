import { motion } from 'framer-motion'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { ExternalLink, Github, Eye, Sparkles } from 'lucide-react'
import { projectsApi } from '@/services/api'

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { data: projects = [] } = useQuery('projects', () => projectsApi.getAll())

  const categories = [
    { id: 'all', name: 'Todos', icon: '🌟' },
    { id: 'web', name: 'Web Apps', icon: '🌐' },
    { id: 'app', name: 'Mobile', icon: '📱' },
    { id: 'design', name: 'Diseño', icon: '🎨' }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : (projects as any[]).filter((p: any) => p.category === selectedCategory)

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Elementos decorativos minimalistas */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/3 rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gray-500/3 rounded-full"></div>
      
      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-6 py-3 rounded-full mb-6"
          >
            <Sparkles className="h-5 w-5 text-blue-400" />
            <span className="text-white font-medium">Mi Trabajo</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl lg:text-6xl font-black text-white mb-6"
          >
            Proyectos que
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> brillan</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Cada proyecto es una historia de innovación, creatividad y excelencia técnica
          </motion.p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative group px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{category.icon}</span>
                {category.name}
              </div>
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-blue-600 rounded-2xl -z-10"
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid de Proyectos */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project: any, index: number) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="group relative"
            >
              {/* Glow effect minimalista */}
              <div className="absolute inset-0 bg-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden group-hover:border-white/20 transition-all duration-300">
                {/* Imagen del proyecto */}
                <div className="relative aspect-video overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <Eye className="h-12 w-12 text-gray-600" />
                    </div>
                  )}
                  
                  {/* Overlay con acciones */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                    {project.demo_url && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all"
                      >
                        <ExternalLink className="h-5 w-5 text-white" />
                      </motion.a>
                    )}
                    
                    {project.github_url && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all"
                      >
                        <Github className="h-5 w-5 text-white" />
                      </motion.a>
                    )}
                  </div>
                  
                  {/* Badge de destacado */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Destacado
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tecnologías */}
                  <div className="flex flex-wrap gap-2">
                    {(project.technologies || []).slice(0, 3).map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {(project.technologies || []).length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{(project.technologies || []).length - 3} más
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No hay proyectos</h3>
            <p className="text-gray-400">No se encontraron proyectos en esta categoría</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Projects