import Image from "next/legacy/image"
import React, { useEffect, useState } from "react"
import MobileDetect from "mobile-detect"
import NextImage from "@/components/elements/image"
import Link from "next/link"

function FullImage(props) {
  const { data = {} } = props

  const {
    backgroundImageDesktop,
    backgroundImageMobile,
    ctaButton,
    title,
    smallLogo,
  } = data
  const [deviceType, setDeviceType] = useState("desktop")
  const [userAgent, setUserAgent] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const md = new MobileDetect(navigator.userAgent)

      if (md.tablet()) {
        if (deviceType !== "tablet") setDeviceType("tablet")
      } else if (md.mobile()) {
        if (deviceType !== "mobile") setDeviceType("mobile")
      } else if (deviceType !== "desktop") {
        setDeviceType("desktop")
      }
    }
  }, [deviceType, userAgent])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserAgent(navigator.userAgent)
    }
  })

  const sourceImage =
    deviceType === "desktop" ? backgroundImageDesktop : backgroundImageMobile
  return (
    <>
      <div className="mx-vw40 image_container">
        <NextImage
          media={sourceImage}
          alt="joinUs"
          customCss={{ width: "100%", height: "100%", objectFit: "cover" }}
          className="absolute rounded-xl object-cover object-left h-full lg:object-contain lg:h-auto"
        />
        <div className="content_container">
          <div className="content_section">
            <div className="logo_container">
              <NextImage media={smallLogo} width={150} />
            </div>
          </div>
          <div className="px-40vw content_section lg:pl-vw100 rtl:pr-vw100 rtl:pl-0">
            <div className="banner-title">{title}</div>
            <Link passHref href={ctaButton.url} legacyBehavior>
              <div className="banner-btn">{ctaButton.text}</div>
            </Link>
          </div>
        </div>
        {/* <Image src={sourceImage} alt="joinUs" /> */}
      </div>
      <style jsx>{`
        .image_container {
          @apply relative lg:mx-vw360 mt-mb40 mb-mb60 md:mt-40pxt md:mb-60pxt lg:my-vw100;
        }
        .content_container {
          @apply relative flex flex-col	lg:flex-row justify-between items-center px-mb100 md:px-100pxt lg:px-vw100 my-mb80 md:my-80pxt lg:my-vw80 text-white;
        }
        .banner-title {
          @apply my-mb40 md:my-60pxt lg:my-0 text-center lg:text-left rtl:lg:text-right text-24pxm md:text-28pxt lg:text-24px font-avenirMedium lg:max-w-500px w-320pxm md:w-450pxt lg:w-fit;
        }
        .banner-btn {
          @apply bg-white lg:py-vw12 lg:px-vw20 py-mb12 px-mb20 md:py-12pxt md:px-20pxt mx-auto lg:mx-0 text-18pxm md:text-22pxt lg:text-18px uppercase text-black-0 rounded-full w-fit mt-vw20 md:mt-20pxt cursor-pointer transition-all duration-500 hover:bg-gradient-to-r hover:from-pink-300 hover:to-blue-100 hover:translate-x-0.5 hover:translate-y-0.5;
        }
      `}</style>
    </>
  )
}

export default FullImage
