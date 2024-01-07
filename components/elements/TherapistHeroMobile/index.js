import React from "react"
import PropTypes from "prop-types"
import Image from "next/legacy/image"
import NextImage from "../image"
import { useTranslation } from "next-i18next"

function TherapistHeroMobile(props) {
  const { therapist } = props

  const { t } = useTranslation("common")
  const doctorSpeakingLanguage = therapist.speakingLanguages
    ?.map((item) => item.title)
    ?.join(" | ")

  return (
    <div className="wrapper">
      <div className="image-wrapper">
        <NextImage
          media={therapist.personal_image}
          height={"100%"}
          width={"100%"}
          className={"mx-auto max-w-150pxm lg:max-w-960px"}
        />
      </div>
      <div className="therapist-details-box-wrapper">
        <div className="details">
          <div className="title">{t("languages_spoken")}</div>
          <div className="info">{doctorSpeakingLanguage}</div>
        </div>
        <div className="seperator" />
        <div className="details">
          {/* <div className="title">{t("years_of_experience")}</div> */}
          <div className="title">{t("years_of_exp")}</div>
          <div className="info">{therapist.totalYearOfExp}</div>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          @apply flex w-full items-end text-black-333 h-full relative;
        }
        .image-wrapper {
          @apply flex-1 relative h-5/6;
        }
        .location {
          @apply text-14pxm md:text-18pxt lg:text-14px flex mb-mb16 md:mb-16pxt lg:mb-vw16;
        }
        .name {
          @apply uppercase font-avenirBlack text-28pxm md:text-50pxt lg:text-50px;
        }
        .therapist-details-box-wrapper {
          @apply bottom-0 left-0 right-0 translate-y-1/2 absolute shadow-therapistBox bg-white px-mb10 py-mb6 w-full flex justify-between;
        }
        .details {
          @apply text-center text-16pxm md:text-20pxt text-black-333 w-full;
        }
        .title {
          @apply font-sans text-16pxm md:text-20pxt lg:text-16px mb-mb6 lg:mb-vw06 text-center;
        }
        .info {
          @apply font-avenirHeavy text-14pxm md:text-18pxt lg:text-14px text-center;
        }
        .seperator {
          @apply bg-gray-400 w-0.5;
        }
      `}</style>
    </div>
  )
}

TherapistHeroMobile.propTypes = {}

export default TherapistHeroMobile
