import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
}

let toastId = 0
const toasts: Toast[] = []
const listeners: ((toasts: Toast[]) => void)[] = []

export const toast = {
  success: (message: string) => addToast('success', message),
  error: (message: string) => addToast('error', message),
  info: (message: string) => addToast('info', message),
}

function addToast(type: Toast['type'], message: string) {
  const id = (++toastId).toString()
  const newToast = { id, type, message }
  toasts.push(newToast)
  listeners.forEach(listener => listener([...toasts]))
  
  setTimeout(() => removeToast(id), 5000)
}

function removeToast(id: string) {
  const index = toasts.findIndex(toast => toast.id === id)
  if (index > -1) {
    toasts.splice(index, 1)
    listeners.forEach(listener => listener([...toasts]))
  }
}

export const Toaster = () => {
  const [toastList, setToastList] = useState<Toast[]>([])

  useEffect(() => {
    const listener = (newToasts: Toast[]) => setToastList(newToasts)
    listeners.push(listener)
    return () => {
      const index = listeners.indexOf(listener)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [])

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getStyles = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200'
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toastList.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg min-w-[300px] animate-slide-up ${getStyles(toast.type)}`}
        >
          {getIcon(toast.type)}
          <p className="flex-1">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}