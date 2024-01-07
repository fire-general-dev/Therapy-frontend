import { getDoctorDataById } from "@/utils/api"
import { createStrapiAxios } from "@/utils/axiosWrapper"
import moment from "moment"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Cookies from "universal-cookie"

async function refreshAccessToken(tokenObject) {
  try {
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await createStrapiAxios(tokenObject).post(
      `/token/refresh`,
      {
        refreshToken: tokenObject.refreshToken,
      }
    )

    return {
      ...tokenObject,
      strapiToken: tokenResponse.data.jwt,
      accessToken: tokenResponse.data.jwt,
      accessTokenExpiry: moment().add(4, "m").toDate(),
      refreshToken: tokenResponse.data.refreshToken,
    }
  } catch (error) {
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    }
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password, locale } = credentials
        try {
          const user = await createStrapiAxios()
            .post(`/auth/local`, {
              identifier: username,
              password: password,
            })
            .then((res) => {
              return res.data
            })
            .then((data) => ({
              ...data.user,
              strapiToken: data.jwt,
              refreshToken: data.refreshToken,
              accessTokenExpiry: moment().add(4, "m").toDate(),
            }))

          if (!user.confirmed) {
            return null
          }

          const axiosInstance = createStrapiAxios(user)

          const updatedUser = await axiosInstance.get(
            "/users/me?populate=role,documents,doctor,identity"
          )

          const updatedUserData = {
            ...user,
            ...updatedUser.data,
            role: {
              id: updatedUser.data.role.id,
              name: updatedUser.data.role.name,
              type: updatedUser.data.role.type,
            },
          }

          if (updatedUserData.role?.type === "doctors") {
            const doctorData = await getDoctorDataById(
              updatedUserData,
              locale || "en"
            )
            updatedUserData.doctor = {
              id: updatedUser.data.doctor.id,
              title: updatedUser.data.doctor.title,
              price: updatedUser.data.doctor.price,
              speciality: updatedUser.data.doctor.speciality,
              personalImage: doctorData?.attributes.personal_image,
            }
          }

          return updatedUserData
        } catch (error) {
          console.error("Auth Error: ", error.message)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    jwt: true,
    maxAge: 7 * 24 * 60 * 60, // the session will last 30 days
  },

  callbacks: {
    async jwt({ token, user }) {
      let shouldRefreshTime
      if (user) {
        shouldRefreshTime = Math.round(
          new Date(user.accessTokenExpiry) - 30 * 1000 - Date.now()
        )
      } else {
        shouldRefreshTime = Math.round(
          new Date(token.accessTokenExpiry) - 30 * 1000 - Date.now()
        )
      }

      // If the token is still valid, just return it.
      if (shouldRefreshTime > 0) {
        return { ...token, ...user }
      }

      token = await refreshAccessToken(token)
      if (token?.error) return {}
      return { ...token, ...user }
    },

    async session({ session, token }) {
      session.accessToken = token.strapiToken

      return { ...session, ...token }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
