import { Modal } from "flowbite-react"
import closeIcon from "@/images/icons/close-icon.svg"
import SuccessIcon from "@/images/icons/success-icon.svg"
import Image from "next/image"
import InfoIcon from "@/images/icons/pending-icon.svg"
import { useTranslation } from "next-i18next"

const PendingRequestModel = ({
  isOpen = false,
  onClose,
  title,
  message,
  ...props
}) => {
  const { t } = useTranslation()

  const handleClose = () => {
    onClose()
  }

  return (
    <>
      <Modal
        show={isOpen}
        size="lg"
        popup={true}
        onClose={handleClose}
        style={{ zIndex: 100, backgroundColor: "rgb(255 255 255 / 0.7)" }}
      >
        <Modal.Body style={{ padding: 0 }}>
          <div className={"cancel-appointment-modal"}>
            <div className="close-btn" onClick={handleClose}>
              <Image src={closeIcon} alt="Close" />
            </div>
            <div className="success-wrapper">
              <h3>{title}</h3>
              <div className="status-msg">
                <Image src={InfoIcon} alt="Info" />
                {message}
              </div>
              <button
                className="ok-btn"
                onClick={() => {
                  handleClose()
                  if (typeof window !== "undefined") window.location.reload()
                }}
              >
                {t("ok")}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <style jsx>{`
        .cancel-appointment-modal {
          @apply relative p-4 pb-8;
        }

        .close-btn {
          @apply absolute top-5 right-5 p-2 rounded-md cursor-pointer bg-white ease-out transition-all duration-300;
          box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.08);
          border: solid 0.5px rgba(112, 112, 112, 0.22);
          &:hover {
            box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
          }
        }

         {
          /* Success */
        }
        .success-wrapper {
          @apply font-avenirBold;
          & h3 {
            @apply text-[#3a86ff] text-lg mb-4 mt-10 capitalize;
          }
          .ok-btn {
            @apply block rounded-md bg-dashboardBtnPrimary text-white p-0 cursor-pointer outline-none text-base py-3 px-10 uppercase ml-auto;
            border: none;
          }
        }

        .status-msg {
          @apply flex items-center gap-4 text-sm text-text-primary mb-6 p-2;
          background-color: rgba(58, 134, 255, 0.1);
        }
        .success-image-wrapper {
          @apply mt-28 flex justify-center mb-5;
        }

        :global(.DateInput_input) {
          background-color: rgba(224, 224, 224, 0.5) !important;
        }

        :global(.rtl) .close-btn {
          @apply right-auto left-5;
        }

        :global(.rtl) .arrow-icon {
          @apply rotate-180;
        }

        :globale(.rtl) {
          .success-wrapper {
            .ok-btn {
              @apply ml-0 mr-auto;
            }
          }
        }
      `}</style>
    </>
  )
}

export default PendingRequestModel
