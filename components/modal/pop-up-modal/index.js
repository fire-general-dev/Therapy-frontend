import { Modal } from "flowbite-react"
import InfoIcon from "@/images/icons/info-icon.svg"
import DeleteIcon from "@/images/icons/delete_icon.svg"
import Image from "next/image"
import PropTypes from "prop-types"

const PopupModal = ({
  title,
  confirmText,
  cancelText,
  isOpen = false,
  onClose,
  onConfirm,
  variant,
  children,
  ...props
}) => {
  const getIcon = () => {
    switch (variant) {
      case "primary":
        return InfoIcon
      case "delete":
        return DeleteIcon
      default:
        return InfoIcon
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
        {/* <Modal.Header /> */}
        <Modal.Body className="pt-vw40">
          <Image
            layout="raw"
            src={getIcon()}
            alt="appointment"
            className="w-40pxm md:w-50pxt lg:w-50px mx-auto pt-mb50 md:pt-50pxt lg:pt-vw50"
          />
          <div className="modal-title">{title}</div>
          {children ? children : null}
          <div className="actions">
            <button onClick={onConfirm} className="confirm-btn">
              {confirmText}
            </button>
            <button onClick={onClose} className="cancel-btn">
              {cancelText}
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <style jsx>{`
        .modal-title {
          @apply text-18pxm md:text-22pxt lg:text-20px mt-mb30 md:mt-30pxt lg:mt-vw30 font-avenirBold w-[75%] text-center mx-auto leading-5;
        }
        .actions {
          @apply mx-0 md:mx-0 lg:mx-vw20 xl:mx-0 flex justify-center gap-4 md:gap-8 lg:gap-12 mt-mb50 md:mt-50pxt lg:mt-vw50;
        }
        .confirm-btn {
          @apply bg-dashboardBtnPrimary hover:bg-dashboardBtnPrimaryHover transition-all duration-200 text-white py-mb8 md:py-8pxt lg:py-vw08 px-mb20 md:px-20pxt lg:px-vw20 uppercase text-16pxm md:text-18pxt lg:text-18px lg:max-w-175px;
          flex: 1;
        }
        .cancel-btn {
          @apply border border-dashboardBtnPrimary transition-all duration-200 border-solid text-dashboardBtnPrimary py-mb8 md:py-8pxt lg:py-vw08 px-mb20 md:px-18pxt lg:px-vw20 uppercase text-16pxm md:text-20pxt lg:text-18px w-auto lg:max-w-175px;
          flex: 1;
        }
      `}</style>
    </>
  )
}

PopupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "delete"]),
  children: PropTypes.node.isRequired,
}

PopupModal.defaultProps = {
  variant: "primary",
}

export default PopupModal
