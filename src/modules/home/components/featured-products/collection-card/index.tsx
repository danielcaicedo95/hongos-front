"use client"

import { HttpTypes } from "@medusajs/types"
import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CollectionCard({
    collection,
}: {
    collection: HttpTypes.StoreCollection
}) {
    // Obtenemos la imagen de la colección (puede venir del metadata o de products)
    const collectionImage = collection.metadata?.image as string | undefined
    const title = (collection.title as string) || "Colección"
    const description = collection.metadata?.description as string | undefined

    return (
        <LocalizedClientLink
            href={`/collections/${collection.handle}`}
            className="relative group block h-[400px] md:h-[500px] overflow-hidden rounded-lg"
        >
            {/* Imagen de fondo */}
            <div className="absolute inset-0 z-0">
                {collectionImage ? (
                    <Image
                        src={collectionImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-800 to-amber-950" />
                )}
                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
            </div>

            {/* Contenido */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-6 md:p-8">
                {/* Título H3 */}
                <Heading
                    level="h3"
                    className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 uppercase tracking-wider"
                >
                    {title}
                </Heading>

                {/* Descripción si existe */}

                {description && (
                    <p className="text-sm md:text-base text-gray-200 mb-4 md:mb-6 max-w-md font-light">
                        {description}
                    </p>
                )}

                {/* Botón CTA */}
                <Button
                    variant="secondary"
                    className="bg-white/10 backdrop-blur-sm text-white border-white/50 hover:bg-white hover:text-gray-900 transition-all duration-300 px-6 md:px-8 py-2 md:py-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0"
                >
                    SABER MÁS →
                </Button>
            </div>
        </LocalizedClientLink>
    )
}
