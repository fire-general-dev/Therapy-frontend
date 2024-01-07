import Image from "next/image"
import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import plusIcon from "@/images/icons/plus.svg"
import NextImage from "../../image"
import { IoClose } from "react-icons/io5"

function ProfilePictureUploader(props) {
  const { setFieldValue, name, files, accept, showPreview } = props
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

  const rootProps =
    showPreview && !files ? { ...getRootProps() } : { onClick: clearImage }

  return (
    <div className="dndWrapper">
      <div {...rootProps} className="dndInner">
        {showPreview && !files && (
          <>
            <input {...getInputProps()} />
            <p className="parag">
              Drag and Drop Files here Or Click + to upload
            </p>
            <Image layout="raw" src={plusIcon} alt="plus" />
          </>
        )}
        {showPreview && files && (
          <>
            <IoClose className="h-8 w-auto absolute top-vw20 right-vw20" />
            <NextImage
              media={{
                data: { attributes: { url: files, width: 100, height: 100 } },
              }}
              className={"!h-135pxm md:!h-135pxt lg:!h-135px"}
              alt="personal_image"
            />
          </>
        )}
      </div>
      <style jsx>{`
        .dndWrapper {
          @apply relative flex-2  border-[#ddd] bg-[#f0f0f04d]  border flex justify-center items-center text-center rounded-sm w-full h-full cursor-pointer transition-all ease-in hover:bg-[#f5f5f5];
        }
        .dndInner {
          @apply p-vw24 px-vw80 flex flex-col items-center text-[#57627180] font-avenirBold text-12px h-full justify-around;
        }
        .parag {
          @apply uppercase mb-vw12;
        }
      `}</style>
    </div>
  )
}

export default ProfilePictureUploader
