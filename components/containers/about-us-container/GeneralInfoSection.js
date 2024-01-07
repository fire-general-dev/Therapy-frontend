import Image from "next/image"
import GenralImage from "@/images/about/general.png"
import { useTranslation } from "next-i18next"

const GeneralInfoSection = () => {
  const { t } = useTranslation()
  return (
    <div className="general-info-section-container">
      <div className="general-info-section">
        <div className="image-wrapper">
          <Image
            src={GenralImage}
            alt="image"
            className="!w-full rounded-[1.25rem]"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="general-cards">
          <div className="general-card">
            <h6 className="title">{t("about_e_health")}</h6>
            <p className="desc mb-8">{t("about_e_health_desc1")}</p>
            <p className="desc">{t("about_e_health_desc2")}</p>
          </div>
          <div className="general-card">
            <h6 className="title">{t("nafsi")}</h6>
            <p className="desc">{t("about_nafsi_desc")}</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .general-info-section-container {
          @apply bg-white;
        }
        .general-info-section {
          @apply max-w-screen-xl w-full mx-auto px-4 py-10 lg:py-20;
        }
        .image-wrapper {
          @apply w-full h-36 lg:h-[28rem]  overflow-hidden rounded-[1.25rem] mb-8;
        }
        .general-cards {
          @apply flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-28 text-center lg:text-left;
        }
        .general-card {
          @apply max-w-[34rem];
        }
        .title {
          @apply text-[#2E3333] text-2xl lg:text-3xl font-medium capitalize mb-5;
        }
        .desc {
          @apply text-gray-64 text-sm lg:text-base;
        }

        :global(.rtl) {
          .general-cards {
            @apply lg:text-right;
          }
        }
      `}</style>
    </div>
  )
}

export default GeneralInfoSection
