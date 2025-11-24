import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { projectsApi } from '@/services/api'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'

interface ProjectFormProps {
  isOpen: boolean
  onClose: () => void
  project?: any
}

const ProjectForm = ({ isOpen, onClose, project }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'web',
    technologies: '',
    demo_url: '',
    github_url: '',
    featured: false,
    image: null as File | null
  })

  const queryClient = useQueryClient()

  const createMutation = useMutation(projectsApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('projects')
      onClose()
      resetForm()
    }
  })

  const updateMutation = useMutation(
    (data: any) => projectsApi.update(project.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects')
        onClose()
        resetForm()
      }
    }
  )

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        category: project.category || 'web',
        technologies: Array.isArray(project.technologies) 
          ? project.technologies.join(', ') 
          : project.technologies || '',
        demo_url: project.demo_url || '',
        github_url: project.github_url || '',
        featured: project.featured || false,
        image: null
      })
    }
  }, [project])

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'web',
      technologies: '',
      demo_url: '',
      github_url: '',
      featured: false,
      image: null
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const submitData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'technologies' && typeof value === 'string') {
        submitData.append(key, JSON.stringify(value.split(',').map((t: string) => t.trim())))
      } else if (key === 'image' && value instanceof File) {
        submitData.append(key, value)
      } else if (key !== 'image' && value !== null) {
        submitData.append(key, value.toString())
      }
    })

    if (project) {
      updateMutation.mutate(submitData)
    } else {
      createMutation.mutate(submitData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, image: file }))
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project ? 'Editar Proyecto' : 'Nuevo Proyecto'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Título *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Categoría</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="web">Web</option>
              <option value="app">App</option>
              <option value="design">Diseño</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Descripción *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tecnologías (separadas por comas)</label>
          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, TypeScript"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">URL Demo</label>
            <input
              type="url"
              name="demo_url"
              value={formData.demo_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">URL GitHub</label>
            <input
              type="url"
              name="github_url"
              value={formData.github_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="rounded"
          />
          <label className="text-sm font-medium">Proyecto destacado</label>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={createMutation.isLoading || updateMutation.isLoading}
            className="flex-1"
          >
            {project ? 'Actualizar' : 'Crear'} Proyecto
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default ProjectForm