import ArrowButton from "@/components/elements/arrowButton"
import React from "react"
import { BsArrowUpShort } from "react-icons/bs"
import { useTranslation } from "next-i18next"

function Copyright() {
  const { t } = useTranslation()

  const goToTop = () => {
    window.scrollTo(0, 0)
  }
  return (
    <div className="wrapper">
      <div className="column">{t("copyright")}</div>
      <div className="column back-to-top">
        <div className="column mobile-disabled"></div>
        <div onClick={goToTop} className="back-to-top column pointer">
          <BsArrowUpShort className="text-30pxm lg:text-30px" />
          {t("back_to_top")}
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          @apply bg-white p-mb20 lg:px-vw360 flex flex-col lg:flex-row lg:py-vw40 font-sans text-14pxm lg:text-14px text-black-0 border-t border-gray-f0 justify-between items-center lg:items-start;
        }
        .back-to-top {
          @apply flex items-center flex-col lg:flex-row mt-mb20 lg:mt-0 transition-all duration-500 hover:-translate-y-0.5 z-10;
          span {
            @apply -rotate-90 mr-mb10 lg:mr-vw10;
          }

          &:hover {
            @apply text-black-444;
          }
        }
        .column {
          @apply flex-1;
        }
        .pointer {
          @apply cursor-pointer;
        }
        .mobile-disabled {
          @apply hidden lg:block;
        }
      `}</style>
    </div>
  )
}

export default Copyright
