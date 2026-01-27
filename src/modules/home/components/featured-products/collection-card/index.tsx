"use client"

import { HttpTypes } from "@medusajs/types"
import { Heading } from "@medusajs/ui"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CollectionCard({
    collection,
    index = 0,
}: {
    collection: HttpTypes.StoreCollection
    index?: number
}) {
    const collectionImage = collection.metadata?.image as string | undefined
    const title = (collection.title as string) || "Colección"

    return (
        <LocalizedClientLink
            href={`/collections/${collection.handle}`}
            className="relative group block h-[350px] md:h-[450px] overflow-hidden bg-zinc-900"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                {collectionImage ? (
                    <Image
                        src={collectionImage}
                        alt={title}
                        fill
                        priority={index < 4}
                        className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 20vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950" />
                )}
                {/* Elegant persistent overlay for focus */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
            </div>

            {/* Content Container - Centered UX */}
            <div className="relative z-10 h-full flex items-center justify-center p-6 md:p-8 text-center">
                <div className="flex flex-col items-center">
                    <Heading
                        level="h3"
                        className="text-xl md:text-2xl lg:text-3xl font-black text-white uppercase tracking-widest leading-none drop-shadow-xl"
                    >
                        {title}
                    </Heading>

                    {/* Subtle underline indicator on hover */}
                    <div className="h-0.5 w-0 bg-white/80 group-hover:w-full transition-all duration-500 mt-4 shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                </div>
            </div>

            {/* Subtle gloss effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-white/5 to-transparent transition-opacity duration-700 pointer-events-none" />
        </LocalizedClientLink>
    )
}
