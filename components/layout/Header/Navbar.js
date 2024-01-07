import LogoDark from "@/components/icons/logo-dark"
import CloseIcon from "@/images/icons/Layout/Header/close-icon.svg"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import NafsiLogo from "@/components/nafsiLogo"
import { isRTLLayout } from "@/utils/helpers"
import ArabicLogo from "@/components/icons/arabic-logo"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { t } = useTranslation()

  const onLinkClick = () => {
    if (isOpen) {
      setIsOpen(false)
      document.body.style.overflow = "scroll"
    }
    // menuButton.current.classList.toggle("hiddenMenu")
  }
  return (
    <nav className="navbar">
      <div className="navbar-body">
        {isRTLLayout(router) ? <ArabicLogo /> : <NafsiLogo />}
        <div
          className={`hamburger-btn`}
          onClick={() => {
            // menuButton.current.classList.toggle("hiddenMenu")
            document.body.style.overflow = "hidden"
            setIsOpen(true)
          }}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div
          className={`menu ${isOpen ? "" : "hidden"}`}
          id="navbar-default"
          onClick={() => {
            document.body.style.overflow = "scroll"
            setIsOpen(false)
          }}
        >
          <div
            className="menu-header"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <LogoDark />
            <Image
              src={CloseIcon}
              alt="Close"
              onClick={() => {
                document.body.style.overflow = "scroll"
                setIsOpen(false)
              }}
            />
          </div>
          <ul
            className="menu-items"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <li>
              <Link passHre href="/" legacyBehavior>
                <a
                  className={router.asPath == "/home" ? "active" : ""}
                  onClick={onLinkClick}
                  aria-current="page"
                >
                  {t("home")}
                </a>
              </Link>
            </li>
            <li>
              <Link passHre href="/about" legacyBehavior>
                <a
                  className={router.asPath == "/about" ? "active" : ""}
                  onClick={onLinkClick}
                  aria-current="page"
                >
                  {t("about_nafsi")}
                </a>
              </Link>
            </li>
            <li>
              <Link passHre href="/therapists" legacyBehavior>
                <a
                  className={router.asPath == "/therapists" ? "active" : ""}
                  onClick={onLinkClick}
                  aria-current="page"
                >
                  {t("therapists")}
                </a>
              </Link>
            </li>
            <li>
              <Link passHre href="/specialties" legacyBehavior>
                <a
                  className={router.asPath == "/specialties" ? "active" : ""}
                  onClick={onLinkClick}
                  aria-current="page"
                >
                  {t("specialties")}
                </a>
              </Link>
            </li>
            <li>
              <Link passHre href="/get-started" legacyBehavior>
                <a
                  className={router.asPath == "/get-started" ? "active" : ""}
                  onClick={onLinkClick}
                  aria-current="page"
                >
                  {t("begin_your_wellness_journey")}
                </a>
              </Link>
            </li>
            {/* <li>
              <a href="#">{t("about_us")}</a>
            </li> */}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .navbar {
        }

        .navbar-body {
          @apply max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4;
        }

        .menu {
          @apply absolute md:relative top-0 left-0 pt-11 pr-7 md:pt-0 md:pr-0 bg-black-0 md:bg-transparent bg-opacity-50 md:bg-opacity-100 h-screen md:h-auto w-full md:block md:w-auto z-50;
        }

        .menu-header {
          @apply flex justify-between items-center py-4 px-6 bg-[#1BBEC3] rounded-tr-2xl md:hidden;
        }

        .menu-items {
          @apply flex flex-col gap-10 p-8 bg-white md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent h-[calc(100vh-6.25rem)] md:h-auto;
          font-family: "Poppins", sans-serif;
          a {
            @apply block text-base md:text-sm md:font-medium text-[#5B6578] hover:text-[#1BBEC3];
          }
          a.active {
            @apply block text-[#1BBEC3];
          }
        }

        .hamburger-btn {
          @apply relative duration-500 ease-in-out cursor-pointer ml-5 md:hidden;
          width: 25px;
          height: 25px;
          & span {
            @apply block absolute bg-black-0 duration-200 ease-in-out;
            height: 6px;
            width: 6px;
            border-radius: 2px;
          }
          & span:nth-child(even) {
            left: 35%;
          }
          & span:nth-child(odd) {
            left: 0px;
          }

          & span:nth-child(1),
          & span:nth-child(2),
          & span:nth-child(3) {
            top: 0px;
          }
          & span:nth-child(4),
          & span:nth-child(5),
          & span:nth-child(6) {
            top: 8px;
          }
          & span:nth-child(7),
          & span:nth-child(8),
          & span:nth-child(9) {
            top: 16px;
          }
          & span:nth-child(3) {
            left: 70%;
          }

          & span:nth-child(6) {
            left: 70%;
          }

          & span:nth-child(9) {
            left: 70%;
          }

          &.open span:nth-child(2) {
            top: 8px;
          }

          &.open span:nth-child(5) {
            left: 35%;
          }
          &.open span:nth-child(6) {
            left: 35%;
          }

          &.open span:nth-child(8) {
            top: 8px;
          }
        }
      `}</style>
    </nav>
  )
}

export default Navbar
