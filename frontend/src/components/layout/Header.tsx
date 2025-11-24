import { useState } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import Button from '@/components/ui/Button'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  const navItems = [
    { href: '#home', label: 'Inicio' },
    { href: '#about', label: 'Sobre Mí' },
    { href: '#skills', label: 'Habilidades' },
    { href: '#projects', label: 'Proyectos' },
    { href: '#experience', label: 'Experiencia' },
    { href: '#contact', label: 'Contacto' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md dark:bg-gray-900/80">
      <nav className="container-max flex h-16 items-center justify-between px-4">
        <div className="text-xl font-bold text-primary-500">
          Portafolio
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
            >
              {item.label}
            </button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="p-2"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="p-2"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header