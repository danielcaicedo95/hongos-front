import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

const BACKEND_URL =
  process.env.MEDUSA_BACKEND_URL ||
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL

const PUBLISHABLE_API_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  icons: {
    icon: "/images/Logo-origen.png",
  },
}

export default async function RootLayout(props: {
  children: React.ReactNode
  params: { countryCode: string }
}) {
  const { countryCode } = props.params

  // 🟢 1️⃣ Consultar regiones desde SERVER (seguro)
  let validCountries: string[] = []

  try {
    const res = await fetch(`${BACKEND_URL}/store/regions`, {
      headers: {
        "x-publishable-api-key": PUBLISHABLE_API_KEY!,
      },
      cache: "no-store",
    })

    if (res.ok) {
      const { regions } = await res.json()

      validCountries = regions.flatMap((r: any) =>
        r.countries.map((c: any) => c.iso_2)
      )
    }
  } catch (error) {
    console.error("Error loading regions from Medusa", error)
  }

  // 🟡 2️⃣ Validación suave (NO rompe el sitio)
  if (validCountries.length && !validCountries.includes(countryCode)) {
    console.warn(`Invalid country code: ${countryCode}`)
    // No hacemos redirect aquí para no romper navegación
  }

  return (
    <html lang="es" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
