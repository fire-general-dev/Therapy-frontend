import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { SessionExpiredModal } from "./modal/session-expired-modal"

const AuthWrapper = ({ children }) => {
  const { data: session } = useSession()

  const { pathname } = useRouter()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut()
    }
  }, [session])

  return (
    <>
      <SessionExpiredModal
        isOpen={showModal}
        closeFunc={() => setShowModal(false)}
      />

      {children}
    </>
  )
}

export default AuthWrapper
