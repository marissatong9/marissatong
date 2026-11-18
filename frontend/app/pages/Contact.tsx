import grayCat from '../assets/gray-cat.svg'
import ContactForm from '../components/forms/ContactForm'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from 'cn'
import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const contactLinks = [
  { label: 'email', href: 'mailto:marissatong@gmail.com', text: 'marissatong@gmail.com' },
  { label: 'github', href: 'https://github.com/marissatong9', text: 'github.com/marissatong9' },
  {
    label: 'linkedin',
    href: 'https://linkedin.com/in/marissatong/',
    text: 'linkedin.com/in/marissatong',
  },
]

export default function Contact() {
  return (
    <div className="mx-auto grid max-w-[1120px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[72px] px-8 pt-[88px] pb-[104px]">
      <div className="flex flex-col items-start gap-[22px]">
        <h1 className="font-serif text-[clamp(56px,8vw,88px)] leading-[0.98]">
          Let's <span className="text-muted-foreground">talk.</span>
        </h1>
        <p className="max-w-[420px] text-lg leading-relaxed text-muted-foreground">
          Let's connect! Currently open to mid-level engineering roles.
        </p>
        <Separator className="max-w-[420px]" />
        <dl className="flex flex-col gap-3.5 text-[15px] font-medium">
          {contactLinks.map((link) => (
            <div key={link.label} className="flex gap-4">
              <dt className="w-20 font-mono text-[13px] font-normal text-muted-foreground">
                {link.label}
              </dt>
              <dd>
                <a
                  href={link.href}
                  {...(link.href.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}
                  className={cn(buttonVariants({ variant: 'link' }), 'h-auto p-0 text-[15px]')}
                >
                  {link.text}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* relative: lets the cat be positioned against this box */}
      <div className="relative self-start">
        <Tooltip>
          <TooltipTrigger
            render={
              <img src={grayCat} alt="Kuma" className="absolute -top-[68px] right-9 z-10 size-20" />
            }
          />
          <TooltipContent>Kuma</TooltipContent>
        </Tooltip>
        <Card className="rounded-2xl shadow-sm [--card-spacing:--spacing(8)]">
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
