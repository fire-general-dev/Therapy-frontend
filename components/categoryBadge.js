/* eslint-disable prettier/prettier */
import { useTranslation } from "next-i18next"

const CategoryBadge = () => {
  const { t } = useTranslation()
  return (
    <>
      <span class="bg-blue-semilight py-[10px] px-[24px] absolute rounded-[33px] text-green-500 left-[16px] bottom-[16px] leading-none">{t("category")}</span>    
    </>
  )
}

export default CategoryBadge