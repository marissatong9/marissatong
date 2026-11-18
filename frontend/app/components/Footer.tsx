import blackCat from '../assets/black-cat.svg'
import grayCat from '../assets/gray-cat.svg'
import { cn } from 'cn'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import ThemeToggle from './ThemeToggle'

export default function Footer() {
  return (
    <footer>
      <Separator />
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-8 py-6 font-mono text-[13px] text-muted-foreground">
        <span>
          ©{new Date().getFullYear()} Marissa Tong · Designed by{' '}
          <a
            href="https://linkedin.com/in/kevin-cunanan/"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: 'link' }),
              'h-auto p-0 font-mono text-[13px] font-normal text-muted-foreground underline hover:text-foreground',
            )}
          >
            Kevin Cunanan
          </a>
        </span>
        {/* the kittens, with the light/dark toggle beside them */}
        <div className="flex items-center gap-1">
          <a
            href="https://github.com/marissatong9"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-foreground"
          >
            <Tooltip>
              <TooltipTrigger render={<span />}>
                <img
                  src={blackCat}
                  alt="Bean"
                  className="size-[30px] dark:drop-shadow-[0_0_1px_white]"
                />
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
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}
