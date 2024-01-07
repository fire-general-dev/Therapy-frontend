import { useTranslation } from "next-i18next"
import Image from "next/image"
import TailoredIcon from "@/images/icons/about/tailored-icon.svg"
import InformedIcon from "@/images/icons/about/informed-icon.svg"
import TipsIcon from "@/images/icons/about/tips-icon.svg"
import SupportIcon from "@/images/icons/about/support-icon.svg"
import LinkButton from "@/components/buttons/LinkButton"

const RecommendationCard = ({ icon, title, description }) => {
  return (
    <div className="recommendation-card">
      <Image className="mb-5" src={icon} alt="icon" />
      <h3 className="title">{title}</h3>
      <div className="desc">{description}</div>
      <style jsx>{`
        .recommendation-card {
          @apply bg-white rounded-2xl p-8 flex-1;
          border: 1px solid #eeeff0;
          background: rgba(247, 255, 255, 0.5);
          backdrop-filter: blur(17px);
        }
        .title {
          @apply text-[#2E3333] text-xl font-medium capitalize mb-3;
        }
        .desc {
          @apply text-gray-64 text-sm;
        }
      `}</style>
    </div>
  )
}

const RecommendationsSection = () => {
  const { t } = useTranslation()
  return (
    <div className="recommendations-section-container">
      <div className="recommendations-section">
        <div className="header">
          <span className="subtitle">{t("for_our_patients")}</span>
          <h3 className="title">{t("recommendations_for_you")}</h3>
          <div className="desc">{t("recommendations_for_you_desc")}</div>
        </div>
        <div className="recommendations-wrapper">
          <RecommendationCard
            icon={TailoredIcon}
            title={t("tailored_healthcare")}
            description={t("tailored_healthcare_desc")}
          />
          <RecommendationCard
            icon={InformedIcon}
            title={t("informed_decisions")}
            description={t("informed_decisions_desc")}
          />
          <RecommendationCard
            icon={TipsIcon}
            title={t("daily_tips")}
            description={t("daily_tips_desc")}
          />
          <RecommendationCard
            icon={SupportIcon}
            title={t("support")}
            description={t("support_desc")}
          />
        </div>
        <LinkButton href={"/therapists"} text={t("book_an_appointment")} />
      </div>
      <style jsx>{`
        .recommendations-section-container {
          @apply bg-white;
        }
        .recommendations-section {
          @apply max-w-screen-xl w-full mx-auto px-4 py-10 lg:py-20;
        }
        .recommendations-wrapper {
          @apply grid grid-cols-1 gap-y-8 gap-x-5 lg:grid-cols-2 lg:gap-y-14 lg:gap-x-8 mb-8 lg:mb-14;
        }
        .image-wrapper {
          @apply w-full h-[15rem] lg:h-[29rem] lg:w-[34rem] overflow-hidden rounded-[1.25rem];
        }
        .header {
          @apply text-center mb-7 lg:mb-14;
        }
        .subtitle {
          @apply text-[#1BBEC3] text-sm lg:text-base font-medium uppercase;
        }
        .title {
          @apply text-[#2E3333] text-2xl lg:text-3xl font-medium mb-5;
        }
        .desc {
          @apply text-gray-64 text-sm lg:text-base max-w-5xl mx-auto;
        }
        .body {
          @apply max-w-xl;
        }
        .body-card {
          @apply mb-5;
        }
        .body-title {
          @apply text-[#2E3333] text-xl font-medium capitalize mb-2;
        }
        .body-desc {
          @apply text-gray-64 text-sm;
        }
      `}</style>
    </div>
  )
}

export default RecommendationsSection
