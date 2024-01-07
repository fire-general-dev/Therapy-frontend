import Link from "next/link"
import NextImage from "../elements/image"
import { useTranslation } from "next-i18next"
import ReadMoreIcon from "@/images/icons/home/read-more-icon.svg"
import Image from "next/image"

const LargeArticleCard = ({ image, title, description, slug }) => {
  const { t } = useTranslation()
  return (
    <div className="large-article-card">
      <div className="image-wrapper">
        <NextImage
          media={image}
          className="!h-56 lg:!h-72 rounded-lg !object-cover"
        />
      </div>
      <h3 className="title">{title}</h3>
      <p className="desc">{description}</p>
      <Link
        className="flex items-center gap-1 transition-all ease-in duration-300 hover:translate-x-[2px] hover:translate-y-[2px]"
        href={`articles/${slug}`}
      >
        <span className="read-more">{t("read_more")}</span>
        <div className="read-more-icon">
          <Image src={ReadMoreIcon} alt="read more" />
        </div>
      </Link>
      <style jsx>{`
        .large-article-card {
          @apply w-full lg:w-[38rem] border-b border-solid border-[#EEEFF0] lg:border-none pb-5 lg:pb-0;
        }

        .image-wrapper {
          @apply w-full h-56 lg:h-72 lg:w-[38rem] overflow-hidden rounded-lg mb-5;
        }

        .title {
          @apply text-[#2E3333] text-lg lg:text-2xl font-medium capitalize mb-3;
        }

        .desc {
          @apply text-gray-64 text-sm mb-5;
        }

        .read-more {
          @apply uppercase text-[#1BBEC3] text-base lg:text-lg font-medium lg:font-semibold;
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

export default LargeArticleCard
