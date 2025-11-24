import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Mail, Trash2, Eye, Clock } from 'lucide-react'
import { contactApi } from '@/services/api'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const MessagesManager = () => {
  const [selectedStatus, setSelectedStatus] = useState('all')
  const queryClient = useQueryClient()
  
  const { data: messagesData, isLoading } = useQuery(
    ['messages', selectedStatus],
    () => contactApi.getAll({ status: selectedStatus === 'all' ? undefined : selectedStatus })
  )

  const markAsReadMutation = useMutation(contactApi.markAsRead, {
    onSuccess: () => {
      queryClient.invalidateQueries('messages')
    }
  })

  const deleteMutation = useMutation(contactApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('messages')
    }
  })

  const handleMarkAsRead = (id: number) => {
    markAsReadMutation.mutate(id)
  }

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este mensaje?')) {
      deleteMutation.mutate(id)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return <div className="text-center py-8">Cargando mensajes...</div>
  }

  const messages = messagesData?.messages || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Mensajes de Contacto
        </h2>
        
        <div className="flex gap-2">
          {['all', 'unread', 'read'].map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus(status)}
            >
              {status === 'all' ? 'Todos' : status === 'unread' ? 'No leídos' : 'Leídos'}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((message: any) => (
          <Card key={message.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {message.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {message.email}
                  </span>
                  {message.status === 'unread' && (
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs">
                      Nuevo
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {message.subject}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {message.message}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(message.created_at)}
                  </div>
                  {message.ip_address && (
                    <span>IP: {message.ip_address}</span>
                  )}
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                {message.status === 'unread' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAsRead(message.id)}
                    className="gap-1"
                  >
                    <Eye className="h-3 w-3" />
                    Marcar leído
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(message.id)}
                  className="gap-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                  Eliminar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="text-center py-12">
          <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No hay mensajes {selectedStatus !== 'all' ? `${selectedStatus === 'unread' ? 'no leídos' : 'leídos'}` : ''}
          </p>
        </div>
      )}
    </div>
  )
}

export default MessagesManager