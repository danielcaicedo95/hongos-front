
"use client"

import React, { useState } from "react"
import { Review } from "@lib/data/reviews"
import { StarIcon } from "./star-icon"
import { Text, Button } from "@medusajs/ui"

const VerifiedIcon = () => (
    <svg
        className="w-4 h-4 text-[#0055a5]"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M10.86 19.3L5.05 13.5L7.12 11.43L10.86 15.17L18.88 7.15L20.95 9.22L10.86 19.3Z" />
    </svg>
)

export const ReviewsList = ({
    reviews,
    productName
}: {
    reviews: Review[],
    productName: string
}) => {
    const [visibleCount, setVisibleCount] = useState(2)

    if (!reviews || !reviews.length) return null

    const average = reviews.reduce((acc, r) => acc + (Number(r.rating_score) || Number(r.rating) || 0), 0) / reviews.length

    // Calculate distribution
    const distribution = [5, 4, 3, 2, 1].map(stars => {
        const count = reviews.filter(r => Math.round(Number(r.rating_score) || Number(r.rating) || 0) === stars).length
        const percentage = Math.round((count / reviews.length) * 100)
        return { stars, percentage, count }
    })

    // Structured Data for SEO
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": productName,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": average.toFixed(2),
            "reviewCount": reviews.length,
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": reviews.map(r => ({
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": Number(r.rating_score) || Number(r.rating) || 0
            },
            "author": {
                "@type": "Person",
                "name": r.user_name
            },
            "datePublished": r.created_at,
            "reviewBody": r.comment
        }))
    }

    const handleShowMore = () => {
        setVisibleCount(prev => prev + 2)
    }

    return (
        <section id="reviews" className="py-16 bg-white border-t border-gray-100">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="content-container">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center sm:text-left">
                    Opiniones reales de clientes sobre {productName}
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Summary and Stats */}
                    <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
                        <div className="flex items-center justify-between">
                            <div>
                                <Text className="text-5xl font-extrabold text-gray-900 leading-tight">
                                    {average.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                                </Text>
                                <Text className="text-sm text-gray-500 font-medium mt-1">
                                    {reviews.length} valoraciones
                                </Text>
                            </div>
                            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                                <span className="text-white font-serif text-xl font-bold italic">e</span>
                            </div>
                        </div>

                        {/* Progress Bars */}
                        <div className="space-y-3">
                            {distribution.map((item) => (
                                <div key={item.stars} className="flex items-center gap-4 group">
                                    <div className="flex items-center gap-1 w-8">
                                        <span className="text-sm font-bold text-gray-600">{item.stars}</span>
                                        <StarIcon fill={1} className="w-3 h-3 text-gray-400 group-hover:text-orange-500 transition-colors" />
                                    </div>
                                    <div className="flex-grow h-4 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#e67e22] rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-gray-400 w-10 text-right">
                                        {item.percentage}%
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <Text className="text-xs text-gray-400 leading-relaxed italic">
                                Recopilado de acuerdo con las condiciones de uso de Trusted Shops.
                                <br />
                                <span className="underline cursor-pointer hover:text-gray-600 transition-colors">Acerca de la autenticidad de las valoraciones.</span>
                            </Text>
                        </div>
                    </div>

                    {/* Right Column: Cards List */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {reviews.slice(0, visibleCount).map((review) => {
                            const ratingScore = Number(review.rating_score) || Number(review.rating) || 0
                            return (
                                <div
                                    key={review.id}
                                    className="p-8 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex text-[#e67e22] gap-0.5">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <StarIcon key={s} fill={s <= ratingScore ? 1 : 0} className="w-5 h-5" />
                                            ))}
                                        </div>
                                        <VerifiedIcon />
                                    </div>

                                    <Text className="text-sm text-gray-400 mb-2 font-medium">
                                        {new Date(review.created_at).toLocaleDateString('es-ES')}
                                    </Text>

                                    <Text className="font-bold text-gray-900 text-sm mb-4 block">
                                        {review.user_name}
                                    </Text>

                                    <Text className="text-gray-800 text-[16px] leading-relaxed font-normal">
                                        {review.comment}
                                    </Text>
                                </div>
                            )
                        })}

                        {visibleCount < reviews.length && (
                            <div className="mt-4 flex justify-center">
                                <Button
                                    variant="secondary"
                                    onClick={handleShowMore}
                                    className="rounded-full px-8 py-2 font-bold text-[#0055a5] border-[#0055a5]/20 hover:bg-[#0055a5]/5 transition-all"
                                >
                                    Ver más valoraciones
                                </Button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    )
}
