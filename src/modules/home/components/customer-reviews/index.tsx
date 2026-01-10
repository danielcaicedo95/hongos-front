"use client"

import { Heading, Button } from "@medusajs/ui"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"

const testimonials = [
    {
        id: 1,
        name: "Carlos Padilla",
        image: "/images/resenas/carlos-padilla.png",
        rating: 5,
        review: "Los hongos de Origen Fungi han transformado mi energía diaria. El Cordyceps es increíble para el rendimiento físico.",
    },
    {
        id: 2,
        name: "Carol Martínez",
        image: "/images/resenas/carol-martinez.png",
        rating: 5,
        review: "Excelente calidad y servicio. La Melena de León me ha ayudado muchísimo con mi concentración en el trabajo.",
    },
    {
        id: 3,
        name: "Daniela Vaca",
        image: "/images/resenas/daniela-vaca.png",
        rating: 4,
        review: "Productos naturales de primera calidad. He notado mejoras en mi sistema inmune desde que tomo Reishi.",
    },
    {
        id: 4,
        name: "Esteban Montero",
        image: "/images/resenas/esteban-montero.png",
        rating: 5,
        review: "Recomendado al 100%. La Cola de Pavo ha sido un gran apoyo para mi salud digestiva.",
    },
    {
        id: 5,
        name: "Esteban Torres",
        image: "/images/resenas/esteban-torres.png",
        rating: 5,
        review: "Increíble experiencia con Origen Fungi. Los extractos son puros y muy efectivos.",
    },
    {
        id: 6,
        name: "Estefani Galíndez",
        image: "/images/resenas/estefani-galindez.png",
        rating: 4,
        review: "Me encanta la transparencia de la marca. Los hongos funcionales realmente funcionan.",
    },
    {
        id: 7,
        name: "Juliana Arango",
        image: "/images/resenas/juliana-arango.png",
        rating: 5,
        review: "La mejor inversión en mi salud. Noto la diferencia en mi bienestar general cada día.",
    },
]

export default function CustomerReviews({ backgroundImage }: { backgroundImage?: string }) {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const scrollContainer = scrollRef.current
        if (!scrollContainer) return

        let scrollPosition = 0
        const scrollSpeed = 0.5

        const scroll = () => {
            scrollPosition += scrollSpeed
            if (scrollPosition >= scrollContainer.scrollWidth / 2) {
                scrollPosition = 0
            }
            scrollContainer.scrollLeft = scrollPosition
        }

        const intervalId = setInterval(scroll, 20)
        return () => clearInterval(intervalId)
    }, [])

    return (
        <section className="relative w-full py-16 md:py-24 overflow-hidden">
            {/* Background Image */}
            {backgroundImage && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={backgroundImage}
                        alt="Background"
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 content-container">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <Heading
                        level="h2"
                        className="text-3xl md:text-5xl font-serif text-white mb-8 tracking-tight leading-tight"
                    >
                        Nuestros Clientes Nos Respaldan
                    </Heading>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 mb-8">
                        <div className="text-center">
                            <Heading level="h3" className="text-4xl md:text-6xl font-bold text-amber-400 mb-2 leading-none">
                                +9,000
                            </Heading>
                            <p className="text-gray-200 text-lg">Ventas</p>
                        </div>

                        <div className="text-center">
                            <Heading level="h3" className="text-4xl md:text-6xl font-bold text-amber-400 mb-2">
                                +700
                            </Heading>
                            <p className="text-gray-200 text-lg">Clientes Satisfechos</p>
                        </div>
                    </div>

                    <Link href="/store">
                        <Button
                            variant="secondary"
                            className="bg-amber-600 hover:bg-amber-700 text-white border-none px-8 py-3 text-lg font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            VER PRODUCTOS
                        </Button>
                    </Link>
                </div>

                {/* Reviews Carousel */}
                <div className="relative">
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-hidden"
                        style={{ scrollBehavior: "auto" }}
                    >
                        {/* Duplicate testimonials for infinite scroll effect */}
                        {[...testimonials, ...testimonials].map((testimonial, index) => (
                            <div
                                key={`${testimonial.id}-${index}`}
                                className="flex-shrink-0 w-[350px] bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg"
                            >
                                {/* Header with photo and name */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                        <div className="flex gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={`text-lg ${i < testimonial.rating ? "text-amber-500" : "text-gray-300"
                                                        }`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Review text */}
                                <p className="text-gray-700 text-sm leading-relaxed">{testimonial.review}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
