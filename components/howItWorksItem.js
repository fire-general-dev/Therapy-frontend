/* eslint-disable prettier/prettier */
import { useState } from "react"
import { useTranslation } from 'next-i18next';

const HowItWorksItem = ({ number, title, detail }) => {
  const { i18n } = useTranslation();
  const [hover, setHover] = useState(false);

  return (
    <>
      <div class="inline-flex rounded-[10px] items-center px-[20px] hover:bg-pink-200 hover:small-shadow" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {i18n.language === 'ar' ? (
          // Layout for Arabic
          <>
            <div class="text-right w-full">
              <p class="font-semibold text-[24px] capitalize text-black-light">{title}</p>
              <p class="text-[16px] text-brown-main">{detail}</p>
            </div>
            <span class={`w-[60px] h-[60px] flex justify-center items-center rounded-full ${hover ? 'bg-pink-main text-white' : 'text-pink-main'} text-[48px] font-soleSerifHeadlineBold ml-[20px]`}>{number}</span>
          </>
        ):(
          // Layout for other languages
          <>
            <span class={`w-[60px] h-[60px] flex justify-center items-center rounded-full ${hover ? 'bg-pink-main text-white' : 'text-pink-main'} text-[48px] font-soleSerifHeadlineBold mr-[20px]`}>{number}</span>
            <div class="text-left w-full">
              <p class="font-semibold text-[24px] capitalize text-black-light">{title}</p>
              <p class="text-[16px] text-brown-main">{detail}</p>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default HowItWorksItem