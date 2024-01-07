import React from "react"
import appointmentIcon from "@/images/icons/appointment.svg"
import Image from "next/image"
import { useRouter } from "next/router"
import { isRTLLayout } from "utils/helpers"
import { useTranslation } from "next-i18next"

const UpcomingAppointmentCardNumber = ({ total }) => {
  const router = useRouter()
  const isRTL = isRTLLayout(router)
  const { t } = useTranslation("common")
  return (
    <div className="cardWrapper">
      <div className="innerp">
        <div className="row">
          <Image
            className={`w-vw28 h-vw28 ${isRTL ? "ml-vw10" : "mr-vw10"}`}
            layout="raw"
            src={appointmentIcon}
            alt="appointment"
          />
          <div className={`colum fillAll ${isRTL ? "rtl" : ""} `}>
            <span className="text">{t("upcoming_appointments")}</span>
            <div className="number">{total}</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cardWrapper {
          @apply bg-[#2F7CF6] flex flex-col flex-1 rounded-lg;
        }
        .innerp {
          @apply p-mb20 md:p-24pxt lg:p-vw20 pb-mb8 md:pb-12pxt lg:pb-vw08;
        }
        .row {
          @apply flex items-start;
        }
        .fillAll {
          @apply mr-auto;
          &.rtl {
            @apply ml-auto mr-0;
          }
        }
        .text {
          @apply text-white text-16pxm md:text-20pxt lg:text-16px font-avenirMedium leading-[2em];
        }
        .icon {
          @apply mr-1;
        }
        .number {
          @apply text-50pxm md:text-50pxt lg:text-50px text-white font-avenirBold leading-none mt-mb20 md:mt-20pxt lg:mt-vw20;
        }
        .colum {
          @apply flex flex-col;
        }

        :global(.rtl) {
          .fillAll {
            @apply ml-auto mr-0;
          }
          .icon {
            @apply mr-0 ml-1;
          }
        }
      `}</style>
    </div>
  )
}

UpcomingAppointmentCardNumber.propTypes = {}

export default UpcomingAppointmentCardNumber
