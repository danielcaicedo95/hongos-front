import { Button, Heading, Input, Textarea } from "@medusajs/ui"
import * as Accordion from "@radix-ui/react-accordion"
import { Plus, Minus } from "@medusajs/icons"

const faqs = [
    {
        question: "¿Los hongos medicinales traban o son alucinógenos?",
        answer: "No. Los hongos medicinales o funcionales no son alucinógenos ni psicodélicos. Hongos como Reishi, Melena de León, Cordyceps o Chaga no contienen psilocibina, por lo que no alteran la percepción ni “colocan”. Actúan como adaptógenos, ayudando al cuerpo a equilibrarse de forma natural. En Origen Fungi trabajamos únicamente con hongos medicinales seguros y legales, pensados para el bienestar diario, el trabajo y la vida cotidiana.",
        keywords: "hongos medicinales no psicodélicos, hongos adaptógenos, diferencia hongos mágicos y medicinales."
    },
    {
        question: "¿Para qué sirve la Melena de León y ayuda a la memoria?",
        answer: "La Melena de León (Hericium erinaceus) es uno de los hongos más conocidos para la memoria, concentración y enfoque mental. Estudios sugieren que puede apoyar la salud neuronal y la producción de factores relacionados con la neurogénesis. Por eso es muy usada por estudiantes y profesionales. En Origen Fungi ofrecemos Melena de León en formatos estandarizados para asegurar una buena concentración de compuestos activos.",
        keywords: "beneficios melena de león, hongo para la memoria, concentración natural."
    },
    {
        question: "¿El Cordyceps sirve para tener más energía o para el gimnasio?",
        answer: "Sí. El Cordyceps es muy popular por su relación con la energía física, resistencia y rendimiento deportivo. Ayuda a optimizar el uso del oxígeno y reducir la fatiga, por lo que muchas personas lo usan como alternativa natural al café o pre-entrenos. También es apreciado por su apoyo a la vitalidad general.",
        keywords: "cordyceps energía, cordyceps gimnasio, rendimiento deportivo natural."
    },
    {
        question: "¿Cómo tomar Reishi para dormir mejor o reducir la ansiedad?",
        answer: "El Reishi (Ganoderma lucidum) es conocido por su efecto relajante y adaptógeno, ideal para el estrés, la ansiedad leve y el descanso. Generalmente se recomienda tomarlo en la tarde o noche, de forma constante. No actúa como un sedante fuerte, sino que ayuda al cuerpo a regular el sistema nervioso con el uso continuo.",
        keywords: "reishi para dormir, reishi ansiedad, hongo relajante natural."
    },
    {
        question: "¿Es mejor tomar los hongos medicinales en cápsulas, en polvo o en extracto?",
        answer: "Depende del estilo de vida y del objetivo. Cápsulas: prácticas y sin sabor. Polvo: versátil para café o batidos. Extractos: mayor concentración de compuestos activos. En Origen Fungi usamos procesos de extracción que mejoran la biodisponibilidad, para que el cuerpo aproveche realmente los beneficios del hongo.",
        keywords: "cápsulas de hongos medicinales, extracto de hongos, polvo de hongos."
    },
    {
        question: "¿Cuánto tiempo tardan en notarse los efectos de los hongos medicinales?",
        answer: "Los hongos medicinales no actúan de forma inmediata como un medicamento. Sus efectos suelen ser acumulativos, notándose entre 2 y 4 semanas de uso constante. Algunas personas perciben mejoras antes, especialmente en energía o enfoque, pero la clave está en la constancia.",
        keywords: "efectos hongos medicinales tiempo, cuándo funcionan los adaptógenos."
    },
    {
        question: "¿Quiénes no deben tomar hongos medicinales o qué precauciones existen?",
        answer: "Aunque son naturales, los hongos medicinales pueden tener contraindicaciones en ciertos casos. Personas embarazadas, en lactancia o que toman medicamentos inmunosupresores deben consultar con un profesional de la salud. También es importante respetar la dosis recomendada.",
        keywords: "contraindicaciones hongos medicinales, efectos secundarios hongos."
    },
    {
        question: "¿Qué hongo es mejor para fortalecer el sistema inmune?",
        answer: "Hongos como Reishi, Chaga y Cola de Pavo (Turkey Tail) son conocidos por su apoyo al sistema inmunológico, gracias a sus betaglucanos y antioxidantes. Son ideales para prevención, recuperación después de enfermedades o épocas de alto estrés. En Origen Fungi ofrecemos fórmulas pensadas para fortalecer las defensas de manera natural.",
        keywords: "hongos para el sistema inmune, subir defensas natural."
    },
    {
        question: "¿Es mejor comprar suplementos de hongos medicinales o cultivarlos en casa?",
        answer: "Aunque el cultivo casero es interesante, no garantiza concentraciones estables de compuestos activos. Los suplementos de calidad requieren procesos controlados, análisis y extracción especializada. En Origen Fungi trabajamos con laboratorios adecuados y controles de calidad, lo que permite ofrecer suplementos seguros, potentes y estandarizados, listos para el consumo diario.",
        keywords: "suplementos de hongos medicinales, calidad hongos medicinales, extractos estandarizados."
    }
]

const ContactSection = () => {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    }

    return (
        <section className="bg-white py-16 md:py-24 border-t border-gray-100">
            {/* SEO Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">

                    {/* FAQ Column */}
                    <div className="flex flex-col">
                        <div className="mb-10">
                            <Heading level="h2" className="text-3xl md:text-4xl font-serif italic text-gray-900 mb-4 leading-tight">
                                Preguntas Frecuentes
                            </Heading>
                            <p className="text-gray-500 font-light">Resolviendo tus dudas sobre el mundo fúngico.</p>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 md:pr-4 max-h-[600px] custom-scrollbar">
                            <Accordion.Root type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <Accordion.Item
                                        key={index}
                                        value={`item-${index}`}
                                        className="border-b border-gray-100 last:border-0"
                                    >
                                        <Accordion.Header>
                                            <Accordion.Trigger className="flex w-full items-center justify-between py-6 text-left text-lg font-medium text-gray-800 hover:text-green-700 transition-colors group">
                                                <span className="pr-4">{faq.question}</span>
                                                <div className="relative flex items-center justify-center w-5 h-5">
                                                    <Plus className="absolute h-5 w-5 text-gray-400 group-data-[state=open]:opacity-0 transition-all duration-300" />
                                                    <Minus className="absolute h-5 w-5 text-green-700 opacity-0 group-data-[state=open]:opacity-100 transition-all duration-300" />
                                                </div>
                                            </Accordion.Trigger>
                                        </Accordion.Header>
                                        <Accordion.Content className="pb-6 text-gray-600 leading-relaxed overflow-hidden data-[state=closed]:animate-accordion-slide-up data-[state=open]:animate-accordion-slide-down">
                                            <p className="mb-4 font-light text-base">{faq.answer}</p>
                                            <p className="text-xs font-light italic text-gray-400">
                                                {faq.keywords}
                                            </p>
                                        </Accordion.Content>
                                    </Accordion.Item>
                                ))}
                            </Accordion.Root>
                        </div>
                    </div>

                    {/* Contact Form Column */}
                    <div className="bg-gray-50 p-6 md:p-12 rounded-3xl flex flex-col gap-8 shadow-sm border border-gray-100">
                        <div className="space-y-2">
                            <Heading level="h2" className="text-3xl font-serif italic text-gray-900 leading-tight">
                                Contáctanos
                            </Heading>
                            <p className="text-gray-500 font-light">
                                ¿Tienes alguna duda? Estamos aquí para ayudarte a encontrar tu fórmula ideal.
                            </p>
                        </div>

                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre completo</label>
                                <Input id="name" placeholder="Tu nombre" className="focus:ring-2 focus:ring-green-700/20" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Correo electrónico</label>
                                    <Input id="email" type="email" placeholder="tu@correo.com" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Celular</label>
                                    <Input id="phone" type="tel" placeholder="+57 300 000 0000" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-700">Mensaje</label>
                                <Textarea
                                    id="message"
                                    placeholder="¿En qué podemos ayudarte?"
                                    className="min-h-[150px] focus:ring-2 focus:ring-green-700/20"
                                />
                            </div>

                            <Button
                                size="large"
                                className="w-full bg-green-700 hover:bg-green-600 text-white rounded-full py-6 text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Enviar Mensaje
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ContactSection
