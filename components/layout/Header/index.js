/* eslint-disable prettier/prettier */
import { useState } from 'react';
import LogoIcon from "@/images/Logo.png"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const toggleOpen = () => {
    setOpen(!open)
  }
  return (
    <nav className="bg-pink-100">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-end md:justify-center mx-auto p-4 md:py-8 relative">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse absolute md:left-0 left-4 top-[25px]">
            <Image src={LogoIcon} className="h-8" alt="Flowbite Logo" />
        </a>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center md:hidden" aria-controls="navbar-default" aria-expanded="false" onClick={toggleOpen}>
            <span className="sr-only">Open main menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
              <g filter="url(#filter0_d_24_536)">
                <rect x="11" y="11" width="34" height="34" rx="4" stroke="#523432" stroke-width="2" shape-rendering="crispEdges"/>
              </g>
              <g filter="url(#filter1_d_24_536)">
                <line x1="17.1953" y1="19.8027" x2="38.7953" y2="19.8027" stroke="#523432" stroke-width="2"/>
              </g>
              <g filter="url(#filter2_d_24_536)">
                <line x1="17.1953" y1="27" x2="38.7953" y2="27" stroke="#523432" stroke-width="2"/>
              </g>
              <g filter="url(#filter3_d_24_536)">
                <line x1="17.1953" y1="34.1973" x2="38.7953" y2="34.1973" stroke="#523432" stroke-width="2"/>
              </g>
              <defs>
                <filter id="filter0_d_24_536" x="0" y="0" width="56" height="56" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="5"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.345098 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_24_536"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_24_536" result="shape"/>
                </filter>
                <filter id="filter1_d_24_536" x="7.19531" y="8.80273" width="41.6016" height="22" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="5"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.345098 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_24_536"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_24_536" result="shape"/>
                </filter>
                <filter id="filter2_d_24_536" x="7.19531" y="16" width="41.6016" height="22" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="5"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.345098 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_24_536"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_24_536" result="shape"/>
                </filter>
                <filter id="filter3_d_24_536" x="7.19531" y="23.1973" width="41.6016" height="22" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="5"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.345098 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_24_536"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_24_536" result="shape"/>
                </filter>
              </defs>
            </svg>
        </button>
        <div className={`${open ? '' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:mt-0 md:border-0">
            <li className="px-6 border-r-[1px] border-gray-light">
              <a href="#" className="block mb-2 md:mb-0 text-[20px] leading-none rounded md:bg-transparent md:text-pink-main md:p-0" aria-current="page">{t("home")}</a>
            </li>
            <li className="px-6 border-r-[1px] border-gray-light">
              <a href="#" className="block mb-2 md:mb-0 text-[20px] leading-none text-gray-main rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-pink-main md:p-0">{t("our_therapy")}</a>
            </li>
            <li className="px-6 border-r-[1px] border-gray-light">
              <a href="#" className="block mb-2 md:mb-0 text-[20px] leading-none text-gray-main rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-pink-main md:p-0">{t("about_us")}</a>
            </li>
            <li className="px-6 border-r-[1px] border-gray-light">
              <a href="#" className="block mb-2 md:mb-0 text-[20px] leading-none text-gray-main rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-pink-main md:p-0">{t("login")}</a>
            </li>
            <li className="px-6">
              <Link href="#" className="block mb-2 md:mb-0 text-[20px] leading-none text-gray-main rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-pink-main md:p-0" locale={`${router.locale === "en" ? 'ar' : "en"}`}>{router.locale === "en" ? 'العربية' : "en"}</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
