import { useState } from "react"
import MinusIcon from "@/images/icons/minus-icon-front.svg"
import PlusIcon from "@/images/icons/plus-icon-front.svg"
import Image from "next/image"

const TabPane = ({ title, children, isOpenTab, isMobile }) => {
  const [isOpen, setIsOpen] = useState(isMobile ? isOpenTab : true)
  return (
    <div className={`tab-pane ${isOpen ? "active" : ""}`} title={title}>
      <div className={`header ${!isOpen ? "closed" : ""}`}>
        <h3 className="title">{title}</h3>
        <Image
          className="block lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          src={isOpen ? MinusIcon : PlusIcon}
          alt="icon"
        />
      </div>
      {isOpen ? children : null}
      <style jsx>{`
        .tab-pane {
          @apply bg-white rounded-2xl py-5 px-8 mb-4 lg:rounded-none lg:py-0 lg:px-0 lg:mb-0 lg:pt-10 border border-solid border-[#EEEFF0] lg:border-none transition-all ease-in-out duration-300;
          &.active {
            @apply border-[#1BBEC3];
          }
        }
        .header {
          @apply flex items-center justify-between lg:hidden mb-4;
          &.closed {
            @apply mb-0;
          }
        }
        .title {
          @apply text-black-3232 text-lg font-medium;
        }
      `}</style>
    </div>
  )
}

export default TabPane
