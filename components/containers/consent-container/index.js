import { useTranslation } from "next-i18next"
import Link from "next/link"

const ConsentContainer = ({}) => {
  const { t } = useTranslation()

  return (
    <div className="wrapper">
      <div className="consent-item">
        <h6 className="title">{t("consent_purpose")}</h6>
        <ul>
          <li className="list-item">{t("consent_purpose_first")}</li>
          <li className="list-item">{t("consent_purpose_second")}</li>
          <li className="list-item">{t("consent_purpose_third")}</li>
          <li className="list-item">{t("consent_purpose_fourth")}</li>
        </ul>
      </div>
      <div className="consent-item">
        <h6 className="title">{t("electronic_systems")}</h6>
        <p className="description">{t("electronic_systems_description")}</p>
      </div>
      <div className="consent-item">
        <h6 className="title">{t("nature_of_teleconsultation")}</h6>
        <ul>
          <li className="list-item">{t("nature_of_teleconsultation_first")}</li>
          <li className="list-item">
            {t("nature_of_teleconsultation_second")}
          </li>
          <li className="list-item">{t("nature_of_teleconsultation_third")}</li>
          <li className="list-item">
            {t("nature_of_teleconsultation_fourth")}
          </li>
        </ul>
      </div>
      <div className="consent-item">
        <h6 className="title">{t("medical_information_title")}</h6>
        <p className="description">{t("medical_information_description")}</p>
      </div>
      <div className="consent-item">
        <h6 className="title">{t("confidentiality_title")}</h6>
        <p className="description">{t("confidentiality_description")}</p>
      </div>
      <div className="consent-item">
        <h6 className="title">{t("confidentiality_title")}</h6>
        <p className="description">{t("confidentiality_description")}</p>
      </div>
      <div className="consent-item">
        <h6 className="title">{t("rights_title")}</h6>
        <p className="description">{t("rights_description")}</p>
      </div>
      <div className="consent-item">
        <h6 className="title">{t("expected_benefits_title")}</h6>
        <ul>
          <li className="list-item">{t("expected_benefits_first")}</li>
          <li className="list-item">{t("expected_benefits_second")}</li>
          <li className="list-item">{t("expected_benefits_third")}</li>
        </ul>
      </div>
      <div className="consent-item">
        <h6 className="title">{t("possible_risks_title")}</h6>
        <p className="description">{t("possible_risks_description")}</p>
        <ul>
          <li className="list-item">{t("possible_risks_first")}</li>
          <li className="list-item">{t("possible_risks_second")}</li>
          <li className="list-item">{t("possible_risks_third")}</li>
          <li className="list-item">{t("possible_risks_fourth")}</li>
        </ul>
      </div>
      <div className="consent-item">
        <h6 className="title">
          {t("expected_benefits_and_possible_risks_title")}
        </h6>
        <p className="description">
          {t("expected_benefits_and_possible_risks_description")}
        </p>
      </div>
      <style jsx>{`
        .wrapper {
          @apply px-mb20 lg:px-vw360 my-mb60 md:my-60pxt lg:my-vw60;
        }
        .consent-item {
          @apply mb-8;
        }
        .title {
          @apply text-black-333 text-lg font-semibold mb-5;
        }
        .list {
        }
        .list-item {
          @apply mb-2 text-gray-64 text-sm font-normal px-7;
        }
        .description {
          @apply text-black-333 text-base font-normal;
        }

        :global(.rtl) {
          .list-item {
            background-position: right;
          }
        }
      `}</style>
    </div>
  )
}

export default ConsentContainer
