import { useTranslation } from "next-i18next"

const ExperienceYearsCard = ({ expYears }) => {
  const { t } = useTranslation()
  return (
    <div className="experience-years-card-container">
      <div className="experience-years-card">
        {expYears} {t("years")}
      </div>
      <span className="label">{t("years_of_exp")}</span>
      <style jsx>{`
        .experience-years-card-container {
          @apply flex flex-col items-center gap-1;
        }
        .experience-years-card {
          @apply inline-block rounded-lg bg-white text-[#1BBDC3] text-sm font-medium py-2 px-5;
          border: 1px solid rgba(27, 190, 195, 0.3);
        }
        .label {
          @apply block text-[#718384] text-xs text-center;
        }
      `}</style>
    </div>
  )
}

export default ExperienceYearsCard
