import { useTranslation } from "next-i18next"
import Link from "next/link"

const PrivacyContainer = ({}) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="wrapper">
        <h6 className="term-title">{t("introduction")}</h6>
        <p className="term-description">{t("privacy_intro")}</p>
        <br />
        <p className="term-description">{t("by_using_service")}</p>
        <div className="term">
          <h6 className="term-title">{t("information_we_collect")}</h6>
          <p className="term-description">
            <br />
            {t("personal_info")}
            <br />
            <br />
            {t("personal_info_intro")}
            <br />
            <ul className="privacy-list">
              <li>{t("personal_info_a")}</li>
              <li>{t("personal_info_b")}</li>
              <li>{t("personal_info_c")}</li>
              <li>{t("personal_info_d")}</li>
              <li>{t("personal_info_e")}</li>
            </ul>
            <br />
            {t("non_personal_info")}
            <br />
            <br />
            {t("non_personal_info_desc")}
          </p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("how_we_use_your_info")}</h6>
          <p className="term-description">
            {t("how_we_use_your_info_intro")}
            <br />
            <ul className="privacy-list">
              <li>{t("how_we_use_your_info_a")}</li>
              <li>{t("how_we_use_your_info_b")}</li>
              <li>{t("how_we_use_your_info_c")}</li>
              <li>{t("how_we_use_your_info_d")}</li>
              <li>{t("how_we_use_your_info_e")}</li>
            </ul>
          </p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("how_we_share_your_information")}</h6>
          <p className="term-description">
            {t("how_we_share_your_information_intro")}
            <br />
            <ul className="privacy-list">
              <li>{t("how_we_share_your_information_a")}</li>
              <li>{t("how_we_share_your_information_b")}</li>
              <li>{t("how_we_share_your_information_c")}</li>
            </ul>
          </p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("security_of_your_information")}</h6>
          <p className="term-description">
            {t("security_of_your_information_desc")}
          </p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("your_choices_rights")}</h6>
          <p className="term-description">{t("your_choices_rights_desc")}</p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("changes_privacy_policy")}</h6>
          <p className="term-description">{t("changes_privacy_policy_desc")}</p>
        </div>
        <div className="term">
          <h6 className="term-title">{t("contact_us_pricacy")}</h6>
          <p className="term-description">
            {t("contact_us_pricacy_desc")}

            <Link href="mailto:&#105;&#110;&#102;&#111;&#064;&#110;&#097;&#102;&#115;&#105;&#104;&#101;&#097;&#108;&#116;&#104;&#046;&#099;&#111;&#109;">
              &#105;&#110;&#102;&#111;&#064;&#110;&#097;&#102;&#115;&#105;&#104;&#101;&#097;&#108;&#116;&#104;&#046;&#099;&#111;&#109;
            </Link>
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

export default PrivacyContainer
