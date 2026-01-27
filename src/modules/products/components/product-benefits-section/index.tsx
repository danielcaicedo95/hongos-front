"use client"

import React from "react"
import { Button } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import EasyCheckoutModal from "../product-actions/easy-checkout-modal"
import { useParams } from "next/navigation"
import { ProductBenefit } from "@lib/data/benefits"

const ProductBenefitsSection = ({
    benefits,
    product,
    region
}: {
    benefits: ProductBenefit[]
    product: HttpTypes.StoreProduct
    region: HttpTypes.StoreRegion
}) => {
    const [showModal, setShowModal] = React.useState(false)
    const countryCode = useParams().countryCode as string

    if (!benefits || benefits.length === 0) return null

    // Get the first available variant for the "Buy Now" action
    const defaultVariant = product.variants?.[0]

    return (
        <div className="bg-black py-24 sm:py-32 overflow-hidden">
            <EasyCheckoutModal
                isOpen={showModal}
                close={() => setShowModal(false)}
                product={product}
                variant={defaultVariant}
                countryCode={countryCode}
            />
            <div className="content-container">
                <div className="flex flex-col gap-y-16">
                    {benefits.map((benefit, index) => (
                        <div
                            key={benefit.id}
                            className={`relative flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Contenido de Texto */}
                            <div className="flex-1 z-10 space-y-6">
                                <div className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">
                                    <span className="text-blue-400 text-sm font-bold tracking-widest uppercase">
                                        {benefit.subtitle}
                                    </span>
                                </div>
                                <h3 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                                    {benefit.h3_title}
                                </h3>
                                <p className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed">
                                    {benefit.description}
                                </p>

                                <div className="pt-4">
                                    <Button
                                        onClick={() => setShowModal(true)}
                                        variant="secondary"
                                        className="bg-blue-600 hover:bg-blue-700 text-white border-none h-12 px-8 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
                                    >
                                        Comprar ahora mismo
                                    </Button>
                                </div>
                            </div>

                            {/* Contenedor de Imagen Futurista */}
                            <div className="flex-1 relative w-full aspect-square md:aspect-video group">
                                {/* Efectos de fondo */}
                                <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-700" />

                                <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm">
                                    {benefit.image_url ? (
                                        <img
                                            src={benefit.image_url}
                                            alt={benefit.h3_title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                                            <span className="text-zinc-700">Crystal Frame</span>
                                        </div>
                                    )}

                                    {/* Overlay Gradiente */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                </div>

                                {/* Decoración Futurista */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-blue-500/50 rounded-tr-3xl" />
                                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-blue-500/50 rounded-bl-3xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .content-container {
          max-width: 1440px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 2rem;
          padding-right: 2rem;
        }
      `}</style>
        </div>
    )
}

export default ProductBenefitsSection
