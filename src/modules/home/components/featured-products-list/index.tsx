
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import PreviewPrice from "@modules/products/components/product-preview/price"
import { getCollectionByHandle } from "@lib/data/collections"
import { getProductPrice } from "@lib/util/get-product-price"

export default async function FeaturedProductsList({
    countryCode,
}: {
    countryCode: string
}) {
    const region = await getRegion(countryCode)

    if (!region) {
        return null
    }

    // 1. Intentamos obtener la colección "featured" (o "destacados")
    const featuredCollection = await getCollectionByHandle("featured").catch(
        () => null
    )

    // 2. Si existe la colección, filtramos por ella. Si no, traemos los recientes.
    const queryParams: any = {
        limit: 4,
    }

    if (featuredCollection) {
        queryParams.collection_id = [featuredCollection.id]
    }

    const {
        response: { products },
    } = await listProducts({
        countryCode,
        queryParams,
    })

    if (!products || products.length === 0) {
        return null
    }

    return (
        <div className="py-12 md:py-24 content-container">
            {/* Header Section */}
            <div className="flex flex-col items-center text-center mb-12 md:mb-16">
                <Heading
                    level="h2"
                    className="text-3xl md:text-5xl font-serif text-gray-900 mb-6 tracking-tight"
                >
                    Productos Más Destacados
                </Heading>
                <p className="text-lg text-gray-600 max-w-2xl leading-relaxed font-light">
                    Descubre el poder de la <strong>medicina natural</strong> con nuestra selección exclusiva de hongos funcionales.
                    Extractos puros para potenciar tu salud y bienestar diario.
                </p>
            </div>

            {/* Product Grid */}
            <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-6 gap-y-10 md:gap-y-16">
                {products.map((product) => {
                    const { cheapestPrice } = getProductPrice({
                        product,
                    })

                    return (
                        <li key={product.id}>
                            <LocalizedClientLink
                                href={`/products/${product.handle}`}
                                className="group block"
                            >
                                <div data-testid="product-wrapper">
                                    <Thumbnail
                                        thumbnail={product.thumbnail}
                                        images={product.images}
                                        size="full"
                                        isFeatured={true}
                                        className="rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300"
                                    />
                                    <div className="flex flex-col mt-4 gap-2">
                                        <Heading
                                            level="h3"
                                            className="text-base md:text-lg text-gray-900 font-medium group-hover:text-amber-800 transition-colors"
                                            data-testid="product-title"
                                        >
                                            {product.title}
                                        </Heading>
                                        <div className="flex items-center gap-x-2 text-gray-500 text-sm">
                                            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
                                        </div>
                                    </div>
                                </div>
                            </LocalizedClientLink>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
