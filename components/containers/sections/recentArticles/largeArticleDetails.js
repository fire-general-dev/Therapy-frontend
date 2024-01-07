import NextImage from "@/components/elements/image"
import Link from "next/link"
import React from "react"

function LargeArticleDetails(props) {
  return (
    <>
      <Link
        href={`/articles/${props.slug}`}
        className={props.vertical ? "wrapper-vertical" : "wrapper"}
        legacyBehavior
      >
        <div className={props.vertical ? "wrapper-vertical" : "wrapper"}>
          <div className="image-container">
            <div className="after"></div>
            <NextImage
              layout="responsive"
              media={props.src}
              alt={props.title}
              quality="100"
              className={
                props.vertical
                  ? "rounded-sm max-h-100pxm md:max-h-100pxt lg:max-h-100px"
                  : "rounded-sm"
              }
            />
          </div>
          <div className="title">{props.title}</div>
        </div>
      </Link>
      {/* {props.vertical && !props.lastIndex && <div className="seperator" />} */}

      <style jsx>{`
        .wrapper {
          @apply flex flex-col mb-mb28 md:mb-10pxt lg:mr-vw60 flex-1 cursor-pointer;
          &:hover .after {
            @apply visible bg-black-0;
          }
          &:hover .title {
            @apply decoration-gray-300;
          }
        }
        .wrapper-vertical {
          @apply flex flex-row-reverse justify-between cursor-pointer md:border-b md:border-solid border-gray-f0 pb-mb10 md:pb-10pxt lg:pb-vw10 mb-mb10 md:mb-10pxt lg:mb-vw10 max-h-100pxm md:max-h-100pxt lg:max-h-100px;
          border-bottom: 1px solid #f0f0f0;
          .title {
            @apply mr-mb10 md:mr-10pxt lg:mr-vw10 mt-0 md:mt-0 lg:mt-0;
          }
          &:hover .after {
            @apply visible bg-black-0;
          }
          &:hover .title {
            @apply decoration-gray-300;
          }
          .image-container {
            @apply w-125pxm md:w-125pxt lg:w-125px;
          }
        }
        .title {
          @apply text-16pxm md:text-16pxt lg:text-16px font-avenirMedium text-black-3232 mt-mb10 md:mt-10pxt lg:mt-vw10 px-mb10 md:px-10pxt lg:px-vw10 relative underline underline-offset-4 decoration-1 decoration-transparent;
          transition: all 0.5s ease;
        }
        .seperator {
          @apply h-px bg-gray-f0 my-mb12 md:my-10pxt lg:my-vw12;
        }
        .image-container {
          @apply min-w-125pxm md:min-w-125pxt lg:min-w-125px relative;
          & .after {
            @apply rounded-t-lg absolute top-0 left-0 w-full h-full invisible text-white opacity-10 rounded-sm;
            transition: all 0.5s ease;
          }
        }

        :global(.rtl) {
          .wrapper {
            @apply lg:mr-0 lg:ml-vw60;
          }
          .wrapper-vertical {
            .title {
              @apply mr-0 md:mr-0 lg:mr-0 ml-mb10 md:ml-10pxt lg:ml-vw10;
            }
          }
        }
      `}</style>
    </>
  )
}

export default LargeArticleDetails
