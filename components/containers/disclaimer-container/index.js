import { useTranslation } from "next-i18next"

const DisclaimerContainer = ({}) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="wrapper">
        <div className="term">
          <p className="term-description">{t("disclaimer_body_1")}</p>
        </div>
        <div className="term">
          <p className="term-description">{t("disclaimer_body_2")}</p>
        </div>
        <div className="term">
          <p className="term-description">{t("disclaimer_body_3")}</p>
        </div>
        <div className="term">
          <p className="term-description">{t("disclaimer_body_4")}</p>
        </div>
        <div className="term">
          <p className="term-description">{t("disclaimer_body_5")}</p>
        </div>
        <div className="term">
          <p className="term-description">{t("disclaimer_body_6")}</p>
        </div>
        <div className="term">
          <p className="term-description">{t("disclaimer_body_7")}</p>
        </div>
        <div className="term">
          <p className="term-description">{t("disclaimer_body_8")}</p>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          @apply px-mb20 lg:px-vw360 my-mb60 md:my-60pxt lg:my-vw60;
        }

        .term {
          @apply mt-mb40 md:mt-40pxt lg:mt-vw40;
        }

        .term-title {
          @apply font-avenirBold text-18pxm md:text-18pxt lg:text-18px mb-6 md:mb-6pxt lg:mb-vw06;
        }

        .term-description {
          @apply text-18pxm md:text-18pxt lg:text-18px;
        }

        .privacy-list {
          @apply mt-vw12;
          @apply pl-vw16;
          li {
            @apply mb-vw12;
          }
        }
      `}</style>
    </>
  )
}

export default DisclaimerContainer
