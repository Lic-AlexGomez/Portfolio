import React, { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Save, Upload, User, FileText } from 'lucide-react'
import { profileApi } from '@/services/api'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const ProfileManager = () => {
  const queryClient = useQueryClient()
  const { data: profile, isLoading } = useQuery('profile', profileApi.get)
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    summary: '',
    bio: '',
    email: '',
    github: '',
    linkedin: '',
    location: ''
  })

  const photoInputRef = useRef<HTMLInputElement>(null)
  const cvInputRef = useRef<HTMLInputElement>(null)

  const updateMutation = useMutation(profileApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile')
      alert('Perfil actualizado exitosamente')
    }
  })

  const uploadPhotoMutation = useMutation(profileApi.uploadPhoto, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile')
      alert('Foto subida exitosamente')
    }
  })

  const uploadCVMutation = useMutation(profileApi.uploadCV, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile')
      alert('CV subido exitosamente')
    }
  })

  React.useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        title: profile.title || '',
        summary: profile.summary || '',
        bio: profile.bio || '',
        email: profile.email || '',
        github: profile.github || '',
        linkedin: profile.linkedin || '',
        location: profile.location || ''
      })
    }
  }, [profile])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateMutation.mutate(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadPhotoMutation.mutate(file)
    }
  }

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadCVMutation.mutate(file)
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Cargando perfil...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Gestión de Perfil
        </h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Foto de perfil */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Foto de Perfil
          </h3>
          
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
              {profile?.photo ? (
                <img
                  src={profile.photo}
                  alt="Perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-16 w-16 text-gray-400" />
              )}
            </div>
            
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => photoInputRef.current?.click()}
              disabled={uploadPhotoMutation.isLoading}
            >
              <Upload className="h-4 w-4" />
              {uploadPhotoMutation.isLoading ? 'Subiendo...' : 'Cambiar Foto'}
            </Button>
          </div>
        </Card>

        {/* CV */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Curriculum Vitae
          </h3>
          
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <FileText className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            
            <input
              ref={cvInputRef}
              type="file"
              accept=".pdf"
              onChange={handleCVUpload}
              className="hidden"
            />
            <Button 
              variant="outline" 
              className="gap-2 mb-2"
              onClick={() => cvInputRef.current?.click()}
              disabled={uploadCVMutation.isLoading}
            >
              <Upload className="h-4 w-4" />
              {uploadCVMutation.isLoading ? 'Subiendo...' : 'Subir CV'}
            </Button>
            
            {profile?.cv_file && (
              <div className="text-sm text-gray-500">
                CV disponible
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-1 gap-6">
        {/* Formulario de perfil */}
        <div>
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
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
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Resumen</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Biografía</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Ubicación</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={updateMutation.isLoading}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                {updateMutation.isLoading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProfileManager