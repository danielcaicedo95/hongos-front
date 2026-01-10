import { HttpTypes } from "@medusajs/types"
import { Heading } from "@medusajs/ui"
import CollectionCard from "./collection-card"

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  return (
    <div className="w-full">
      {/* Header Section con SEO */}
      <div className="content-container text-center py-12">
        <Heading level="h2" className="text-3xl md:text-5xl font-serif mb-6 text-gray-900 leading-snug">
          Nuestras Colecciones de Hongos Funcionales
        </Heading>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Descubre nuestra selección premium de <strong>hongos medicinales</strong> y{" "}
          <strong>adaptógenos naturales</strong>. Desde el poderoso <em>Reishi</em> para la inmunidad,
          la <em>Melena de León</em> para función cognitiva y nootrópicos naturales, hasta el energizante{" "}
          <em>Cordyceps</em>. Cada producto contiene extractos de doble acción, 100% orgánicos
          y de espectro completo para maximizar los <strong>beneficios para tu salud</strong> y bienestar integral.
        </p>
      </div>

      {/* Grid de Colecciones - Diseño Responsivo */}
      <div className="content-container pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </div>
  )
}
