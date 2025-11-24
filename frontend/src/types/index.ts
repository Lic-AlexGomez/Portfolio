export interface Profile {
  id: number
  name: string
  title: string
  summary: string
  bio: string
  photo?: string
  cv_file?: string
  phone?: string
  email: string
  linkedin?: string
  github?: string
  years_experience: number
  location?: string
  available: boolean
}

export interface Skill {
  id: number
  name: string
  category: string
  level: number
  icon?: string
  is_main_stack: boolean
  active: boolean
}

export interface Technology {
  id: number
  name: string
  category: string
  icon?: string
  color?: string
  active: boolean
}

export interface Project {
  id: number
  title: string
  description: string
  long_description?: string
  image?: string
  demo_url?: string
  github_url?: string
  category: string
  status: 'completed' | 'in-progress' | 'planned'
  featured: boolean
  active: boolean
  start_date?: string
  end_date?: string
  client?: string
  technologies?: string[]
  images?: ProjectImage[]
}

export interface ProjectImage {
  id: number
  project_id: number
  image_path: string
  alt_text?: string
  order_index: number
}

export interface Experience {
  id: number
  company: string
  position: string
  description?: string
  start_date: string
  end_date?: string
  current: boolean
  location?: string
  active: boolean
}

export interface Education {
  id: number
  institution: string
  degree: string
  field?: string
  start_date: string
  end_date?: string
  current: boolean
  description?: string
  active: boolean
}

export interface Certification {
  id: number
  name: string
  issuer: string
  issue_date: string
  expiry_date?: string
  credential_id?: string
  credential_url?: string
  image?: string
  active: boolean
}

export interface ContactMessage {
  id: number
  name: string
  email: string
  subject?: string
  message: string
  read_status: boolean
  replied: boolean
  created_at: string
}

export interface Stats {
  total_projects: number
  total_skills: number
  total_messages: number
  total_views: number
  unread_messages: number
}