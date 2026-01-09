import { Button } from "@medusajs/ui"
import { placeOrder } from "@lib/data/cart"
import React, { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "../error-message"
import Script from "next/script"

declare global {
    interface Window {
        WidgetCheckout: any;
    }
}

interface WompiPaymentButtonProps {
    cart: HttpTypes.StoreCart
    notReady: boolean
    "data-testid": string
}

export const WompiButton = ({ cart, notReady, "data-testid": dataTestId }: WompiPaymentButtonProps) => {
    const [submitting, setSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const session = cart.payment_collection?.payment_sessions?.find(
        (s) => s.status === "pending"
    )

    const onPaymentCompleted = async () => {
        await placeOrder()
            .catch((err) => {
                setErrorMessage(err.message)
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    const handlePayment = () => {
        console.log("Wompi handlePayment called")
        console.log("Session:", session)
        console.log("Window WidgetCheckout:", !!window.WidgetCheckout)
        console.log("Public Key:", process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY)

        if (!session || !window.WidgetCheckout) {
            setErrorMessage("Wompi widget not loaded or session missing")
            return
        }

        setSubmitting(true)
        setErrorMessage(null)

        try {
            const checkout = new window.WidgetCheckout({
                currency: session.currency_code.toUpperCase(),
                amountInCents: session.amount,
                // Fallback: Si la referencia del backend tiene 'undefined', usa el ID del carrito para que sea único y válido
                reference: session.data.reference?.includes("undefined")
                    ? `ref_${cart.id}_${Date.now()}`
                    : (session.data.reference || `ref_${cart.id}`),
                publicKey: process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY,
                redirectUrl: `${window.location.origin}/order/confirmed`,
            })

            console.log("Opening Wompi widget...")
            checkout.open((result: any) => {
                console.log("Wompi result:", result)
                const transaction = result.transaction
                if (transaction.status === 'APPROVED') {
                    onPaymentCompleted()
                } else {
                    setSubmitting(false)
                    if (transaction.status !== 'DECLINED') {
                        setErrorMessage(`Transaction status: ${transaction.status}`)
                    }
                }
            })
        } catch (e) {
            console.error("Error opening Wompi:", e)
            setSubmitting(false)
            setErrorMessage("Error opening payment widget")
        }
    }

    return (
        <>
            <Script
                src="https://checkout.wompi.co/widget.js"
                strategy="lazyOnload"
            />
            <Button
                disabled={notReady}
                onClick={handlePayment}
                size="large"
                isLoading={submitting}
                data-testid={dataTestId}
            >
                Pagar con Wompi
            </Button>
            <ErrorMessage error={errorMessage} data-testid="wompi-error-message" />
        </>
    )
}
