import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

import { Review } from "@lib/data/reviews"
import { ReviewsCarousel } from "@modules/products/components/reviews/reviews-carousel"
import { ReviewsList } from "@modules/products/components/reviews/reviews-list"
import { ProductBenefit } from "@lib/data/benefits"
import ProductBenefitsSection from "@modules/products/components/product-benefits-section"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
  reviews?: Review[]
  benefits?: ProductBenefit[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
  reviews,
  benefits
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-8 small:py-16 relative gap-x-12 lg:gap-x-20"
        data-testid="product-container"
      >
        {/* Gallery (Mobile: First, Desktop: First) */}
        <div className="block w-full relative flex-grow order-1">
          <ImageGallery images={images} />

          {/* Tabs moved here to fill the space below the photo in desktop */}
          <div className="hidden small:block mt-12 max-w-[800px]">
            <ProductTabs product={product} benefits={benefits} />
          </div>
        </div>

        {/* Info & Actions (Mobile: Second, Desktop: Second) */}
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[440px] w-full py-0 gap-y-8 order-2">

          <ProductInfo product={product} reviews={reviews} />

          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>

          {/* Tabs stay here for mobile only, or we can use a single one and handle visibility */}
          <div className="small:hidden">
            <ProductTabs product={product} benefits={benefits} />
          </div>

          <ProductOnboardingCta />
        </div>
      </div>

      {reviews && reviews.length > 0 && (
        <ReviewsCarousel reviews={reviews} />
      )}

      {benefits && benefits.length > 0 && (
        <ProductBenefitsSection benefits={benefits} product={product} region={region} />
      )}

      {reviews && reviews.length > 0 && (
        <ReviewsList reviews={reviews} productName={product.title} />
      )}

      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
