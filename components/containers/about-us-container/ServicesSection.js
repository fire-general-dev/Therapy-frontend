import { useTranslation } from "next-i18next"
import Image from "next/image"
import ServicesImage from "@/images/about/services.png"

const ServicesSection = () => {
  const { t } = useTranslation()
  return (
    <div className="services-section-container">
      <div className="services-section">
        <div className="header">
          <span className="subtitle">{t("keep_you_updated")}</span>
          <h3 className="title">{t("email_services")}</h3>
          <div className="desc">{t("email_services_desc")}</div>
        </div>
        <div className="services-wrapper">
          <div className="image-wrapper">
            <Image
              src={ServicesImage}
              className="!w-full lg:!w-[34rem]"
              style={{ objectFit: "cover" }}
              alt="services"
            />
          </div>
          <div className="body">
            <div className="body-card">
              <h6 className="body-title">{t("appointment_confirmations")}</h6>
              <div className="body-desc">
                {t("appointment_confirmations_desc")}
              </div>
            </div>
            <div className="body-card">
              <h6 className="body-title">{t("reminders")}</h6>
              <div className="body-desc">{t("reminders_desc")}</div>
            </div>
            <div className="body-card">
              <h6 className="body-title">{t("alerts_and_notifications")}</h6>
              <div className="body-desc">
                {t("alerts_and_notifications_desc")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .services-section-container {
          background: linear-gradient(
            172deg,
            rgba(210, 223, 255, 0.3) 0%,
            rgba(255, 243, 225, 0.3) 100%
          );
        }
        .services-section {
          @apply max-w-screen-xl w-full mx-auto px-4 py-10 lg:py-20;
        }
        .services-wrapper {
          @apply flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8;
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
          @apply text-gray-64 text-sm lg:text-base max-w-3xl mx-auto;
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

export default ServicesSection
