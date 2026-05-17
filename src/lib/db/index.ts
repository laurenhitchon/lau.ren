import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

import { contactSubmissions } from './schema'

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured.')
  }

  return databaseUrl
}

function getSql() {
  return neon(getDatabaseUrl())
}

export function getDb() {
  return drizzle(getSql(), { schema: { contactSubmissions } })
}

export async function ensureContactSubmissionsTable() {
  const sql = getSql()

  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id text PRIMARY KEY,
      name text NOT NULL,
      email text NOT NULL,
      message text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `
}
