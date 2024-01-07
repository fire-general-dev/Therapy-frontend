import { useTranslation } from "next-i18next"
import CategoryCard from "./CategoryCared"
import AdultsIcon from "@/images/icons/home/adult-icon.svg"
import CouplesIcon from "@/images/icons/home/couples-icon.svg"
import TeenIcon from "@/images/icons/home/teen-icon.svg"

const HeroSection = () => {
  const { t } = useTranslation()
  return (
    <div className="hero-section">
      <div className="hero-section-content">
        <div className="sub-title">
          <span>{t("confidential")}</span>
          <span>{t("secure")}</span>
          <span>{t("private")}</span>
        </div>
        <div className="heavy-title">
          {t("your_journey")} <span>{t("to_happy")}</span>
        </div>
        <div className="light-title">{t("for_unique_mental")}</div>
        <div className="main-categories">
          <CategoryCard
            icon={AdultsIcon}
            title={t("adults")}
            desc={t("for_myself")}
            descMob={t("for_myself")}
            href={"/adults-therapy"}
          />
          <CategoryCard
            icon={CouplesIcon}
            title={t("couples")}
            desc={t("me_and_partner")}
            descMob={t("me_and_partner_mob")}
            href={"/couples-therapy"}
          />
          <CategoryCard
            icon={TeenIcon}
            title={t("teen")}
            desc={t("for_teen")}
            descMob={t("for_teen")}
            href={"/teen-therapy"}
          />
        </div>
      </div>
      <style jsx>{`
        .hero-section {
          @apply pt-32 lg:pt-52 pb-10 lg:pb-32;
          background: linear-gradient(
            142deg,
            rgba(255, 173, 165, 0.3) 0%,
            rgba(239, 230, 197, 0.3) 60%,
            rgba(140, 189, 239, 0.3) 100%
          );
        }
        .hero-section-content {
          @apply max-w-screen-xl w-full mx-auto px-4;
        }
        .sub-title {
          @apply flex items-center justify-center gap-2 lg:gap-12 text-[#2E3333] text-[11px] lg:text-lg font-medium mb-2 uppercase;
        }
        .heavy-title {
          @apply text-[#2E3333] text-4xl lg:text-6xl font-medium mb-4 text-center uppercase;
          span {
            @apply block lg:inline-block text-[#1BBEC3] font-bold;
          }
        }
        .light-title {
          @apply text-gray-64 text-base lg:text-2xl font-medium text-center mb-8 lg:mb-24;
        }
        .main-categories {
          @apply flex flex-col lg:flex-row gap-5 lg:gap-10;
        }
      `}</style>
    </div>
  )
}

export default HeroSection
