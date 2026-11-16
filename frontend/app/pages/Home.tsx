import { Link } from 'react-router'
import photo from '../assets/marissa.webp'
import { cn } from 'cn'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  return (
    <div className="mx-auto grid max-w-[1120px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-16 px-8 pt-[88px] pb-[104px]">
      <div className="flex flex-col items-start gap-[22px]">
        <p className="font-mono text-[15px] text-zinc-500">print('Hello, World!')</p>

        <h1 className="font-serif text-[clamp(60px,9vw,104px)] leading-[0.92] tracking-[-0.01em]">
          Marissa <span className="text-zinc-500">Tong</span>
        </h1>

        <Badge variant="outline" className="h-6 gap-2 px-3.5 font-mono">
          <span className="size-[7px] rounded-full bg-green-600" />
          Open to work
        </Badge>

        <p className="max-w-[460px] text-lg leading-relaxed text-zinc-500">
          Mid-level software engineer. Outside of work, you'll find me cooking, playing volleyball,
          or hanging out with my two cats, Kuma and Bean (you might spot them around the site).
        </p>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/contact" className={buttonVariants({ size: 'md' })}>
            Get in touch →
          </Link>
          <a
            href="/Marissa_Tong_Resume_2026.pdf"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ size: 'md', variant: 'link' }),
              'px-3 text-zinc-500 underline underline-offset-4 hover:text-zinc-950',
            )}
          >
            Résumé (PDF)
          </a>
        </div>
      </div>

      <img
        src={photo}
        alt="Marissa Tong"
        className="aspect-[4/5] w-full rounded-2xl object-cover"
      />
    </div>
  )
}
