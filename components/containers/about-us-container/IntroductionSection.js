import Image from "next/image"
import IntroImage from "@/images/about/about-intro.png"
import DHAImage from "@/images/about/DHA.png"
import HippaImage from "@/images/about/hippa.png"
import TdraImage from "@/images/about/tdra.png"
import MenuIcon from "@/images/icons/home/menu-icon.svg"
import CheckIcon from "@/images/about/check.svg"
import { useTranslation } from "next-i18next"

const IntroductionCard = ({ title, description }) => {
  return (
    <div className="intro-card">
      <div className="image-wrapper">
        <Image src={CheckIcon} alt="check icon" />
      </div>
      <h3 className="title">{title}</h3>
      <div className="desc">{description}</div>
      <style jsx>{`
        .intro-card {
          @apply p-10 flex-1;
          border-radius: 15px;
          border: 1px solid var(--Stroke, #eeeff0);
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(17px);
        }
        .title {
          @apply text-[#2E3333] text-xl font-medium capitalize mb-5;
        }
        .desc {
          @apply text-gray-64 text-sm;
        }
        .image-wrapper {
          @apply flex items-center justify-center w-11 h-11 rounded-full mb-8;
          background: rgba(27, 190, 195, 0.1);
        }
      `}</style>
    </div>
  )
}

const IntroductionSection = () => {
  const { t } = useTranslation()
  return (
    <div className="introduction-section-container">
      <div className="introduction-section">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-14">
          <div className="max-w-[34rem]">
            <span className="subtitle">{t("introduction")}</span>
            <h6 className="title">{t("our_commitment_to_compliance")}</h6>
            <div className="desc">
              <div className="mb-8">
                {t("our_commitment_to_compliance_desc1")}
              </div>
              <div>{t("our_commitment_to_compliance_desc2")}</div>
            </div>
            <div className="trusted-list">
              <div className="trusted-list-item">
                <Image
                  className="hidden lg:block"
                  width={14}
                  height={14}
                  src={MenuIcon}
                  alt="menu"
                />
                <span className="flex-1">{t("DHA")}</span>
              </div>
              <div className="trusted-list-item">
                <Image
                  className="hidden lg:block"
                  width={14}
                  height={14}
                  src={MenuIcon}
                  alt="menu"
                />
                <span className="flex-1">{t("HIPAA")}</span>
              </div>
              <div className="trusted-list-item">
                <Image
                  className="hidden lg:block"
                  width={14}
                  height={14}
                  src={MenuIcon}
                  alt="menu"
                />
                <span className="flex-1">{t("TDRA")}</span>
              </div>
            </div>
          </div>
          <div className="introductions-images">
            <div className="image-wrapper">
              <Image
                src={IntroImage}
                className="lg:!w-[36rem] rounded-[1.25rem]"
                alt="intro"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="trusted-images">
              <div className="trusted-image-wrapper">
                <Image src={DHAImage} alt="dha" />
              </div>
              <div className="trusted-image-wrapper">
                <Image src={HippaImage} alt="hippa" />
              </div>
              <div className="trusted-image-wrapper">
                <Image src={TdraImage} alt="tdra" />
              </div>
            </div>
          </div>
        </div>
        <div className="intro-cards">
          <IntroductionCard
            title={t("utmost_patient_doctor_confidentiality")}
            description={t("utmost_patient_doctor_confidentiality_desc")}
          />
          <IntroductionCard
            title={t("robust_data_protection_protocols")}
            description={t("robust_data_protection_protocols_desc")}
          />
        </div>
      </div>
      <style jsx>{`
        .introduction-section-container {
          background: linear-gradient(
            172deg,
            rgba(210, 223, 255, 0.3) 0%,
            rgba(255, 243, 225, 0.3) 100%
          );
        }
        .introduction-section {
          @apply max-w-screen-xl w-full mx-auto px-4 py-10 lg:py-20;
        }
        .introductions-images {
          @apply relative;
        }
        .subtitle {
          @apply block text-center lg:text-left text-[#1BBEC3] text-sm lg:text-base font-medium uppercase;
        }
        .title {
          @apply text-center lg:text-left text-[#2E3333] text-2xl lg:text-3xl font-medium capitalize mb-5;
        }
        .desc {
          @apply text-gray-64 text-sm lg:text-base text-center lg:text-left mb-5;
        }
        .image-wrapper {
          @apply w-full h-60 lg:w-[36rem] lg:h-96 overflow-hidden rounded-[1.25rem];
        }
        .trusted-images {
          @apply flex gap-2 left-1/2 -translate-x-1/2 absolute -bottom-10 lg:-bottom-14;
        }
        .trusted-image-wrapper {
          @apply rounded-2xl p-8 w-28 h-20 lg:w-44 lg:h-28 flex items-center justify-center;
          border-radius: 15px;
          border: 1px solid #eeeff0;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(5px);
        }
        .trusted-list {
          @apply mb-8;
        }
        .trusted-list-item {
          @apply flex items-center justify-center lg:justify-start text-center lg:text-left text-gray-64 text-base font-medium gap-5 mb-2;
        }
        .intro-cards {
          @apply flex flex-col lg:flex-row gap-5 lg:gap-8;
        }
        :global(.rtl) {
          .subtitle {
            @apply lg:text-right;
          }
          .title {
            @apply lg:text-right;
          }
          .desc {
            @apply lg:text-right;
          }
          .trusted-list-item {
            @apply lg:text-right;
          }
        }
      `}</style>
    </div>
  )
}

export default IntroductionSection
