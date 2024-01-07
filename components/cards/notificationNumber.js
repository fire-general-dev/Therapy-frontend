import React from "react"
import PropTypes from "prop-types"
import ArrowDownButton from "../elements/arrowDownButton"
import clockIcon from "@/images/icons/clock.svg"
import Image from "next/image"
import { useRouter } from "next/router"
import { isRTLLayout } from "utils/helpers"
import { useTranslation } from "next-i18next"

const NotificationNumber = (props) => {
  const router = useRouter()
  const isRTL = isRTLLayout(router)
  const { t } = useTranslation("common")
  return (
    <div className="cardWrapper">
      <div className="innerp">
        <div className="row">
          <Image
            className={isRTL ? "ml-2" : "mr-2"}
            layout="raw"
            src={clockIcon}
            alt="appointment"
          />
          <div className={`colum fillAll ${isRTL ? "rtl" : ""} `}>
            <span className="text">{t("notifications")}</span>
            <div className="number">10</div>
          </div>
          <ArrowDownButton fillColor={"#fff"} />
        </div>
      </div>
      <style jsx>{`
        .cardWrapper {
          @apply flex flex-col flex-1 rounded-lg;
          background-image: linear-gradient(
            107deg,
            #74aaff,
            #91bcfd 31%,
            #d0e5fa
          );
        }
        .row {
          @apply flex items-start;
        }
        .innerp {
          @apply p-vw20 pb-vw08;
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

NotificationNumber.propTypes = {}

export default NotificationNumber
