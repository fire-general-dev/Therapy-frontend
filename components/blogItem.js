/* eslint-disable prettier/prettier */
import Image from "next/image"
import { useTranslation } from "next-i18next"
import CategoryBadge from "./categoryBadge";

const BlogItem = ({ image, text }) => {
  const { t } = useTranslation()
  return (
    <>
      <div class="w-[350px] mx-auto">
        <span class="relative block">
          <Image src={image} alt="blog item" class="mb-[30px]" />
          <CategoryBadge />
        </span>
        <p class="text-brown-main text-[16px] mb-[20px]">{text}</p>
        <a class="underline text-brown-dark font-bold text-[20px]" href="#">{t("more_info")}</a>
      </div>
    </>
  )
}

export default BlogItem;