import React from "react"
import PropTypes from "prop-types"
import ExperienceCard from "./ExperienceCard"
import { useTranslation } from "next-i18next"

function TherapistsWorkExperience(props) {
  const { experienceDetails, isMobile } = props
  const { t } = useTranslation("common")
  return (
    <div className="wrapper">
      <div className="title">{t("work_experience")}</div>
      <div className="cards-container">
        {experienceDetails.map((item) => (
          <ExperienceCard
            key={`exp-${item.id}`}
            isMobile={isMobile}
            item={item}
          />
        ))}
      </div>
      <style jsx>{`
        .wrapper {
          @apply px-mb20 lg:px-vw360 bg-gray-f0 bg-opacity-40 py-mb40 md:py-40pxt lg:py-vw46;
        }
        .title {
          @apply font-avenirMedium text-20pxm md:text-24pxt lg:text-20px text-center mb-mb12 md:mb-12pxt lg:mb-vw50;
        }
        .cards-container {
          @apply flex flex-col lg:flex-row justify-center;
        }
      `}</style>
    </div>
  )
}

TherapistsWorkExperience.propTypes = {
  experienceDetails: PropTypes.array,
}

export default TherapistsWorkExperience
