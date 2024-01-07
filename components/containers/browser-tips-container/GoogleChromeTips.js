import Image from "next/image"
import FirstStepImage from "@/images/recomendations-steps/google-chrome/first-step.png"
import SecondStepImage from "@/images/recomendations-steps/google-chrome/second-step.png"
import ThirdStep from "@/images/recomendations-steps/google-chrome/third-step.png"
import FourthStepImage from "@/images/recomendations-steps/google-chrome/fourth-step.png"
import { useTranslation } from "next-i18next"

const GoogleChromeTips = () => {
  const { t } = useTranslation()
  return (
    <div>
      <div className="step-container">
        <span className="step">{t("click_on_the_microphone_icon")}</span>
        <Image src={FirstStepImage} alt="Step" />
      </div>
      <div className="step-container">
        <span className="step">{t("click_allow_button")}</span>
        <Image src={SecondStepImage} alt="Step" />
      </div>
      <div className="step-container">
        <span className="step">{t("click_camera_icon")}</span>
        <Image src={ThirdStep} alt="Step" />
      </div>
      <div className="step-container">
        <span className="step">{t("click_allow_button_camera")}</span>
        <Image src={FourthStepImage} alt="Step" />
      </div>
      <style jsx>{`
        .step-container {
          @apply mb-7 lg:mb-12;
        }
        .step {
          @apply block mb-5 text-[#2E3333] text-base lg:text-xl font-medium;
        }
      `}</style>
    </div>
  )
}

export default GoogleChromeTips
