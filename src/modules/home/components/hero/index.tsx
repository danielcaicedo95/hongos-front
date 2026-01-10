import { Button, Heading } from "@medusajs/ui"
import Image from "next/image" // Importante para Core Web Vitals
import Link from "next/link"

const Hero = () => {
  return (
    <div className="h-[85vh] w-full relative border-b border-ui-border-base bg-gray-950">
      {/* IMAGEN OPTIMIZADA */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/portada-origen-fungi.png"
          alt="Hongos medicinales en su hábitat natural"
          fill
          priority // Esto acelera el LCP (Core Web Vital clave)
          className="object-cover opacity-50"
          sizes="100vw"
        />
      </div>

      {/* CONTENIDO */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-6 gap-8">
        <div className="max-w-3xl">
          <span className="uppercase tracking-[0.2em] text-sm text-green-400 font-semibold mb-4 block">
            Poder Natural desde el Micelio
          </span>
          <Heading
            level="h1"
            className="text-4xl md:text-7xl leading-snug md:leading-tight text-white font-serif italic mb-6 md:mb-4"
          >
            Eleva tu bienestar con <br /> Inteligencia Fúngica
          </Heading>
          <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto font-light leading-relaxed">
            Extractos de doble acción de Melena de León, Reishi y Cordyceps.
            Energía, enfoque e inmunidad 100% orgánica.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href="/store">
            <Button size="large" className="bg-green-700 hover:bg-green-800 text-white border-none px-10 py-6 rounded-full transition-all">
              Explorar Elixires
            </Button>
          </Link>
          <Link href="/pages/nuestra-mision">
            <Button variant="secondary" size="large" className="bg-transparent text-white border-white hover:bg-white/10 px-10 py-6 rounded-full">
              Nuestra Ciencia
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero