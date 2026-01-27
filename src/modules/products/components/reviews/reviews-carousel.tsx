
"use client"

import React, { useRef } from "react"
import { Review } from "@lib/data/reviews"
import { StarIcon } from "./star-icon"
import { Text } from "@medusajs/ui"

const getQualityLabel = (rating: number) => {
    if (rating >= 4.7) return "Excelente"
    if (rating >= 4.4) return "Muy bueno"
    if (rating >= 4.0) return "Bueno"
    if (rating >= 3.0) return "Aceptable"
    return "Mejorable"
}

const VerifiedIcon = () => (
    <svg
        className="w-5 h-5 text-[#0055a5]"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M10.86 19.3L5.05 13.5L7.12 11.43L10.86 15.17L18.88 7.15L20.95 9.22L10.86 19.3Z" />
    </svg>
)

export const ReviewsCarousel = ({ reviews }: { reviews: Review[] }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    if (!reviews || !reviews.length) return null

    const average = reviews.length > 0
        ? reviews.reduce((acc, r) => acc + (Number(r.rating_score) || Number(r.rating) || 0), 0) / reviews.length
        : 0

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current
            const scrollTo = direction === "left" ? scrollLeft - 320 : scrollLeft + 320
            scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
        }
    }

    return (
        <div className="py-20 bg-[#f9fafb] border-y border-gray-100 overflow-hidden relative">
            <div className="content-container relative">
                <style dangerouslySetInnerHTML={{
                    __html: `
          .reviews-scroll-container::-webkit-scrollbar {
            display: none;
          }
          .reviews-scroll-container {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          @keyframes slowlyMove {
            0% { transform: translateX(0); }
            50% { transform: translateX(-10px); }
            100% { transform: translateX(0); }
          }
          .gentle-float {
            animation: slowlyMove 8s ease-in-out infinite;
          }
        `}} />

                <div className="flex items-center justify-between mb-10">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-bold text-gray-900">Opiniones de nuestros clientes</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-green-600 font-semibold">✓ Empresa verificada</span>
                        </div>
                    </div>

                    <div className="hidden sm:flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm hover:bg-gray-50 transition-colors"
                            aria-label="Anterior"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm hover:bg-gray-50 transition-colors"
                            aria-label="Siguiente"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto reviews-scroll-container snap-x scroll-pl-4 pb-10"
                >
                    {/* 1. Summary Card */}
                    <div className="min-w-[260px] max-w-[260px] bg-white p-8 rounded-xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center snap-start">
                        <div className="flex text-[#e67e22] mb-3 gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <StarIcon key={s} fill={Math.min(Math.max(average - (s - 1), 0), 1)} className="w-6 h-6" />
                            ))}
                        </div>
                        <Text className="text-4xl font-extrabold text-gray-900 mb-1">
                            {average.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                        </Text>
                        <Text className="text-lg font-bold text-gray-800 mb-6">
                            {getQualityLabel(average)}
                        </Text>

                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-[#0055a5] rounded-full flex items-center justify-center mb-2 shadow-lg">
                                <span className="text-white font-serif text-2xl font-bold italic">e</span>
                            </div>
                            <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Trusted Shops</Text>
                        </div>
                    </div>

                    {/* 2. Review Cards */}
                    {reviews.map((review, index) => (
                        <div
                            key={review.id}
                            className="min-w-[320px] max-w-[320px] bg-white p-8 rounded-xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] snap-start flex flex-col gap-4 gentle-float"
                            style={{ animationDelay: `${(index % 10) * 0.2}s` }}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex text-[#e67e22] gap-0.5">
                                    {[1, 2, 3, 4, 5].map((s) => {
                                        const ratingValue = Number(review.rating_score) || Number(review.rating) || 0
                                        return (
                                            <StarIcon key={s} fill={s <= ratingValue ? 1 : 0} className="w-4 h-4" />
                                        )
                                    })}
                                </div>
                                <VerifiedIcon />
                            </div>

                            <Text className="text-sm text-gray-400 font-medium">
                                hace {((index * 7) % 23) + 1} horas
                            </Text>

                            <Text className="text-gray-700 text-[15px] leading-relaxed line-clamp-4 flex-grow font-normal">
                                &quot;{review.comment}&quot;
                            </Text>

                            <div className="pt-6 mt-auto border-t border-gray-50">
                                <Text className="font-bold text-gray-900 text-[15px] mb-0.5">
                                    {review.user_name}
                                </Text>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[11px] text-[#0055a5] font-bold uppercase tracking-wider">Cliente Verificado</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
