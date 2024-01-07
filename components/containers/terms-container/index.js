import { useTranslation } from "next-i18next"
import Link from "next/link"

const TermsContainer = ({}) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="wrapper">
        <p>{t("T&C_intro")}</p>
        <div className="term">
          <h6 className="term-title">{t("description_of_services")}</h6>
          <p className="term-description">
            {t("description_of_services_body")}
          </p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("eligibility")}</h6>
          <p className="term-description">{t("eligibility_body")}</p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("T&C_registration")}</h6>
          <p className="term-description">{t("T&C_registration_body")}</p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("T&C_payment")}</h6>
          <p className="term-description">{t("T&C_payment_body")}</p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("cancellation_and_refund_policy")}</h6>
          <p className="term-description">
            {t("cancellation_and_refund_policy_body")}
          </p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("privacy_policy")}</h6>
          <p className="term-description">
            {t("privacy_policy_body")}
            <Link
              href="/privacy"
              className="text-[#25a9ad] border-b border-b-[#25a9ad]"
            >
              {t("telehealth_service_privacy")}
            </Link>
          </p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("limitation_of_liability")}</h6>
          <p className="term-description">
            {t("limitation_of_liability_body")}
          </p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("indemnification")}</h6>
          <p className="term-description">{t("indemnification_body")}</p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("termination")}</h6>
          <p className="term-description">{t("termination_body")}</p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("law_regulations")}</h6>
          <p className="term-description">
            {t("law_regulations_body")} {t("governing_law_body")}
          </p>
          {/* <p className="term-description">{t("governing_law_body")}</p> */}
        </div>
        <div className="term">
          <h6 className="term-title">{t("consent_for_telemedicine")}</h6>
          <p className="term-description">
            {t("consent_for_telemedicine_body1")}{" "}
            <Link
              href="/consent"
              className="text-[#25a9ad] border-b border-b-[#25a9ad]"
            >
              {t("consent_for_telemedicine_body2")}
            </Link>{" "}
            {t("consent_for_telemedicine_body3")}
          </p>
        </div>
        {/* <div className="term">
          <h6 className="term-title">{t("governing_law")}</h6>
          <p className="term-description">{t("governing_law_body")}</p>
        </div> */}
        <div className="term">
          <h6 className="term-title">{t("changes_to_terms_and_conditions")}</h6>
          <p className="term-description">
            {t("changes_to_terms_and_conditions_body")}
          </p>
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
      `}</style>
    </>
  )
}

export default TermsContainer
