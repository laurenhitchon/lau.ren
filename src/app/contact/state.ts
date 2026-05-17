export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
  fieldErrors?: {
    name?: string
    email?: string
    message?: string
  }
}

export const initialContactFormState: ContactFormState = {
  status: 'idle',
  message: '',
}
