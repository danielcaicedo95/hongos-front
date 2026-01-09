import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import NavMenu from "@modules/layout/components/nav-menu"
import { MagnifyingGlass } from "@medusajs/icons"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <header className="relative h-20 mx-auto border-b duration-200 bg-[#0a2342]/90 backdrop-blur-md border-white/5 text-white">
        <nav className="content-container flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center lg:hidden">
            <div className="h-full">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-black uppercase text-white tracking-widest hover:text-blue-200 transition-colors pr-8 whitespace-nowrap"
              data-testid="nav-store-link"
            >
              Origen Fungi
            </LocalizedClientLink>

            <NavMenu />
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="flex items-center gap-x-8 h-full font-bold">
              <LocalizedClientLink
                className="hover:text-blue-200 transition-colors duration-200 text-white"
                href="/search"
                data-testid="nav-search-link"
              >
                <MagnifyingGlass className="w-5 h-5" />
              </LocalizedClientLink>

              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-blue-200 transition-colors text-white"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
