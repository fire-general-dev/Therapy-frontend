import NextImage from "@/components/elements/image"
import { isRTLLayout } from "@/utils/helpers"
import { getStrapiMedia } from "@/utils/media"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"

function MinCarouselSection(props) {
  const { data = {} } = props
  const router = useRouter()
  if (!data) return null

  const { images, title, color, id } = data
  if (!images) return null

  const loader = ({ src, width }) => {
    return getStrapiMedia(src)
  }

  return (
    <div style={{ backgroundColor: color }} className={`certified`}>
      <div className="carousel-wrapper">
        <div className="certified-title">{title}</div>
        <div className="logos">
          {images.map((partner) => {
            // const { url, alt } = partner?.image?.data?.attributes
            return (
              <NextImage
                media={partner?.image}
                key={`partner-${color}-${id}-${title}`}
                // loader={loader}
                // src={url}
                // width="0"
                // height="0"
                // alt={alt}
                // sizes="100vw"
                customCss={{
                  objectFit: "contain",
                }}
                className={`${
                  isRTLLayout(router)
                    ? "ml-mb40 md:ml-70pxt lg:ml-vw75"
                    : "mr-mb40 md:mr-70pxt lg:mr-vw75"
                } h-35pxm md:h-35pxt lg:h-35px w-auto`}
              />
            )
          })}
        </div>
      </div>
      <style jsx>{`
        .certified {
          @apply w-full lg:py-vw40 md:py-40pxt py-mb40;
        }
        .carousel-wrapper {
          @apply flex flex-col items-center lg:flex-row justify-between mx-mb20 lg:mx-0;
        }
        .certified-title {
          @apply px-mb20 lg:pl-vw360 mb-mb20 lg:mb-0 font-avenirMedium text-24pxm md:text-28pxt lg:text-24px text-black-3232 flex-1;
        }
        .logos {
          &&::-webkit-scrollbar {
            /* Hide scrollbar for Chrome, Safari and Opera */
            display: none;
          }
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
          @apply lg:ml-0 overflow-scroll flex w-full items-end flex-3;
        }

        :global(.rtl) {
          .certified-title {
            @apply lg:pl-0 lg:pr-vw360;
          }
        }
      `}</style>
    </div>
  )
}

export default MinCarouselSection
