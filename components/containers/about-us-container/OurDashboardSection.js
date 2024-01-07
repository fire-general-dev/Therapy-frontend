import { useTranslation } from "next-i18next"
import Image from "next/image"
import DashboardHomePage from "@/images/about/dashboard-homepage.png"
import DashboardHomePageMobile from "@/images/about/dashboard-homepage-mobile.png"

const OurDashboardSection = () => {
  const { t } = useTranslation()
  return (
    <div className="services-section-container">
      <div className="services-section">
        <div className="services-wrapper">
          <div className="body">
            <div className="header">
              <span className="subtitle">{t("your_patient_dashboard")}</span>
              <h3 className="title">{t("your_patient_dashboard_title")}</h3>
            </div>
            <div className="body-card">
              <h6 className="body-title">{t("view_appointments")}</h6>
              <div className="body-desc">{t("view_appointments_desc")}</div>
            </div>
            <div className="body-card">
              <h6 className="body-title">{t("appointment_administration")}</h6>
              <div className="body-desc">
                {t("appointment_administration_desc")}
              </div>
            </div>
            <div className="body-card">
              <h6 className="body-title">{t("appointment_history")}</h6>
              <div className="body-desc">{t("appointment_history_desc")}</div>
            </div>
            <div className="body-card">
              <h6 className="body-title">{t("profile_settings")}</h6>
              <div className="body-desc">{t("profile_settings_desc")}</div>
            </div>
          </div>
          <div className="image-wrapper-mobile">
            <Image
              src={DashboardHomePageMobile}
              className="!w-[90vw]"
              style={{ objectFit: "contain" }}
              alt="services"
            />
          </div>
          <div className="image-wrapper">
            <Image
              src={DashboardHomePage}
              className="lg:!w-[50vw]"
              style={{ objectFit: "cover" }}
              alt="services"
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .services-section-container {
          @apply relative overflow-hidden py-10 lg:py-20;
          background: linear-gradient(
            172deg,
            rgba(210, 223, 255, 0.3) 0%,
            rgba(255, 243, 225, 0.3) 100%
          );
        }
        .services-section {
          @apply max-w-screen-xl w-full mx-auto px-4;
        }
        .services-wrapper {
          @apply flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8;
        }
        .image-wrapper-mobile {
          @apply block lg:hidden absolute bottom-0 w-[90vw] h-[35rem] overflow-hidden;
        }
        .image-wrapper {
          @apply hidden lg:block lg:absolute lg:-right-5 lg:top-20 lg:h-[40vw] lg:w-[50vw] overflow-hidden rounded-[1.25rem];
        }
        .header {
          @apply mb-8;
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
          @apply max-w-xl mb-[35rem] lg:mb-0;
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

        :global(.rtl) {
          .image-wrapper {
            @apply lg:right-auto lg:-left-5;
          }
        }
      `}</style>
    </div>
  )
}

export default OurDashboardSection
