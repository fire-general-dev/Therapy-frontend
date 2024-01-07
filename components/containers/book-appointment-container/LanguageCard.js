import { useTranslation } from "next-i18next"

const LanguageCard = ({ langauges }) => {
  const { t } = useTranslation()

  const doctorSpeakingLanguage = langauges
    ?.map((item) => item.title)
    ?.join(" | ")
  return (
    <div className="language-card-container">
      <div className="language-card">{doctorSpeakingLanguage}</div>
      <span className="label">{t("languages_spoken")}</span>
      <style jsx>{`
        .language-card-container {
          @apply flex flex-col items-center gap-1;
        }
        .language-card {
          @apply inline-block rounded-lg bg-white text-[#1BBDC3] text-sm font-medium py-2 px-5;
          border: 1px solid rgba(27, 190, 195, 0.3);
        }
        .label {
          @apply text-[#718384] text-xs text-center;
        }
      `}</style>
    </div>
  )
}

export default LanguageCard
