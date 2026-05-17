import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Enter your name.')
    .max(120, 'Keep your name under 120 characters.'),
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email.')
    .email('Enter a valid email address.')
    .max(254, 'Keep your email under 254 characters.'),
  message: z
    .string()
    .trim()
    .min(1, 'Enter a message.')
    .max(5000, 'Keep your message under 5000 characters.'),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
