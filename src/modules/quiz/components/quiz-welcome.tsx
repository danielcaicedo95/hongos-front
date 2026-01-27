"use client"

import React, { useState } from "react"
import { Heading, Text, Button } from "@medusajs/ui"
import Input from "@modules/common/components/input"
import Image from "next/image"

type QuizWelcomeProps = {
    onNext: (data: { name: string; email: string }) => void
}

const QuizWelcome: React.FC<QuizWelcomeProps> = ({ onNext }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (name && email) {
            onNext({ name, email })
        }
    }

    return (
        <div className="flex flex-col items-center text-center flex-1 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                <Image
                    src="/images/reishi.jpg"
                    alt="Mushroom Wisdom"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1717] via-transparent to-transparent" />
            </div>

            <Heading level="h1" className="text-4xl small:text-5xl font-black text-white mb-4 tracking-tight">
                Descubre tu<br />Fórmula Ideal
            </Heading>

            <Text className="text-zinc-400 text-lg mb-12 max-w-sm leading-relaxed">
                Donde la sabiduría ancestral de los hongos se encuentra con la ciencia moderna. Personaliza tu camino al bienestar.
            </Text>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-6">
                <div className="text-left">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block ml-1">
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        placeholder="¿Cómo te llamas?"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-600 outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="text-left">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block ml-1">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        placeholder="tu@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-600 outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <Button
                    type="submit"
                    className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white h-14 rounded-2xl text-lg font-bold shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
                    disabled={!name || !email}
                >
                    Comenzar Test
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Button>
            </form>

            <div className="mt-8">
                <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em]">ORIGEN FOODS © 2024</p>
            </div>
        </div>
    )
}

export default QuizWelcome
