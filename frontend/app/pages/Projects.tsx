import { useEffect, useRef, useState } from 'react'
import { cn } from 'cn'
import { getProjects } from '@/api/projects'
import blackCat from '@/assets/black-cat.svg'
import grayCat from '@/assets/gray-cat.svg'
import { projectCovers } from '@/assets/projects'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { FOCUS_LABELS, ROLE_LABELS, TYPE_LABELS, type Project } from '@/types/project'

// Displays project number
const projectNumber = (index: number) => String(index + 1).padStart(2, '0')
const projectId = (index: number) => `project-${index + 1}`

// Displays project role, focus, type and year
function metaLine(project: Project) {
  return [
    project.role && ROLE_LABELS[project.role],
    project.focus && FOCUS_LABELS[project.focus],
    project.type && TYPE_LABELS[project.type],
    project.year,
  ]
    .filter(Boolean)
    .join(' · ')
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    // Ignore the response if the visitor leaves the page before it arrives
    let ignore = false

    getProjects()
      .then((data) => {
        if (!ignore) setProjects(data)
      })
      .catch(() => {
        if (!ignore) setFailed(true)
      })

    return () => {
      ignore = true
    }
  }, [])

  if (failed) return <CheckBackLater status="couldn't load projects" />
  // While loading, show nothing (the request is usually quick)
  if (!projects) return null
  if (projects.length === 0) return <CheckBackLater />

  return (
    <div className="mx-auto max-w-[1120px] px-8 pt-9 pb-24">
      <h1 className="mb-7 font-serif text-[clamp(36px,5vw,48px)] leading-none">Projects</h1>

      <div className="flex items-start gap-16">
        <Contents projects={projects} />

        <div className="flex max-w-[720px] min-w-0 flex-1 flex-col gap-20">
          {projects.map((project, index) => (
            <div key={project.title} className="flex flex-col gap-20">
              <ProjectArticle project={project} index={index} />
              {index < projects.length - 1 && (
                <CatDivider cat={index % 2 === 0 ? 'black' : 'gray'} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Shared style for the write-up paragraphs (context, problem, approach, outcome)
const BODY_TEXT = 'text-[17px] leading-[1.75] text-muted-foreground'

function ProjectArticle({ project, index }: { project: Project; index: number }) {
  const sections = [
    { heading: 'The problem', text: project.problem },
    { heading: 'The approach', text: project.approach },
    { heading: 'Outcome', text: project.outcome },
  ].filter((section) => section.text)
  const cover = projectCovers[project.title]

  return (
    // scroll-mt: leaves room for the sticky navbar when jumping here from Contents
    <article id={projectId(index)} className="flex scroll-mt-24 flex-col gap-5">
      {cover && (
        <img
          src={cover}
          alt={`${project.title} cover`}
          className="aspect-video w-full rounded-[14px] border border-border object-cover"
        />
      )}
      <p className="font-mono text-[13px] font-medium text-muted-foreground">
        {projectNumber(index)} · {metaLine(project)}
      </p>
      <h2 className="font-serif text-[44px] leading-[1.05]">{project.title}</h2>
      <p className="text-[19px] leading-normal font-medium">{project.description}</p>

      {!!project.skills?.length && (
        <div className="flex flex-wrap gap-1.5">
          {project.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="h-6 px-3 font-mono">
              {skill}
            </Badge>
          ))}
        </div>
      )}

      <Separator className="my-2" />

      {project.context && <p className={BODY_TEXT}>{project.context}</p>}

      {sections.map((section) => (
        <section key={section.heading} className="flex flex-col gap-5">
          <h3 className="mt-3 font-serif text-[28px] leading-tight">{section.heading}</h3>
          <p className={BODY_TEXT}>{section.text}</p>
        </section>
      ))}
    </article>
  )
}

// Sticky table of contents. Highlights the project in view, and a fish swims down the
// line as you scroll (it wiggles in the direction you scroll).
function Contents({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [tilt, setTilt] = useState(0)
  const lastScrollY = useRef(0)

  useEffect(() => {
    let resetTilt: ReturnType<typeof setTimeout>

    function onScroll() {
      let current = 0
      projects.forEach((_, index) => {
        const article = document.getElementById(projectId(index))
        if (article && article.getBoundingClientRect().top <= 140) current = index
      })

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollDelta = window.scrollY - lastScrollY.current
      lastScrollY.current = window.scrollY

      setActive(current)
      setProgress(maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0)
      setTilt(Math.max(-28, Math.min(28, -scrollDelta * 0.6)))
      clearTimeout(resetTilt)
      resetTilt = setTimeout(() => setTilt(0), 90)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(resetTilt)
    }
  }, [projects])

  function scrollToProject(index: number) {
    document.getElementById(projectId(index))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    // Hidden on small screens, where there's no room for a side column
    <aside className="sticky top-24 hidden w-[220px] shrink-0 flex-col gap-3.5 md:flex">
      <p className="font-mono text-[11px] font-medium tracking-[0.08em] text-muted-foreground">
        CONTENTS
      </p>

      <div className="relative flex flex-col border-l border-border">
        {/* progress line */}
        <div
          className="absolute top-0 -left-px w-px bg-foreground"
          style={{ height: `${progress * 100}%` }}
        />
        {/* fish */}
        <svg
          aria-hidden="true"
          width="16"
          height="24"
          viewBox="0 4 16 24"
          className="pointer-events-none absolute -left-[9px] z-10 origin-top transition-transform duration-700 ease-[cubic-bezier(.3,1.7,.5,1)]"
          style={{
            top: `calc(${progress * 100}% - ${progress * 24}px)`,
            transform: `rotate(${tilt}deg)`,
          }}
        >
          <path d="M8 4 C14 8 14 17 8 21 C2 17 2 8 8 4Z" fill="#e8806b" />
          <path d="M8 20 L3 27 L8 24.5 L13 27Z" fill="#e8806b" />
          <circle cx="8" cy="10" r="1.1" fill="#111" />
          <path d="M6 14 q2 1.5 4 0" stroke="#b9503c" strokeWidth="0.8" fill="none" />
        </svg>

        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            onClick={() => scrollToProject(index)}
            className={cn(
              'flex items-center gap-2.5 py-2 pl-4 text-left text-sm leading-snug font-medium text-muted-foreground transition-colors hover:text-foreground',
              active === index && 'text-foreground',
            )}
          >
            <span className="font-mono text-xs text-muted-foreground">{projectNumber(index)}</span>
            {project.title}
          </button>
        ))}
      </div>
    </aside>
  )
}

function CatDivider({ cat }: { cat: 'black' | 'gray' }) {
  return (
    <div className="flex items-center gap-6" aria-hidden="true">
      {/* flex-1: the two lines share the space on either side of the cat */}
      <Separator className="flex-1" />
      <img
        src={cat === 'black' ? blackCat : grayCat}
        alt=""
        className={cn('size-16', cat === 'black' && 'dark:drop-shadow-[0_0_1px_white]')}
      />
      <Separator className="flex-1" />
    </div>
  )
}

// Shown if the request fails or when there are no projects yet
function CheckBackLater({ status }: { status?: string }) {
  return (
    <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-6 px-8 pt-[120px] pb-[140px] text-center">
      <Tooltip>
        <TooltipTrigger
          render={
            <img
              src={blackCat}
              alt="Bean"
              className="size-24 animate-bounce dark:drop-shadow-[0_0_1px_white]"
            />
          }
        />
        <TooltipContent>Bean</TooltipContent>
      </Tooltip>

      {status && <p className="font-mono text-[15px] text-muted-foreground">{status}</p>}

      <h1 className="font-serif text-[clamp(48px,7vw,80px)] leading-[0.98]">
        Check back <span className="text-muted-foreground">later.</span>
      </h1>

      <p className="max-w-[420px] text-lg leading-relaxed text-muted-foreground">
        Bean is still napping on the keyboard. Check back later to see what I've been building.
      </p>
    </div>
  )
}
