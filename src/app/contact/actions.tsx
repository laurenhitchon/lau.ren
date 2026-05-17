'use server'

import { render } from '@react-email/render'
import { Resend } from 'resend'

import { ensureContactSubmissionsTable, getDb } from '@/lib/db'
import { contactSubmissions } from '@/lib/db/schema'

import { ContactEmail } from './ContactEmail'
import { contactFormSchema } from './schema'
import type { ContactFormState } from './state'

function validateContactForm(formData: FormData) {
  const parsed = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (parsed.success) {
    return {
      data: parsed.data,
      fieldErrors: {},
      valid: true,
    }
  }

  return {
    data: null,
    fieldErrors: Object.fromEntries(
      Object.entries(parsed.error.flatten().fieldErrors).map(([key, value]) => [key, value?.[0]]),
    ),
    valid: false,
  }
}

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const validation = validateContactForm(formData)

  if (!validation.valid || !validation.data) {
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      fieldErrors: validation.fieldErrors,
    }
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_EMAIL_FROM
  const to = process.env.CONTACT_EMAIL_TO ?? 'lauren@hitchon.me'

  if (!resendApiKey || !from) {
    return {
      status: 'error',
      message:
        'The contact form is not configured yet. Missing RESEND_API_KEY or CONTACT_EMAIL_FROM.',
    }
  }

  try {
    const id = crypto.randomUUID()
    const db = getDb()

    await ensureContactSubmissionsTable()
    await db.insert(contactSubmissions).values({
      id,
      name: validation.data.name,
      email: validation.data.email,
      message: validation.data.message,
    })

    const emailHtml = await render(<ContactEmail {...validation.data} />)
    const emailText = [
      `Name: ${validation.data.name}`,
      `Email: ${validation.data.email}`,
      '',
      validation.data.message,
    ].join('\n')

    const resend = new Resend(resendApiKey)

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: validation.data.email,
      subject: `Website enquiry from ${validation.data.name}`,
      html: emailHtml,
      text: emailText,
    })

    if (error) {
      throw new Error(error.message)
    }

    return {
      status: 'success',
      message: 'Thanks, your message has been sent.',
    }
  } catch (error) {
    console.error('Contact form submission failed', error)

    return {
      status: 'error',
      message:
        'Something went wrong sending your message. Please email me directly at lauren@hitchon.me.',
    }
  }
}
