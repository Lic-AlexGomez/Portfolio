import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Plus, Edit, Trash2, Eye, ExternalLink } from 'lucide-react'
import { projectsApi } from '@/services/api'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import ProjectForm from './ProjectForm'

const ProjectsManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  
  const queryClient = useQueryClient()
  const { data: projects = [], isLoading } = useQuery('projects', () => projectsApi.getAll())

  const deleteMutation = useMutation(projectsApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('projects')
    }
  })

  const handleEdit = (project: any) => {
    setEditingProject(project)
    setIsFormOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      deleteMutation.mutate(id)
    }
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingProject(null)
  }

  if (isLoading) {
    return <div className="text-center py-8">Cargando proyectos...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Gestión de Proyectos
        </h2>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Proyecto
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(projects as any[]).map((project: any) => (
          <Card key={project.id} className="p-4">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Eye className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs">
                    Destacado
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {project.description}
              </p>

              <div className="flex items-center gap-2 text-xs">
                <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {project.category}
                </span>
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(project)}
                  className="flex-1 gap-1"
                >
                  <Edit className="h-3 w-3" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 gap-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                  Eliminar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {(projects as any[]).length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No hay proyectos creados
          </p>
          <Button onClick={() => setIsFormOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Crear primer proyecto
          </Button>
        </div>
      )}

      <ProjectForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        project={editingProject}
      />
    </div>
  )
}

export default ProjectsManager