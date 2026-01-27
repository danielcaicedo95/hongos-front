"use client"

import React from "react"
import { Heading, Text, clx } from "@medusajs/ui"
import Image from "next/image"

type QuizQuestionProps = {
    currentStep: number
    totalSteps: number
    question: {
        id: number
        title: string
        subtitle: string
        options: Array<{ label: string; sublabel?: string; value: string; icon: string }>
        layout: "grid" | "list"
    }
    onAnswer: (id: number, value: string) => void
    onBack: () => void
    selectedValue?: string
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
    currentStep,
    totalSteps,
    question,
    onAnswer,
    onBack,
    selectedValue,
}) => {
    return (
        <div className="flex flex-col flex-1 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Step Indicator */}
            <div className="flex flex-col mb-10">
                <div className="flex items-center justify-between mb-2">
                    <button
                        onClick={onBack}
                        className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-widest"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        Atrás
                    </button>
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">Paso {currentStep} de {totalSteps}</span>
                </div>
                <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Tu Proceso</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">
                        {Math.round((currentStep / totalSteps) * 100)}% Completado
                    </span>
                </div>
            </div>

            <Heading level="h2" className="text-3xl small:text-4xl font-black text-white mb-3 text-center leading-tight">
                {question.title}
            </Heading>

            <Text className="text-zinc-400 text-base text-center mb-10 italic">
                {question.subtitle}
            </Text>

            <div className={clx(
                "gap-4 mb-12",
                question.layout === "grid" ? "grid grid-cols-2" : "flex flex-col"
            )}>
                {question.options.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => onAnswer(question.id, opt.value)}
                        className={clx(
                            "relative flex flex-col group p-6 rounded-3xl border-2 transition-all duration-300 active:scale-[0.98]",
                            selectedValue === opt.value
                                ? "bg-emerald-500/10 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                : "bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/[0.07]"
                        )}
                    >
                        {question.layout === "grid" ? (
                            <div className="flex flex-col items-center text-center py-4">
                                <div className={clx(
                                    "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform duration-500 group-hover:scale-110",
                                    selectedValue === opt.value ? "bg-emerald-500 text-white shadow-lg" : "bg-white/5 text-white/50"
                                )}>
                                    {opt.icon}
                                </div>
                                <span className="text-white font-bold text-lg mb-1">{opt.label}</span>
                                {opt.sublabel && <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{opt.sublabel}</span>}
                            </div>
                        ) : (
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-x-4">
                                    <div className={clx(
                                        "w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all",
                                        selectedValue === opt.value ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-white/5 text-white/50"
                                    )}>
                                        {opt.icon}
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="text-white font-bold text-lg">{opt.label}</span>
                                        {opt.sublabel && <span className="text-xs text-zinc-500 font-medium">{opt.sublabel}</span>}
                                    </div>
                                </div>
                                <div className={clx(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                    selectedValue === opt.value ? "border-emerald-500 bg-emerald-500" : "border-white/10"
                                )}>
                                    {selectedValue === opt.value && (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    )}
                                </div>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            <div className="mt-auto pt-8 border-t border-white/5 text-center">
                <p className="text-zinc-600 text-[11px] leading-relaxed max-w-[300px] mx-auto italic">
                    “No buscamos diagnosticar ni reemplazar atención médica. Nuestro objetivo es ayudarte a conocer qué hongo medicinal puede acompañar mejor tu bienestar actual.”
                </p>
            </div>

            <div className="mt-12 text-center">
                <p className="text-[10px] text-zinc-700 uppercase tracking-[0.2em] font-bold">ORIGEN FOODS</p>
            </div>
        </div>
    )
}

export default QuizQuestion
