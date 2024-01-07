import PropTypes from "prop-types"
import React from "react"

export const TableHeader = (props) => {
  return (
    <thead className="thead">
      <tr className="border-underline">
        {props.titles.map((title) => (
          <th key={`table-title-${title}`} scope="col" className="colum-title">
            {title}
          </th>
        ))}
        <th
          key={`table-title-more`}
          scope="col"
          className="py-4 px-6 text-white"
        >
          ...
        </th>
      </tr>
      <style jsx>{`
        .thead {
          @apply text-[#2e4765] text-18px bg-white;
        }
        .border-underline {
          @apply border-b flex;
        }
        .colum-title {
          @apply py-3 px-6 flex-1 flex items-center;
        }
      `}</style>
    </thead>
  )
}

TableHeader.propTypes = {
  titles: PropTypes.array,
}

export default TableHeader
