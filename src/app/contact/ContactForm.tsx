'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { submitContactForm } from './actions'
import { contactFormSchema, type ContactFormValues } from './schema'
import { initialContactFormState, type ContactFormState } from './state'

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [serverState, setServerState] = useState<ContactFormState>(initialContactFormState)
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const pending = isPending || isSubmitting

  function applyServerErrors(nextState: ContactFormState) {
    if (!nextState.fieldErrors) {
      return
    }

    for (const [field, message] of Object.entries(nextState.fieldErrors)) {
      if (message) {
        setError(field as keyof ContactFormValues, {
          type: 'server',
          message,
        })
      }
    }
  }

  function onValidSubmit(values: ContactFormValues) {
    const formData = new FormData()
    formData.set('name', values.name)
    formData.set('email', values.email)
    formData.set('message', values.message)

    startTransition(async () => {
      const nextState = await submitContactForm(serverState, formData)

      setServerState(nextState)
      applyServerErrors(nextState)

      if (nextState.status === 'success') {
        reset()
      }
    })
  }

  return (
    <form className='contact-form' noValidate onSubmit={handleSubmit(onValidSubmit)}>
      <div className='form-field'>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          autoComplete='name'
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
        />
        {errors.name?.message ? (
          <p className='field-error' id='name-error'>
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className='form-field'>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          autoComplete='email'
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        {errors.email?.message ? (
          <p className='field-error' id='email-error'>
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className='form-field'>
        <label htmlFor='message'>Message</label>
        <textarea
          id='message'
          rows={7}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
        {errors.message?.message ? (
          <p className='field-error' id='message-error'>
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div className='form-actions'>
        <button type='submit' disabled={pending}>
          {pending ? 'Sending...' : 'Send message'}
        </button>
        {serverState.message ? (
          <p className={`form-status form-status-${serverState.status}`} aria-live='polite'>
            {serverState.message}
          </p>
        ) : null}
      </div>
    </form>
  )
}
