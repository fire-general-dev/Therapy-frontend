import { Modal } from "flowbite-react"
import closeIcon from "@/images/icons/close-icon.svg"
import SuccessIcon from "@/images/icons/success-icon.svg"
import FailedIcon from "@/images/icons/failed-icon.svg"
import CancelIcon from "@/images/icons/cancel-icon.svg"
import Image from "next/image"
import { useTranslation } from "next-i18next"
import "react-dates/initialize"
import "react-dates/lib/css/_datepicker.css"
import { useState } from "react"
import { useRouter } from "next/router"
import { isRTLLayout } from "@/utils/helpers"
import Spinner from "../spinner"
import { undoDoctorRequest } from "@/utils/api"

const CancelRequestRecheduleAppointment = ({
  isOpen = false,
  user,
  requestStateId,
  appointmentID,
  appointmentDate,
  onClose,
  ...props
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const isRTL = isRTLLayout(router)
  const [isLoadingCancel, setIsLoadingCancel] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFaild, setIsFaild] = useState(false)

  const handleClose = () => {
    setIsSuccess(false)
    setIsFaild(false)
    onClose()
  }

  const handleCancelAppointment = async () => {
    setIsLoadingCancel(true)

    try {
      const response = await undoDoctorRequest({
        user: user,
        appId: requestStateId,
      })
      setIsSuccess(true)
    } catch {
      setIsFaild(true)
    }

    setIsLoadingCancel(false)
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
            {isSuccess ? (
              <div className="success-wrapper">
                <div className="success-image-wrapper">
                  <Image src={SuccessIcon} alt="Success" />
                </div>
                <h3>{t("confirmed")}</h3>
                <p>{t("appointment_canceled")}</p>
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
            ) : null}
            {isFaild ? (
              <div className="faild-wrapper">
                <div className="faild-image-wrapper">
                  <Image src={FailedIcon} alt="Faild" />
                </div>
                <h3>{t("failed")}</h3>
                <p>{t("request_failed")}</p>
                <button className="ok-btn" onClick={handleClose}>
                  {t("ok")}
                </button>
              </div>
            ) : null}
            {!isSuccess && !isFaild ? (
              <div className="cancel-wrapper">
                <div className="cancel-image-wrapper">
                  <Image src={CancelIcon} alt="Cancel" />
                </div>
                <h3>{t("sure_cancel_request_rescheduled_appointment")}</h3>

                <div className="actions-btns">
                  <button
                    disabled={isLoadingCancel}
                    className={`btn yes-btn ${
                      isLoadingCancel ? "loading" : ""
                    }`}
                    onClick={handleCancelAppointment}
                  >
                    {t("yes_sure")}
                    {isLoadingCancel ? <Spinner /> : null}
                  </button>
                  <button className="btn no-btn" onClick={handleClose}>
                    {t("no")}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </Modal.Body>
      </Modal>
      <style jsx>{`
        .cancel-appointment-modal {
          @apply relative p-4 pb-8 min-h-[400px];
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
          @apply text-center;
          & h3 {
            @apply text-dashboardBtnPrimary text-4xl mb-3;
          }
          & p {
            @apply text-lg text-gray-999 mb-14;
          }
          .ok-btn {
            @apply rounded-md bg-dashboardBtnPrimary text-white p-0 cursor-pointer outline-none text-base py-3 px-10 uppercase;
            border: none;
          }
        }
        .success-image-wrapper {
          @apply mt-28 flex justify-center mb-5;
        }

         {
          /* Faild */
        }
        .faild-wrapper {
          @apply text-center;
          & h3 {
            @apply text-[#ff0000] text-4xl mb-3;
          }
          & p {
            @apply text-lg text-gray-999 mb-14;
          }

          .ok-btn {
            @apply rounded-md bg-[#ff0000] text-white p-0 cursor-pointer outline-none text-16pxm md:text-16pxt lg:text-16px py-mb12 md:py-12pxt lg:py-vw12 px-mb40 md:px-40pxt lg:px-vw40 uppercase;
            border: none;
          }
        }
        .faild-image-wrapper {
          @apply mt-28 flex justify-center mb-5;
        }

         {
          /* Cancel */
        }
        .cancel-wrapper {
          @apply text-center;
          & h3 {
            @apply font-avenirBold text-black-0 text-xl mb-3;
          }
          & p {
            @apply text-lg text-gray-999;
          }
          .actions-btns {
            @apply flex gap-3 mt-14;
          }
          .btn {
            @apply rounded-md bg-[#c60000] text-white cursor-pointer outline-none text-lg py-4 px-10 flex-1;
            border: none;
            &.yes-btn.loading {
              @apply flex items-center justify-center gap-3 cursor-auto;
              background-color: rgb(198, 0, 0, 0.2);
              fill: white;
            }
            &.no-btn {
              @apply bg-white text-black-0;
              box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.16);
            }
          }
        }
        .cancel-image-wrapper {
          @apply mt-11 flex justify-center mb-5;
        }

        .note {
          @apply flex items-center gap-1 py-2 px-4 rounded-sm mt-3;
          background-color: rgb(198, 0, 0, 0.05);
          span {
            @apply font-avenirSlim text-sm text-gray-999;
          }
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
      `}</style>
    </>
  )
}

export default CancelRequestRecheduleAppointment
