import PropTypes from "prop-types"
import React from "react"
import TableBody from "./tableBody"
import TableHeader from "./tableHeader"

export const userReportsTable = (props) => {
  const { reports, header, className = "" } = props
  return (
    <div
      className={`overflow-x-auto relative rounded-lg px-vw20 bg-white ${className}`}
    >
      <table className="mainTable">
        <TableHeader titles={header} />
        <TableBody items={reports} />
      </table>
      <style jsx global>{`
        .mainTable {
          @apply w-full text-[#2e4765] font-avenirMedium text-left rounded-lg;
        }
        .tableHead {
          @apply text-black-333;
        }
      `}</style>
    </div>
  )
}

userReportsTable.propTypes = {
  patients: PropTypes.array,
}

export default userReportsTable
