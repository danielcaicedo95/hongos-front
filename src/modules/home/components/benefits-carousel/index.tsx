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

  const scrollContainer = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-neutral-900 border-t border-neutral-800">
      <div className="relative">
        {/* Flechas de navegación solo en móviles */}
        <button
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full z-10 md:hidden"
          onClick={() => scrollContainer("left")}
          aria-label="Scroll Left"
        >
          ←
        </button>
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full z-10 md:hidden"
          onClick={() => scrollContainer("right")}
          aria-label="Scroll Right"
        >
          →
        </button>

        <div
          ref={containerRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 h-[500px] md:h-[600px] w-full overflow-x-auto md:overflow-visible gap-4 no-scrollbar"
        >
          {mushrooms.map((mushroom) => (
            <div
              key={mushroom.id}
              className="relative group h-full shrink-0 md:shrink border-r md:border-r md:last:border-r-0 border-white/10 last:border-r-0 md:w-auto w-[80%] snap-center"
            >
              {/* Imagen de fondo */}
              <Image
                src={mushroom.image}
                alt={mushroom.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />

              {/* Superposición oscura para legibilidad del texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Contenido */}
              <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-6 md:p-8 pb-12 md:pb-16 z-10">
                <Heading
                  level="h3"
                  className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase tracking-wider"
                >
                  {mushroom.name}
                </Heading>

                <Text className="text-sm text-gray-300 italic mb-3 font-serif">
                  {mushroom.scientificName}
                </Text>

                <p className="text-gray-200 text-sm md:text-base max-w-[250px] mb-6 font-light leading-relaxed">
                  {mushroom.benefits}
                </p>

                <Link href={mushroom.link} passHref>
                  <Button
                    variant="transparent"
                    className="text-white hover:text-amber-300 font-medium tracking-wide flex items-center gap-2 group/btn transition-all"
                  >
                    SABER MÁS
                    <span className="transform group-hover/btn:translate-x-1 transition-transform">
                      →
                    </span>
                  </Button>
                </Link>
              </div>

              {/* Efecto de hover (borde) */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/20 transition-colors pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}