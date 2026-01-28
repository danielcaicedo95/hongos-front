// middleware.ts
import { NextRequest, NextResponse } from "next/server"

const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "co"

export function middleware(request: NextRequest) {
  const { pathname, origin, search } = request.nextUrl

  // Ignorar recursos estáticos y APIs
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico" ||
    pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|css|js|json|ico)$/)
  ) {
    return NextResponse.next()
  }

  // Si la URL ya tiene country code (primer segmento de 2 letras), dejar pasar
  const parts = pathname.split("/")
  const first = parts[1]
  if (first && first.length === 2) {
    return NextResponse.next()
  }

  // Redirigir a la región por defecto (preserva pathname y query)
  const redirectPath = pathname === "/" ? "" : pathname
  const destination = `${origin}/${DEFAULT_REGION}${redirectPath}${search}`

  return NextResponse.redirect(destination, 307)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
