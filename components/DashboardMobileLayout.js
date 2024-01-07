import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import NafsiLogo from "./nafsiLogo"
import walletUserBoxIcon from "@/images/icons/wallet-user-box-icon.svg"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  dashboardRoutes,
  doctorsDashboardRoutes,
  patientsDashboardRoutes,
} from "utils/enums"
import userAvatar from "@/images/user-avatar.png"
import languageIcon from "@/images/icons/language-icon.svg"
import { RiMenu3Fill } from "react-icons/ri"
import { BsXLg } from "react-icons/bs"
import { isDoctorUser } from "@/utils/helpers"
import NextImage from "./elements/image"
import { useTranslation } from "next-i18next"
import { signOut } from "next-auth/react"
import LogoutIcon from "@/images/icons/logout-icon.svg"
import ArabicLogo from "./icons/arabic-logo"

const DashboardMobileLayout = ({ children, pageContext, user }) => {
  const { locale } = pageContext
  const [activeRoute, setActiveRoute] = useState(dashboardRoutes.dashboard)
  const [showMenu, setShowMenu] = useState(false)
  const [personalImage, setPersonalImage] = useState()
  const isRTL = locale === "ar"
  const router = useRouter()
  const { pathname, asPath, query } = router

  const nextLanguage = locale === "ar" ? "EN" : "AR"

  const onSwitchLanguage = () => {
    const nextLocale = locale === "ar" ? "en" : "ar"
    router.push({ pathname, query }, asPath, { locale: nextLocale })
  }
  const { t } = useTranslation()

  useEffect(() => {
    const currentRoute = router.route.slice(1)
    if (dashboardRoutes[currentRoute] !== activeRoute) {
      setActiveRoute(dashboardRoutes[currentRoute])
    }
  }, [router.route])

  const isDoctor = isDoctorUser(user)

  const routes = isDoctor ? doctorsDashboardRoutes : patientsDashboardRoutes

  const name = isDoctor ? user?.doctor?.title : user?.firstname

  useEffect(() => {
    if (isDoctorUser(user)) {
      setPersonalImage(user?.doctor?.personalImage)
    } else {
      setPersonalImage({
        data: {
          attributes: {
            ...user?.profile_img,
          },
        },
      })
    }
  }, [user])

  return (
    <div className={`wrapper ${isRTL ? "rtl" : ""}`}>
      <nav className="navbar">
        <div className="logo">
          {isRTL ? (
            <ArabicLogo />
          ) : (
            <NafsiLogo className="h-auto w-mb100 md:w-150pxt" />
          )}
        </div>
        <span onClick={() => setShowMenu(!showMenu)} className="menu-btn">
          {showMenu ? (
            <BsXLg className="z-50 text-blue-300" />
          ) : (
            <RiMenu3Fill className={isRTL ? "rotate-180" : ""} />
          )}
        </span>

        <div className={`overlay-layer ${showMenu ? "show-menu" : ""}`}></div>

        <div className={`sidebar ${showMenu ? "show-menu" : ""}`}>
          <div className="logo">
            {isRTL ? (
              <ArabicLogo />
            ) : (
              <NafsiLogo className="h-auto w-mb100 md:w-150pxt" />
            )}
          </div>

          <div className="lists-container">
            <ul>
              {routes.homeSection &&
                routes.homeSection.map((route) => {
                  return (
                    <li key={route.route}>
                      <Link passHref href={route.route} legacyBehavior>
                        <a>
                          <i className="bx bx-grid-alt">
                            <Image src={route.icon} alt={t(route.name)} />
                          </i>
                          <span className="links_name">{t(route.name)}</span>
                        </a>
                      </Link>
                      <span className="tooltip">{t(route.name)}</span>
                    </li>
                  )
                })}
              {routes.homeSection && <span className="divider"></span>}
              {routes.topSection.map((route) => {
                return (
                  <li key={route.route}>
                    <Link passHref href={route.route} legacyBehavior>
                      <a
                        className={route.route === activeRoute ? "active" : ""}
                        onClick={() => setShowMenu(false)}
                      >
                        <i className="bx bx-grid-alt">
                          <Image src={route.icon} alt={t(route.name)} />
                        </i>
                        <span className="links_name">{t(route.name)}</span>
                      </a>
                    </Link>
                    <span className="tooltip">{t(route.name)}</span>
                  </li>
                )
              })}
            </ul>
            <ul>
              {routes.bottomSection.map((route) => {
                return (
                  <li key={route.route}>
                    <Link passHref href={route.route} legacyBehavior>
                      <a
                        className={route.route === activeRoute ? "active" : ""}
                        onClick={() => setShowMenu(false)}
                      >
                        <i className="bx bx-grid-alt">
                          <Image src={route.icon} alt={t(route.name)} />
                        </i>
                        <span className="links_name">{t(route.name)}</span>
                      </a>
                    </Link>
                    <span className="tooltip">{t(route.name)}</span>
                  </li>
                )
              })}

              <li key={"logout"}>
                <span
                  onClick={() => signOut()}
                  className={`cursor-pointer inline-block ${
                    "/logout" === activeRoute ? "active" : ""
                  }`}
                >
                  <i className="bx bx-grid-alt items-center">
                    <Image
                      className="!w-vw20 h-vw20"
                      src={LogoutIcon}
                      alt={t("logout")}
                    />
                  </i>
                  <span className="links_name">{t("logout")}</span>
                </span>
                <span className="tooltip">{t("logout")}</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className={`user-box ${isRTL ? "rtl" : ""}`}>
        <div className="user-avatar">
          {personalImage ? (
            <NextImage
              customCss={{
                width: 60,
                height: 60,
                objectFit: "cover",
              }}
              media={personalImage}
              // className="!h-vw60"
            />
          ) : (
            <Image
              style={{ objectFit: "cover" }}
              src={userAvatar}
              layout="raw"
              alt="avatar"
              className="h-vw60 w-vw60"
            />
          )}
        </div>
        <div className="user-name">
          {t("hi")} <span>{name}</span>
        </div>
        <span className="separator"></span>
        {/* <Link href="./dashboard/patients/wallet">
          <Image
            src={walletUserBoxIcon}
            alt="wallet"
            className="w-30pxm h-30pxm md:w-30pxt md:h-30pxt cursor-pointer"
          />
        </Link>
        <span className="separator"></span> */}
        <div className="langauge-btn" onClick={onSwitchLanguage}>
          <i className="bx bx-grid-alt w-5">
            <Image src={languageIcon} alt="Language" />
          </i>
          <div className="language-text">{nextLanguage}</div>
        </div>
      </div>

      <div className="sections">{children}</div>

      <style jsx>{`
        .wrapper {
          @apply relative bg-[#f5f6fa] min-h-screen pb-mb60 md:pb-60pxt lg:pb-vw60;
        }
        .navbar {
          @apply flex justify-between;

          .logo {
            @apply flex items-center bg-blue-300 p-mb20;
            flex: 1;
          }

          .menu-btn {
            @apply flex items-center justify-center text-30pxm md:text-40pxt bg-white cursor-pointer p-mb20 transition-colors ease-in duration-300;
          }

          .overlay-layer {
            @apply absolute top-0 left-0 w-[100vw] h-full bg-black-0 opacity-0 transition-all ease-in-out duration-500 -z-20;
            pointer-events: none;
            touch-action: none;
            &.show-menu {
              @apply opacity-30 z-20;
            }
          }

          .sidebar {
            @apply -left-[100vw] fixed top-0 bottom-0 lg:hidden px-mb20 w-[80vw] md:w-[50vw] overflow-y-auto text-center bg-blue-300 z-50 transition-all ease-in duration-500;
            .logo {
              @apply mt-mb12 md:mt-12pxt mb-mb28 md:mb-28pxt flex items-center pb-mb50 md:pb-50pxt;
              border-bottom: 1px solid #fff;
            }

            &.show-menu {
              @apply left-0;
            }

            .lists-container {
              @apply h-80vh flex flex-col justify-between;
            }
            ul {
              @apply mt-mb20 md:mt-20pxt;
            }
            ul li {
              @apply relative w-full list-none mb-mb12 md:mb-12pxt;
            }

            ul li a,
            ul li span {
              @apply flex items-center text-black-333 transition-all duration-300 ease-in p-mb12 rounded-md;
              &.active {
                @apply text-black-0;
                background-color: rgba(255, 255, 255, 0.6);
              }
            }
            ul li i {
              @apply text-18pxm md:text-22pxt font-avenirMedium min-w-50pxm md:min-w-50pxt;
            }
            .divider {
              display: inline-block;
              width: 100%;
              height: 0.5px;
              background-color: #999;
            }
            .links_name {
              @apply font-avenirMedium text-18pxm md:text-22pxt transition-all duration-300 ease-in;
            }
          }
        }

        .rtl {
          .sidebar {
            @apply left-0 -right-[100vw];
            &.show-menu {
              @apply right-0;
            }
          }
        }

        .user-box {
          @apply px-mb20 md:px-24pxt lg:px-vw24 py-mb16 md:py-20pxt lg:py-vw16 rounded-2xl bg-white flex items-center mx-mb20 mt-mb20;
          &.rtl {
            @apply mr-auto ml-vw20;
          }
        }
        .separator {
          @apply inline-block h-30pxm md:h-30pxt w-[1px] mx-mb16 md:mx-24pxt bg-[#b7b7b7];
        }
        .user-avatar {
          @apply h-mb60 w-mb60 md:h-60pxt md:w-60pxt mr-mb10 md:mr-10pxt border-[#e0e0e0] rounded-xl border overflow-hidden;
        }
        .user-name {
          @apply text-20pxm md:text-20pxt lg:text-20px text-black-333 font-avenirSlim mr-auto;
          span {
            @apply font-avenirBold;
          }
        }
        .langauge-btn {
          @apply flex items-center gap-1 text-20pxm md:text-24pxt lg:text-20px cursor-pointer text-[#586C84];
           {
            /* .language-text {
            @apply h-20pxm md:h-24pxt lg:h-24px leading-tight;
          } */
          }
        }
        .more-menu {
        }
        .sections {
          @apply mx-mb20 mt-mb28 md:mt-34pxt;
        }

        :global(.rtl) {
          .user-name {
            @apply mr-0 ml-auto;
            span {
              @apply font-avenirBold;
            }
          }

          .user-avatar {
            @apply mr-0 ml-mb10 md:ml-10pxt;
          }
        }
      `}</style>
    </div>
  )
}

export default DashboardMobileLayout
