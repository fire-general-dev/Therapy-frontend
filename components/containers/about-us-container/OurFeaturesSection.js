import { useTranslation } from "next-i18next"
import Image from "next/image"
import BookingIcon from "@/images/icons/about/booking-icon.svg"
import ReschedulingIcon from "@/images/icons/about/rescheduling-icon.svg"
import CancellingIcon from "@/images/icons/about/cancelling-icon.svg"

const FeatureCard = ({ icon, title, description, borderColor }) => {
  return (
    <div className="feature-card" style={{ borderColor: borderColor }}>
      <Image className="mb-5" src={icon} alt="icon" />
      <h3 className="title">{title}</h3>
      <div className="desc">{description}</div>
      <style jsx>{`
        .feature-card {
          @apply bg-white rounded-b-2xl p-8 flex-1;
          border-top: 3px solid #1bbec3;
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

const OurFeaturesSection = () => {
  const { t } = useTranslation()
  return (
    <div className="our-features-section-container">
      <div className="our-features-section">
        <div className="header">
          <span className="subtitle">{t("booking_system")}</span>
          <h3 className="title">{t("our_features")}</h3>
        </div>
        <div className="features-wrapper">
          <FeatureCard
            title={t("booking")}
            description={t("booking_desc")}
            icon={BookingIcon}
          />
          <FeatureCard
            title={t("rescheduling")}
            description={t("rescheduling_desc")}
            icon={ReschedulingIcon}
          />
          <FeatureCard
            title={t("cancelling")}
            description={t("cancelling_desc")}
            icon={CancellingIcon}
          />
        </div>
      </div>
      <style jsx>{`
        .our-features-section-container {
          background: linear-gradient(
            172deg,
            rgba(210, 223, 255, 0.3) 0%,
            rgba(255, 243, 225, 0.3) 100%
          );
        }
        .our-features-section {
          @apply max-w-screen-xl w-full mx-auto px-4 py-10 lg:py-20;
        }
        .features-wrapper {
          @apply flex flex-col lg:flex-row gap-8;
        }
        .header {
          @apply text-center mb-8 lg:mb-14;
        }
        .subtitle {
          @apply text-[#1BBEC3] text-sm lg:text-base font-medium uppercase;
        }
        .title {
          @apply text-[#2E3333] text-2xl lg:text-3xl font-medium;
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

export default OurFeaturesSection
