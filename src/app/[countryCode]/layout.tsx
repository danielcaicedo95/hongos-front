import RegionGuard from "./_components/RegionGuard"

export default function CountryLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { countryCode: string }
}) {
    return (
        <RegionGuard countryCode={params.countryCode}>
            {children}
        </RegionGuard>
    )
}
