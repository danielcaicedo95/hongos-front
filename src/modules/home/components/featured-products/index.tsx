"use client"

import { HttpTypes } from "@medusajs/types"
import { Heading, IconButton } from "@medusajs/ui"
import { ChevronLeft, ChevronRight } from "@medusajs/icons"
import { useRef, useState, useEffect } from "react"
import CollectionCard from "./collection-card"

export default function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const container = scrollContainerRef.current
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      )
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScroll)
      checkScroll()
      return () => container.removeEventListener("scroll", checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = container.clientWidth * 0.8
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="w-full bg-white overflow-hidden">
      {/* Header Section con SEO - Refined UX */}
      <div className="content-container text-center py-20 md:py-28">
        <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
          Premium Selection
        </div>
        <Heading level="h2" className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-zinc-900 tracking-tighter uppercase leading-[0.9]">
          Nuestras Fórmulas <span className="text-zinc-400">Ancestrales</span>
        </Heading>
        <p className="text-base md:text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed font-medium">
          Extractos de hongos medicinales de espectro completo, diseñados para optimizar tu potencial biológico.
        </p>
      </div>

      {/* Full Width Carousel Section */}
      <div className="relative group w-full px-0">
        {/* Navigation Buttons - Overlaid on edges */}
        <div className="hidden lg:block">
          <IconButton
            variant="transparent"
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 backdrop-blur-md h-12 w-12 rounded-full transition-all duration-300 border border-white/10 text-white ${!canScrollLeft ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-6 h-6" />
          </IconButton>
          <IconButton
            variant="transparent"
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 backdrop-blur-md h-12 w-12 rounded-full transition-all duration-300 border border-white/10 text-white ${!canScrollRight ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-6 h-6" />
          </IconButton>
        </div>

        {/* Scroll Container - No Gaps, Full Width */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className="min-w-[100%] small:min-w-[80%] md:min-w-[40%] lg:min-w-[25%] xl:min-w-[20%] snap-start"
            >
              <CollectionCard collection={collection} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="h-20 w-full" />
    </div>
  )
}
