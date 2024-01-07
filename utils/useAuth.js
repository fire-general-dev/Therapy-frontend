import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function useAuth(shouldRedirect) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut()
    }
    // if (session && session?.error === "RefreshAccessTokenError") {
    //     signOut({ callbackUrl: '/signin', redirect: shouldRedirect });
    // }
  }, [session])
}
