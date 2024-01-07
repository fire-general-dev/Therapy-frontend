import React from "react"
import PropTypes from "prop-types"

function DashboardInput(props) {
  const { value, setValue, filedName, extraClasses, label } = props
  return (
    <>
      <div className={`${extraClasses ? extraClasses : ""}`}>
        <input
          className="dashboard-input"
          name={filedName}
          value={value}
          onChange={setValue}
        />
      </div>

      <style jsx>{`
        .dashboard-input {
          @apply text-18pxm md:text-22pxt lg:text-18px font-avenirBold px-mb20 md:px-20pxt lg:px-vw20 w-full;
          -webkit-appearance: none;
          outline: none;
        }
      `}</style>
    </>
  )
}

DashboardInput.propTypes = {}

export default DashboardInput
