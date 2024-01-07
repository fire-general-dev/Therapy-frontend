import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
export async function middleware(request, _next) {
  const { pathname } = request.nextUrl
  const token = await getToken({ req: request })

  // Protecte Auth Routs (signin signup forget-password reset-password)
  const authProtectedRoutes = [
    "/signin",
    "/signup",
    "/forget-password",
    "/reset-password",
  ]
  const matchesAuthProtectedPath = authProtectedRoutes.some((path) =>
    pathname.startsWith(path)
  )

  if (matchesAuthProtectedPath) {
    if (token) {
      const url = new URL(`/`, request.url)
      return NextResponse.redirect(url)
    }
  }

  //  Protect User Routes
  const userProtectedRoutes = ["/dashboard", "/payment", "/cart"]
  const matchesUserProtectedPath = userProtectedRoutes.some((path) =>
    pathname.startsWith(path)
  )

  if (matchesUserProtectedPath) {
    if (!token) {
      const url = new URL(`/signin`, request.url)
      url.searchParams.set("callbackUrl", encodeURI(request.url))
      return NextResponse.redirect(url)
    }
  }

  // Protect Patient Routes
  const patientProtectedRoutes = [
    "/payment",
    "/cart",
    "/dashboard/patients/account",
    "/dashboard/patients/documents",
    "/dashboard/patients/wallet",
  ]
  const matchesPatientProtectedPath = patientProtectedRoutes.some((path) =>
    pathname.startsWith(path)
  )

  if (matchesPatientProtectedPath) {
    if (token?.role?.type == "doctors") {
      const url = new URL(`/dashboard`, request.url)
      return NextResponse.redirect(url)
    }
  }

  // Protect Doctor Routes
  const doctorProtectedRoutes = ["/dashboard/doctors"]
  const matchesProtectedPath = doctorProtectedRoutes.some((path) =>
    pathname.startsWith(path)
  )
  if (matchesProtectedPath) {
    if (token.role.type !== "doctors") {
      const url = new URL(`/dashboard`, request.url)
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}
