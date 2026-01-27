import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { RatingSummary } from "@modules/products/components/reviews/rating-summary"
import { Review } from "@lib/data/reviews"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
  reviews?: Review[]
}

const ProductInfo = ({ product, reviews }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-2 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h1"
          className="text-3xl small:text-4xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        {reviews && <RatingSummary reviews={reviews} />}

        {product.subtitle && (
          <Text className="text-ui-fg-subtle text-base small:text-lg mb-2 leading-relaxed">
            {product.subtitle}
          </Text>
        )}

        <div className="mt-2 mb-4">
          <img
            src="/images/certificados.png"
            alt="Certificados de calidad"
            className="w-full max-w-[350px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
