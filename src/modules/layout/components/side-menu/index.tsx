"use client"

import { Popover, PopoverPanel, Transition, Disclosure } from "@headlessui/react"
import { ArrowRightMini, XMark, ChevronDown } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"

const HONGOS_TYPES = [
  { name: "Reishi", href: "/hongos/reishi", icon: "🍄" },
  { name: "Melena de León", href: "/hongos/melena-de-leon", icon: "🦁" },
  { name: "Cordyceps", href: "/hongos/cordyceps", icon: "🐛" },
  { name: "Chaga", href: "/hongos/chaga", icon: "🌑" },
]

const HONGOS_BENEFITS = [
  { name: "Inmunidad", href: "/hongos/beneficio/inmunidad", icon: "🛡️" },
  { name: "Energía", href: "/hongos/beneficio/energia", icon: "⚡" },
  { name: "Enfoque mental", href: "/hongos/beneficio/enfoque-mental", icon: "🧠" },
  { name: "Estrés & sueño", href: "/hongos/beneficio/estres-sueno", icon: "🌙" },
]

const FORMAS = [
  { name: "Extractos", href: "/formas/extractos" },
  { name: "Polvos", href: "/formas/polvos" },
  { name: "Cápsulas", href: "/formas/capsulas" },
]

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none text-white"
                >
                  <div className="flex flex-col gap-y-1.5 w-6">
                    <span className={clx("h-0.5 w-full bg-current transition-all", open && "rotate-45 translate-y-2")} />
                    <span className={clx("h-0.5 w-full bg-current transition-all", open && "opacity-0")} />
                    <span className={clx("h-0.5 w-full bg-current transition-all", open && "-rotate-45 -translate-y-2")} />
                  </div>
                </Popover.Button>
              </div>

              {open && (
                <div
                  className="fixed inset-0 z-[50] bg-blue-950/40 backdrop-blur-sm pointer-events-auto"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              )}

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <PopoverPanel className="flex flex-col absolute w-[320px] h-[calc(100vh-1rem)] z-[51] inset-y-0 left-0 bg-blue-950 m-2 rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full justify-between p-8 overflow-y-auto no-scrollbar text-white"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-10" id="xmark">
                        <span className="text-2xl font-black uppercase tracking-tighter">Origen Fungi</span>
                        <button data-testid="close-menu-button" onClick={close} className="hover:text-blue-200 transition-colors">
                          <XMark />
                        </button>
                      </div>

                      <div className="flex flex-col">
                        {/* CTA - Conoce tu fórmula */}
                        <LocalizedClientLink
                          href="/conoce-tu-formula"
                          className="bg-white/10 text-white p-6 rounded-2xl text-center font-bold text-xl border border-white/20 shadow-xl transition-all active:scale-95 mb-8"
                          onClick={close}
                        >
                          Conoce tu fórmula
                        </LocalizedClientLink>

                        <div className="h-px bg-white/10 w-full mb-8" />

                        <nav className="flex flex-col">
                          {/* HONGOS COLLAPSIBLE */}
                          <Disclosure>
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="flex items-center justify-between w-full text-2xl font-bold tracking-tight py-4">
                                  <span>Hongos</span>
                                  <ChevronDown className={clx("transition-transform duration-200", open && "rotate-180")} />
                                </Disclosure.Button>
                                <Disclosure.Panel className="mt-4 flex flex-col gap-y-10 pl-4 border-l border-white/10 mb-6">
                                  <div>
                                    <p className="text-white/40 text-[10px] uppercase mb-5 tracking-[0.3em] font-black">🧬 Por tipo</p>
                                    <ul className="flex flex-col gap-y-6">
                                      {HONGOS_TYPES.map((item) => (
                                        <li key={item.name}>
                                          <LocalizedClientLink href={item.href} className="text-lg font-semibold hover:text-blue-200 flex items-center gap-x-4" onClick={close}>
                                            <span className="text-2xl">{item.icon}</span>
                                            <span>{item.name}</span>
                                          </LocalizedClientLink>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="h-px bg-white/5 w-full" />
                                  <div>
                                    <p className="text-white/40 text-[10px] uppercase mb-5 tracking-[0.3em] font-black">🎯 Por beneficio</p>
                                    <ul className="flex flex-col gap-y-6">
                                      {HONGOS_BENEFITS.map((item) => (
                                        <li key={item.name}>
                                          <LocalizedClientLink href={item.href} className="text-lg font-semibold hover:text-blue-200 flex items-center gap-x-4" onClick={close}>
                                            <span className="text-2xl">{item.icon}</span>
                                            <span>{item.name}</span>
                                          </LocalizedClientLink>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>

                          <div className="h-px bg-white/10 w-full" />

                          {/* FORMAS COLLAPSIBLE */}
                          <Disclosure>
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="flex items-center justify-between w-full text-2xl font-bold tracking-tight py-4">
                                  <span>Formas</span>
                                  <ChevronDown className={clx("transition-transform duration-200", open && "rotate-180")} />
                                </Disclosure.Button>
                                <Disclosure.Panel className="mt-2 flex flex-col gap-y-2 pl-4 border-l border-white/10 mb-4">
                                  {FORMAS.map((item) => (
                                    <LocalizedClientLink key={item.name} href={item.href} className="text-lg font-semibold hover:text-blue-200 py-3 block" onClick={close}>
                                      {item.name}
                                    </LocalizedClientLink>
                                  ))}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>

                          <div className="h-px bg-white/10 w-full" />

                          <LocalizedClientLink href="/sobre-nosotros" className="text-2xl font-bold tracking-tight py-4 hover:text-blue-200" onClick={close}>
                            Sobre nosotros
                          </LocalizedClientLink>

                          <div className="h-px bg-white/10 w-full" />

                          <LocalizedClientLink href="/contacto" className="text-2xl font-bold tracking-tight py-4 hover:text-blue-200" onClick={close}>
                            Contacto
                          </LocalizedClientLink>
                        </nav>
                      </div>
                    </div>

                    <div className="mt-10 pt-10 flex flex-col items-center">
                      <div className="w-full mb-8 overflow-hidden rounded-xl border border-white/5">
                        <Image
                          src="/images/fondo-para-menu.png"
                          alt="Origen Fungi"
                          width={400}
                          height={200}
                          className="object-contain w-full"
                        />
                      </div>

                      <div className="flex flex-col gap-y-5 w-full pt-8 border-t border-white/10">
                        {!!locales?.length && (
                          <div className="flex justify-between items-center text-sm font-bold">
                            <LanguageSelect
                              toggleState={languageToggleState}
                              locales={locales}
                              currentLocale={currentLocale}
                            />
                            <ArrowRightMini
                              className={clx(
                                "transition-transform duration-150 text-white/30",
                                languageToggleState.state ? "-rotate-90" : ""
                              )}
                            />
                          </div>
                        )}
                        <div className="flex justify-between items-center text-sm font-bold">
                          {regions && (
                            <CountrySelect
                              toggleState={countryToggleState}
                              regions={regions}
                            />
                          )}
                          <ArrowRightMini
                            className={clx(
                              "transition-transform duration-150 text-white/30",
                              countryToggleState.state ? "-rotate-90" : ""
                            )}
                          />
                        </div>
                      </div>
                      <Text className="text-white/30 text-[10px] text-center mt-10 font-bold uppercase tracking-widest">
                        © {new Date().getFullYear()} Origen Fungi.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
