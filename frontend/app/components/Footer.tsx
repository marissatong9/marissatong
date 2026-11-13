import blackCat from '../assets/black-cat.svg'
import grayCat from '../assets/gray-cat.svg'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-8 py-6 font-mono text-[13px] text-zinc-500">
        <span>© {new Date().getFullYear()} Marissa Tong</span>
        <a
          href="https://github.com/marissatong9"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-zinc-950"
        >
          <img src={blackCat} alt="" className="size-[30px]" />
          <img src={grayCat} alt="" className="size-[30px]" />
          meow
        </a>
      </div>
    </footer>
  )
}
