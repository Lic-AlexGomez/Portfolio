import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, FolderOpen, User, Mail, LogOut, Menu, X } from 'lucide-react'
import ProjectsManager from '@/components/admin/ProjectsManager'
import ProfileManager from '@/components/admin/ProfileManager'
import MessagesManager from '@/components/admin/MessagesManager'
import Button from '@/components/ui/Button'
import { useDashboardStats } from '@/hooks/useDashboardStats'

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { projectsCount, messagesCount, unreadMessages, featuredProjects } = useDashboardStats()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Proyectos', href: '/admin/projects', icon: FolderOpen },
    { name: 'Perfil', href: '/admin/profile', icon: User },
    { name: 'Mensajes', href: '/admin/messages', icon: Mail },
  ]

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    window.location.href = '/admin/login'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col">
          <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Admin Panel
              </h1>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full gap-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
            <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
                <Button variant="outline" size="sm" onClick={() => setSidebarOpen(false)} className="p-2">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <nav className="px-4 py-6 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2"
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
                </h2>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={
                <div className="space-y-8">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-8 text-white">
                    <h1 className="text-3xl font-bold mb-2">¡Bienvenido de vuelta!</h1>
                    <p className="text-primary-100">Gestiona tu portafolio profesional desde aquí</p>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Proyectos</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{projectsCount}</p>
                          <p className="text-xs text-green-600 mt-1">{featuredProjects} destacados</p>
                        </div>
                        <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg">
                          <FolderOpen className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mensajes</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{messagesCount}</p>
                          <p className="text-xs text-yellow-600 mt-1">{unreadMessages} sin leer</p>
                        </div>
                        <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
                          <Mail className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Visitas</p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">1.2k</p>
                          <p className="text-xs text-green-600 mt-1">+15% esta semana</p>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                          <User className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Estado</p>
                          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">Online</p>
                          <p className="text-xs text-gray-500 mt-1">Activo ahora</p>
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                          <LayoutDashboard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions & Recent Activity */}
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Quick Actions */}
                    <div className="lg:col-span-1">
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                          Acciones Rápidas
                        </h3>
                        <div className="space-y-3">
                          <Link to="/admin/projects" className="flex items-center p-4 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-lg hover:from-primary-100 hover:to-primary-200 dark:hover:from-primary-800 dark:hover:to-primary-700 transition-all group">
                            <div className="bg-primary-500 p-2 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                              <FolderOpen className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <span className="font-medium text-primary-700 dark:text-primary-300 block">Gestionar Proyectos</span>
                              <span className="text-sm text-primary-600 dark:text-primary-400">Crear y editar</span>
                            </div>
                          </Link>
                          
                          <Link to="/admin/profile" className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg hover:from-green-100 hover:to-green-200 dark:hover:from-green-800 dark:hover:to-green-700 transition-all group">
                            <div className="bg-green-500 p-2 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                              <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <span className="font-medium text-green-700 dark:text-green-300 block">Actualizar Perfil</span>
                              <span className="text-sm text-green-600 dark:text-green-400">Información personal</span>
                            </div>
                          </Link>
                          
                          <Link to="/admin/messages" className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 rounded-lg hover:from-yellow-100 hover:to-yellow-200 dark:hover:from-yellow-800 dark:hover:to-yellow-700 transition-all group">
                            <div className="bg-yellow-500 p-2 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                              <Mail className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <span className="font-medium text-yellow-700 dark:text-yellow-300 block">Ver Mensajes</span>
                              <span className="text-sm text-yellow-600 dark:text-yellow-400">{unreadMessages} nuevos</span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="lg:col-span-2">
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                          Actividad Reciente
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-4">
                              <FolderOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Proyecto "E-commerce React" actualizado</p>
                              <p className="text-xs text-gray-500">Hace 2 horas</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-4">
                              <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Nuevo mensaje de María García</p>
                              <p className="text-xs text-gray-500">Hace 5 horas</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full mr-4">
                              <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Perfil actualizado con nueva foto</p>
                              <p className="text-xs text-gray-500">Hace 1 día</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              } />
              <Route path="/projects" element={<ProjectsManager />} />
              <Route path="/profile" element={<ProfileManager />} />
              <Route path="/messages" element={<MessagesManager />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard