import { useEffect, useRef } from "react"

//TODO: need to add dependincies for the user authenticated so can start counting else no need to fire it up
const useInactivityLogout = (
  logoutFunction,
  inactivityTime = 900000,
  session,
  pathname
) => {
  //* 900000ms = 15 minutes
  const activityTimeout = useRef(null)

  useEffect(() => {
    if (session && pathname !== "/dashboard/meeting/[meetingId]") {
      const resetTimer = () => {
        clearTimeout(activityTimeout.current)
        activityTimeout.current = setTimeout(logoutFunction, inactivityTime)
      }

      resetTimer()

      //* Listen for user activities
      window.addEventListener("mousemove", resetTimer)
      window.addEventListener("mousedown", resetTimer)
      window.addEventListener("keypress", resetTimer)
      window.addEventListener("touchmove", resetTimer)
      window.addEventListener("onscroll", resetTimer)
      window.addEventListener("click", resetTimer)

      return () => {
        //* Cleanup
        window.removeEventListener("mousemove", resetTimer)
        window.removeEventListener("mousedown", resetTimer)
        window.removeEventListener("keypress", resetTimer)
        window.removeEventListener("touchmove", resetTimer)
        window.removeEventListener("onscroll", resetTimer)
        window.removeEventListener("click", resetTimer)
      }
    }
  }, [logoutFunction, inactivityTime, session, pathname])
}

export default useInactivityLogout
