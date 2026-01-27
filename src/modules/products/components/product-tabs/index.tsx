"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"
import { ProductBenefit } from "@lib/data/benefits"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
  benefits?: ProductBenefit[]
}

const ProductTabs = ({ product, benefits }: ProductTabsProps) => {
  const accordionBenefits = benefits?.filter(b => b.type === "accordion") || []

  const tabs = [
    {
      label: "Descripción",
      component: <ProductInfoTab product={product} />,
    },
    ...accordionBenefits.map(b => ({
      label: b.subtitle || b.h3_title,
      component: (
        <div className="text-lg small:text-xl py-6 leading-[1.6] text-zinc-800 font-medium whitespace-pre-line max-w-[800px]">
          {b.description}
        </div>
      )
    })),
    {
      label: "Envío y Devoluciones",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple" defaultValue={["Descripción"]}>
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
            className="border-b border-zinc-200"
          >
            <div className="py-4">
              {tab.component}
            </div>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-lg small:text-xl py-6 leading-[1.6] text-zinc-800 font-medium whitespace-pre-line max-w-[800px]">
      {product.description}
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-lg small:text-xl py-6 text-zinc-800 font-medium">
      <div className="grid grid-cols-1 gap-y-10">
        <div className="flex items-start gap-x-4">
          <div className="bg-blue-50 p-2 rounded-lg text-blue-600 shrink-0">
            <FastDelivery />
          </div>
          <div>
            <span className="font-bold text-zinc-900 block mb-1">Entrega rápida</span>
            <p className="max-w-xl text-zinc-600 leading-relaxed">
              Tu paquete llegará de 3 a 5 días hábiles a tu punto de recogida o en la comodidad de tu casa.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-4">
          <div className="bg-blue-50 p-2 rounded-lg text-blue-600 shrink-0">
            <Refresh />
          </div>
          <div>
            <span className="font-bold text-zinc-900 block mb-1">Cambios sencillos</span>
            <p className="max-w-xl text-zinc-600 leading-relaxed">
              ¿No es exactamente lo que esperabas? No te preocupes: cambiaremos tu producto por uno nuevo.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-4">
          <div className="bg-blue-50 p-2 rounded-lg text-blue-600 shrink-0">
            <Back />
          </div>
          <div>
            <span className="font-bold text-zinc-900 block mb-1">Devoluciones fáciles</span>
            <p className="max-w-xl text-zinc-600 leading-relaxed">
              Simplemente devuelve tu producto y te reembolsaremos tu dinero. Sin preguntas: haremos lo posible para que tu devolución sea sin complicaciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
