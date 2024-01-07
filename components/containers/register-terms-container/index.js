import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const RegisterTermsContainer = ({ onReject, onAccept }) => {
  const { t } = useTranslation()
  const [agreeShareHealthInfo, setAgreeShareHealthInfo] = useState(true)
  const [agreeConsentAcceptance, setAgreeConsentAcceptance] = useState(true)
  const router = useRouter()

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
          <h6 className="term-title">{t("governing_law")}</h6>
          <p className="term-description">{t("governing_law_body")}</p>
        </div>
        <div className="term">
          <h6 className="term-title">
            {t("changes_to_terms_and_conditions_pop")}
          </h6>
          <p className="term-description">
            {t("changes_to_terms_and_conditions_body")}
          </p>
        </div>
        <div className="actions">
          <div className="user-checkbox">
            <input
              id="agree_share_health_info"
              type="checkbox"
              className="checkbox"
              checked={agreeShareHealthInfo}
              onChange={(e) => {
                setAgreeShareHealthInfo(e.target.checked)
              }}
            />
            <label htmlFor="agree_share_health_info" l>
              {t("agree_share_health_info")}
            </label>
          </div>

          <div className="user-checkbox mt-mb16 md:mt-16pxt lg:mt-vw16">
            <input
              id="consent_acceptance"
              type="checkbox"
              className="checkbox"
              checked={agreeConsentAcceptance}
              onChange={(e) => {
                setAgreeConsentAcceptance(e.target.checked)
              }}
            />
            <label htmlFor="consent_acceptance" l>
              {t("consent_acceptance")}
              <Link
                href="/privacy"
                className="text-[#25a9ad] border-b border-b-[#25a9ad]"
              >
                {t("telehealth_service")}
              </Link>
            </label>
          </div>

          <div className="btn-actions">
            <button className="reject-btn" onClick={() => onReject()}>
              {t("reject")}
            </button>
            <button
              className="button"
              disabled={!agreeConsentAcceptance}
              onClick={() => onAccept(agreeShareHealthInfo)}
            >
              {t("accept")}
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
           {
            /* @apply px-mb20 lg:px-vw360 my-mb60 md:my-60pxt lg:my-vw60; */
          }
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
        .actions {
          @apply mt-vw40;
        }

        .btn-actions {
          @apply flex items-center justify-center gap-16;
        }
        .button {
          @apply mt-mb40 md:mt-40pxt lg:mt-vw40 w-mb240 md:w-240pxt lg:w-vw200 text-center rounded-full uppercase text-18pxm md:text-18pxt lg:text-18px text-green-100 py-mb10 lg:py-vw10 px-mb20 lg:px-vw24 transition-all duration-500 bg-gradient-to-r from-pink-300 to-blue-100 disabled:from-pink-disbaled300 disabled:to-blue-disabled100 hover:from-btnPrimary hover:to-btnPrimary hover:text-white hover:translate-x-0.5 hover:translate-y-0.5;
          &:disabled:hover {
            @apply hover:text-black-0 hover:translate-x-0 hover:translate-y-0;
          }
        }

        .reject-btn {
          @apply bg-white shadow-infoButton mt-mb40 md:mt-40pxt lg:mt-vw40 w-mb240 md:w-240pxt lg:w-vw200 text-center rounded-full uppercase text-18pxm md:text-18pxt lg:text-18px text-green-100 py-mb10 lg:py-vw10 px-mb20 lg:px-vw24 transition-all duration-500 hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer;
          &:hover {
            @apply bg-btnPrimary text-white;
          }
        }

        .user-checkbox {
          @apply flex items-center;
          & label {
            @apply cursor-pointer text-left relative  text-14pxm md:text-20pxt lg:text-16px;
          }
          & input {
            @apply absolute cursor-pointer opacity-0;
          }
          & label::before {
            @apply relative inline-block bg-transparent border border-solid border-btnPrimary appearance-none content-[""] rounded-md p-mb12 md:p-12pxt lg:p-vw12 w-20pxm md:w-20pxt lg:w-20px h-20pxm md:h-20pxt lg:h-20px align-middle cursor-pointer mr-mb8 md:mr-8pxt lg:mr-vw08;
          }
          & label:hover::before,
          & input:hover + label::before {
            @apply bg-[#d0f6f8];
          }
          & input:checked + label::after {
            @apply content-[""] block absolute top-mb6 md:top-6pxt lg:top-vw06 left-mb10 md:left-10pxt lg:left-vw10 w-6pxm md:w-6pxt lg:w-6px  h-14pxm md:h-14pxt lg:h-14px border-solid border-white rotate-45;
            border-width: 0 2px 2px 0;
          }
          & input:checked + label::before {
            @apply bg-btnPrimary;
          }
        }

        :global(.rtl) {
          .user-checkbox {
            & label {
              @apply text-right;
            }
            & label::before {
              @apply mr-0 md:mr-0 lg:mr-0 ml-mb8 md:ml-8pxt lg:ml-vw08;
            }
            & input:checked + label::after {
              @apply left-auto md:left-auto lg:left-auto right-mb10 md:right-10pxt lg:right-vw10;
            }
          }
        }
      `}</style>
    </>
  )
}

export default RegisterTermsContainer
