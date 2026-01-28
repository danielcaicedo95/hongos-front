import { NextRequest, NextResponse } from "next/server"

const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "co"

export function middleware(request: NextRequest) {
  const { pathname, origin, search } = request.nextUrl

  // Ignorar archivos estáticos
  if (pathname.includes(".")) {
    return NextResponse.next()
  }

  const pathParts = pathname.split("/")
  const countryInUrl = pathParts[1]

  // Si ya hay país en la URL → seguir normal
  if (countryInUrl && countryInUrl.length === 2) {
    return NextResponse.next()
  }

  // Redirigir a región por defecto
  const redirectUrl = `${origin}/${DEFAULT_REGION}${pathname}${search}`

  return NextResponse.redirect(redirectUrl, 307)
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
