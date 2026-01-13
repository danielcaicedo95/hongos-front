import { getLocaleHeader } from "@lib/util/get-locale-header"
import Medusa, { FetchArgs, FetchInput } from "@medusajs/js-sdk"

// Defaults to standard port for Medusa server
const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})

const originalFetch = sdk.client.fetch.bind(sdk.client)

sdk.client.fetch = async <T>(
  input: FetchInput,
  init?: FetchArgs
): Promise<T> => {
  const headers = (init?.headers as Record<string, string>) || {}

  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

  // Log presence of key during build (SSG) phase to debug Vercel issues
  if (typeof window === "undefined" && !publishableKey) {
    console.warn("[Medusa SDK] NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY is not defined during server-side execution.")
  }

  if (publishableKey) {
    headers["x-publishable-key"] = publishableKey
  }

  try {
    const localeHeader = await getLocaleHeader()
    if (localeHeader && localeHeader["x-medusa-locale"]) {
      headers["x-medusa-locale"] = localeHeader["x-medusa-locale"] as string
    }
  } catch { }

  return originalFetch(input, {
    ...init,
    headers,
  })
}