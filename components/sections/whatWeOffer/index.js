import React from "react"
import InfoCards from "./infoCards"
import test from "@/images/what-we-offer-1@2x.png"
import test2 from "@/images/what-we-offer-2@2x.png"
import test3 from "@/images/what-we-offer-3@2x.png"
import { extractDeviceType } from "utils/deviceType"

const dummyCard = [
  {
    mainTitle: "Get matched to the right therapist",
    color: "#A0E3E5",
    image: test,
    shortDesc:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elit orci, viverra at sem feugiat, dignissim scelerisque ligula.",
    cta: "Meet our therapists",
  },
  {
    mainTitle: "Your very own virtual clinic",
    color: "#FEF9E9",
    image: test2,
    shortDesc:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elit orci, viverra at sem feugiat, dignissim scelerisque ligula.",
    cta: "Know more",
  },
  {
    mainTitle: "Start your treatment journey and keep it up",
    color: "#C8E1FC",
    image: test3,
    shortDesc:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elit orci, viverra at sem feugiat, dignissim scelerisque ligula.",
    cta: "Sign Up Now",
  },
]

function WhatWeOffer(props) {
  const { data = {} } = props
  const { title, subTitle, offerCards } = data

  const deviceType = extractDeviceType()
  return (
    <div id="what-we-offer-section" className="wrapper mobile-background">
      <div className="main-title">{title}</div>
      <div className="sub-title">{subTitle}</div>
      <div
        className={`background ${deviceType === "desktop" ? "desktop" : ""}`}
      >
        <div className="cars-wrapper">
          {offerCards.map((item, index) => (
            <InfoCards
              key={index}
              lastItem={index === dummyCard.length - 1}
              {...item}
              index={index + 1}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .wrapper {
        }
        .main-title {
          @apply px-mb20 lg:px-vw360 font-avenirSlim text-16pxm md:text-16pxt text-center lg:text-left rtl:lg:text-right lg:text-16px mb-mb10 md:mb-10pxt lg:mb-vw10 text-green-100 uppercase;
        }
        .sub-title {
          @apply px-mb20 lg:px-vw360 font-avenirMedium text-24pxm md:text-28pxt text-center lg:text-left rtl:lg:text-right lg:text-24px text-black-3232 mb-mb80 md:mb-80pxt lg:mb-vw75;
        }
        .cars-wrapper {
          @apply px-mb20 md:px-200pxt lg:px-vw360 flex justify-between flex-col lg:flex-row lg:-translate-y-33perc;
        }

        .mobile-background {
          background: linear-gradient(to right, #f4eeee, #fff) 6% 0vw no-repeat;
          padding-top: 13%;
        }

        :global(.rtl) {
          .main-title {
            @apply lg:text-right;
          }
          .sub-title {
            @apply lg:text-right;
          }
        }

        @media (min-width: 1024px) {
          .mobile-background {
            background: none;
            padding-top: 0;
          }

          .background {
            background: linear-gradient(to right, #f4eeee, #fff) 6% 50vw
              no-repeat;
            margin-top: 13%;
            &.desktop {
              background: unset;
              background-image: linear-gradient(to right, #f4eeee, #fff);
            }
          }
        }
      `}</style>
    </div>
  )
}

export default WhatWeOffer
