import Image from "next/image"
import React from "react"
import locationIcon from "@/images/icon-location.svg"
import storesIcon from "@/images/stories.svg"
import NextImage from "../image"

function VideoPic({ item, isMobile }) {
  return (
    <>
      <div key={item.id} className={`video-pic ${isMobile ? "mobile" : ""}`}>
        <div className="graident">
          <div className="bottom-wrapper">
            <span className="text">Watch Video</span>
            <div className="watch glass">
              <Image layout="raw" src={storesIcon} alt="stores" />
            </div>
          </div>
        </div>
        <div className="image-wrapper">
          <NextImage media={item.doctorImage} alt={item.name} />
        </div>
      </div>
      <style jsx>{`
        .video-pic {
          @apply relative max-w-150pxm lg:max-w-0 lg:ml-vw75 rounded overflow-hidden mt-auto;
          min-height: 363px;
          min-width: 263px;
          &.mobile {
            @apply mt-mb40;
          }
        }
        .graident {
          @apply bg-gradient-to-t from-black-0 via-transparent absolute w-full h-full flex flex-col px-mb10 pb-mb10 lg:px-vw10 lg:pt-vw10 lg:pb-vw12 z-10;
        }
        .bottom-wrapper {
          @apply flex justify-between mt-auto;
        }
        .glass {
          background-color: rgba(255, 255, 255, 0.24);
          backdrop-filter: blur(15px);
        }
        .watch {
          @apply p-1 rounded-lg;
        }
        .text {
          @apply font-avenirMedium text-16pxm md:text-20pxt lg:text-16px text-white;
        }
        .image-wrapper {
          @apply relative w-full;
        }
      `}</style>
    </>
  )
}

export default VideoPic
