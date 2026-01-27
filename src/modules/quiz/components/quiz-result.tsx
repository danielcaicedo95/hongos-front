"use client"

import React, { useState } from "react"
import { Heading, Text, Button } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import EasyCheckoutModal from "@modules/products/components/product-actions/easy-checkout-modal"
import Thumbnail from "@modules/products/components/thumbnail"
import { useParams } from "next/navigation"

type QuizResultProps = {
    product: HttpTypes.StoreProduct | undefined
    name: string
    onReset: () => void
}

const QuizResult: React.FC<QuizResultProps> = ({ product, name, onReset }) => {
    const [showModal, setShowModal] = useState(false)
    const countryCode = useParams().countryCode as string

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
                <Text>No pudimos encontrar una recomendación en este momento.</Text>
                <Button onClick={onReset} className="mt-4">Intentar de nuevo</Button>
            </div>
        )
    }

    // Find the basic variant for the modal
    const variant = product.variants?.[0]

    // Dynamic benefits based on the recommended hongo
    const getBenefits = (hongo: string) => {
        if (hongo.includes("melena")) {
            return [
                { title: "Claridad Cognitiva", desc: "Estimula el factor de crecimiento nervioso (NGF) para despejar la confusión mental diaria." },
                { title: "Enfoque Prolongado", desc: "Optimiza tu concentración durante tareas complejas sin los nervios de la cafeína." },
                { title: "Memoria y Aprendizaje", desc: "Refuerza la conexión sináptica, facilitando la retención de nueva información." }
            ]
        }
        if (hongo.includes("cordyceps")) {
            return [
                { title: "Energía Natural", desc: "Aumenta la producción de ATP para vitalidad física sin bajones." },
                { title: "Rendimiento Físico", desc: "Mejora la oxigenación y resistencia durante el ejercicio o tu día a día." },
                { title: "Libido y Vitalidad", desc: "Apoya el equilibrio hormonal y la energía vital general." }
            ]
        }
        // Default/Fallback benefits if hongo not specifically matched
        return [
            { title: "Bienestar Integral", desc: "Apoya el equilibrio natural de tu cuerpo con extractos puros." },
            { title: "Apoyo Inmunológico", desc: "Fortalece tus defensas naturales contra el estrés ambiental." },
            { title: "Calidad Garantizada", desc: "Hongos 100% orgánicos, cultivados con los más altos estándares." }
        ]
    }

    const hongoName = product.title?.replace("Extracto de ", "") || "Tu hongo ideal"
    const benefits = getBenefits(product.handle?.toLowerCase() || "")

    return (
        <div className="flex flex-col flex-1 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <EasyCheckoutModal
                isOpen={showModal}
                close={() => setShowModal(false)}
                product={product}
                variant={variant}
                countryCode={countryCode}
            />

            <div className="flex flex-col items-center text-center">
                <div className="bg-white/10 px-4 py-1.5 rounded-full mb-6">
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Fórmula Personalizada</span>
                </div>

                <Heading level="h1" className="text-4xl small:text-5xl font-black text-white mb-8 leading-tight">
                    {name}, tu fórmula ideal es<br />
                    <span className="text-emerald-400">{hongoName}</span>
                </Heading>

                <div className="relative w-full max-w-[340px] aspect-square rounded-[40px] overflow-hidden mb-6 shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-white/10 group">
                    <Thumbnail
                        thumbnail={product.thumbnail}
                        images={product.images}
                        size="full"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                <Button
                    onClick={() => setShowModal(true)}
                    className="w-full max-w-[340px] mb-12 bg-emerald-600 hover:bg-emerald-500 text-white h-14 rounded-2xl text-lg font-bold shadow-xl shadow-emerald-900/30 transition-all active:scale-95 flex items-center justify-center gap-x-3"
                >
                    Comprar ahora <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                </Button>

                {/* Benefits Cards */}
                <div className="w-full flex flex-col gap-y-4 mb-10">
                    <div className="flex items-center gap-x-2 mb-2 ml-1">
                        <div className="bg-emerald-500/20 p-1.5 rounded-lg text-emerald-500">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                        </div>
                        <span className="text-white font-bold text-lg">Beneficios Clave</span>
                    </div>

                    {benefits.map((b, i) => (
                        <div key={i} className="bg-white/5 border-l-4 border-emerald-500 rounded-r-2xl p-5 text-left transition-transform hover:translate-x-1 duration-300">
                            <span className="text-white font-bold text-lg block mb-1">{b.title}</span>
                            <p className="text-zinc-400 text-sm leading-relaxed">{b.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Icons Row */}
                <div className="grid grid-cols-3 w-full gap-4 mb-10 border-t border-b border-white/5 py-8">
                    <div className="flex flex-col items-center gap-y-2">
                        <div className="text-zinc-500"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div>
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest text-center">100% Orgánico</span>
                    </div>
                    <div className="flex flex-col items-center gap-y-2">
                        <div className="text-zinc-500"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31"></path><path d="M14 9.3V2"></path><path d="M8.5 2h7"></path><path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path><path d="M5.58 16.5h12.85"></path></svg></div>
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest text-center">Lab Tested</span>
                    </div>
                    <div className="flex flex-col items-center gap-y-2">
                        <div className="text-zinc-500"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a8 8 0 0 1-8 8H11z"></path><path d="M11 20c-4 0-6-3-6-3s2-2 2-2 2 1 2 1"></path></svg></div>
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest text-center">Vegano</span>
                    </div>
                </div>

                {/* Add to Cart CTA */}
                <div className="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 mb-8 text-left">
                    <p className="text-zinc-300 text-sm leading-relaxed italic mb-4">
                        "Este hongo es ideal para ti porque según tus respuestas, tu cuerpo busca {hongoName.toLowerCase()} para equilibrar tu energía y bienestar."
                    </p>
                    <Button
                        onClick={() => setShowModal(true)}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white h-14 rounded-2xl text-lg font-bold shadow-xl shadow-emerald-900/30 transition-all active:scale-95 flex items-center justify-center gap-x-3"
                    >
                        Comprar ahora <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    </Button>
                </div>

                <button
                    onClick={onReset}
                    className="text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mb-12"
                >
                    Rehacer evaluación
                </button>

                <p className="text-[10px] text-zinc-700 uppercase tracking-[0.2em] font-bold pb-10">ORIGEN FOODS © 2024</p>
            </div>
        </div>
    )
}

export default QuizResult
