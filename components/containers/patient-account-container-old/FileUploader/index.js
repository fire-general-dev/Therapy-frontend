import Image from "next/image"
import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import UploadIcon from "@/images/icons/upload-icon.svg"
import NextImage from "@/components/elements/image"
import { IoClose } from "react-icons/io5"
import { useTranslation } from "next-i18next"

function FileUploader(props) {
  const { setFieldValue, name, files, accept, showPreview, title } = props
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

  const clearImage = () => {
    setFieldValue(name, null)
  }

  const rootProps = !files ? { ...getRootProps() } : { onClick: clearImage }

  const imageUrl = !files
    ? null
    : typeof files?.url == "string"
    ? files.url
    : URL.createObjectURL(files)

  return (
    <div className="dndWrapper">
      <div {...rootProps} className="dndInner">
        {!files && (
          <>
            <input {...getInputProps()} />
            <Image
              src={UploadIcon}
              layout="raw"
              alt="Upload"
              className="mb-mb10 md:mb-10pxt lg:mb-vw10 w-24pxm md:w-24pxt lg:w-24px h-24pxm md:h-24pxt lg:h-24px"
            />
            <h6 className="title">{title}</h6>
            <p className="parag">{t("upload_msg")}</p>
          </>
        )}
        {files && (
          <>
            <IoClose className="h-8 w-auto absolute top-vw20 right-vw20" />
            <NextImage
              media={{
                data: {
                  attributes: { url: imageUrl, width: 100, height: 100 },
                },
              }}
              className={"lg:!max-h-200px"}
              alt="personal_image"
            />
          </>
        )}
      </div>
      <style jsx>{`
        .title {
          @apply font-avenirBlack text-[#0e0d47] text-16pxm md:text-20pxt lg:text-16px md:mb-16pxt lg:mb-vw16 uppercase;
        }
        .outWrapper {
          @apply p-mb20 md:p-20pxt lg:p-vw20 shadow-fileUploader;
        }
        .dndWrapper {
          @apply relative flex-2 shadow-fileUploader flex justify-center items-center text-center rounded-sm w-full h-full cursor-pointer transition-all ease-in hover:bg-[#f5f5f5];
        }
        .dndInner {
          @apply p-mb20 md:p-20pxt lg:p-vw24 flex flex-col items-center text-[#57627180] font-avenirBold text-12pxm md:text-16pxt lg:text-12px h-full justify-around;
        }
        .parag {
          @apply font-avenirMedium text-14pxm md:text-20pxt lg:text-16px leading-20pxm md:leading-20pxt lg:leading-20px w-[90%] lg:w-[65%];
        }
      `}</style>
    </div>
  )
}

export default FileUploader
