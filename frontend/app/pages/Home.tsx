import { Link } from 'react-router'
import photo from '../assets/marissa.webp'
import { cn } from 'cn'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Laptop, MapPin } from 'lucide-react'

const tags = [
  { label: 'Open to work', dot: true },
  { label: 'Bay Area', icon: MapPin },
  { label: 'Remote · Hybrid', icon: Laptop },
]

export default function Home() {
  return (
    <div className="mx-auto grid max-w-[1120px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-16 px-8 pt-[88px] pb-[104px]">
      <div className="flex flex-col items-start gap-[22px]">
        <p className="font-mono text-[15px] text-muted-foreground">print('Hello, World!')</p>

        <h1 className="font-serif text-[clamp(60px,9vw,104px)] leading-[0.92] tracking-[-0.01em]">
          Marissa <span className="text-muted-foreground">Tong</span>
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          {tags.map(({ label, icon: Icon, dot }) => (
            <Badge key={label} variant="outline" className="h-6 gap-1.5 px-3.5 font-mono">
              {dot && <span className="size-[7px] rounded-full bg-green-600" />}
              {Icon && <Icon />}
              {label}
            </Badge>
          ))}
        </div>

        <p className="max-w-[460px] text-lg leading-relaxed text-muted-foreground">
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
              'px-3 text-muted-foreground underline underline-offset-4 hover:text-foreground',
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
