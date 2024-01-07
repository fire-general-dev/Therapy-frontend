import React from "react"
import { useTranslation } from "next-i18next"
import UserJourneyCard from "@/components/cards/UserJourneyCard"
import UserJourney1 from "@/images/about/user-journey-1.png"
import UserJourney2 from "@/images/about/user-journey-2.png"
import UserJourney3 from "@/images/about/user-journey-3.jpg"

function UserJournySection() {
  const { t } = useTranslation()

  return (
    <div id="what-we-offer-section" className="wrapper mobile-background">
      <div className="header">
        <div className="title max-w-[13rem]">
          <div className="sub-title">{t("user_journey")}</div>
          <div className="main-title">{t("your_Journey_with_nafsi")}</div>
        </div>
        <div className="text-[#636363] text-base max-w-md">
          {t("your_Journey_with_nafsi_desc")}
        </div>
      </div>
      <div className="cars-wrapper">
        <UserJourneyCard
          image={UserJourney1}
          index={1}
          title={t("setup_consultation")}
          desc={t("setup_consultation_desc")}
        />
        <UserJourneyCard
          image={UserJourney2}
          index={2}
          title={t("verify_submit")}
          desc={t("verify_submit_desc")}
        />
        <UserJourneyCard
          image={UserJourney3}
          index={3}
          title={t("join_your_session")}
          desc={t("join_your_session_desc")}
        />
      </div>
      <style jsx>{`
        .wrapper {
          @apply max-w-screen-xl w-full mx-auto px-4 py-10 pb-44 lg:py-20;
          font-family: "Poppins", sans-serif;
        }
        .main-title {
          @apply text-[#2E3333] text-3xl font-medium;
        }
        .sub-title {
          @apply text-[#1BBEC3] text-base font-medium uppercase mb-1;
        }
        .cars-wrapper {
          @apply flex justify-between flex-col gap-40 lg:gap-8 lg:flex-row lg:-translate-y-33perc mt-8 lg:mt-48;
        }

        .header {
          @apply text-center lg:text-left flex flex-col gap-5 lg:flex-row justify-center lg:justify-between items-center;
        }

        :global(.rtl) {
          .header {
            @apply lg:text-right;
          }
        }
      `}</style>
    </div>
  )
}

export default UserJournySection
