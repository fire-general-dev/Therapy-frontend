import React, { useState, useEffect } from "react"
import Image from "next/image"
import showIcon from "@/images/icons/show.svg"
import moment from "moment"
import { toDataURL } from "@/utils/helpers"
import { useTranslation } from "next-i18next"

function DocumentsTable(props) {
  const { deviceType, files } = props
  const [isMobile, setIsMobile] = useState(deviceType === "mobile")

  const { t } = useTranslation()

  const isVerticalDisplay = props.verticalDisplay

  // If tablet in portrait mode make design as mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (deviceType == "tablet") {
        setIsMobile(window.innerHeight > window.innerWidth)
      }
    }
  }, [])

  return (
    <div
      className={`wrapper ${isVerticalDisplay ? "vertical" : ""} ${
        props.className ? props.className : ""
      }`}
    >
      {files && files.length > 0 ? (
        <table className={`table ${isVerticalDisplay ? "vertical" : ""}`}>
          <thead className="header-wrapper">
            <tr>
              {!isMobile ? (
                <th>
                  <span className="table-header-wrapper">
                    <span className="table-header">{t("id")}</span>
                  </span>
                </th>
              ) : null}
              <th>
                <span className="table-header-wrapper">
                  <span className="table-header">{t("file_name")}</span>
                </span>
              </th>
              <th>
                <span className="table-header-wrapper">
                  <span className="table-header">{t("file_type")}</span>
                </span>
              </th>
              <th>
                <span className="table-header-wrapper">
                  <span className="table-header">{t("date")}</span>
                </span>
              </th>
              {!isMobile ? (
                <th>
                  <span className="table-header-wrapper">
                    <span className="table-header">{t("size")}</span>
                  </span>
                </th>
              ) : (
                ""
              )}
              <th className="table-header no-border"></th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.name} className="table-row">
                {!isMobile ? (
                  <td>
                    <span className="table-header-wrapper">
                      <span className="table-header">1</span>
                    </span>
                  </td>
                ) : null}
                <td>
                  <span className="table-header-wrapper">
                    <span className="table-header">
                      {file.name.slice(0, 14)}{" "}
                      {file.name.length > 15 ? "..." : ""}
                    </span>
                  </span>
                </td>
                <td>
                  <span className="table-header-wrapper">
                    <span className="table-header">
                      {file.type || file.mime}
                    </span>
                  </span>
                </td>
                <td>
                  <span className="table-header-wrapper">
                    <span className="table-header">
                      {/* {file.lastModifiedDate?.toISOString().split("T")[0]} */}
                      {moment(file.createdAt || file.lastModifiedDate).format(
                        "DD-MM-YYYY"
                      )}
                    </span>
                  </span>
                </td>
                {!isMobile ? (
                  <td>
                    <span className="table-header-wrapper">
                      <span className="table-header">
                        {Number(file.size?.toFixed(2))} KB
                      </span>
                    </span>
                  </td>
                ) : null}
                <td>
                  <span className="table-header-wrapper">
                    <span className="table-header no-border">
                      <div
                        onClick={async () => {
                          if (file.url) {
                            const base64 = await toDataURL(file.url)
                            const download = document.createElement("a")
                            download.href = base64
                            download.download = file.name
                            download.click()
                          }
                        }}
                      >
                        <Image
                          className="cursor-pointer mx-auto"
                          layout="raw"
                          src={showIcon}
                          alt="download"
                        />
                      </div>
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-files">{t("no_files")}</div>
      )}
      <style jsx>{`
        .wrapper {
          @apply bg-white text-black-2e4765 p-mb20 md:p-20pxt lg:p-vw20 flex flex-col lg:flex-row;
          &.vertical {
            @apply flex-col;
          }
        }
        .table {
          @apply bg-white mt-mb20 md:mt-20pxt lg:mt-0 lg:ml-vw30 border-[#ddd] border rounded-sm p-vw16 border-spacing-1 h-fit;
          &.vertical {
            @apply ml-0 mt-vw30;
          }
          flex: 3;
        }
        .parag {
          @apply mb-vw30;
        }
        .table-header-wrapper {
          @apply w-full inline-block py-vw12;
        }
        .table-header {
          @apply block m-0 p-0 border-r border-r-[#ddd] text-[#1c1c1c] text-12pxm md:text-16pxt lg:text-12px font-sans px-vw12 text-center;
          &.no-border {
            @apply border-r-0;
          }
        }
        .table-row {
          @apply border-t border-[#ddd];
        }
        .no-files {
          @apply flex items-center justify-center mt-mb40 md:mt-40pxt lg:mt-0 text-20pxm md:text-24pxt lg:text-20px;
          flex: 3;
        }

        :global(.rtl) {
          .table {
            @apply lg:ml-0 lg:mr-vw30;
          }
          .table-header {
            @apply border-r-0 border-l border-l-[#ddd];
            &.no-border {
              @apply border-l-0;
            }
          }
        }
      `}</style>
    </div>
  )
}

export default DocumentsTable
