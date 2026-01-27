import { sdk } from "@lib/config"
import { getAuthHeaders } from "./cookies"

export type Review = {
    id: string
    rating?: number
    rating_score?: number | string
    comment: string
    user_name: string
    created_at: string
}

export async function getProductReviews(productId: string) {
    const headers = await getAuthHeaders()

    return sdk.client
        .fetch<{ reviews: Review[] }>(
            `/store/products/${productId}/reviews`,
            {
                method: "GET",
                headers,
                next: { tags: ["reviews"] },
                cache: "no-store",
            }
        )
        .then(({ reviews }) => reviews)
        .catch((err) => {
            console.error("Error fetching reviews:", err)
            return []
        })
}
