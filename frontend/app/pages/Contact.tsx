import grayCat from '../assets/gray-cat.svg'
import ContactForm from '../components/forms/ContactForm'

export default function Contact() {
  return (
    <div className="mx-auto grid max-w-[1120px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[72px] px-8 pt-[88px] pb-[104px]">
      <div className="flex flex-col items-start gap-[22px]">
        <h1 className="font-serif text-[clamp(56px,8vw,88px)] leading-[0.98]">
          Let's <span className="text-zinc-500">talk.</span>
        </h1>
        <p className="max-w-[420px] text-lg leading-relaxed text-zinc-500">
          Let's connect! Currently open to mid-level engineering roles.
        </p>
        <div className="h-px w-full max-w-[420px] bg-zinc-200" />
        <dl className="flex flex-col gap-3.5 text-[15px] font-medium">
          <div className="flex gap-4">
            <dt className="w-20 font-mono text-[13px] font-normal text-zinc-500">email</dt>
            <dd>marissatong@gmail.com</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-20 font-mono text-[13px] font-normal text-zinc-500">github</dt>
            <dd>github.com/marissatong9</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-20 font-mono text-[13px] font-normal text-zinc-500">linkedin</dt>
            <dd>linkedin.com/in/marissatong/</dd>
          </div>
        </dl>
      </div>

      {/* relative: lets the cat be positioned against this box */}
      <div className="relative self-start">
        <img src={grayCat} alt="" className="absolute -top-[68px] right-9 z-10 size-20" />
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
