import NafsiLogo from "@/components/nafsiLogo"
import SocialCard from "./SocialCard"
import PhoneIcon from "@/images/icons/footer/phone.svg"
import MessageIcon from "@/images/icons/footer/message.svg"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import { isRTLLayout } from "@/utils/helpers"
import ArabicLogo from "@/components/icons/arabic-logo"
import { useRouter } from "next/router"

const UpperFooter = ({ specailities }) => {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <div className="upper-footer">
      <div className="footer-content">
        <div className="logo-section">
          {isRTLLayout(router) ? <ArabicLogo /> : <NafsiLogo />}
          <p className="about-us">{t("nafsi_brief")}</p>
          <div className={"contact-container"}>
            <SocialCard
              isLink={true}
              image={MessageIcon}
              title={t("contact_at")}
              info={
                "&#105;&#110;&#102;&#111;&#064;&#110;&#097;&#102;&#115;&#105;&#104;&#101;&#097;&#108;&#116;&#104;&#046;&#099;&#111;&#109;"
              }
            >
              &#105;&#110;&#102;&#111;&#064;&#110;&#097;&#102;&#115;&#105;&#104;&#101;&#097;&#108;&#116;&#104;&#046;&#099;&#111;&#109;
            </SocialCard>
            <SocialCard
              image={PhoneIcon}
              title={t("have_question")}
              info={"800 nafsi"}
            />
          </div>
        </div>
        <div className="section col-span-2 lg:col-span-1">
          <Link href={"/"}>
            <span className="section-item">{t("home")}</span>
          </Link>
          <Link href={"/therapists"}>
            <span className="section-item">{t("therapists")}</span>
          </Link>
          <Link href={"/specialities"}>
            <span className="section-item">{t("specialties")}</span>
          </Link>
          <Link href={"/get-started"}>
            <span className="section-item">
              {t("begin_your_wellness_journey")}
            </span>
          </Link>
        </div>
        <div className="section">
          {specailities?.data?.slice(0, 5).map((specaility) => (
            <Link
              key={`${specaility.attributes.alias}-${specaility.id}`}
              href={`/services/${specaility.attributes.alias}`}
            >
              <span className="section-item">
                {specaility.attributes.title}
              </span>
            </Link>
          ))}
        </div>
        <div className="section">
          <Link href={"/cookies"}>
            <span className="section-item">{t("cookies")}</span>
          </Link>
          <Link href={"/disclaimer"}>
            <span className="section-item">{t("disclaimer")}</span>
          </Link>
          <Link href={"/privacy"}>
            <span className="section-item">{t("privacy")}</span>
          </Link>
          <Link href={"/terms"}>
            <span className="section-item">{t("terms_of_condistions")}</span>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .upper-footer {
          background: linear-gradient(
            172deg,
            rgba(210, 223, 255, 0.3) 0%,
            rgba(255, 243, 225, 0.3) 100%
          );
        }
        .footer-content {
          @apply max-w-screen-xl w-full mx-auto px-4 py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-5 gap-10;
        }

        .logo-section {
          @apply col-span-2 lg:col-span-2 flex items-center lg:items-start flex-col gap-8 lg:border-r lg:pr-5 lg:mr-2 border-b pb-5 lg:pb-0 lg:border-b-0 border-solid border-[#EEEFF0];
        }

        .contact-container {
          @apply flex gap-10;
        }

        .about-us {
          @apply text-center lg:text-left text-gray-64 text-sm;
        }

        .section {
          .section-item {
            @apply text-gray-64 text-sm block p-2;
          }
        }

        :global(.rtl) {
          .logo-section {
            @apply border-none pr-0 mr-0 border-l pl-5 ml-2;
          }

          .about-us {
            @apply lg:text-right;
          }
        }
      `}</style>
    </div>
  )
}

export default UpperFooter
