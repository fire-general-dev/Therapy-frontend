import React from "react"
import PropTypes from "prop-types"
import messageIcon from "@/images/icons/message.svg"
import Image from "next/image"
import { useRouter } from "next/router"
import { isRTLLayout } from "utils/helpers"
import { useTranslation } from "next-i18next"

const StatisticsCard = ({ title, color, icon, number }) => {
  const router = useRouter()
  const isRTL = isRTLLayout(router)
  const { t } = useTranslation("common")
  return (
    <div style={{ backgroundColor: color }} className={`cardWrapper`}>
      <div className="innerp">
        <div className="row">
          <Image
            className={`${isRTL ? "ml-vw10" : "mr-vw10"}`}
            layout="raw"
            src={icon}
            alt="appointment"
          />
          <div className={`colum fillAll ${isRTL ? "rtl" : ""} `}>
            <span className="text">{title}</span>
            <div className="number">{number}</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cardWrapper {
          @apply flex flex-col flex-1 rounded-lg;
        }
        .innerp {
          @apply p-vw20 pb-vw08;
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
          @apply text-white text-16px font-avenirMedium leading-[2em];
        }
        .icon {
          @apply mr-1;
        }
        .number {
          @apply text-50px text-white font-avenirBold leading-none mt-vw20;
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

StatisticsCard.propTypes = {}

export default StatisticsCard
