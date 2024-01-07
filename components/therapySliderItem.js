/* eslint-disable prettier/prettier */

import Image from "next/image"
import { useTranslation } from "next-i18next"

const TherapySliderItem = ({ image, title, description }) => {
  const { t } = useTranslation()
  return (
    <>
      <div class="small-shadow bg-white p-[20px] w-[350px] rounded-[20px] mx-auto">
        <Image src={image} alt="" class="h-[90px] mb-[30px]"/>
        <p class="text-center text-[32px] font-bold font-soleSerifHeadlineBold text-black-light mb-[20px] md:h-[79px] leading-none text-middle">{title}</p>
        <p class="text-center text-[16px] text-brown-main mb-[20px]">{description}</p>
        <a class="text-brown-dark font-bold text-[20px] underline mb-[10px]">{t("more_info")}</a>
      </div>
    </>
  )
}

export default TherapySliderItem