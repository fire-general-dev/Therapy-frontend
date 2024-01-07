import Image from "next/image"
import FirstStepImage from "@/images/recomendations-steps/safari/first-step.png"
import SecondStepImage from "@/images/recomendations-steps/safari/second-step.png"
import { useTranslation } from "next-i18next"

const SafariTips = () => {
  const { t } = useTranslation()
  return (
    <div>
      <div className="step-container">
        <span className="step">{t("click_microphone_and_select_allow")}</span>
        <Image src={FirstStepImage} alt="Step" />
      </div>
      <div className="step-container">
        <span className="step">{t("click_camera_and_select_allow")}</span>
        <Image src={SecondStepImage} alt="Step" />
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

export default SafariTips
