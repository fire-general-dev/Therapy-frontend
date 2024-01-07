import { useEffect, useRef, useState } from "react"
import DashboardMobileLayout from "./DashboardMobileLayout"
import DashboardDesktopLayout from "./DashboardDesktopLayout"
import { useSession } from "next-auth/react"

const DashboardLayout = ({
  children,
  pageContext,
  isMobile,
  global,
  store,
  userData,
}) => {
  const { locale } = pageContext
  const isRTL = locale === "ar"

  if (typeof window !== "undefined") {
    document.getElementsByTagName("html")[0].dir = isRTL ? "rtl" : "ltr"
  }

  return (
    <>
      {isMobile ? (
        <DashboardMobileLayout
          global={global}
          store={store}
          pageContext={pageContext}
          user={userData}
        >
          {children}{" "}
        </DashboardMobileLayout>
      ) : (
        <DashboardDesktopLayout
          global={global}
          store={store}
          pageContext={pageContext}
          user={userData}
        >
          {children}
        </DashboardDesktopLayout>
      )}
    </>
  )
}

export default DashboardLayout
