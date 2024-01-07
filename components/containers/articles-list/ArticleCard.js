import NextImage from "@/components/elements/image"
import Link from "next/link"
import React from "react"

function ArticleCard({ item }) {
  const { slug, articleImage, title } = item
  return (
    <>
      <Link href={`/articles/${slug}`} className={"wrapper"} legacyBehavior>
        <div className={"wrapper"}>
          <div className="image-container">
            <div className="after"></div>
            <NextImage
              layout="responsive"
              media={articleImage}
              alt={title}
              quality="100"
            />
          </div>
          <div className="title">{title}</div>
        </div>
      </Link>

      <style jsx>{`
        .wrapper {
          @apply flex flex-col flex-1 cursor-pointer;
          &:hover .after {
            @apply visible bg-black-0;
          }
          &:hover .title {
            @apply decoration-gray-300;
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
            @apply rounded-t-lg absolute top-0 left-0 w-full h-full invisible text-white opacity-10;
            transition: all 0.5s ease;
          }
        }
      `}</style>
    </>
  )
}

export default ArticleCard
