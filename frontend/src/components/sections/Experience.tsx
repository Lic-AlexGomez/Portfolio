import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'
import { profileApi } from '@/services/api'
import Card from '@/components/ui/Card'

const Experience = () => {
  const { data: experiences = [] } = useQuery('experiences', () => profileApi.getExperiences())

  const defaultExperiences = [
    {
      id: 1,
      title: 'Desarrollador Full Stack',
      company: 'Tech Company',
      location: 'Madrid, España',
      start_date: '2022-01',
      end_date: null,
      current: true,
      description: 'Desarrollo de aplicaciones web modernas con React, Node.js y bases de datos relacionales.',
      technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL']
    },
    {
      id: 2,
      title: 'Desarrollador Frontend',
      company: 'Startup Digital',
      location: 'Barcelona, España',
      start_date: '2021-06',
      end_date: '2021-12',
      current: false,
      description: 'Creación de interfaces de usuario responsivas y optimizadas para múltiples dispositivos.',
      technologies: ['React', 'CSS3', 'JavaScript', 'Figma']
    }
  ]

  const displayExperiences = experiences.length > 0 ? experiences : defaultExperiences

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Presente'
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })
  }

  return (
    <section id="experience" className="section-padding">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Experiencia
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Mi trayectoria profesional y proyectos destacados
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800"></div>

            <div className="space-y-12">
              {displayExperiences.map((exp: any, index: number) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative flex items-start gap-8"
                >
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center relative z-10">
                    <span className="text-white font-bold text-sm">
                      {formatDate(exp.start_date).split(' ')[1]?.slice(-2) || '22'}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <Card className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium mb-2">
                            <ExternalLink className="h-4 w-4" />
                            {exp.company}
                          </div>
                        </div>
                        
                        {exp.current && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Actual
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(exp.start_date)} - {exp.current ? 'Presente' : formatDate(exp.end_date)}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech: string, i: number) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience