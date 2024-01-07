import Image from "next/image"
import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import plusIcon from "@/images/icons/plus.svg"
import { useTranslation } from "next-i18next"
import NextImage from "../../image"

function FileUploader(props) {
  const { setFieldValue, name, files, accept } = props
  const { t } = useTranslation()
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFieldValue(name, acceptedFiles[0])
      // Do something with the files
    },
    [files, setFieldValue]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: accept,
  })

  return (
    <div className="dndWrapper">
      <div {...getRootProps()} className="dndInner">
        <input {...getInputProps()} />
        <p className="parag">{t("drag_msg")}</p>
        <Image layout="raw" src={plusIcon} alt="plus" />
        {showPreview && files && (
          <NextImage
            media={{
              data: { attributes: { url: files, width: 100, height: 100 } },
            }}
            alt="personal_image"
          />
        )}
      </div>
      <style jsx>{`
        .dndWrapper {
          @apply flex-2  border-[#ddd] bg-[#f0f0f04d]  border flex justify-center items-center text-center rounded-sm w-full h-full cursor-pointer transition-all ease-in hover:bg-[#f5f5f5];
        }
        .dndInner {
          @apply p-mb20 md:p-20pxt lg:p-vw24 px-mb80 md:px-80pxt lg:px-vw80 flex flex-col items-center text-[#57627180] font-avenirBold text-12pxm md:text-16pxt lg:text-12px h-full justify-around;
        }
        .parag {
          @apply uppercase mb-mb12 md:mb-12pxt lg:mb-vw12;
        }
      `}</style>
    </div>
  )
}

export default FileUploader
