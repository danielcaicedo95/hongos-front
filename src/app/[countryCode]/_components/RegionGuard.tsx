//src/app/[countryCode]/_components/RegionGuard.tsx

const BACKEND_URL =
    process.env.MEDUSA_BACKEND_URL ||
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL

const PUBLISHABLE_API_KEY =
    process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

export default async function RegionGuard({
    countryCode,
    children,
}: {
    countryCode: string
    children: React.ReactNode
}) {
    try {
        const res = await fetch(`${BACKEND_URL}/store/regions`, {
            headers: {
                "x-publishable-api-key": PUBLISHABLE_API_KEY!,
            },
            cache: "no-store",
        })

        if (!res.ok) {
            return <>{children}</>
        }

        const { regions } = await res.json()

        const validCountries = regions.flatMap((r: any) =>
            r.countries.map((c: any) => c.iso_2)
        )

        if (!validCountries.includes(countryCode)) {
            console.warn("Invalid country code:", countryCode)
        }

        return <>{children}</>
    } catch (error) {
        console.error("RegionGuard error:", error)
        return <>{children}</>
    }
}
