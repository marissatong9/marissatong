// Matches ProjectResponseDTO in the backend
export type ProjectRole = 'SOLO' | 'LEAD' | 'CONTRIBUTOR'
export type ProjectFocus =
  'FULL_STACK' | 'BACKEND' | 'FRONTEND' | 'INFRASTRUCTURE' | 'DESIGN' | 'DATA'
export type ProjectType = 'PERSONAL' | 'WORK' | 'HACKATHON' | 'INTERNSHIP' | 'ACADEMIC'

export type Project = {
  title: string
  description: string
  context: string | null
  problem: string | null
  approach: string | null
  outcome: string | null
  year: number
  role: ProjectRole | null
  focus: ProjectFocus | null
  type: ProjectType | null
  skills: string[] | null
}

// Readable labels for the enum values the API sends
export const ROLE_LABELS: Record<ProjectRole, string> = {
  SOLO: 'Solo',
  LEAD: 'Lead engineer',
  CONTRIBUTOR: 'Contributor',
}

export const FOCUS_LABELS: Record<ProjectFocus, string> = {
  FULL_STACK: 'Full-stack',
  BACKEND: 'Backend',
  FRONTEND: 'Frontend',
  INFRASTRUCTURE: 'Infrastructure',
  DESIGN: 'Design',
  DATA: 'Data',
}

export const TYPE_LABELS: Record<ProjectType, string> = {
  PERSONAL: 'Personal',
  WORK: 'Work',
  HACKATHON: 'Hackathon',
  INTERNSHIP: 'Internship',
  ACADEMIC: 'Academic',
}
