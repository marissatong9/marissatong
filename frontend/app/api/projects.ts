import type { Project } from '@/types/project'

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return response.json()
}
