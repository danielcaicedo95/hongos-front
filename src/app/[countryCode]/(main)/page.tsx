import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import FeaturedProductsList from "@modules/home/components/featured-products-list"
import BenefitsCarousel from "@modules/home/components/benefits-carousel"
import CustomerReviews from "@modules/home/components/customer-reviews"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

// [!NUEVO] Agrega esta línea para evitar el caché y ver las colecciones al instante
export const dynamic = "force-dynamic"

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title, metadata",
  }).then(({ collections }) => ({
    collections: collections.filter((c) => c.handle !== "featured"),
  }))

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <FeaturedProducts collections={collections} region={region} />
      <CustomerReviews backgroundImage="/images/resenas/imagen-resena-home.jpg" />

      <FeaturedProductsList countryCode={countryCode} />
      <BenefitsCarousel />
    </>
  )
}
