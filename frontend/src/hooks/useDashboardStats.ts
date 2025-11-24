import { useQuery } from 'react-query'
import { projectsApi, contactApi } from '@/services/api'

export const useDashboardStats = () => {
  const { data: projects = [] } = useQuery('projects', () => projectsApi.getAll())
  const { data: messagesData } = useQuery('messages', () => contactApi.getAll())

  const messages = messagesData?.messages || []
  const unreadMessages = messages.filter((msg: any) => msg.status === 'unread').length

  return {
    projectsCount: (projects as any[]).length,
    messagesCount: messages.length,
    unreadMessages,
    featuredProjects: (projects as any[]).filter((p: any) => p.featured).length
  }
}