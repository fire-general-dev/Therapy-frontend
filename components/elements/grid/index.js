import React from "react"
import PropTypes from "prop-types"

function Grid(props) {
  const { children, className } = props
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 ${className}`}
    >
      {children}
    </div>
  )
}

Grid.propTypes = {}

export default Grid
