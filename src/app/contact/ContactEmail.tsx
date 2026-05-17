import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

type ContactEmailProps = {
  name: string
  email: string
  message: string
}

export function ContactEmail({ name, email, message }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from {name}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>New website enquiry</Heading>
          <Section style={section}>
            <Text style={label}>Name</Text>
            <Text style={value}>{name}</Text>
          </Section>
          <Section style={section}>
            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>
          </Section>
          <Section style={section}>
            <Text style={label}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const body = {
  backgroundColor: '#f8f8f5',
  color: '#171716',
  fontFamily: 'Pelago, "Avenir Next", Avenir, "Segoe UI", Arial, sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '40px 24px',
  maxWidth: '620px',
}

const heading = {
  fontFamily: 'Livory, Georgia, "Times New Roman", serif',
  fontSize: '32px',
  fontWeight: '400',
  lineHeight: '1.1',
  margin: '0 0 32px',
}

const section = {
  borderTop: '1px solid #d8d5cb',
  padding: '18px 0',
}

const label = {
  color: '#6f6d67',
  fontSize: '12px',
  fontWeight: '700',
  letterSpacing: '0.12em',
  margin: '0 0 8px',
  textTransform: 'uppercase' as const,
}

const value = {
  fontSize: '17px',
  lineHeight: '1.5',
  margin: '0',
}

const messageText = {
  ...value,
  whiteSpace: 'pre-wrap' as const,
}
