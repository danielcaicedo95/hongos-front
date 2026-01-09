"use client"

import { Popover, Transition } from "@headlessui/react"
import { ChevronDown } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Fragment } from "react"
import { clx } from "@medusajs/ui"

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

const NavMenu = () => {
    return (
        <div className="hidden lg:flex items-center h-full">
            {/* Divider after logo is handled in Nav.tsx or here */}
            <div className="h-full w-px bg-white/20" />

            {/* 2️⃣ BOTÓN PRINCIPAL (CTA) */}
            <div className="px-8">
                <LocalizedClientLink
                    href="/conoce-tu-formula"
                    className="bg-blue-800/40 hover:bg-blue-800/60 text-white px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 shadow-lg backdrop-blur-md border border-white/30 whitespace-nowrap"
                >
                    Conoce tu fórmula
                </LocalizedClientLink>
            </div>

            <div className="h-full w-px bg-white/20" />

            {/* 3️⃣ HONGOS (MENÚ DESPLEGABLE) */}
            <Popover className="relative h-full flex items-center px-8">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={clx(
                                "flex items-center gap-x-1 outline-none transition-colors duration-200 hover:text-blue-200",
                                open ? "text-blue-100 font-bold" : "text-white/70"
                            )}
                        >
                            <span className="text-base font-medium">Hongos</span>
                            <ChevronDown
                                className={clx("transition-transform duration-200 w-4 h-4", open && "rotate-180")}
                            />
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-2"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-2"
                        >
                            <Popover.Panel className="absolute top-full left-1/2 -translate-x-1/2 z-50 mt-2 w-[520px] rounded-3xl bg-white p-10 shadow-2xl border border-gray-100 text-gray-900">
                                <div className="grid grid-cols-2 gap-x-16 relative">
                                    {/* Vertical Divider Inside Dropdown */}
                                    <div className="absolute left-1/2 top-4 bottom-4 w-px bg-gray-100 -translate-x-1/2" />

                                    <div>
                                        <h3 className="text-blue-950 font-black mb-8 text-xs uppercase tracking-[0.3em]">
                                            🧬 Por tipo
                                        </h3>
                                        <ul className="flex flex-col gap-y-6">
                                            {HONGOS_TYPES.map((item) => (
                                                <li key={item.name}>
                                                    <LocalizedClientLink
                                                        href={item.href}
                                                        className="flex items-center gap-x-5 text-gray-600 hover:text-blue-700 transition-all duration-200 group"
                                                    >
                                                        <span className="text-2xl group-hover:scale-125 transition-transform duration-300 ease-out">{item.icon}</span>
                                                        <span className="font-semibold text-lg">{item.name}</span>
                                                    </LocalizedClientLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-blue-950 font-black mb-8 text-xs uppercase tracking-[0.3em]">
                                            🎯 Beneficio
                                        </h3>
                                        <ul className="flex flex-col gap-y-6">
                                            {HONGOS_BENEFITS.map((item) => (
                                                <li key={item.name}>
                                                    <LocalizedClientLink
                                                        href={item.href}
                                                        className="flex items-center gap-x-5 text-gray-600 hover:text-blue-700 transition-all duration-200 group"
                                                    >
                                                        <span className="text-2xl group-hover:scale-125 transition-transform duration-300 ease-out">{item.icon}</span>
                                                        <span className="font-semibold text-lg">{item.name}</span>
                                                    </LocalizedClientLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>

            <div className="h-full w-px bg-white/20" />

            {/* 4️⃣ FORMAS (MENÚ DESPLEGABLE) */}
            <Popover className="relative h-full flex items-center px-8">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={clx(
                                "flex items-center gap-x-1 outline-none transition-colors duration-200 hover:text-blue-200",
                                open ? "text-blue-100 font-bold" : "text-white/70"
                            )}
                        >
                            <span className="text-base font-medium">Formas</span>
                            <ChevronDown
                                className={clx("transition-transform duration-200 w-4 h-4", open && "rotate-180")}
                            />
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-2"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-2"
                        >
                            <Popover.Panel className="absolute top-full left-1/2 -translate-x-1/2 z-50 mt-2 w-64 rounded-3xl bg-white p-6 shadow-2xl border border-gray-100 text-gray-900">
                                <ul className="flex flex-col gap-y-2">
                                    {FORMAS.map((item) => (
                                        <li key={item.name}>
                                            <LocalizedClientLink
                                                href={item.href}
                                                className="block py-4 px-5 rounded-2xl hover:bg-blue-50 text-gray-600 hover:text-blue-700 font-semibold transition-all duration-200"
                                            >
                                                {item.name}
                                            </LocalizedClientLink>
                                        </li>
                                    ))}
                                </ul>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>

            <div className="h-full w-px bg-white/20" />

            {/* 5️⃣ SOBRE NOSOTROS */}
            <LocalizedClientLink
                href="/sobre-nosotros"
                className="text-white/70 hover:text-blue-200 transition-colors duration-200 px-8 h-full flex items-center text-base font-medium whitespace-nowrap"
            >
                Sobre nosotros
            </LocalizedClientLink>

            <div className="h-full w-px bg-white/20" />

            {/* 6️⃣ CONTACTO */}
            <LocalizedClientLink
                href="/contacto"
                className="text-white/70 hover:text-blue-200 transition-colors duration-200 px-8 h-full flex items-center text-base font-medium"
            >
                Contacto
            </LocalizedClientLink>
        </div>
    )
}

export default NavMenu
