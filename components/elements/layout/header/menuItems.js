/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import menuSVG from "public/images/menu.svg"
import Link from "next/link"

function MenuItems(props) {
  const { toggle, isOpen } = props
  const menuButton = useRef()
  const router = useRouter()
  const { t } = useTranslation("common")

  const onLinkClick = () => {
    if (isOpen) toggle()
    // menuButton.current.classList.toggle("hiddenMenu")
  }

  return (
    <div className="menu-container">
      <div
        className={`navbar-list ${isOpen ? "hiddenMenu" : ""}`}
        id="mobile-menu"
        ref={menuButton}
      >
        <ul>
          <li>
            <Link passHre href="/" legacyBehavior>
              <a
                className={router.asPath == "/" ? "active" : ""}
                onClick={onLinkClick}
                aria-current="page"
              >
                {t("home")}
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
            <Link passHre href="/quizzes" legacyBehavior>
              <a
                className={router.asPath == "/quizzes" ? "active" : ""}
                onClick={onLinkClick}
                aria-current="page"
              >
                {t("am_ok")}
              </a>
            </Link>
          </li>
          <li>
            <a href="/#what-we-offer-section">{t("the_how")}</a>
          </li>
        </ul>
      </div>

      <div
        className={`hamburger-btn ${isOpen ? "open" : ""}`}
        onClick={() => {
          // menuButton.current.classList.toggle("hiddenMenu")
          toggle()
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
      {/* <img
        alt="menu"
        {...menuSVG}
        className="button"
        onClick={() => {
          menuButton.current.classList.toggle("hiddenMenu")
          toggle()
        }}
      /> */}
      <style jsx>{`
        .menu-container {
          @apply flex flex-wrap justify-between items-center z-40;
        }
        .navbar-list {
          @apply w-full hidden lg:block lg:w-auto;
          &.hiddenMenu {
            @apply hidden;
          }
          ul {
            @apply flex flex-col mt-4 font-avenirMedium lg:flex-row lg:mt-0 lg:text-16px;
            li {
              @apply lg:ml-vw40;
            }

            a {
              @apply relative block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-btnPrimary lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700;
              &:hover:after {
                transform: scaleX(1);
                transform-origin: bottom left;
              }
              &:after {
                @apply w-full absolute;
                content: "";
                transform: scaleX(0);
                height: 0.5px;
                max-height: 0.5px;
                bottom: 0;
                left: 0;
                background-color: #1bbec3;
                transform-origin: bottom left;
                transition: transform 0.5s ease-in-out;
              }
              &.active {
                @apply block py-2 pr-4 pl-3 text-white bg-btnPrimary rounded lg:bg-transparent lg:text-btnPrimary lg:p-0 dark:text-white;
                &:after {
                  transform: scaleX(1);
                  transform-origin: bottom left;
                }
              }
            }
          }
        }

        .button {
          @apply block ml-8;
        }

        .hamburger-btn {
          @apply relative duration-500 ease-in-out cursor-pointer ml-5;
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

        :global(.rtl) {
          .hamburger-btn {
            @apply ml-0 mr-5;
          }
          .navbar-list {
            ul {
              li {
                @apply ml-0 mr-vw40;
              }
            }
          }
        }
      `}</style>
    </div>
  )
}

export default MenuItems
