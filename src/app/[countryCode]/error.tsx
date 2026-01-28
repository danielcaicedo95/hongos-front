"use client"

import { Button, Heading, Text } from "@medusajs/ui"
import { useEffect } from "react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    const isTimeout =
        error.message?.includes("504") ||
        error.message?.includes("timeout") ||
        error.digest?.includes("1752752386") // Specific digest from Vercel

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-24 text-center bg-[#0a2342] text-white">
            <Heading className="text-3xl font-black uppercase tracking-widest text-blue-200 mb-4">
                {isTimeout ? "El servidor se está despertando" : "Algo salió mal"}
            </Heading>
            <Text className="text-lg max-w-md mb-8 text-blue-100">
                {isTimeout
                    ? "Nuestro servidor en la nube se 'duerme' para ahorrar energía. Está arrancando ahora mismo, esto tarda unos 30-60 segundos."
                    : "Ha ocurrido un error inesperado al cargar la página."}
            </Text>
            <div className="flex gap-4">
                <Button
                    variant="secondary"
                    className="bg-blue-600 hover:bg-blue-500 text-white border-none px-8 py-2"
                    onClick={() => reset()}
                >
                    {isTimeout ? "Reintentar ahora" : "Intentar de nuevo"}
                </Button>
                <Button
                    variant="transparent"
                    className="text-white hover:text-blue-200"
                    onClick={() => window.location.reload()}
                >
                    Refrescar página
                </Button>
            </div>
            {isTimeout && (
                <Text className="mt-8 text-sm text-blue-300 italic">
                    Tip: Si acabas de ver este mensaje, espera 15 segundos antes de reintentar.
                </Text>
            )}
        </div>
    )
}
