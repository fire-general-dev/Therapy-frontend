/* eslint-disable @next/next/no-img-element */
import NafsiLogo from "@/components/nafsiLogo"
import React, { useRef, useState } from "react"
import MenuItems from "./menuItems"

import { motion } from "framer-motion"
import { useDimensions } from "utils/useDimensions"
import { Navigation } from "./navigation"
import { MenuToggle } from "./menuToggle"
import HeroBackground from "@/components/elements/HeroBackground"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { signOut, useSession } from "next-auth/react"

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at -40px -40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 100,
      damping: 40,
    },
  },
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)
  const router = useRouter()
  const { pathname, asPath, query, locale } = router
  const { t } = useTranslation()

  const { data: session } = useSession()

  const nextLanguage = locale === "ar" ? "English" : "العربية"

  const onSwitchLanguage = () => {
    const nextLocale = locale === "ar" ? "en" : "ar"
    router.push({ pathname, query }, asPath, { locale: nextLocale })
  }

  const onSignInClick = () => {
    router.push("/signin")
  }

  const onLogoutClick = () => {
    router.push("/logout")
  }

  const goToDashboard = () => {
    router.push("/dashboard")
  }

  const toggleOpen = () => {
    if (!isOpen) {
      containerRef.current.classList.remove("lg:hidden")
      containerRef.current.classList.remove("hidden")
      setIsOpen(true)
    } else {
      setIsOpen(false)
      setTimeout(() => containerRef.current.classList.add("lg:hidden"), 1000)
      setTimeout(() => containerRef.current.classList.add("hidden"), 1000)
    }
  }

  return (
    <div className="header-wrapper">
      <div className={`upper-header relative z-40`}>
        <div className="link" onClick={onSwitchLanguage}>
          {nextLanguage}
        </div>
        {session ? (
          <div className="items-wrapper">
            <div className="link" onClick={goToDashboard}>
              {t("dashboard")}
            </div>
            <span className="separator">|</span>
            <div className="link" onClick={() => signOut()}>
              {t("logout")}
            </div>
          </div>
        ) : (
          <div className="link" onClick={onSignInClick}>
            {t("signin_signup")}
          </div>
        )}
      </div>
      <div className="lower-header">
        <NafsiLogo />
        <MenuItems isOpen={isOpen} toggle={() => toggleOpen()} />
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
          className={`fixed top-0 right-0 left-0 bottom-0 w-screen hidden lg:hidden z-30`}
        >
          <motion.div
            className="absolute top-0 right-0 left-0 bottom-0 w-screen h-screen z-30"
            variants={sidebar}
          >
            <HeroBackground customClasses="!h-full" />
          </motion.div>
          <Navigation isOpen={isOpen} toggle={() => toggleOpen()} />
          {/* <MenuToggle toggle={() => toggleOpen()} /> */}
        </motion.nav>
        {/* </nav> */}
      </div>
      <style jsx>{`
        .header-wrapper {
          @apply lg:absolute z-30 w-full;
        }
        .upper-header {
          @apply flex justify-between w-full bg-black-333 text-gray-f0 py-2.5 px-5 lg:px-vw60 lg:py-vw10;
          & .link {
            @apply cursor-pointer transition-colors ease-in hover:text-white;
          }
        }
        .lower-header {
          @apply flex justify-between p-5 lg:px-vw360 lg:py-vw20 bg-transparent absolute w-full lg:relative;
        }
        .background {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 100vw;
          background: #fff;
        }
        .items-wrapper {
          @apply flex gap-2;
        }
        .separator {
          @apply text-[#F0F0F0] mx-mb6 md:mx-6pxt lg:mx-vw06;
        }
      `}</style>
    </div>
  )
}

export default Header
