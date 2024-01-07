import React from "react"
import PropTypes from "prop-types"

function ExperienceCard(props) {
  const { item } = props
  const startYear = new Date(item.startDate).getFullYear()
  const endYear = new Date(item.endDate).getFullYear()
  return (
    <div className="wrapper">
      <div className="job-location">{item.place}</div>
      <div className="job-title">{item.position}</div>
      <div className="job-year">
        {startYear} - {endYear}
      </div>
      <style jsx>{`
        .wrapper {
          @apply relative bg-blue-100 rounded-md mt-mb40 md:mt-40pxt lg:mt-0 bg-opacity-20 mx-mb70 lg:ml-0 lg:mr-vw20 p-mb20 md:p-20pxt lg:p-vw20 flex flex-col text-black-333 justify-center items-center lg:w-vw280 capitalize;
        }
        .job-location {
          @apply font-avenirHeavy text-18pxm md:text-22pxt lg:text-18px mb-mb8 lg:mb-vw08;
        }
        .job-title {
          @apply font-sans text-14pxm md:text-18pxt lg:text-14px text-center;
        }
        .job-year {
          @apply absolute top-0 -translate-y-1/2 font-avenirHeavy text-16pxm md:text-20pxt lg:text-16px;
        }
      `}</style>
    </div>
  )
}

ExperienceCard.propTypes = {}

export default ExperienceCard
