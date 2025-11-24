import { motion } from 'framer-motion'
import { Download, Mail, Github, Linkedin } from 'lucide-react'
import { useQuery } from 'react-query'
import { profileApi } from '@/services/api'

const Hero = () => {
  const { data: profile } = useQuery('profile', profileApi.get)

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="min-h-screen flex items-center section-padding relative overflow-hidden">
      {/* Fondo elegante */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent"></div>
      </div>
      
      <div className="container-max grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-full font-medium text-sm mb-4"
            >
              <span className="animate-wave">👋</span>
              Hola, soy desarrollador
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="text-5xl lg:text-7xl font-black leading-tight mb-6"
            >
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {profile?.name || 'Alex Gómez'}
              </span>
              <br />
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-white text-3xl lg:text-5xl font-bold"
              >
                Creo experiencias
                <span className="text-blue-400"> increíbles</span>
              </motion.span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              {['React', 'Node.js', 'TypeScript', 'Next.js'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                  className="bg-gray-800/50 border border-gray-700 px-4 py-2 rounded-full text-gray-300 font-medium text-sm hover:bg-gray-700/50 transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-gray-200 max-w-2xl mb-8 leading-relaxed"
          >
            Transformo ideas en 
            <span className="text-blue-400 font-semibold"> aplicaciones web modernas</span> que
            <span className="text-gray-300 font-semibold"> impactan</span> y 
            <span className="text-blue-300 font-semibold"> enamoran</span> a los usuarios.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-xl hover:shadow-blue-500/25 transition-all duration-300 text-lg flex items-center gap-3 group"
            >
              <Mail className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              ¡Trabajemos juntos!
              <span className="animate-bounce">🚀</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('/api/profile/cv', '_blank')}
              className="px-8 py-4 bg-gray-800/50 border-2 border-gray-600 text-white font-bold rounded-full hover:bg-gray-700/50 transition-all duration-300 text-lg flex items-center gap-3 group"
            >
              <Download className="h-5 w-5 group-hover:animate-bounce" />
              Ver mi CV
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-4"
          >
            {profile?.github && (
              <motion.a
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <Github className="h-6 w-6 text-white group-hover:text-yellow-400" />
              </motion.a>
            )}
            
            {profile?.linkedin && (
              <motion.a
                whileHover={{ scale: 1.2, rotate: -360 }}
                whileTap={{ scale: 0.9 }}
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <Linkedin className="h-6 w-6 text-white group-hover:text-blue-400" />
              </motion.a>
            )}
            
            {profile?.email && (
              <motion.a
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                href={`mailto:${profile.email}`}
                className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <Mail className="h-6 w-6 text-white group-hover:text-pink-400" />
              </motion.a>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex justify-center lg:justify-end relative"
        >
          <div className="relative">
            {/* Glowing orb background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse scale-110"></div>
            
            {/* Main photo container */}
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative w-80 h-80 lg:w-96 lg:h-96 z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-full p-2 animate-spin-slow">
                <div className="w-full h-full rounded-full overflow-hidden bg-white border-4 border-white shadow-2xl">
                  {profile?.photo ? (
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <div className="text-8xl animate-bounce">🚀</div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
            
            {/* Floating code elements */}
            <motion.div
              animate={{ 
                y: [-20, 20, -20],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <span className="text-2xl font-bold text-white">{'<>'}</span>
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [20, -20, 20],
                rotate: [360, 180, 0],
                scale: [1.1, 1, 1.1]
              }}
              transition={{ duration: 6, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <span className="text-3xl animate-pulse">⚡</span>
            </motion.div>
            
            <motion.div
              animate={{ 
                x: [-15, 15, -15],
                y: [-10, 10, -10],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 2 }}
              className="absolute top-1/2 -right-12 w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center shadow-xl"
            >
              <span className="text-xl">🎯</span>
            </motion.div>
            
            {/* Particle effects */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [-100, 100],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
                className={`absolute w-2 h-2 bg-white rounded-full`}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 10}%`
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero