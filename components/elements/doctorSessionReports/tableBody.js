import Link from "next/link"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { useOnClickOutside } from "utils/hooks"
import editIcon from "@/images/icons/edit-icon.svg"
import Image from "next/image"

export const TableBody = (props) => {
  const { items } = props
  const [showMore, setShowMore] = useState({})

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
        if (typeof showMore[row.id] === "undefined")
          setShowMore((prev) => ({ ...prev, [row.id]: false }))

        return (
          <tr
            onClick={() => {
              if (row.onClick) row.onClick()
            }}
            key={row.id}
            className={`table-row ${showMore[row.id] ? "selected" : ""}`}
          >
            {column}
            <td className="py-4 px-6">
              <div className="icon-container">
                <Link
                  passHref
                  legacyBehavior
                  href={`/dashboard/patients/reports/${row.id}`}
                >
                  <Image
                    layout="raw"
                    src={editIcon}
                    alt="Edit"
                    className="!w-16px !h-16px cursor-pointer"
                  />
                </Link>
              </div>
              {/* <div className={`dropdown`}>
                <button
                  onClick={() => {
                    setShowMore((prev) => {
                      const updatedState = { ...prev }
                      Object.keys(updatedState).forEach((key) => {
                        updatedState[key] = false
                      })
                      updatedState[row.id] = !showMore[row.id]
                      // const currentElement = document.getElementById(
                      //   `popup-${row.id}`
                      // )
                      // if (updatedState[row.id]) {
                      //   const test = (event) => {
                      //     if (currentElement.contains(event.target)) {
                      //       console.log("Clicked Inside")
                      //     } else {
                      //       console.log("Clicked Outside / Elsewhere")
                      //       // document.removeEventListener(
                      //       //   "mousedown",
                      //       //   test(currentElement)
                      //       // )
                      //     }
                      //   }
                      //   document.addEventListener("mousedown", test)
                      // }
                      return updatedState
                    })
                  }}
                  className="dropbtn"
                >
                  ...
                </button>
                <div
                  className={`dropdown-content ${
                    showMore[row.id] ? "show" : ""
                  }`}
                  id={`popup-${row.id}`}
                >
                  <Link
                    passHref
                    legacyBehavior
                    href={`/dashboard/patients/reports/${row.id}`}
                  >
                    <a>Start Session</a>
                  </Link>
                  <a href="#">Reschedule</a>
                  <a href="#">Cancel</a>
                </div>
              </div> */}
            </td>
          </tr>
        )
      })}
      <style jsx>{`
        .table-row {
          @apply bg-white border-b flex;
          &.selected {
            @apply bg-gray-100;
          }
        }
        .row-item {
          @apply text-18pxm md:text-22pxt lg:text-18px py-vw12 px-vw16 flex-1 w-16perc text-start;
        }
        .notes {
          @apply truncate w-60;
        }
        .dropdown {
          @apply relative inline-block;
        }
        .dropbtn {
          @apply cursor-pointer border-none;
        }
        .icon-container {
          @apply h-full flex items-center;
        }
        .dropdown-content {
          @apply hidden absolute bg-white rounded-lg shadow-search z-10;

          a {
            @apply text-black-2e4765 font-avenirMedium text-16px block whitespace-nowrap py-vw12 px-vw20 hover:bg-gray-50;
          }

          a:first-child {
            @apply pt-vw20;
          }

          a:last-child {
            @apply pb-vw20;
          }

          &.show {
            display: block;
          }
        }
      `}</style>
    </tbody>
  )
}

TableBody.propTypes = {
  items: PropTypes.array,
}

export default TableBody
