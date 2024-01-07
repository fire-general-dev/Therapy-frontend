import NextImage from "@/components/elements/image"
import Image from "next/image"
import Link from "next/link"
import React from "react"

function InfoCards(props) {
  const {
    title: mainTitle,
    lastItem,
    description: shortDesc,
    image,
    index,
    ctaButton,
    backgroundColor,
  } = props

  const containerClasses = ["card-container"]
  if (!lastItem)
    containerClasses.push("extra-margin rtl:lg:ml-vw20 rtl:lg:mr-0")
  return (
    <Link passHref href={ctaButton?.url || ""} legacyBehavior>
      <div className={containerClasses.join(" ")}>
        <div className="title">{mainTitle}</div>
        <div className="card-wrapper">
          <div className="image-weapper" style={{ backgroundColor }}>
            <div className="index">{index}</div>
            <div className="after"></div>
            <NextImage media={image} className="z-10" />
          </div>
          <div className="short-descr">{shortDesc}</div>
          <div className="call-to-action">{ctaButton?.text}</div>
        </div>
        <style jsx>{`
          .card-container {
            @apply relative flex-1 flex flex-col mb-mb100 md:mb-100pxt lg:mb-0 cursor-pointer;
            &:hover {
              .image-weapper .after {
                @apply visible bg-black-0;
              }
              .call-to-action {
                @apply bg-btnPrimary text-white;
              }
            }
          }
          .extra-margin {
            @apply lg:mr-vw20;
          }
          .title {
            @apply font-avenirHeavy text-black-3232 text-18pxm md:text-28pxt lg:text-24px w-full pl-33perc pr-16perc lg:pr-0;
          }
          .index {
            @apply font-avenirBlack text-white text-200pxm md:text-240pxt lg:text-200px absolute top-0 left-0 leading-4;
            -webkit-text-stroke: 3px #f0f0f0;
             {
              /* line-height: 0.95; */
            }
          }
          .card-wrapper {
            @apply flex flex-col rounded-lg bg-white flex-1;
          }
          .image-weapper {
            @apply rounded-t-lg px-vw20 flex-1 flex justify-center items-end relative;
            & .after {
              @apply rounded-t-lg absolute top-0 left-0 w-full h-full invisible text-white opacity-10;
              transition: all 0.5s ease;
            }
          }
          .short-descr {
            @apply p-mb20 md:p-20pxt lg:p-vw20 font-avenirSlim text-16pxm md:text-20pxt lg:text-16px text-black-444 text-center;
          }
          .call-to-action {
            @apply bg-white uppercase shadow-infoButton flex justify-center items-center rounded-full py-mb10 md:py-10pxt lg:py-vw10 px-mb20 lg:px-vw20 font-avenirMedium text-16pxm md:text-20pxt lg:text-16px  mx-auto min-w-1/2 translate-y-1/2 mt-auto cursor-pointer transition-colors duration-500;
          }

          :global(.rtl) {
            .extra-margin {
              @apply lg:mr-0 lg:ml-vw20;
            }
          }
        `}</style>
      </div>
    </Link>
  )
}

export default InfoCards
