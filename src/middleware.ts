// middleware.ts (reemplaza todo)
import { NextRequest, NextResponse } from "next/server"

const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "co"

export function middleware(request: NextRequest) {
  try {
    const { pathname, origin, search } = request.nextUrl

    // Ignorar recursos y APIs
    if (
      pathname.startsWith("/api") ||
      pathname.startsWith("/_next") ||
      pathname === "/favicon.ico" ||
      pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|css|js|json|ico)$/)
    ) {
      return NextResponse.next()
    }

    const parts = pathname.split("/")
    const first = parts[1]

    // Si ya tiene country code (dos letras) -> pasar
    if (first && first.length === 2) {
      return NextResponse.next()
    }

    // Redirigir a región por defecto, preservando query
    const redirectPath = pathname === "/" ? "" : pathname
    const destination = `${origin}/${DEFAULT_REGION}${redirectPath}${search}`

    return NextResponse.redirect(destination, 307)
  } catch (err) {
    // si algo rompe aquí, no matamos la app: log y dejar pasar
    console.error("Middleware fallback error:", err)
    return NextResponse.next()
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
