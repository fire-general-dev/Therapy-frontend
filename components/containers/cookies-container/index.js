import { useTranslation } from "next-i18next"

const CookiesContainer = ({}) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="wrapper">
        <h6 className="term-title">{t("introduction")}</h6>
        <p className="term-description">{t("cookies_intro")}</p>
        <br />
        <div className="term">
          <h6 className="term-title">{t("what_are_cookies")}</h6>
          <p className="term-description">{t("what_are_cookies_desc")}</p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("types_of_cookies_we_use")}</h6>
          <p className="term-description">
            <ul className="privacy-list">
              <li>{t("types_of_cookies_we_use_a")}</li>
              <li>{t("types_of_cookies_we_use_b")}</li>
              <li>{t("types_of_cookies_we_use_c")}</li>
            </ul>
          </p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("third_party_cookies")}</h6>
          <p className="term-description">{t("third_party_cookies_desc")}</p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("managing_cookies")}</h6>
          <p className="term-description">{t("managing_cookies_desc")}</p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("your_consent")}</h6>
          <p className="term-description">{t("your_consent_desc")}</p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("changes_cookies_policy")}</h6>
          <p className="term-description">{t("changes_cookies_policy_desc")}</p>
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

export default CookiesContainer
