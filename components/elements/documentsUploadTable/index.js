import React, { useState, useEffect } from "react"
import Image from "next/image"
import DeleteIcon from "@/images/icons/delete.svg"
import showIcon from "@/images/icons/show.svg"
import MultiFileUploader from "../inputs/MultiFileUploader"
import moment from "moment"
import { toDataURL } from "@/utils/helpers"
import { Modal } from "flowbite-react"
import { useTranslation } from "next-i18next"
import PopupModal from "@/components/modal/pop-up-modal"

const fileTypes = ["JPG", "PNG", "GIF"]

function DocumentsUploadTable(props) {
  const {
    deviceType,
    setFieldValue,
    files,
    name,
    setFieldTouched,
    showUploader = true,
    isPatient = false,
  } = props
  const [isMobile, setIsMobile] = useState(deviceType === "mobile")

  const { t } = useTranslation()

  const isVerticalDisplay = props.verticalDisplay

  const [deletingFile, setDeletingFile] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const onDelete = () => {
    const fileName = deletingFile.name
    const newFiles = files.filter((file) => file.name !== fileName)
    setFieldValue(name, [...newFiles])
    setFieldTouched(name, true)
    setShowDeleteModal(false)
    setDeletingFile(null)
  }

  const onCancelDelete = () => {
    setShowDeleteModal(false)
    setDeletingFile(null)
  }

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
      <PopupModal
        onClose={onCancelDelete}
        onConfirm={onDelete}
        isOpen={showDeleteModal}
        title={t("sure_delete_file")}
        confirmText={t("yes")}
        cancelText={t("no")}
        variant="delete"
      >
        <div className="file-name">&quot;{deletingFile?.name}&quot;</div>
      </PopupModal>
      {/* <Modal show={showDeleteModal} onClose={() => {}}>
        <Modal.Header>{t("alert")}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p>
              {t("sure_delete")}: {deletingFile?.name}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="button accept" onClick={onDelete}>
            {t("yes")}
          </div>
          <div className="button reject" onClick={onCancelDelete}>
            {t("no")}
          </div>
        </Modal.Footer>
      </Modal> */}
      {showUploader ? (
        <MultiFileUploader
          name={name}
          files={files}
          setFieldValue={setFieldValue}
          style={{ flex: 2 }}
          setFieldTouched={setFieldTouched}
        />
      ) : null}
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
              {!isPatient ? <th className="table-header no-border"></th> : null}
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
                {!isPatient ? (
                  <td>
                    <span className="table-header-wrapper">
                      <span className="table-header no-border">
                        <Image
                          className="!w-mb12 md:!w-12pxt lg:!w-vw12 !h-mb16 md:!h-16pxt lg:!h-vw16 cursor-pointer mx-auto"
                          layout="raw"
                          src={DeleteIcon}
                          alt="delete"
                          onClick={() => {
                            setDeletingFile(file)
                            setShowDeleteModal(true)
                            // onDelete(file.name)
                          }}
                        />
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
                          className="!w-mb18 md:!w-18pxt lg:!w-vw18 !h-mb12 md:!h-12pxt lg:!h-vw12 cursor-pointer mx-auto"
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
        <div className={`no-files ${isVerticalDisplay ? "vertical" : ""}`}>
          {t("no_files")}
        </div>
      )}
      <style jsx>{`
        .wrapper {
           {
            /*  p-mb20 md:p-20pxt lg:p-vw20 */
          }
          @apply p-mb20 md:p-20pxt lg:p-vw20 bg-white text-black-2e4765 flex flex-col lg:flex-row;
          &.vertical {
            @apply flex-col p-0 md:p-0 lg:p-0;
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
          &.vertical {
            @apply ml-0 mt-vw30;
          }
          flex: 3;
        }
        .button {
          @apply px-mb60 lg:px-vw46 transition-all duration-200  hover:translate-x-0.5 hover:translate-y-0.5 rounded-sm py-mb8 lg:py-vw12 text-18pxm md:text-22pxt lg:text-18px;
          &.accept {
            @apply text-white bg-dashboardBtnDanger hover:bg-dashboardBtnDangerHover;
          }
          &.reject {
            @apply text-white bg-dashboardBtnPrimary hover:bg-dashboardBtnPrimaryHover;
          }
        }

        .file-name {
          @apply text-center text-gray-400 mt-mb16 md:mt-16pxt lg:mt-vw16;
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

export default DocumentsUploadTable
