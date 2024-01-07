import Link from "next/link"
import ArrowNext from "../icons/arrow-next"

const LinkButton = ({ href, text, className, type }) => {
  return (
    <Link className={className} passHref href={href}>
      <div className="link_button">
        <span>{text}</span>
        <div className="arrow">
          <ArrowNext />
        </div>
      </div>
      <style jsx>{`
        .link_button {
          @apply w-full py-4 px-8 bg-[#1BBEC3] text-base lg:text-base text-white font-bold uppercase flex justify-center items-center gap-2 cursor-pointer rounded-full mx-auto transition-all duration-500 ease-in fill-white hover:bg-[#15989c] lg:w-fit;
          border: 1px solid #1bbec3;
        }

        :global(.rtl) {
          .arrow {
            @apply rotate-180;
          }
        }
      `}</style>
    </Link>
  )
}

export default LinkButton
