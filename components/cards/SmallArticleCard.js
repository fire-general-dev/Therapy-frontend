import NextImage from "../elements/image"
import ReadMoreIcon from "@/images/icons/home/read-more-icon.svg"
import Image from "next/image"
import { useTranslation } from "next-i18next"
import Link from "next/link"

const SmallArticleCard = ({ title, image, slug }) => {
  const { t } = useTranslation()
  return (
    <div className="small-article-card">
      <div className="image-wrapper">
        <NextImage
          media={image}
          className="!h-24 lg:!h-36 rounded-lg !object-cover"
        />
      </div>
      <div className="body">
        <h3 className="title">{title}</h3>
        <Link
          className="flex items-center gap-1 transition-all ease-in duration-300 hover:translate-x-[2px] hover:translate-y-[2px]"
          href={`articles/${slug}`}
        >
          <span className="read-more">{t("read_more")}</span>
          <div className="read-more-icon">
            <Image src={ReadMoreIcon} alt="read more" />
          </div>
        </Link>
      </div>
      <style jsx>{`
        .small-article-card {
           {
            /* @apply w-[38rem]; */
          }
          @apply flex gap-8;
        }

        .body {
          @apply flex flex-col justify-center;
        }

        .image-wrapper {
          @apply h-24 lg:h-36 w-32 lg:w-60 overflow-hidden rounded-lg;
        }

        .title {
          @apply text-[#2E3333] text-lg lg:text-2xl font-medium capitalize mb-3;
        }

        .read-more {
          @apply uppercase text-[#1BBEC3] text-base lg:text-lg font-semibold;
        }

        :global(.rtl) {
          .read-more-icon {
            @apply rotate-180;
          }
        }
      `}</style>
    </div>
  )
}

export default SmallArticleCard
