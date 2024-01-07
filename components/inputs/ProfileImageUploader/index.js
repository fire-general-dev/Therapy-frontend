import Image from "next/image"
import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { IoClose } from "react-icons/io5"
import ProfileImage from "@/images/account/profile.png"
import { useTranslation } from "next-i18next"
import NextImage from "@/components/elements/image"
import { useState } from "react"
import { useEffect } from "react"

function ProfileImageUploader(props) {
  const {
    setFieldValue,
    name,
    previewFile,
    files,
    accept,
    showPreview,
    label,
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
    <>
      <label className="inline-block text-gray-64 text-base font-medium mb-2">
        {label}
      </label>
      <div className="profile-uploader">
        <div {...rootProps} className="dndInner">
          <>
            <input {...getInputProps()} />
            <div className="image-wrapper">
              <Image
                loader={({ src }) => {
                  return src
                }}
                src={preview ? preview : ProfileImage}
                width={80}
                height={80}
                className="w-20 h-20 rounded-2xl"
                alt="profile"
              />
            </div>
            <span className="title">{t("upload_picture")}</span>
            <span className="desc">{t("no_file_selected")}</span>
            <button className="btn" type="button">
              {t("upload")}
            </button>
          </>
          {/* {preview && (
            <>
              <IoClose className="h-8 w-auto absolute top-vw20 right-vw20" />
              <NextImage
                media={{
                  data: { attributes: {url: previewFile.url, width: 100, height: 100} },
                }}
                // className={"!h-135pxm md:!h-135pxt lg:!h-135px"}
                alt="personal_image"
              />
            </>
          )} */}
        </div>
        <style jsx>{`
          .profile-uploader {
            @apply rounded-md py-7 px-8 cursor-pointer;
            border: 1px dashed #ededed;
             {
              /* @apply relative flex-2  border-[#ddd] bg-[#f0f0f04d]  border flex justify-center items-center text-center rounded-sm w-full h-full cursor-pointer transition-all ease-in hover:bg-[#f5f5f5]; */
            }
          }
          .image-wrapper {
            @apply w-20 h-20 rounded-2xl mb-5 border border-[#B8B8B8] border-solid;
          }
          .title {
            @apply block text-black-3232 text-base font-medium mb-2;
          }
          .desc {
            @apply block text-[#B8B8B8] text-sm mb-7;
          }
          .btn {
            @apply py-3 px-5 rounded-md text-sm text-dashboardPrimary font-medium uppercase border border-dashboardPrimary border-solid transition-all duration-300 ease-in hover:bg-dashboardPrimary hover:text-white;
          }
        `}</style>
      </div>
    </>
  )
}

export default ProfileImageUploader
