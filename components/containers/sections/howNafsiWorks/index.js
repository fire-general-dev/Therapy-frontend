import React from "react"
import InfoCards from "./infoCards"
import LinkButton from "@/components/buttons/LinkButton"
import { useTranslation } from "next-i18next"

function HowNafsiWorks(props) {
  const { data = {} } = props
  const { title, subTitle, offerCards } = data
  const { t } = useTranslation()

  return (
    <div id="what-we-offer-section" className="wrapper mobile-background">
      <div className="header">
        <div className="title">
          <div className="sub-title">{subTitle}</div>
          <div className="main-title">{title}</div>
        </div>
        <LinkButton
          className={"hidden lg:block"}
          href="/get-started"
          text={t("start_your_journey")}
        />
      </div>
      <div className="cars-wrapper">
        {offerCards.map((item, index) => (
          <InfoCards
            key={index}
            lastItem={index === offerCards.length - 1}
            {...item}
            index={index + 1}
          />
        ))}
      </div>
      <LinkButton
        className={"block w-full lg:w-fit mt-40 lg:hidden"}
        href="/get-started"
        text={t("start_your_journey")}
      />
      <style jsx>{`
        .wrapper {
          @apply max-w-screen-xl w-full mx-auto px-4 py-10 lg:py-20;
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
          @apply text-center lg:text-left flex justify-center lg:justify-between items-center;
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

export default HowNafsiWorks
