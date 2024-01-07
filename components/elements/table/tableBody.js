import PropTypes from "prop-types"
import React from "react"

export const TableBody = (props) => {
  const { items, optionsList } = props
  return (
    <tbody>
      {items.map((row, rowIndex) => {
        // const isClicable =
        let column = Object.keys(row).map((key, index) => {
          if (key !== "id" && key !== "onClick") {
            return (
              <td
                key={key + index + rowIndex + ""}
                className={`row-item ${key === "notes" ? "notes" : ""}`}
              >
                {row[key]}
              </td>
            )
          }
          return null
        })
        return (
          <tr
            onClick={() => {
              if (row.onClick) row.onClick()
            }}
            key={row.id}
            className="table-row"
          >
            {column}
          </tr>
        )
      })}
      <style jsx>{`
        .table-row {
          @apply bg-white border-b flex cursor-pointer hover:bg-gray-100;
        }
        .row-item {
          @apply text-18pxm md:text-22pxt lg:text-18px py-4 px-6 flex-1 w-16perc text-start;
        }
        .notes {
          @apply truncate w-60;
        }
      `}</style>
    </tbody>
  )
}

TableBody.propTypes = {
  items: PropTypes.array,
}

export default TableBody
