"use client"

import { HttpTypes } from "@medusajs/types"
import { Container, clx } from "@medusajs/ui"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const thumbnailsRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum distance for a swipe to be recognized
  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
    }
    if (isRightSwipe) {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
    }
  }

  // Auto-scroll thumbnails when active index changes
  useEffect(() => {
    if (thumbnailsRef.current) {
      const activeThumbnail = thumbnailsRef.current.children[activeIndex] as HTMLElement
      if (activeThumbnail) {
        activeThumbnail.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }
    }
  }, [activeIndex])

  if (!images || images.length === 0) {
    return (
      <Container className="aspect-[3/4] w-full bg-ui-bg-subtle flex items-center justify-center">
        <span className="text-ui-fg-muted font-medium">No hay imagenes disponibles</span>
      </Container>
    )
  }

  return (
    <div className="flex flex-col gap-y-6 w-full max-w-[800px] mx-auto group">
      {/* Main Image Stage */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-zinc-50 shadow-2xl border border-zinc-100/50 group/stage touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Glow effect back */}
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full scale-75 group-hover/stage:scale-90 transition-transform duration-1000" />

        {images.map((image, index) => (
          <div
            key={image.id}
            className={clx(
              "absolute inset-0 transition-all duration-700 ease-in-out transform",
              activeIndex === index
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            )}
          >
            {!!image.url && (
              <Image
                src={image.url}
                priority={index <= 1}
                className="object-cover h-full w-full select-none"
                alt={`Product image ${index + 1}`}
                fill
                sizes="(max-width: 576px) 100vw, (max-width: 768px) 80vw, 800px"
              />
            )}

            {/* Subtle Overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
          </div>
        ))}

        {/* Navigation Arrows (Desktop) */}
        {images.length > 1 && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover/stage:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              className="p-3 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-zinc-900 shadow-xl pointer-events-auto hover:bg-white transition-all transform hover:scale-110 active:scale-95 group/btn"
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover/btn:-translate-x-0.5 transition-transform">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              className="p-3 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-zinc-900 shadow-xl pointer-events-auto hover:bg-white transition-all transform hover:scale-110 active:scale-95 group/btn"
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover/btn:translate-x-0.5 transition-transform">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}

        {/* Counter Overlay */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/10 backdrop-blur-md border border-white/20 text-[10px] font-bold text-zinc-900 uppercase tracking-widest pointer-events-none">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div
          ref={thumbnailsRef}
          className="flex items-center gap-x-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory px-1"
        >
          {images.map((image, index) => (
            <button
              key={`thumb-${image.id}`}
              onClick={() => setActiveIndex(index)}
              className={clx(
                "relative flex-shrink-0 w-20 h-24 rounded-2xl overflow-hidden snap-start transition-all duration-300",
                activeIndex === index
                  ? "ring-2 ring-blue-500 ring-offset-4 scale-105 blur-none opacity-100"
                  : "opacity-60 grayscale-[30%] hover:opacity-100 hover:scale-105 scale-100"
              )}
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  className="object-cover h-full w-full"
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                />
              )}
              {/* Active Indicator Overlay */}
              {activeIndex === index && (
                <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default ImageGallery
