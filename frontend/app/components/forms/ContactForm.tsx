import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

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

export default function ContactForm() {
  const [form, setForm] = useState<ContactFields>(EMPTY_FORM)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function updateField(field: keyof ContactFields, value: string) {
    setForm({ ...form, [field]: value })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newErrors = validate(form)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) throw new Error(`Request failed: ${response.status}`)

      setSent(true)
      setForm(EMPTY_FORM)
    } catch {
      setSubmitError("Couldn't send your message. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3.5 py-16 text-center">
        <div className="flex size-[52px] items-center justify-center rounded-full bg-primary text-[22px] font-semibold text-primary-foreground">
          ✓
        </div>
        <p className="font-serif text-3xl">Message sent</p>
        <p className="text-[15px] text-muted-foreground">Thanks! I'll be in touch soon.</p>
        <Button size="sm" variant="outline" onClick={() => setSent(false)}>
          Send another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Field>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Input
          id="name"
          placeholder="Jane Doe"
          value={form.name}
          onChange={(e) => updateField('name', e.target.value)}
          aria-invalid={!!errors.name}
        />
        {errors.name && <FieldError>{errors.name}</FieldError>}
      </Field>

      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={(e) => updateField('email', e.target.value)}
          aria-invalid={!!errors.email}
        />
        {errors.email && <FieldError>{errors.email}</FieldError>}
      </Field>

      <Field>
        <FieldLabel htmlFor="message">Message</FieldLabel>
        <Textarea
          id="message"
          placeholder="What would you like to talk about?"
          value={form.message}
          onChange={(e) => updateField('message', e.target.value)}
          aria-invalid={!!errors.message}
          className="resize-y"
        />
        {errors.message && <FieldError>{errors.message}</FieldError>}
      </Field>

      {submitError && <FieldError>{submitError}</FieldError>}
      <Button size="lg" type="submit" disabled={submitting}>
        {submitting ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  )
}
