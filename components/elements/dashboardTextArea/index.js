import React from "react"
import PropTypes from "prop-types"

function DashboardTextArea(props) {
  return (
    <div className="wrapper">
      <div className="inputFiled">Add your report Here</div>
      <style jsx>{`
        .wrapper {
          @apply bg-white p-vw24 text-black-2e4765;
        }
        .inputFiled {
          @apply font-avenirMedium text-18px border-b min-h-135px;
        }
      `}</style>
    </div>
  )
}

DashboardTextArea.propTypes = {}

export default DashboardTextArea
