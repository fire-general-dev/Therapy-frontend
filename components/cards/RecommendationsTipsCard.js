import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { isRTLLayout } from "utils/helpers"
import { useTranslation } from "next-i18next"
import RecommendationTipsImage from "@/images/recommendations-img.png"
import RecomendationTipsModal from "../modal/RecomendationTipsModal/RecomendationTipsModal"

const RecommendationsTipsCard = ({ isMobile }) => {
  const router = useRouter()
  const isRTL = isRTLLayout(router)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { t } = useTranslation("common")
  return (
    <div className={`cardWrapper`}>
      <div className="innerp">
        <Image src={RecommendationTipsImage} alt="recomendation" />
        <div className="card-body">
          <span className="text">
            {t("recommendations_before_joining_meeting")}
          </span>
          <button
            className="view-info-btn"
            onClick={() => setIsOpenModal(true)}
          >
            {t("view_information")}
          </button>
        </div>
      </div>
      <RecomendationTipsModal
        onOpen={() => setIsOpenModal(true)}
        onClose={() => setIsOpenModal(false)}
        isOpen={isOpenModal}
        isMobile={isMobile}
      />
      <style jsx>{`
        .cardWrapper {
          @apply flex-1 rounded-lg bg-transparent;
          border: 1px solid rgba(26, 79, 186, 0.15);
        }
        .innerp {
          @apply flex flex-col lg:flex-row items-center justify-center lg:items-start lg:justify-start gap-10 p-mb20 md:p-20pxt lg:p-vw20 lg:pb-vw08;
        }
        .card-body {
          @apply text-gray-64 text-20pxm md:text-24pxt lg:text-20px mb-mb12 md:mb-16pxt lg:mb-vw12 flex flex-col items-center lg:items-end gap-3;
        }

        .text {
          @apply text-center lg:text-right;
        }

        .view-info-btn {
          @apply rounded-lg py-mb16 md:py-16pxt lg:py-vw16 px-mb24 md:px-28pxt lg:px-vw24 text-white text-16pxm md:text-20pxt lg:text-16px bg-dashboardBtnPrimary hover:bg-dashboardBtnPrimaryHover transition-all ease-in-out duration-300 font-medium;
        }

        :global(.rtl) {
          .text {
            @apply lg:text-left;
          }
        }
      `}</style>
    </div>
  )
}

export default RecommendationsTipsCard
