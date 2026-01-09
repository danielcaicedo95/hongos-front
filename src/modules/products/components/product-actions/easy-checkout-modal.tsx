"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { Button, Heading, Text, clx } from "@medusajs/ui"
import { XMark } from "@medusajs/icons"
import Input from "@modules/common/components/input"
import { addToCart, updateCart, listCartOptions, setShippingMethod } from "@lib/data/cart"
import { useRouter } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"

type EasyCheckoutModalProps = {
    isOpen: boolean
    close: () => void
    product: HttpTypes.StoreProduct
    variant: HttpTypes.StoreProductVariant | undefined
    countryCode: string
}

export default function EasyCheckoutModal({
    isOpen,
    close,
    product,
    variant,
    countryCode,
}: EasyCheckoutModalProps) {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [quantity, setQuantity] = useState(1)

    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        city: "",
        address_1: "",
        address_2: "",
        cedula: "",
    })

    // Hardcoded for Colombia workflow as per request
    // We can assume country_code is the one from the page context or fixed if user only sells in CO
    const TARGET_COUNTRY = countryCode || "co"

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)

        if (!variant?.id) {
            setError("Please select a variant first")
            setSubmitting(false)
            return
        }

        try {
            // 1. Add to Cart
            await addToCart({
                variantId: variant.id,
                quantity: quantity,
                countryCode: TARGET_COUNTRY,
            })

            // 2. Prepare Address Data
            // We fill both shipping and billing with the same info for simplicity
            // and send metadata for Cedula
            const addressData = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                address_1: formData.address_1,
                address_2: formData.address_2, // "Detalles de dirección"
                city: formData.city,
                country_code: TARGET_COUNTRY,
                phone: formData.phone,
                // Defaulting others to avoid errors if backend validates
                company: "",
                postal_code: "",
                province: "",
            }

            const updateData: any = {
                email: formData.email,
                shipping_address: addressData,
                billing_address: addressData,
                metadata: {
                    cedula: formData.cedula
                }
            }

            // 3. Update Cart with Address & Email
            // Note: updateCart in cart.ts might expect HttpTypes.StoreUpdateCart
            // We need to match the structure. The cart.ts updateCart takes StoreUpdateCart.
            // However, cart.ts `setAddresses` handles form data. We are calling `updateCart` directly which calls sdk.store.cart.update
            await updateCart(updateData)

            // 4. Set Shipping Method (Auto-select first option)
            // We need to fetch options first.
            const optionsRes = await listCartOptions()
            const shippingOptions = optionsRes?.shipping_options

            if (shippingOptions && shippingOptions.length > 0) {
                // Just pick the first one which is usually standard shipping
                // We need the CART ID to call setShippingMethod, but setShippingMethod in cart.ts takes { cartId, shippingMethodId }
                // Wait, `listCartOptions` gets ID from cookie internally.
                // `setShippingMethod` takes object with cartId.
                // We need to get the cart ID. `addToCart` handles creating it if needed and setting cookie.
                // But `setShippingMethod` requires us to pass `cartId`.
                // Inspecting `cart.ts`, `addToCart` uses `getOrSetCart`. `updateCart` uses `getCartId`.
                // We don't have easy access to cartId here unless we fetch it.
                // Actually `listCartOptions` uses `getCartId` internally but returns options.
                // `setShippingMethod` in `cart.ts` asks for `cartId` as param... 
                // FIX: The wrapper `setShippingMethod` exported from `cart.ts` takes `{ cartId, shippingMethodId }`. 
                // We can't get cookie on client side easily if it's httpOnly. 
                // Strategy: We can rely on a Server Action to do the heavy lifting or try to retrieve cart.
                // `retrieveCart` is available in `cart.ts`.

                // Let's reload the cart to get the ID (or trust the cookie is set)
                // Actually, we can just use `updateCart` it returns the cart object!
                // Wait, `updateCart` in `cart.ts` returns the cart.

                const cart = await updateCart(updateData)
                if (cart && cart.id) {
                    await setShippingMethod({ cartId: cart.id, shippingMethodId: shippingOptions[0].id })
                }
            }

            // 5. Redirect to Payment
            router.push("/checkout?step=payment")

        } catch (err: any) {
            console.error(err)
            setError(err.message || "An error occurred. Please try again.")
            setSubmitting(false)
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[75]" onClose={close}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-opacity-75 bg-black backdrop-blur-md" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex justify-between items-center mb-4">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        Compra Rápida
                                    </Dialog.Title>
                                    <button onClick={close} className="text-gray-400 hover:text-gray-500">
                                        <XMark />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                                    {/* Quantity */}
                                    <div>
                                        <Text className="mb-1 text-small-regular text-gray-700">Cantidad</Text>
                                        <div className="flex items-center gap-x-2">
                                            <button
                                                type="button"
                                                className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            >-</button>
                                            <span className="w-8 text-center">{quantity}</span>
                                            <button
                                                type="button"
                                                className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                                                onClick={() => setQuantity(quantity + 1)}
                                            >+</button>
                                        </div>
                                    </div>

                                    {variant && (
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded mb-2">
                                            <Text className="text-small-regular text-gray-700">Total a pagar:</Text>
                                            <Text className="text-large-semi text-ui-fg-interactive">
                                                {(() => {
                                                    const { variantPrice } = getProductPrice({
                                                        product: product,
                                                        variantId: variant.id
                                                    })
                                                    // Simple formatting or use util
                                                    // variantPrice.calculated_price is a formatted string (e.g. "$10.00")
                                                    // calculated_price_number is a number
                                                    if (variantPrice?.calculated_price_number) {
                                                        // Assuming currency matches formatting
                                                        // We can try to multiply. 
                                                        // Since we don't have a robust formatter handy in this component scope without imports, 
                                                        // we will construct it or just show the unit price if multiplication is hard without currency symbol context.
                                                        // Actually Medusa's getProductPrice returns formatted string.
                                                        // Let's try to just multiply the number and format crudely or just show unit price x qty.
                                                        // Better:
                                                        const total = variantPrice.calculated_price_number * quantity
                                                        // Determine currency symbol from calculated_price string if possible or just use code
                                                        // A simple way:
                                                        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: variantPrice.currency_code ?? 'COP' }).format(total)
                                                    }
                                                    return "..."
                                                })()}
                                            </Text>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Nombre"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Input
                                            label="Apellido"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <Input
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                    <Input
                                        label="Cédula / DNI"
                                        name="cedula"
                                        value={formData.cedula}
                                        onChange={handleChange}
                                        required
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Teléfono"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Input
                                            label="Ciudad"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <Input
                                        label="Dirección"
                                        name="address_1"
                                        value={formData.address_1}
                                        onChange={handleChange}
                                        required
                                    />

                                    <Input
                                        label="Detalles de dirección (Apto, Int, Barrio)"
                                        name="address_2"
                                        value={formData.address_2}
                                        onChange={handleChange}
                                    />

                                    {error && (
                                        <div className="text-rose-500 text-small-regular">{error}</div>
                                    )}

                                    <div className="mt-4">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="w-full"
                                            isLoading={submitting}
                                            disabled={submitting}
                                        >
                                            Ir a Pagar
                                        </Button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
