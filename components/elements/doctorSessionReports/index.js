import PropTypes from "prop-types"
import React from "react"
import TableBody from "./tableBody"
import TableHeader from "./tableHeader"

export const DoctorSessionsTable = (props) => {
  const { patients, header, className = "" } = props
  return (
    <div className={`relative rounded-lg px-vw20 bg-white ${className}`}>
      <table className="mainTable">
        <TableHeader titles={header} />
        <TableBody items={patients} />
      </table>
      <style jsx global>{`
        .mainTable {
          @apply w-full text-[#2e4765] font-avenirMedium text-left rounded-lg mb-vw20;
        }
        .tableHead {
          @apply text-black-333;
        }
      `}</style>
    </div>
  )
}

DoctorSessionsTable.propTypes = {
  patients: PropTypes.array,
}

export default DoctorSessionsTable
