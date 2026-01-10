import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import Link from "next/link"

const AboutUs = () => {
    return (
        <section className="relative w-full min-h-[600px] md:min-h-[800px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hongo-sobre-nosotros.jpg"
                    alt="Bosque de Origen Fungi"
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 py-16 text-center text-white flex flex-col items-center gap-6">
                <Heading
                    level="h2"
                    className="text-4xl md:text-6xl lg:text-7xl font-serif italic drop-shadow-lg leading-snug"
                >
                    Origen Fungi
                </Heading>

                <div className="max-w-2xl text-lg md:text-xl font-light leading-relaxed drop-shadow-md">
                    <p>
                        Fusionamos la sabiduría ancestral de la naturaleza con tecnología de punta
                        para extraer el máximo potencial medicinal de los hongos. Nuestra ciencia
                        se basa en el respeto al micelio y la búsqueda incansable del bienestar integral.
                    </p>
                </div>

                <div className="mt-4">
                    <Link href="/pages/sobre-nosotros">
                        <Button
                            size="xlarge"
                            className="bg-green-700 hover:bg-green-600 text-white border-none px-12 py-7 rounded-full transition-all duration-300 shadow-xl hover:scale-105"
                        >
                            Conoce sobre nosotros
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default AboutUs
