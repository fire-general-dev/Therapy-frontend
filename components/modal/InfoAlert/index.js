import { Modal } from "flowbite-react"
import closeIcon from "@/images/icons/close-icon.svg"
import SuccessIcon from "@/images/icons/success-icon.svg"
import FailedIcon from "@/images/icons/failed-icon.svg"
import Image from "next/image"
import { useTranslation } from "next-i18next"

const InfoAlert = ({
  isOpen = false,
  onClose,
  title,
  message,
  variet = "info",
  ...props
}) => {
  const { t } = useTranslation()

  const getIcon = () => {
    switch (variet) {
      case "success":
        return SuccessIcon
      case "error":
        return FailedIcon
      default:
        return SuccessIcon
    }
  }

  const getColor = () => {
    switch (variet) {
      case "success":
        return "#0a47ac"
      case "error":
        return "#ff0000"
      default:
        return "#0a47ac"
    }
  }

  return (
    <>
      <Modal
        show={isOpen}
        size="lg"
        popup={true}
        onClose={onClose}
        style={{ zIndex: 100, backgroundColor: "rgb(255 255 255 / 0.7)" }}
      >
        <Modal.Body style={{ padding: 0 }}>
          <div>
            <div className="close-btn" onClick={() => onClose()}>
              <Image src={closeIcon} alt="Close" />
            </div>
            <div className="info-alert">
              <div className="image-wrapper">
                <Image src={getIcon()} alt="Success" />
              </div>
              <h3 style={{ color: getColor() }}>{title}</h3>
              <p>{message}</p>
              <button
                className={`ok-btn`}
                style={{ backgroundColor: getColor() }}
                onClick={() => {
                  onClose()
                }}
              >
                {t("ok")}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <style jsx>{`
        .close-btn {
          @apply absolute top-5 right-5 p-2 rounded-md cursor-pointer bg-white ease-out transition-all duration-300;
          box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.08);
          border: solid 0.5px rgba(112, 112, 112, 0.22);
          &:hover {
            box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
          }
        }

         {
        }
        .info-alert {
          @apply text-center p-10;
          & h3 {
            @apply text-4xl mb-3;
          }
          & p {
            @apply text-lg text-gray-999 mb-8;
          }
          .ok-btn {
            @apply rounded-md text-white p-0 cursor-pointer outline-none text-base py-3 px-10 uppercase;
            border: none;
          }
        }
        .image-wrapper {
          @apply mt-4 flex justify-center mb-5;
        }

        :global(.rtl) .close-btn {
          @apply right-auto left-5;
        }
      `}</style>
    </>
  )
}

export default InfoAlert
