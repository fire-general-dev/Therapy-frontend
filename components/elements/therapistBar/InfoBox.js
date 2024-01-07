import React from "react"
import PropTypes from "prop-types"

function InfoBox(props) {
  const { title, info } = props
  return (
    <div className="wrapper">
      <div className="title">{title}</div>
      <div className="info">{info}</div>
      <style jsx>{`
        .wrapper {
          @apply px-mb28 lg:px-vw30 py-mb6 lg:py-vw06 bg-white bg-opacity-40 text-black-333 mr-mb40 lg:mr-vw46;
        }
        .title {
          @apply font-sans text-16pxm lg:text-16px mb-mb6 lg:mb-vw06 text-center;
        }
        .info {
          @apply font-avenirHeavy text-14pxm lg:text-14px text-center;
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
