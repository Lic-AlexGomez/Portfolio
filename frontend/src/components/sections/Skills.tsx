import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { skillsApi } from '@/services/api'

const Skills = () => {
  const { data: skills = [] } = useQuery('skills', skillsApi.getAll)


  const skillCategories = skills.reduce((acc: any, skill: any) => {
    const category = skill.category || 'Otras'
    if (!acc[category]) acc[category] = []
    acc[category].push(skill)
    return acc
  }, {})

  const defaultSkills = {
    'Frontend': [
      { name: 'React', level: 90, icon: '⚛️' },
      { name: 'TypeScript', level: 85, icon: '📘' },
      { name: 'Tailwind CSS', level: 90, icon: '🎨' },
      { name: 'Vite', level: 80, icon: '⚡' }
    ],
    'Backend': [
      { name: 'Node.js', level: 85, icon: '🟢' },
      { name: 'Express', level: 80, icon: '🚀' },
      { name: 'SQLite', level: 75, icon: '🗄️' },
      { name: 'JWT', level: 80, icon: '🔐' }
    ],
    'Herramientas': [
      { name: 'Git', level: 85, icon: '📝' },
      { name: 'VS Code', level: 90, icon: '💻' },
      { name: 'Figma', level: 70, icon: '🎨' },
      { name: 'Postman', level: 75, icon: '📮' }
    ]
  }

  const displaySkills = Object.keys(skillCategories).length > 0 ? skillCategories : defaultSkills

  return (
    <section id="skills" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
            <span className="text-blue-400 font-medium">⚡ Mis Habilidades</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl lg:text-6xl font-black text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Stack
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> Tecnológico</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Tecnologías y herramientas que domino para crear experiencias excepcionales
          </motion.p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(displaySkills).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
                {category}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(categorySkills as any[]).map((skill, index) => (
                  <motion.div
                    key={skill.id || `${category}-${skill.name}-${index}`}
                    initial={{ opacity: 0, y: 50, rotateY: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: 5,
                      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)"
                    }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="group"
                  >
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center h-full group-hover:border-blue-500/30 transition-all duration-300">
                      <motion.div 
                        className="text-4xl mb-4"
                        whileHover={{ 
                          scale: 1.2, 
                          rotate: [0, -10, 10, 0],
                          y: -5
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {skill.icon}
                      </motion.div>
                      
                      <motion.h4 
                        className="font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill.name}
                      </motion.h4>
                      
                      {/* Progress Bar Animada */}
                      <div className="w-full bg-gray-700 rounded-full h-3 mb-3 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full relative"
                          initial={{ width: 0, x: -100 }}
                          whileInView={{ width: `${skill.level}%`, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 1.5, 
                            delay: index * 0.2,
                            ease: "easeOut"
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/20 rounded-full"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              ease: "linear",
                              delay: index * 0.2 + 1.5
                            }}
                          />
                        </motion.div>
                      </div>
                      
                      <motion.span 
                        className="text-lg font-bold text-blue-400"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + 1 }}
                      >
                        {skill.level}%
                      </motion.span>
                      
                      {/* Partículas flotantes */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                          style={{
                            top: `${20 + i * 20}%`,
                            right: `${10 + i * 15}%`
                          }}
                          animate={{
                            y: [-10, -20, -10],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills