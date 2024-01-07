/* eslint-disable prettier/prettier */
import Link from "next/link"

const LinkPageButton = ({ href, text, className, type }) => {
  return (
    <Link href={href} class="rounded-[40px] bg-pink-main inline-flex justify-center items-center py-[30px] px-[40px] text-[19px] md:text-[20px] text-white leading-none font-medium text-center font-poppinsSemiBold relative z-10">
      <span class="relative inline-flex justify-center items-center tracking-[0.5px]">
        {text}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFF" class="ml-[15px]"><path d="M17 15.586 6.707 5.293 5.293 6.707 15.586 17H7v2h12V7h-2v8.586z" /></svg>
      </span>
    </Link>  
  )
}

export default LinkPageButton
