'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Script from 'next/script'
import { useEffect, useId, useState, useTransition, type BaseSyntheticEvent } from 'react'
import { useForm } from 'react-hook-form'

import { submitContactForm } from './actions'
import { contactFormSchema, type ContactFormValues } from './schema'
import { initialContactFormState, type ContactFormState } from './state'

const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_CONTACT_TURNSTILE_SITE_KEY ?? ''

type TurnstileOptions = {
  sitekey: string
  theme?: 'auto' | 'light' | 'dark'
  size?: 'normal' | 'compact' | 'flexible'
  callback?: (token: string) => void
  'error-callback'?: () => void
  'expired-callback'?: () => void
}

declare global {
  interface Window {
    turnstile?: {
      remove: (widgetId: string) => void
      render: (container: HTMLElement, options: TurnstileOptions) => string
      reset: (widgetId: string) => void
    }
  }
}

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [serverState, setServerState] = useState<ContactFormState>(initialContactFormState)
  const [turnstileScriptFailed, setTurnstileScriptFailed] = useState(false)
  const [turnstileScriptReady, setTurnstileScriptReady] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const turnstileContainerId = useId()
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

  const turnstileEnabled = Boolean(TURNSTILE_SITE_KEY)
  const pending = isPending || isSubmitting
  const submitDisabled =
    pending || !turnstileEnabled || turnstileScriptFailed || (turnstileEnabled && !turnstileToken)

  useEffect(() => {
    const turnstileContainer = document.getElementById(turnstileContainerId)

    if (
      !turnstileEnabled ||
      !turnstileScriptReady ||
      !turnstileContainer ||
      !window.turnstile ||
      turnstileContainer.dataset.turnstileWidgetId
    ) {
      return
    }

    const widgetId = window.turnstile.render(turnstileContainer, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: 'auto',
      size: 'flexible',
      callback: setTurnstileToken,
      'error-callback': () => setTurnstileToken(''),
      'expired-callback': () => setTurnstileToken(''),
    })

    turnstileContainer.dataset.turnstileWidgetId = widgetId

    return () => {
      if (window.turnstile) {
        window.turnstile.remove(widgetId)
      }

      delete turnstileContainer.dataset.turnstileWidgetId
    }
  }, [turnstileContainerId, turnstileEnabled, turnstileScriptReady])

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

  function resetTurnstile() {
    const widgetId = document.getElementById(turnstileContainerId)?.dataset.turnstileWidgetId

    setTurnstileToken('')

    if (widgetId && window.turnstile) {
      window.turnstile.reset(widgetId)
    }
  }

  function onValidSubmit(values: ContactFormValues, event?: BaseSyntheticEvent) {
    const form = event?.currentTarget
    const formElements = form instanceof HTMLFormElement ? new FormData(form) : null
    const company = formElements?.get('company')
    const formData = new FormData()

    formData.set('name', values.name)
    formData.set('email', values.email)
    formData.set('message', values.message)
    formData.set('company', typeof company === 'string' ? company : '')
    formData.set('cf-turnstile-response', turnstileToken)

    startTransition(async () => {
      const nextState = await submitContactForm(serverState, formData)

      setServerState(nextState)
      applyServerErrors(nextState)
      resetTurnstile()

      if (nextState.status === 'success') {
        reset()
      }
    })
  }

  return (
    <form className='contact-form' noValidate onSubmit={handleSubmit(onValidSubmit)}>
      {turnstileEnabled ? (
        <Script
          src={TURNSTILE_SCRIPT_URL}
          strategy='afterInteractive'
          onError={() => setTurnstileScriptFailed(true)}
          onReady={() => setTurnstileScriptReady(true)}
        />
      ) : null}

      <div className='spam-protection-field' aria-hidden='true'>
        <label htmlFor='company'>Company</label>
        <input id='company' name='company' tabIndex={-1} autoComplete='off' />
      </div>

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

      <div className='turnstile-field'>
        {turnstileEnabled ? <div id={turnstileContainerId} /> : null}
        {!turnstileEnabled ? (
          <p className='field-error'>
            The contact form is not configured yet. Please email me directly.
          </p>
        ) : null}
        {turnstileScriptFailed ? (
          <p className='field-error'>Verification could not load. Please email me directly.</p>
        ) : null}
      </div>

      <div className='form-actions'>
        <button type='submit' disabled={submitDisabled}>
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
