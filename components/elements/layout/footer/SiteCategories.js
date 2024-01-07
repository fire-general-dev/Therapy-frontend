import React from "react"
import Smile from "@/images/smile-05opacity@2x.png"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "next-i18next"

function SiteCategories({ specailities }) {
  const { t } = useTranslation()
  return (
    <div className="wrapper">
      <h6 className="title">{t("specialties")}</h6>
      <div className="row">
        {specailities.data.map((specaility) => (
          <div
            key={`${specaility.attributes.alias}-${specaility.id}`}
            className="column"
          >
            <Link href={`/services/${specaility.attributes.alias}`}>
              <span>{specaility.attributes.title}</span>
            </Link>
          </div>
        ))}
      </div>
      <Image
        // layout="raw"
        className="absolute w-3/4 lg:w-1/2 -right-mb80 lg:-right-vw140 top-32 lg:top-vw100"
        src={Smile}
        alt="smile"
      />
      <style jsx>{`
        .wrapper {
          @apply bg-white px-mb40 lg:px-vw360 relative py-mb40 md:py-40pxt lg:py-vw40 font-sans text-14pxm md:text-18pxt lg:text-14px text-black-0 border-t border-gray-f0;
        }
        .row {
          @apply w-full grid grid-cols-4 my-mb40 lg:my-0 justify-between lg:justify-start text-14pxm md:text-18pxt lg:text-14px z-10;
        }
        .column {
          @apply flex flex-col lg:flex-1 text-14pxm md:text-18pxt lg:text-14px;
          span {
            @apply cursor-pointer relative inline-block w-fit mb-mb12 lg:mb-auto;
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
        .title {
          @apply block uppercase opacity-50 mb-mb8 lg:!mb-vw08 text-14pxm md:text-18pxt lg:text-14px;
        }
      `}</style>
    </div>
  )
}

SiteCategories.propTypes = {}

export default SiteCategories
