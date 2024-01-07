import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next"
import { ironSession } from "iron-session/express"

export const sessionConfig = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: "next-session",
}

export const sessionMiddleware = ironSession(sessionConfig)

// export function withSession(handler) {
//   return withIronSessionSsr(handler, sessionConfig)
// }

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionConfig)
}
