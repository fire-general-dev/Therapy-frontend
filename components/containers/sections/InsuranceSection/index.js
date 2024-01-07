import NextImage from "@/components/elements/image"
import { isRTLLayout } from "@/utils/helpers"
import { getStrapiMedia } from "@/utils/media"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"

function InsuranceSection(props) {
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
          {images.map((partner, index) => {
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
                  className={`!h-20 lg:!h-20`}
                />
              </div>
            )
          })}
        </div>
      </div>
      <style jsx>{`
        .certified {
          @apply pt-7 pb-14;
           {
            /* @apply w-full lg:py-vw40 md:py-40pxt py-mb40; */
          }
          background: rgba(210, 223, 255, 0.3);
           {
            /* background: linear-gradient(172deg, rgba(210, 223, 255, 0.30) 0%, rgba(255, 243, 225, 0.30) 100%); */
          }
        }
        .carousel-wrapper {
          @apply max-w-screen-xl w-full mx-auto px-4;
        }
        .certified-title {
          @apply block text-[#2E3333] text-2xl lg:text-3xl font-medium mb-7 text-center;
        }
        .logos {
          @apply grid grid-cols-2 lg:flex  justify-center gap-3 lg:gap-7;
        }

        .image-wrapper {
          @apply flex items-center justify-center w-full h-24 lg:w-52;
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

export default InsuranceSection
