import React from "react"
import Link from "next/link"
import { useTranslation } from "next-i18next"

function SiteTerms(props) {
  const { t } = useTranslation()
  return (
    <div className="wrapper">
      <div className="column">
        <Link href="/cookies">
          <span>{t("cookies")}</span>
        </Link>
      </div>
      <div className="column">
        <Link href="/disclaimer">
          <span>{t("disclaimer")}</span>
        </Link>
      </div>
      <div className="column">
        <Link href="/privacy">
          <span>{t("privacy")}</span>
        </Link>
      </div>
      <div className="column">
        <Link href="/terms">
          <span>{t("terms_of_conditions")}</span>
        </Link>
      </div>
      <style jsx>{`
        .wrapper {
          @apply bg-white px-mb20 py-mb10 lg:px-vw360 flex lg:py-vw10 font-sans text-12pxm lg:text-14px text-gray-666 border-t border-gray-f0 justify-between lg:justify-start;
        }
        .column {
          @apply flex flex-col lg:flex-1;
          span {
            @apply cursor-pointer relative w-fit transition-all duration-500 mb-mb8 lg:mb-vw08;
            &:after {
              @apply lg:w-full lg:absolute;
              content: "";
              transform: scaleX(0);
              height: 0.5px;
              max-height: 0.5px;
              bottom: 0;
              left: 0;
              background-color: #444444;
              transform-origin: bottom left;
              transition: transform 0.5s ease-in-out;
            }
            &:hover {
              @apply text-black-444;
              &:after {
                transform: scaleX(1);
                transform-origin: bottom left;
              }
            }
          }
        }
      `}</style>
    </div>
  )
}

SiteTerms.propTypes = {}

export default SiteTerms
