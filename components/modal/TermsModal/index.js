import RegisterTermsContainer from "@/components/containers/register-terms-container"
import Image from "next/image"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import Modal from "react-modal"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "80vw",
    maxHeight: "600px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

const TermsModal = ({
  isOpen = false,
  // onClose,
  onConfirm,
  onAccept,
  onReject,
  ...props
}) => {
  const { t } = useTranslation()
  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      // onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h6 className="hero_title">{t("terms_and_conditions")}</h6>
      <RegisterTermsContainer onReject={onReject} onAccept={onAccept} />
      <style jsx>{`
        .modal-title {
          @apply text-18pxm md:text-22pxt lg:text-20px mt-mb30 md:mt-30pxt lg:mt-vw30 font-avenirBold w-[75%] text-center mx-auto leading-5;
        }
        .hero_title {
          @apply text-center font-avenirMedium text-28pxm md:text-40pxt lg:text-40px text-black-333 uppercase whitespace-pre-line leading-none mb-mb40 md:mb-50pxt lg:mb-vw50 w-full;
        }
      `}</style>
    </Modal>
  )
}

TermsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
}

export default TermsModal
