import { useRouter } from "next/router"
import { BsX } from "react-icons/bs"

const ServiceButton = (props) => {
  const { className, service, onClick, extraDataFiled, isDisabled } = props

  const { title } = service

  const handleClick = () => {
    onClick(service)
  }

  return (
    <>
      <button
        className={`${isDisabled ? "unactive" : ""} ${className}`}
        onClick={handleClick}
        {...extraDataFiled}
      >
        {title}
      </button>
      <style jsx>{`
        button {
          @apply rounded-full bg-gray-150 py-mb6 px-mb20 lg:py-vw06 lg:px-vw20 text-14pxm lg:text-14px text-green-100 transition-all duration-500 hover:bg-gradient-to-r hover:from-pink-300 hover:to-blue-100 hover:translate-x-0.5 hover:translate-y-0.5;
          &.unactive {
            @apply cursor-default hover:bg-gradient-to-r hover:from-gray-150 hover:to-gray-150 hover:translate-x-0 hover:translate-y-0;
          }
        }
      `}</style>
    </>
  )
}

export default ServiceButton
