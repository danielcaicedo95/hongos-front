"use client"

import React, { useState, useEffect, useMemo } from "react"
import { HttpTypes } from "@medusajs/types"
import { listProducts } from "@lib/data/products"
import QuizWelcome from "../components/quiz-welcome"
import QuizQuestion from "../components/quiz-question"
import QuizResult from "../components/quiz-result"
import { Button } from "@medusajs/ui"
import Link from "next/link"

type QuizRootProps = {
    countryCode: string
    region: HttpTypes.StoreRegion
}

export type QuizData = {
    name: string
    email: string
    answers: Record<number, string>
}

const QuizRoot: React.FC<QuizRootProps> = ({ countryCode, region }) => {
    const [step, setStep] = useState(0)
    const [quizData, setQuizData] = useState<QuizData>({
        name: "",
        email: "",
        answers: {},
    })
    const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { response } = await listProducts({
                    countryCode,
                    queryParams: { limit: 20 },
                })
                setProducts(response.products)
            } catch (error) {
                console.error("Error fetching products:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [countryCode])

    const questions = [
        {
            id: 1,
            title: "¿Cómo te has sentido en las últimas semanas?",
            subtitle: "Identifica tu estado general para personalizar tu fórmula.",
            options: [
                { label: "Cansancio frecuente", value: "energy", icon: "😴" },
                { label: "Estrés o ansiedad", value: "stress", icon: "😰" },
                { label: "Falta de concentración", value: "focus", icon: "🧠" },
                { label: "Defensas bajas", value: "immunity", icon: "🤧" },
                { label: "Inflamación o pesadez", value: "digestion", icon: "🔥" },
            ],
            layout: "list" as const,
        },
        {
            id: 2,
            title: "¿Cuál es tu principal objetivo de bienestar?",
            subtitle: "Selecciona la energía que buscas cultivar hoy.",
            options: [
                { label: "Enfoque y Memoria", value: "focus", icon: "🧠" },
                { label: "Energía y Rendimiento", value: "energy", icon: "⚡" },
                { label: "Inmunidad", value: "immunity", icon: "🛡️" },
                { label: "Relajación", value: "stress", icon: "🧘" },
            ],
            layout: "grid" as const,
        },
        {
            id: 3,
            title: "¿Cómo describirías tu ritmo de vida actual?",
            subtitle: "Elige la opción que mejor te represente.",
            options: [
                { label: "Muy activo(a)", value: "energy", icon: "⚡" },
                { label: "Bastante estrés y poco descanso", value: "stress", icon: "😵" },
                { label: "Desanimado(a) o sin motivación", value: "focus", icon: "😐" },
                { label: "Tranquilo(a), pero quiero prevenir", value: "immunity", icon: "🌿" },
            ],
            layout: "list" as const,
        },
    ]

    const totalSteps = questions.length + 1 // Welcome + Questions (Result is separate)

    const handleNext = () => {
        setStep((s) => s + 1)
    }

    const handleBack = () => {
        setStep((s) => Math.max(0, s - 1))
    }

    const handleAnswer = (questionId: number, value: string) => {
        setQuizData((prev) => ({
            ...prev,
            answers: { ...prev.answers, [questionId]: value },
        }))
        // Small delay for better UX before moving to next
        setTimeout(() => {
            handleNext()
        }, 400)
    }

    const getRecommendation = () => {
        const scores: Record<string, number> = {
            energy: 0,
            stress: 0,
            focus: 0,
            immunity: 0,
            digestion: 0,
        }

        // Weighting: Question 1 counts double as it's the "most important"
        Object.entries(quizData.answers).forEach(([qId, value]) => {
            const weight = qId === "1" ? 2 : 1
            scores[value] = (scores[value] || 0) + weight
        })

        // Find the max score
        let winnerValue = "focus" // Default
        let maxScore = -1
        Object.entries(scores).forEach(([value, score]) => {
            if (score > maxScore) {
                maxScore = score
                winnerValue = value
            }
        })

        // Map value to product handle
        const mapping: Record<string, string> = {
            energy: "cordyceps",
            stress: "reishi",
            focus: "melena-de-leon",
            immunity: "cola-de-pavo",
            digestion: "chaga",
        }

        const handle = mapping[winnerValue]
        return products.find((p) => p.handle?.toLowerCase().includes(handle.toLowerCase())) || products[0]
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="max-w-xl mx-auto min-h-screen flex flex-col relative px-6 py-8">
            {/* Header with Progress */}
            <div className="flex items-center justify-between mb-8">
                <div className="w-10" /> {/* Spacer for symmetry */}

                {step > 0 && step <= questions.length && (
                    <div className="flex-1">
                        <div className="flex justify-center gap-1.5 px-4">
                            {[...Array(questions.length)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i + 1 <= step ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-white/10'}`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="w-10" /> {/* Spacer for symmetry */}
            </div>

            {step === 0 && (
                <QuizWelcome
                    onNext={(data) => {
                        setQuizData(prev => ({ ...prev, ...data }))
                        handleNext()
                    }}
                />
            )}

            {step > 0 && step <= questions.length && (
                <QuizQuestion
                    currentStep={step}
                    totalSteps={questions.length}
                    question={questions[step - 1]}
                    onAnswer={handleAnswer}
                    onBack={handleBack}
                    selectedValue={quizData.answers[questions[step - 1].id]}
                />
            )}

            {step > questions.length && (
                <QuizResult
                    product={getRecommendation()}
                    name={quizData.name}
                    onReset={() => setStep(0)}
                />
            )}
        </div>
    )
}

export default QuizRoot
