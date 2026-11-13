import { Link, NavLink } from 'react-router'

const links = [
  { to: '/', label: 'Home' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span
            className="flex size-[30px] items-center justify-center rounded-[7px] bg-zinc-900 font-mono text-[13px] font-medium 
text-zinc-50"
          >
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
                `rounded-[7px] px-3.5 py-2.5 text-sm font-medium ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-950'
                    : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="/Marissa_Tong_Resume_2026.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-[7px] px-3.5 py-2.5 text-sm font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950"
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  )
}
