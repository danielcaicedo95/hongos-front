import { sdk } from "@lib/config"

export type ProductBenefit = {
    id: string
    h3_title: string
    subtitle: string
    description?: string
    image_url?: string
    order: number
    type?: "visual" | "accordion"
}

export async function getProductBenefits(productId: string) {
    return sdk.client
        .fetch<{ benefits: ProductBenefit[] }>(
            `/store/products/${productId}/benefits`,
            {
                method: "GET",
                next: { tags: ["benefits"] },
                cache: "force-cache",
            }
        )
        .then(({ benefits }) => benefits)
        .catch((err) => {
            console.error("Error fetching product benefits:", err)
            return []
        })
}
