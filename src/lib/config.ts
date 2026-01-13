import Medusa from "@medusajs/js-sdk"

// Defaults to standard port for Medusa server
const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY && process.env.NODE_ENV === "production") {
  console.error("[Medusa Config] CRITICAL: NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY is not defined in production!")
}

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: PUBLISHABLE_KEY,
  auth: {
    type: "session",
  },
  // Override default headers to use x-publishable-api-key instead of x-publishable-key
  fetchOptions: {
    headers: {
      "x-publishable-api-key": PUBLISHABLE_KEY || "",
    },
  },
})