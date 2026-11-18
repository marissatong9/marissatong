import { Link, NavLink } from 'react-router'
import { cn } from 'cn'
import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import GitHubIcon from './icons/GitHubIcon'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-[30px] items-center justify-center rounded-[7px] bg-primary font-mono text-[13px] font-medium text-primary-foreground">
            MT
          </span>
          <span className="font-serif text-xl">Marissa Tong</span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                cn(
                  buttonVariants({ variant: 'ghost', size: 'nav' }),
                  isActive && 'bg-muted text-foreground',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="/Marissa_Tong_Resume_2026.pdf"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: 'ghost', size: 'nav' })}
          >
            Résumé
          </a>
          <Tooltip>
            <TooltipTrigger
              render={
                <a
                  href="https://github.com/marissatong9/marissatong"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View this site's code on GitHub"
                  className={buttonVariants({ variant: 'ghost', size: 'nav' })}
                />
              }
            >
              <GitHubIcon />
            </TooltipTrigger>
            <TooltipContent>View code on GitHub</TooltipContent>
          </Tooltip>
        </nav>
      </div>
    </header>
  )
}
