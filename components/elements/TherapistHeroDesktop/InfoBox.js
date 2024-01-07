import React from "react"
import PropTypes from "prop-types"

function InfoBox(props) {
  const { title, info, className } = props
  return (
    <div className={`wrapper ${className}`}>
      <div className="title">{title}</div>
      <div className="info">{info}</div>
      <style jsx>{`
        .wrapper {
          @apply rounded-md px-mb28 md:px-28pxt lg:px-vw30 py-mb6 md:py-6pxt lg:py-vw06 bg-white bg-opacity-40 text-black-333 mr-mb40 md:mr-40pxt lg:mr-vw46;
        }
        .title {
          @apply font-sans text-16pxm md:text-20pxt lg:text-16px mb-mb6 md:mb-6pxt lg:mb-vw06 text-center;
        }
        .info {
          @apply font-avenirHeavy text-14pxm md:text-18pxt lg:text-14px text-center;
        }
      `}</style>
    </div>
  )
}

InfoBox.propTypes = {
  title: PropTypes.string,
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default InfoBox
