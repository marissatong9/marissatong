import { useState, type FormEvent } from 'react'

type ContactFields = { name: string; email: string; message: string }
type ContactErrors = Partial<Record<keyof ContactFields, string>>

const EMPTY_FORM: ContactFields = { name: '', email: '', message: '' }
const EMAIL_PATTERN = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

function validate(form: ContactFields): ContactErrors {
  const errors: ContactErrors = {}
  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!form.email.trim()) errors.email = 'Email is required.'
  else if (!EMAIL_PATTERN.test(form.email)) errors.email = 'Enter a valid email address.'
  if (form.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.'
  return errors
}

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border px-3.5 text-[15px] focus:outline-2 focus:outline-offset-1 focus:outline-zinc-900 ${
    hasError ? 'border-red-600' : 'border-zinc-200'
  }`

export default function ContactForm() {
  const [form, setForm] = useState<ContactFields>(EMPTY_FORM)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [sent, setSent] = useState(false)

  function updateField(field: keyof ContactFields, value: string) {
    setForm({ ...form, [field]: value })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newErrors = validate(form)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    // TODO: send `form` to the API here. For now, pretend it worked.
    setSent(true)
    setForm(EMPTY_FORM)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3.5 py-16 text-center">
        <div className="flex size-[52px] items-center justify-center rounded-full bg-zinc-900 text-[22px] font-semibold text-zinc-50">
          ✓
        </div>
        <p className="font-serif text-3xl">Message sent</p>
        <p className="text-[15px] text-zinc-500">Thanks! I'll be in touch soon.</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="h-[38px] rounded-lg border border-zinc-200 px-[18px] text-sm font-medium hover:bg-zinc-100"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          placeholder="Jane Doe"
          value={form.name}
          onChange={(e) => updateField('name', e.target.value)}
          className={`h-11 ${inputClass(!!errors.name)}`}
        />
        {errors.name && <p className="text-[13px] text-red-600">{errors.name}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={(e) => updateField('email', e.target.value)}
          className={`h-11 ${inputClass(!!errors.email)}`}
        />
        {errors.email && <p className="text-[13px] text-red-600">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          placeholder="What would you like to talk about?"
          value={form.message}
          onChange={(e) => updateField('message', e.target.value)}
          className={`min-h-[130px] resize-y py-3 ${inputClass(!!errors.message)}`}
        />
        {errors.message && <p className="text-[13px] text-red-600">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="h-12 rounded-lg bg-zinc-900 text-[15px] font-medium text-zinc-50 hover:opacity-90"
      >
        Send message
      </button>
    </form>
  )
}
