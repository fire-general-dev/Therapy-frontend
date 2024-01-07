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
    <div className={`certified`}>
      <div className="carousel-wrapper">
        <div className="certified-title">{title}</div>
        <div className="logos">
          {images.map((partner) => {
            // const { url, alt } = partner?.image?.data?.attributes
            return (
              <div
                key={`partner-${color}-${id}-${title}`}
                className="image-wrapper"
              >
                <NextImage
                  media={partner?.image}
                  // loader={loader}
                  // src={url}
                  // width="0"
                  // height="0"
                  // alt={alt}
                  // sizes="100vw"
                  customCss={{
                    objectFit: "contain",
                  }}
                  className={`!h-9 lg:!h-12`}
                />
              </div>
            )
          })}
        </div>
      </div>
      <style jsx>{`
        .certified {
          @apply pt-14;
           {
            /* @apply w-full lg:py-vw40 md:py-40pxt py-mb40; */
          }
          background: rgba(210, 223, 255, 0.3);
           {
            /* background: linear-gradient(172deg, rgba(210, 223, 255, 0.30) 0%, rgba(255, 243, 225, 0.30) 100%); */
          }
        }
        .carousel-wrapper {
          @apply max-w-screen-xl w-full mx-auto px-4 pb-7 lg:border-b lg:border-solid lg:border-[#EEEFF0];
        }
        .certified-title {
          @apply block text-[#2E3333] text-2xl lg:text-3xl font-medium mb-7 text-center;
        }
        .logos {
          @apply flex flex-col lg:flex-row justify-center gap-3 lg:gap-7;
        }

        .image-wrapper {
          @apply flex items-center justify-center w-full h-24 lg:w-52 rounded-lg;
          border: 1px solid #eeeff0;
        }
      `}</style>
    </div>
  )
}

export default MinCarouselSection
