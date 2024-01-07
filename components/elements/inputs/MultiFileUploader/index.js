import Image from "next/image"
import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import plusIcon from "@/images/icons/plus.svg"
import uploadIcon from "@/images/icons/upload-icon.svg"
import { useTranslation } from "next-i18next"

function MultiFileUploader(props) {
  const { setFieldValue, name, files = [], setFieldTouched } = props
  const { t } = useTranslation()
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFieldValue(name, [...files, ...acceptedFiles])
      setFieldTouched(name, true)
    },
    [files, setFieldValue]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/gif": [".gif"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
  })

  return (
    <div className={`wrapper ${props.className}`} style={props.style}>
      <div {...getRootProps()} className="inner">
        <input {...getInputProps()} />
        <Image
          className="!h-mb24 md:!h-24pxt lg:!h-vw24 !w-mb24 md:!w-24pxt lg:!w-vw24"
          layout="raw"
          src={uploadIcon}
          alt="Upload"
        />
        <p className="parag">{t("upload_file_msg")}</p>
      </div>
      <style jsx>{`
        .wrapper {
          @apply flex justify-center items-center text-center rounded-md min-h-135px w-full h-full cursor-pointer transition-all ease-in hover:bg-[#f5f5f5] max-h-150pxm md:max-h-150pxt lg:max-h-150px;
          background-color: rgba(51, 51, 51, 0.05);
        }
        .inner {
          @apply p-mb20 md:p-20pxt lg:p-vw24 px-mb40 md:px-40pxt lg:px-vw40 flex flex-col items-center text-[#57627180] font-avenirBold text-12pxm md:text-16pxt lg:text-12px h-full justify-around;
        }

        .parag {
          @apply uppercase text-14pxm md:text-18pxt lg:text-14px mt-mb20 md:mt-20pxt lg:mt-vw20;
        }
      `}</style>
    </div>
  )
}

export default MultiFileUploader
