import React from "react"
import PropTypes from "prop-types"
import Image from "next/image"
import locationIcon from "@/images/icon-location.svg"
import InfoBox from "./InfoBox"
import { useTranslation } from "next-i18next"
import CTAButton from "../CTAButton"
import NextImage from "../image"
import { extractSingleData } from "utils/extractData"

function TherapistHeroDesktop(props) {
  const { therapist, handleBookAppointment, doctorSetting } = props

  const { t } = useTranslation("common")
  const doctorSpeakingLanguage = therapist.speakingLanguages
    ?.map((item) => item.title)
    ?.join(" | ")

  const location = extractSingleData(therapist.location?.data)
  const doctorSettingData = extractSingleData(doctorSetting[0])
  return (
    <div className="wrapper">
      <NextImage
        media={therapist.personal_image}
        className={
          "absolute self-end mr-mb60 lg:mr-vw60 rtl:mr-0 rtl:lg:mr-0 rtl:ml-mb60 rtl:lg:ml-vw60"
        }
        priority
        height={"100%"}
      />
      <div className="therapists-container">
        <div className="location glass">
          <Image layout="raw" src={locationIcon} alt="location" />
          <div className="mx-vw08">{location?.name}</div>
        </div>
        <h1 className="name">{therapist.title}</h1>
        <h2 className="speciality">{therapist.speciality}</h2>
        <div className="boxes-wrapper">
          <InfoBox
            title={"Languages Spoken"}
            // title={t("speaking_languages")}
            info={doctorSpeakingLanguage}
          />
          <InfoBox
            title={"Years of Experience"}
            info={therapist.totalYearOfExp}
          />
        </div>
        <div className="description">{therapist.shortDescription}</div>
        <div className="price-wrapper">
          <div>
            <span className="price">
              {doctorSettingData.session_duration?.substring(1)}{" "}
              {/* <span className="per-s">{t("per_session")}</span> */}
              <span className="per-s"> {t("min")}</span>
            </span>
          </div>
          <div className="end-section">
            <div>
              <span className="price">
                AED {doctorSettingData.sessionPrice}{" "}
                {/* <span className="per-s">{t("per_session")}</span> */}
                <span className="per-s">/ {t("session")}</span>
              </span>
            </div>
            <CTAButton
              title={t("book_appointment")}
              fillColor="#000"
              bgColor={"white"}
              onClick={handleBookAppointment}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          @apply relative flex items-end text-black-333;
        }
        .image-wrapper {
          @apply flex flex-1 relative h-full;
        }
        .therapists-container {
          @apply flex flex-1 flex-col pb-mb40 lg:pb-vw46 w-1344px ml-vw435 rtl:ml-0 rtl:mr-vw435;
        }
        .location {
          @apply lg:text-14px text-14pxm flex mb-mb16 lg:mb-vw16;
        }
        .name {
          @apply uppercase font-avenirBlack text-28pxm lg:text-50px leading-px57;
        }
        .speciality {
          @apply font-sans  text-20pxm lg:text-20px mb-mb28 lg:mb-vw30;
        }
        .boxes-wrapper {
          @apply flex mb-mb40 lg:mb-vw46;
        }
        .description {
          @apply block font-avenirMedium text-16pxm lg:text-16px mb-mb20 lg:mb-vw20 overflow-hidden text-ellipsis h-100pxm lg:h-100px leading-24pxm lg:leading-24px;
        }
        .price-wrapper {
          @apply flex items-center justify-between;
        }
        .end-section {
          @apply flex items-center lg:gap-vw20;
        }
        .price {
          @apply font-avenirBlack text-30pxm lg:text-30px;
        }
        .per-s {
          @apply inline-block font-sans text-20pxm lg:text-20px;
        }

        :global(.rtl) {
          .therapists-container {
            @apply ml-0 mr-vw435;
          }
        }
      `}</style>
    </div>
  )
}

TherapistHeroDesktop.propTypes = {}

export default TherapistHeroDesktop
