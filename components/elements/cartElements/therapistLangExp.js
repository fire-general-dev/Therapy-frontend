import React from "react"
import PropTypes from "prop-types"
import InfoBox from "../TherapistHeroDesktop/InfoBox"

function TherapistLangExp(props) {
  const { therapist } = props

  const doctorSpeakingLanguage = therapist.speakingLanguages
    ?.map((item) => item.title)
    ?.join(" | ")
  return (
    <div className="boxes-wrapper">
      <InfoBox
        className="mb-mb20 md:mb-20pxt lg:mb-0"
        title={"Languages Spoken"}
        info={doctorSpeakingLanguage}
      />
      <InfoBox title={"Years of Experience"} info={therapist.totalYearOfExp} />
      <style jsx>{`
        .boxes-wrapper {
          @apply flex flex-col lg:flex-row mb-mb40 md:mb-40pxt lg:mb-vw46 lg:justify-center;
        }
      `}</style>
    </div>
  )
}

TherapistLangExp.propTypes = {}

export default TherapistLangExp
