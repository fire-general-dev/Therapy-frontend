import React from "react"
import Image from "next/image"
import locationIcon from "@/images/icon-location.svg"
import { useTranslation } from "next-i18next"
import CTAButton from "../CTAButton"
import { extractSingleData } from "utils/extractData"

function TherapistBar(props) {
  const { therapist, handleBookAppointment, doctorSetting } = props

  const { t } = useTranslation("common")
  const doctorSettingData = extractSingleData(doctorSetting[0])
  const location = extractSingleData(therapist.location?.data)

  return (
    <div className="wrapper">
      <div className="doctor-info-wrapper">
        <div className="location glass">
          <Image layout="raw" src={locationIcon} alt="location" />
          <div className="mx-vw08">{location?.name}</div>
        </div>
        <h1 className="name">{therapist.title}</h1>
        <h2 className="speciality">{therapist.speciality}</h2>
      </div>
      <div className="therapists-container">
        <div className="price-wrapper">
          <div className="details-wrapper">
            <div>
              <span className="price">
                {doctorSettingData.session_duration?.substring(1)}{" "}
                <span className="per-s"> {t("min")}</span>
              </span>
            </div>
            <div>
              <span className="price">
                AED {doctorSettingData.sessionPrice}{" "}
                <span className="per-s">/ {t("session")}</span>
              </span>
            </div>
          </div>
          <CTAButton
            title={"BOOK APPOINTMENT"}
            fillColor="#000"
            bgColor={"white"}
            onClick={handleBookAppointment}
          />
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          @apply flex flex-col lg:flex-row h-full w-full items-center lg:items-end py-mb20 lg:py-vw20 text-black-333;
        }
        .doctor-info-wrapper {
          @apply flex-1 relative h-full flex flex-col items-center lg:block;
        }
        .therapists-container {
          @apply flex flex-1 flex-col lg:flex-row h-full;
        }
        .location {
          @apply lg:text-14px text-14pxm flex mb-mb16 md:mb-16pxt lg:mb-vw16;
        }
        .name {
          @apply uppercase font-avenirBlack text-24pxm lg:text-50px leading-px57 mb-mb6 md:mb-6pxt lg:mb-vw06;
        }
        .speciality {
          @apply font-sans  text-16pxm lg:text-20px mb-mb20 lg:mb-vw30;
        }
        .price-wrapper {
          @apply flex flex-col lg:flex-row lg:gap-vw30 items-center;
        }
        .price {
          @apply font-avenirBlack text-24pxm lg:text-30px;
        }
        .per-s {
          @apply font-sans text-20pxm lg:text-20px capitalize;
        }
        .details-wrapper {
          @apply flex gap-mb30 md:gap-30pxt lg:gap-vw30 mb-mb10 md:mb-10pxt lg:mb-0;
        }
      `}</style>
    </div>
  )
}

TherapistBar.propTypes = {}

export default TherapistBar
