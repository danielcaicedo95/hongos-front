import Medusa from "@medusajs/js-sdk"

// Defaults to standard port for Medusa server
const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

// DEBUG: Log environment configuration during build
console.log('[BUILD DEBUG] Medusa SDK Environment Check:')
console.log('  NODE_ENV:', process.env.NODE_ENV)
console.log('  NEXT_PUBLIC_MEDUSA_BACKEND_URL exists:', !!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL)
console.log('  NEXT_PUBLIC_MEDUSA_BACKEND_URL value:', MEDUSA_BACKEND_URL)
console.log('  NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY exists:', !!PUBLISHABLE_KEY)
console.log('  NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY prefix:', PUBLISHABLE_KEY?.substring(0, 15) + '...')
console.log('  Is server-side:', typeof window === 'undefined')

if (!PUBLISHABLE_KEY && process.env.NODE_ENV === "production") {
  console.error("[Medusa Config] CRITICAL: NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY is not defined in production!")
}

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: PUBLISHABLE_KEY,
})

console.log('[BUILD DEBUG] Medusa SDK Initialized:', {
  baseUrl: MEDUSA_BACKEND_URL,
  hasPublishableKey: !!PUBLISHABLE_KEY,
  keyPrefix: PUBLISHABLE_KEY?.substring(0, 10)
})