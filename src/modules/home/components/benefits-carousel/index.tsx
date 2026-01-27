"use client"; // Solución al error de client-side hooks

import { Heading, Text, Button } from "@medusajs/ui";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

const mushrooms = [
  {
    id: 1,
    name: "REISHI",
    subtitle: "Hongo de la Inmortalidad",
    scientificName: "Ganoderma Lucidum",
    benefits: "Potenciador del sistema inmune y reductor del estrés.",
    gradient: "from-red-900 via-amber-900 to-orange-950",
    image: "/images/reishi.jpg",
    link: "/collections/reishi",
  },
  {
    id: 2,
    name: "COLA DE PAVO",
    subtitle: "Trametes Versicolor",
    scientificName: "Trametes Versicolor",
    benefits: "Apoyo digestivo y salud celular profunda.",
    gradient: "from-orange-800 via-yellow-900 to-amber-950",
    image: "/images/cola-de-pavo.jpg",
    link: "/collections/cola-de-pavo",
  },
  {
    id: 3,
    name: "MELENA DE LEÓN",
    subtitle: "Hericium Erinaceus",
    scientificName: "Hericium Erinaceus",
    benefits: "Foco mental, memoria y regeneración neuronal.",
    gradient: "from-slate-700 via-neutral-800 to-stone-900",
    image: "/images/melena-de-leon.jpg",
    link: "/collections/melena-de-leon",
  },
  {
    id: 4,
    name: "CORDYCEPS",
    subtitle: "Cordyceps Sinensis",
    scientificName: "Cordyceps Sinensis",
    benefits: "Energía vital, rendimiento físico y libido.",
    gradient: "from-amber-800 via-orange-900 to-red-950",
    image: "/images/cordyceps.jpg",
    link: "/collections/cordyceps",
  },
];

export default function BenefitsCarousel() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-neutral-900 border-t border-white/5 overflow-hidden">
      <div className="relative group/carousel w-full">
        {/* Navigation Arrows - Integrated look */}
        <div className="hidden md:block">
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/10 text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-500"
            onClick={() => scroll("left")}
            aria-label="Scroll Left"
          >
            ←
          </button>
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/10 text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-500"
            onClick={() => scroll("right")}
            aria-label="Scroll Right"
          >
            →
          </button>
        </div>

        <div
          ref={containerRef}
          className="flex h-[550px] md:h-[650px] w-full overflow-x-auto no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {mushrooms.map((mushroom, index) => (
            <div
              key={mushroom.id}
              className="relative group h-full min-w-[90%] md:min-w-[50%] lg:min-w-[25%] snap-start border-r border-white/5 last:border-r-0"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0 bg-neutral-800">
                <Image
                  src={mushroom.image}
                  alt={mushroom.name}
                  fill
                  priority={index < 2}
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Refined gradient for better UX/UI contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              </div>

              {/* Content - Vertically Centered for better UI balance */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8 md:p-12">
                <div className="transition-all duration-[800ms] group-hover:-translate-y-4">
                  <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full mb-6 scale-90 md:scale-100">
                    <span className="text-[10px] text-white/60 font-black tracking-[0.3em] uppercase">
                      {mushroom.scientificName}
                    </span>
                  </div>

                  <Heading
                    level="h3"
                    className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter leading-none"
                  >
                    {mushroom.name}
                  </Heading>

                  <p className="text-zinc-400 text-sm md:text-base max-w-[280px] mb-8 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {mushroom.benefits}
                  </p>

                  <Link href={mushroom.link} passHref className="block">
                    <Button
                      variant="transparent"
                      className="text-white border-b-2 border-white/20 hover:border-white transition-all pb-1 font-black text-xs tracking-widest uppercase flex items-center gap-3 mx-auto"
                    >
                      Descubrir
                      <span className="text-lg">→</span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Subtle accent line on hover */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left z-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
