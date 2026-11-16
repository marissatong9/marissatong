import blackCat from '../assets/black-cat.svg'
import grayCat from '../assets/gray-cat.svg'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export default function Footer() {
  return (
    <footer>
      <Separator />
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-8 py-6 font-mono text-[13px] text-zinc-500">
        <span>© {new Date().getFullYear()} Marissa Tong</span>
        <a
          href="https://github.com/marissatong9"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 hover:text-zinc-950"
        >
          <Tooltip>
            <TooltipTrigger render={<span />}>
              <img src={blackCat} alt="Bean" className="size-[30px]" />
            </TooltipTrigger>
            <TooltipContent>Bean</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<span />}>
              <img src={grayCat} alt="Kuma" className="size-[30px]" />
            </TooltipTrigger>
            <TooltipContent>Kuma</TooltipContent>
          </Tooltip>
          meow
        </a>
      </div>
    </footer>
  )
}
