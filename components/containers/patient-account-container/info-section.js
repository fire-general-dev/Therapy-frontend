import { useState } from "react"
import MinusIcon from "@/images/icons/minus-icon.svg"
import PlusIcon from "@/images/icons/plus-icon.svg"
import Image from "next/image"

const InfoSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="info-section">
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
        .info-section {
          @apply bg-white rounded-2xl py-5 px-8 lg:p-8 mb-4 lg:mb-8;
        }
        .header {
          @apply flex items-center justify-between lg:block mb-4 lg:mb-8;
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

export default InfoSection
