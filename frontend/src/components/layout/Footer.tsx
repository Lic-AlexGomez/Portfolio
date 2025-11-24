import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { useQuery } from 'react-query'
import { profileApi } from '@/services/api'

const Footer = () => {
  const { data: profile } = useQuery('profile', profileApi.get)
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary-400">
              {profile?.name || 'Portafolio'}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Desarrollador Full Stack especializado en crear soluciones web modernas y eficientes.
            </p>
            <div className="flex gap-4">
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Navegación</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '#home', label: 'Inicio' },
                { href: '#about', label: 'Sobre Mí' },
                { href: '#skills', label: 'Habilidades' },
                { href: '#projects', label: 'Proyectos' }
              ].map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Servicios</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Desarrollo Web</li>
              <li>Aplicaciones React</li>
              <li>APIs REST</li>
              <li>Consultoría Técnica</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Contacto</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>{profile?.email || 'admin@portfolio.com'}</p>
              <p>Madrid, España</p>
              <button
                onClick={() => scrollToSection('#contact')}
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                Enviar mensaje →
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 flex items-center gap-2">
              © {currentYear} {profile?.name || 'Portafolio'}. Hecho con 
              <Heart className="h-4 w-4 text-red-500" /> 
              y React
            </p>
            
            <div className="flex gap-6 text-sm">
              <a
                href="/admin/login"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                Admin
              </a>
              <button
                onClick={scrollToTop}
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                Volver arriba ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer