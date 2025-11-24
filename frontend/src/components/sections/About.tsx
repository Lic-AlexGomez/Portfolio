import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { Code, Zap, Heart, Target, Rocket, Star } from 'lucide-react'
import { profileApi } from '@/services/api'

const About = () => {
  const { data: profile } = useQuery('profile', profileApi.get)

  const stats = [
    { icon: Code, label: 'Proyectos', value: '50+', color: 'from-blue-500 to-blue-600' },
    { icon: Zap, label: 'Tecnologías', value: '15+', color: 'from-gray-500 to-gray-600' },
    { icon: Heart, label: 'Clientes Felices', value: '30+', color: 'from-blue-400 to-blue-500' },
    { icon: Target, label: 'Años Exp.', value: '3+', color: 'from-gray-600 to-gray-700' }
  ]

  const skills = [
    { name: 'Desarrollo Frontend', level: 95, icon: '🎨' },
    { name: 'Desarrollo Backend', level: 90, icon: '⚙️' },
    { name: 'UI/UX Design', level: 85, icon: '✨' },
    { name: 'DevOps', level: 80, icon: '🚀' }
  ]

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Elementos decorativos minimalistas */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-blue-500/5 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-gray-500/5 rounded-full"></div>
      
      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-6 py-3 rounded-full mb-6"
          >
            <Star className="h-5 w-5 text-blue-400" />
            <span className="text-white font-medium">Sobre Mí</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl lg:text-6xl font-black text-white mb-6"
          >
            Transformo
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> ideas </span>
            en realidad
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {profile?.bio || 'Soy un desarrollador apasionado que combina creatividad con tecnología para crear experiencias digitales que impactan y enamoran.'}
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center group-hover:border-white/20 transition-all">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills & Bio Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Mi Misión</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Crear experiencias digitales que no solo funcionen perfectamente, sino que también 
                  <span className="text-cyan-400 font-semibold"> inspiren</span> y 
                  <span className="text-pink-400 font-semibold"> emocionen</span> a los usuarios. 
                  Cada línea de código es una oportunidad para hacer algo extraordinario.
                </p>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 group-hover:border-white/20 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-600 rounded-2xl flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Mi Enfoque</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Combino las últimas tecnologías con principios de diseño centrado en el usuario. 
                  No solo desarrollo aplicaciones, creo 
                  <span className="text-yellow-400 font-semibold"> soluciones completas</span> que 
                  impulsan el crecimiento de tu negocio.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">Mis Superpoderes</h3>
              <p className="text-gray-400">Tecnologías que domino para crear magia digital</p>
            </div>

            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 group-hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <span className="text-white font-semibold text-lg">{skill.name}</span>
                    </div>
                    <span className="text-blue-400 font-bold text-lg">{skill.level}%</span>
                  </div>
                  
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-blue-500 rounded-full opacity-80"></div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About