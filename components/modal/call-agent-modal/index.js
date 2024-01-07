import Image from "next/image"
import { useTranslation } from "react-i18next"
import Modal from "react-modal"
import CloseIcon from "@/images/icons/services/close-icon.svg"

const CallAgentModal = ({ isOpen, onClose, action, isMobile = false }) => {
  const { t } = useTranslation()

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: isMobile ? "90vw" : "580px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "15px",
      border: "none",
      padding: "2rem",
      overflow: "hidden",
    },
    overlay: {
      background: "rgba(26, 36, 55, 0.50)",
      zIndex: 100,
    },
  }

  const handleOpen = () => {
    onOpen(true)
  }

  const handleClose = () => {
    onClose(false)
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} style={customStyles}>
      <div className="header">
        <h3 className="modal-title">
          {action === "cancel"
            ? `${t("cancel_appointment")}?`
            : `${t("reschedule_appointment")}?`}
        </h3>
        <Image
          className="cursor-pointer"
          onClick={handleClose}
          src={CloseIcon}
          alt="Close"
        />
      </div>
      <div className="body">
        <div className="call-card">
          <Image
            className="mb-6"
            loader={({ src }) => src}
            src="https://strapi-nafsi-s3-images.s3.me-central-1.amazonaws.com/lucide_phone_call_6aa41159ef.svg"
            width={54}
            height={54}
          />
          <div className="call-card-title">
            {t("call")} <span>800 62374 ( NAFSI )</span>
          </div>
          <div className="call-card-desc">
            {action === "cancel"
              ? t("call_appointment_cancelation")
              : t("call_appointment_reschedule")}
          </div>
        </div>
        <button className="btn" onClick={onClose}>
          {t("done")}
        </button>
      </div>
      <style jsx>{`
        .booking-btn {
          @apply flex items-center gap-2 text-black-3232 text-base cursor-pointer transition-all ease-in duration-300 hover:text-[#1BBEC3];
        }
        .header {
          @apply flex items-center justify-between pb-5 mb-5;
          border-bottom: 1px solid #eeeff0;
          font-family: "Poppins", sans-serif;
        }
        .body {
          font-family: "Poppins", sans-serif;
        }

        .modal-title {
          @apply text-black-3232 text-lg lg:text-2xl font-medium;
        }

        .call-card {
          @apply flex flex-col items-center rounded-xl bg-[#F9FAFF] py-8 px-10 mb-7;
          border: 1px solid var(--Stroke, #e6e7e8);
        }

        .call-card-title {
          @apply text-black-3232 text-base lg:text-xl mb-5;
          span {
            @apply font-semibold;
          }
        }
        btn .call-card-desc {
          @apply text-black-3232 text-sm lg:text-lg;
        }

        .btn {
          @apply block bg-[#2864FF] rounded-full py-4 px-14 text-base text-white font-medium text-center mx-auto;
        }
      `}</style>
    </Modal>
  )
}

export default CallAgentModal
