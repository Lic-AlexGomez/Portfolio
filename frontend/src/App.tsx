import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useEffect, useState } from 'react'
import HomePage from '@/pages/HomePage'
import AdminLogin from '@/pages/admin/AdminLogin'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import { Toaster } from '@/components/ui/Toaster'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let animationFrame: number
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    setIsLoaded(true)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen relative overflow-hidden">
        {/* Cursor personalizado */}
        <div 
          className="fixed w-3 h-3 bg-blue-500 rounded-full pointer-events-none z-50 opacity-60"
          style={{
            left: mousePosition.x - 6,
            top: mousePosition.y - 6,
            transform: `translate3d(0,0,0) scale(${isLoaded ? 1 : 0})`,
            willChange: 'transform'
          }}
        />
        
        {/* Fondo minimalista */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_50%)]"></div>
        </div>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
        <Toaster />
      </div>
    </QueryClientProvider>
  )
}

export default App