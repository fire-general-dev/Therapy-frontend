import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import NafsiLogo from "./nafsiLogo"
import menuBtn from "@/images/icons/dashboard_menu_btn.svg"
import miniLogo from "@/images/icons/favicon.svg"
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
import { isDoctorUser, isRTLLayout } from "@/utils/helpers"
import { useTranslation } from "next-i18next"
import NextImage from "./elements/image"
import LogoutIcon from "@/images/icons/logout-icon.svg"
import { signOut } from "next-auth/react"
import ArabicLogo from "./icons/arabic-logo"

const DashboardDesktopLayout = ({ children, pageContext, user }) => {
  const { locale } = pageContext
  const sideBarRef = useRef(null)
  const [activeRoute, setActiveRoute] = useState(dashboardRoutes.dashboard)
  const [sidebarActive, setSidebarActive] = useState(true)
  const [personalImage, setPersonalImage] = useState()
  const contentWrapperRef = useRef(null)
  const isRTL = locale === "ar"
  const router = useRouter()
  const { pathname, asPath, query } = router
  const { t } = useTranslation()

  const nextLanguage = locale === "ar" ? "EN" : "AR"

  const onSwitchLanguage = () => {
    const nextLocale = locale === "ar" ? "en" : "ar"
    router.push({ pathname, query }, asPath, { locale: nextLocale })
  }

  const isDoctor = isDoctorUser(user)

  const routes = isDoctor ? doctorsDashboardRoutes : patientsDashboardRoutes

  useEffect(() => {
    const currentRoute = router.route.slice(1)
    if (dashboardRoutes[currentRoute] !== activeRoute) {
      setActiveRoute(dashboardRoutes[currentRoute])
    }
  }, [router.route])

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

  const name = isDoctor ? user?.doctor?.title : user?.firstname

  return (
    <div className={`wrapper ${isRTL ? "rtl" : ""}`}>
      {/* <Script src={twElement} /> */}
      <div
        ref={sideBarRef}
        className={`sidebar ${sidebarActive ? "active" : ""} ${
          isRTL ? "rtl" : ""
        }`}
      >
        <div className="logo_content">
          <div className="logo">
            <div className="logo_name">
              {isRTL ? <ArabicLogo /> : <NafsiLogo />}
            </div>
          </div>
          <div className="logo-mini">
            <div className="logo_name">
              <Image src={miniLogo} layout="raw" alt="logo" />
            </div>
          </div>
        </div>
        <ul className="nav_list">
          {routes.homeSection &&
            routes.homeSection.map((route) => {
              return (
                <li key={route.route}>
                  <Link passHref href={route.route} legacyBehavior>
                    <a>
                      <i className="bx bx-grid-alt items-center">
                        <Image
                          className="!w-vw20 h-vw20"
                          src={route.icon}
                          alt={t(route.name)}
                        />
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
                  <a className={route.route === activeRoute ? "active" : ""}>
                    <i className="bx bx-grid-alt items-center">
                      <Image
                        className="!w-vw20 h-vw20"
                        src={route.icon}
                        alt={t(route.name)}
                      />
                    </i>
                    <span className="links_name">{t(route.name)}</span>
                  </a>
                </Link>
                <span className="tooltip">{t(route.name)}</span>
              </li>
            )
          })}
        </ul>
        <ul className="nav_list bottom">
          {routes.bottomSection.map((route) => {
            return (
              <li key={route.route}>
                <Link passHref href={route.route} legacyBehavior>
                  <a className={route.route === activeRoute ? "active" : ""}>
                    <i className="bx bx-grid-alt items-center">
                      <Image
                        className="!w-vw20 h-vw20"
                        src={route.icon}
                        alt={t(route.name)}
                      />
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
      <main
        ref={contentWrapperRef}
        className={`contentWrapper ${sidebarActive ? "active" : ""} ${
          isRTL ? "rtl" : ""
        }`}
      >
        <div className={`dashboard-header ${isRTL ? "rtl" : ""}`}>
          <Image
            layout="raw"
            src={menuBtn}
            alt="menu"
            id="btn"
            className="!w-vw24 !h-vw24"
            onClick={() => {
              // sideBarRef.current.classList.toggle("active")
              // contentWrapperRef.current.classList.toggle("active")
              setSidebarActive(!sidebarActive)
            }}
            // className="btn"
          />
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
                className="w-30px h-30px cursor-pointer"
              />
            </Link>
            <span className="separator"></span> */}
            <div className="langauge-btn" onClick={onSwitchLanguage}>
              <i className="bx bx-grid-alt">
                <Image
                  className="!w-vw24 !h-vw24"
                  src={languageIcon}
                  alt="Language"
                />
              </i>
              <div className="language-text">{nextLanguage}</div>
            </div>
          </div>
        </div>
        <div className="sections">{children}</div>
      </main>
      <style jsx>{`
        .wrapper {
          @apply flex min-h-screen overflow-hidden bg-blue-300;
          &.rtl {
            @apply flex-row-reverse;
          }
        }
        .contentWrapper {
          @apply bg-[#f5f6fa] h-screen rounded-l-3xl py-vw20 px-vw46 overflow-scroll w-[calc(100%-2.865vw)];
           {
            /* width: calc(100% - 55px); */
          }
          transition: all 0.5s ease;
          position: fixed;
          right: 0;
          left: auto;
          &.active {
            @apply w-[calc(100%-12.5vw)];
          }
          &.rtl {
            @apply rounded-r-3xl rounded-l-none;
            left: 0;
            right: auto;
          }
        }
        .sidebar {
          @apply bg-blue-300 pt-vw60 pb-vw20 fixed top-0 left-0 right-auto h-full flex flex-col z-[99] w-55px;
          transition: all 0.5s ease;

          &.rtl {
            left: auto;
            right: 0;
          }
          &.active {
            @apply w-240px;

            .logo_content .logo {
              opacity: 1;
              pointer-events: none;
            }
            .logo_content .logo-mini {
              opacity: 0;
              pointer-events: none;
            }
            .logo_content .logo .logo_name,
            .logo_content .logo-mini .logo_name {
              display: flex;
              justify-content: center;
            }

            ul li .tooltip {
              display: none;
            }
            .links_name {
              transition: 0s;
              opacity: 1;
              pointer-events: auto;
            }

            .content .user {
              background: #333;
            }
            .user .user_details {
              opacity: 1;
              pointer-events: auto;
            }
            ~ .home_content {
              z-index: 100;
              width: calc(100% - 12.5vw);
              left: 12.5vw;
            }
          }
          .logo_content {
            @apply relative;
          }
          .logo_content .logo {
            @apply flex justify-start px-vw16 items-center h-vw60 w-full opacity-0 mb-vw10;
            pointer-events: none;
            transition: all 0.5s ease;
            @apply mb-vw10;
          }

          .logo_content .logo-mini {
            @apply h-vw60;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            opacity: 1;
            pointer-events: none;
            transition: all 0.5s ease;
            @apply mb-vw75 absolute top-0;
          }

          .logo_content .logo-mini .logo_name {
            @apply p-vw06;
          }

          ul {
            @apply mt-vw20;
          }
          ul li {
            @apply relative h-vw40 w-full my-vw08 mx-0 leading-60px;
            list-style: none;
          }
          ul li .tooltip {
            @apply left-auto right-vw08 h-vw40 w-vw120 leading-40px;
            position: absolute;
            top: 0;
            transform: translate(-50%, -50%);
            border-radius: 6px;
            background: white;
            text-align: center;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
            transition: 0s;
            opacity: 0;
            pointer-events: none;
            display: block;
          }
          ul li .tooltip::before {
            content: "";
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-right: ${isRTL ? "none" : "10px solid white"};
            border-left: ${isRTL ? "10px solid white" : "none"};
            position: absolute;
            left: ${isRTL ? "auto" : "-8px"};
            right: ${isRTL ? "-8px" : "auto"};
            top: 7px;
          }

          ul li:hover .tooltip {
            transition: all 0.5s ease;
            opacity: 1;
            top: 50%;
          }

          ul li input {
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
            border-radius: 12px;
            outline: none;
            border: none;
            background: #1d1b31;
            padding-left: 50px;
            font-size: 18px;
            color: #333333;
          }

          ul li .bx-search {
            position: relative;
            z-index: 99;
            color: white;
            font-size: 22px;
            transition: all 0.5s ease;
          }

          ul li a,
          ul li span {
            color: #333333;
            display: flex;
            align-items: center;
            text-decoration: none;
            white-space: nowrap;
            transition: all 0.4s ease;
            &.active {
              color: #000;
              background-color: rgba(255, 255, 255, 0.6);
            }
          }

          ul li a:hover,
          ul li span:hover {
            color: #000;
            background-color: rgba(255, 255, 255, 0.6);
          }
          ul li i {
            @apply text-18px h-vw40 min-w-55px leading-40px;
            font-weight: 400;
            display: flex;
            justify-content: center;
          }
          .divider {
            display: inline-block;
            width: 100%;
            height: 0.5px;
            background-color: #999;
          }
          .links_name {
            @apply text-16px leading-40px;
            font-weight: 400;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
          }
          .content {
            @apply bg-[#f5f6fa];
            position: absolute;
            color: white;
            bottom: 0;
            left: 0;
            width: 100%;
          }
          .content .user {
            @apply h-vw60 py-vw10 px-vw06;
            position: relative;
            background: none;
            transition: all 0.4s ease;
          }
          .content .user .user_details {
            display: flex;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            white-space: nowrap;
            transition: all 0.4s ease;
          }
          .content .user .user_details img {
            @apply h-vw46 w-vw46;
            object-fit: cover;
            border-radius: 12px;
          }
          .user_details .name {
            @apply text-16px;
            font-weight: 400;
          }
          .user_details .job {
            @apply text-12px;
          }
          .bottom {
            margin-top: auto;
          }
        }
        .dashboard-header {
          @apply flex justify-between bg-transparent relative;
          &.rtl {
            @apply flex-row-reverse;
          }
        }
        .user-box {
          @apply mr-vw20 ml-auto px-vw24 py-vw16 rounded-2xl bg-white flex items-center;
          &.rtl {
            @apply mr-auto ml-vw20;
          }
        }
        .separator {
          @apply inline-block h-vw30 w-[1px] mx-vw24 bg-[#b7b7b7];
        }
        .user-avatar {
          @apply h-vw60 w-vw60 mr-vw10 border-[#e0e0e0] rounded-xl border overflow-hidden;
        }
        .user-name {
          @apply text-20pxm lg:text-20px text-black-333 font-avenirSlim mr-auto;
          span {
            @apply font-avenirBold;
          }
        }
        .langauge-btn {
          @apply font-avenirBold flex items-center gap-vw10 text-20pxm md:text-24pxt lg:text-24px cursor-pointer text-[#586C84];
           {
            /* .language-text {
            @apply lg:h-24px leading-tight;
          } */
          }
        }
        .more-menu {
        }
        .sections {
          @apply mt-vw30;
        }

        :global(.rtl) {
          .user-name {
            @apply mr-0 ml-auto;
            span {
              @apply font-avenirBold;
            }
          }

          .user-avatar {
            @apply mr-0 ml-vw10;
          }
        }

        .sidebar {
          ul li .tooltip {
            @apply right-auto left-vw08;
          }
        }
      `}</style>
      <style jsx global>{`
        #btn {
          color: #333333;
          position: absolute;
          top: 2vw;
          left: 0%;
          text-align: center;
          cursor: pointer;
          left: ${isRTL ? "auto" : "0%"};
          right: ${isRTL ? "0%" : "auto"};
        }

        .rtl {
          #btn {
            text-align: center;
            cursor: pointer;
            left: auto;
            right: 0;
            transform: rotate(180deg);
          }
        }
      `}</style>
    </div>
  )
}

export default DashboardDesktopLayout
