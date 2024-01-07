import { isRTLLayout } from "@/utils/helpers"
import { useRouter } from "next/router"
import React from "react"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"

function CTAButton(props) {
  const router = useRouter()
  const {
    onClick = () => {},
    title,
    classes,
    fillColor,
    bgColor,
    flexWrapper = false,
  } = props
  return (
    <div
      className={`see-all-button ${classes ?? ""} bgColor`}
      onClick={onClick}
    >
      <span>{title}</span>
      {isRTLLayout(router) ? (
        <BsArrowLeft className="text-28pxm md:text-28pxt lg:text-30px" />
      ) : (
        <BsArrowRight className="text-28pxm md:text-28pxt lg:text-30px" />
      )}
      <style jsx>{`
        .see-all-button {
          @apply font-avenirMedium shadow-infoButton uppercase flex justify-center items-center text-16pxm md:text-20pxt lg:text-16px text-white py-mb12 md:py-12pxt lg:py-vw12 px-mb20 md:px-20pxt lg:px-vw20 bg-green-200 rounded-full mx-auto cursor-pointer transition-all duration-500 hover:translate-x-0.5 hover:translate-y-0.5;
          &:hover {
            @apply bg-btnPrimary text-white;
          }
          span {
            @apply mr-mb10 lg:mr-vw10;
          }
        }
        .bgColor {
          background: ${bgColor};
          color: ${fillColor};
        }

        :global(.rtl) {
          .see-all-button {
            span {
              @apply mr-0 md:mr-0 lg:mr-0 ml-mb10 md:ml-10pxt lg:ml-vw10;
            }
          }
        }
      `}</style>
    </div>
  )
}

CTAButton.propTypes = {}

export default CTAButton
