import Image from "next/image"
import ArrowIcon from "@/images/icons/home/arrow-up-line-icon.svg"
import Link from "next/link"

const CategoryCard = ({ icon, title, desc, descMob, href }) => {
  return (
    <Link href={href} className="flex-1">
      <div className="category-card">
        <Image className="w-28 lg:mb-0 lg:w-60" src={icon} alt="icon" />
        <div className="body">
          <h6 className="title">{title}</h6>
          <div className="desc">
            {desc}{" "}
            <div className="arrow-icon-wrapper">
              <Image src={ArrowIcon} alt="icon" />
            </div>{" "}
          </div>
          <div className="desc-mobile">
            {descMob}{" "}
            <div className="arrow-icon-wrapper">
              <Image src={ArrowIcon} alt="icon" />
            </div>{" "}
          </div>
        </div>
        <style jsx>{`
          .category-card {
            @apply flex-1 py-7 lg:py-10 px-7 rounded-3xl flex flex-row lg:flex-col lg:items-center justify-start gap-7 lg:justify-center cursor-pointer transition-all ease-in-out duration-500 hover:translate-x-1 hover:translate-y-1;
            border-radius: 24px;
            background: rgba(247, 255, 255, 0.9);
            box-shadow: 0px 15px 50px 0px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(17px);
          }
          .body {
            @apply flex flex-col items-start lg:items-center py-1 lg:py-0 lg:text-center;
          }
          .title {
            @apply text-[#2E3333] text-2xl lg:text-3xl font-medium mb-4 capitalize;
          }

          .desc {
            @apply hidden lg:flex items-center gap-1 text-[#1BBEC3] text-base font-semibold uppercase;
          }

          .desc-mobile {
            @apply flex lg:hidden items-center gap-1 text-[#1BBEC3] text-sm font-semibold uppercase;
          }

          :global(.rtl) {
            .arrow-icon-wrapper {
              @apply rotate-180;
            }
          }
        `}</style>
      </div>
    </Link>
  )
}

export default CategoryCard
