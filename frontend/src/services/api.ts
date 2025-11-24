import axios from 'axios'
import type { Experience, Education, Certification, Stats } from '@/types'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

export const profileApi = {
  get: () => api.get('/profile').then(res => res.data),
  getExperiences: () => api.get('/profile/experiences').then(res => res.data),
  update: (data: any) => api.put('/profile', data).then(res => res.data),
  uploadPhoto: (file: File) => {
    const formData = new FormData()
    formData.append('photo', file)
    return api.post('/profile/upload-photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data)
  },
  uploadCV: (file: File) => {
    const formData = new FormData()
    formData.append('cv', file)
    return api.post('/profile/upload-cv', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data)
  },
}

export const projectsApi = {
  getAll: (params?: { category?: string; featured?: boolean }) => 
    api.get('/projects', { params }).then(res => res.data),
  getById: (id: number) => api.get(`/projects/${id}`).then(res => res.data),
  create: (data: any) => api.post('/projects', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data),
  update: (id: number, data: any) => api.put(`/projects/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data),
  delete: (id: number) => api.delete(`/projects/${id}`).then(res => res.data),
}

export const skillsApi = {
  getAll: () => api.get('/skills').then(res => res.data),
  getGrouped: () => api.get('/skills/grouped').then(res => res.data),
  create: (data: any) => api.post('/skills', data).then(res => res.data),
  update: (id: number, data: any) => api.put(`/skills/${id}`, data).then(res => res.data),
  delete: (id: number) => api.delete(`/skills/${id}`).then(res => res.data),
}

export const experienceApi = {
  getAll: () => api.get<Experience[]>('/experience').then(res => res.data),
  create: (data: Omit<Experience, 'id'>) => api.post<Experience>('/experience', data).then(res => res.data),
  update: (id: number, data: Partial<Experience>) => api.put<Experience>(`/experience/${id}`, data).then(res => res.data),
  delete: (id: number) => api.delete(`/experience/${id}`).then(res => res.data),
}

export const educationApi = {
  getAll: () => api.get<Education[]>('/education').then(res => res.data),
  create: (data: Omit<Education, 'id'>) => api.post<Education>('/education', data).then(res => res.data),
  update: (id: number, data: Partial<Education>) => api.put<Education>(`/education/${id}`, data).then(res => res.data),
  delete: (id: number) => api.delete(`/education/${id}`).then(res => res.data),
}

export const certificationsApi = {
  getAll: () => api.get<Certification[]>('/certifications').then(res => res.data),
  create: (data: Omit<Certification, 'id'>) => api.post<Certification>('/certifications', data).then(res => res.data),
  update: (id: number, data: Partial<Certification>) => api.put<Certification>(`/certifications/${id}`, data).then(res => res.data),
  delete: (id: number) => api.delete(`/certifications/${id}`).then(res => res.data),
}

export const contactApi = {
  send: (data: { name: string; email: string; subject?: string; message: string }) =>
    api.post('/contact', data).then(res => res.data),
  getAll: (params?: { page?: number; limit?: number; status?: string }) =>
    api.get('/contact', { params }).then(res => res.data),
  markAsRead: (id: number) => api.put(`/contact/${id}/read`).then(res => res.data),
  delete: (id: number) => api.delete(`/contact/${id}`).then(res => res.data),
}

export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ token: string; user: any }>('/auth/login', { email, password }).then(res => res.data),
  verify: () => api.get('/auth/verify').then(res => res.data),
  changePassword: (currentPassword: string, newPassword: string) =>
    api.put('/auth/change-password', { currentPassword, newPassword }).then(res => res.data),
}

export const statsApi = {
  getPublic: () => api.get<Stats>('/stats/public').then(res => res.data),
  getDashboard: () => api.get('/admin/dashboard').then(res => res.data),
}

export default api