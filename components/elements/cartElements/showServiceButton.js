import { isRTLLayout } from "@/utils/helpers"
import { useRouter } from "next/router"
import { BsX } from "react-icons/bs"

const ShowServiceButton = (props) => {
  const { className, service, onRemove, extraDataFiled } = props
  const router = useRouter()
  const isRTL = isRTLLayout(router)

  const { title } = service

  const handleClick = () => {
    onRemove(service)
  }

  return (
    <div className={`button-wrapper ${className}`}>
      <button {...extraDataFiled}>
        {title}
        <BsX
          className={`inline-block cursor-pointer hover:text-green-50 text-14pxm md:text-18pxt lg:text-14px transition-all duration-500 hover:translate-x-px hover:translate-y-px ${
            isRTL ? "mr-vw06" : "ml-vw06"
          }`}
          onClick={handleClick}
        />
      </button>
      <style jsx>{`
        .button-wrapper {
          @apply inline-block;
        }
        button {
          @apply flex items-center cursor-default rounded-full bg-gray-150 py-mb6 px-mb20 md:py-6pxt md:px-20pxt lg:py-vw06 lg:px-vw20 text-14pxm md:text-18pxt lg:text-14px text-green-100;
        }
      `}</style>
    </div>
  )
}

export default ShowServiceButton
