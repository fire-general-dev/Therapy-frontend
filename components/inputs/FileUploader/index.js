import Image from "next/image"
import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { IoClose } from "react-icons/io5"
import ProfileImage from "@/images/account/profile.png"
import { useTranslation } from "next-i18next"
import NextImage from "@/components/elements/image"
import FileUploaderIcon from "@/images/icons/inputs/upload-icon.svg"
import SuccessIcon from "@/images/icons/inputs/success-icon.svg"
import { useState } from "react"
import Link from "next/link"

function FileUploader(props) {
  const {
    setFieldValue,
    name,
    files,
    accept,
    showPreview,
    label,
    previewFile,
  } = props
  const [preview, setPreview] = useState(previewFile?.url)
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFieldValue(name, acceptedFiles[0])
      const objectUrl = URL.createObjectURL(acceptedFiles[0])
      setPreview(objectUrl)
      // Do something with the files
    },
    [files, setFieldValue]
  )
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: accept,
  })

  const clearImage = () => {
    setFieldValue(name, null)
  }

  const rootProps =
    showPreview && !files ? { ...getRootProps() } : { onClick: clearImage }

  const { t } = useTranslation()

  return (
    <div className="file-uploader-container">
      <label className="inline-block text-gray-64 text-base font-medium mb-2">
        {label}
      </label>
      <div className="file-uploader">
        <div {...rootProps} className="dndInner">
          {!preview && (
            <>
              <input {...getInputProps()} />
              <div className="image-wrapper">
                <Image
                  src={FileUploaderIcon}
                  className="w-14 h-14"
                  alt="profile"
                />
              </div>
              <span className="title">{t("attach_file")}</span>
              <span className="desc">{t("no_file_selected")}</span>
              <button type="button" className="btn">
                {t("upload")}
              </button>
            </>
          )}
          {preview && (
            <>
              <input {...getInputProps()} />
              <div className="image-wrapper">
                <Image
                  src={FileUploaderIcon}
                  className="w-14 h-14"
                  alt="profile"
                />
              </div>
              <span className={`title active`}>
                <Image src={SuccessIcon} />
                {t("file_attached")}
              </span>
              <span className="desc">{t("want_to_replace")}</span>
              <Link
                href={preview}
                download={"file"}
                target="_blank"
                className="py-3 px-5 rounded-md text-sm text-dashboardPrimary font-medium uppercase border border-dashboardPrimary border-solid transition-all duration-300 ease-in hover:bg-dashboardPrimary hover:text-white"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                {t("download")}
              </Link>
            </>
          )}
        </div>
        <style jsx>{`
          .file-uploader-container {
            @apply w-full max-w-[11rem];
          }
          .file-uploader {
            @apply w-full rounded-md py-7 px-8 cursor-pointer;
            border: 1px dashed #ededed;
             {
              /* @apply relative flex-2  border-[#ddd] bg-[#f0f0f04d]  border flex justify-center items-center text-center rounded-sm w-full h-full cursor-pointer transition-all ease-in hover:bg-[#f5f5f5]; */
            }
          }
          .image-wrapper {
            @apply mb-5;
             {
              /* @apply w-14 h-14 rounded-2xl mb-5 border border-[#B8B8B8] border-solid; */
            }
          }
          .title {
            @apply block text-black-3232 text-base font-medium mb-2;
            &.active {
              @apply flex gap-2 text-black-3232;
            }
          }
          .desc {
            @apply block text-[#B8B8B8] text-sm mb-7;
          }
        `}</style>
      </div>
    </div>
  )
}

export default FileUploader
