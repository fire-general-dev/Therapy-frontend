import { Modal } from "flowbite-react"
import PropTypes from "prop-types"
import closeIcon from "@/images/icons/close-icon.svg"
import calenderIcon from "@/images/icons/calender.svg"
import timeIcon from "@/images/icons/time-icon.svg"
import userAvatar from "@/images/user-avatar.png"
import warningIcon from "@/images/icons/blue-warning-icon.svg"
import Image from "next/image"
import { useTranslation } from "next-i18next"
import { useState } from "react"
import { useRouter } from "next/router"
import {
  convert24to12,
  getDayName,
  isAftereNow,
  isPreviouseTime,
  isRTLLayout,
  isSameDay,
} from "@/utils/helpers"
import moment from "moment"
import PaymentStep from "./payment/PaymentStep"
import {
  getAvailableAppointmentInDay,
  getAvailableDaysForDoctor,
  getDoctorAppointments,
  getDoctorSettings,
} from "@/utils/api"
import { extractArrayData, extractSingleData } from "@/utils/extractData"
import { getTimeStops } from "@/utils/getTimeStops"
import { useRef } from "react"
import { useEffect } from "react"
import NextImage from "@/components/elements/image"
import DatePicker from "react-datepicker"

const RescheduleAppointmentModal = ({
  isOpen = false,
  user,
  name,
  appId,
  specialization,
  onClose,
  therapistUserName,
  doctorImage,
  price,
  doctorId,
  doctorName,
  ...props
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const isRTL = isRTLLayout(router)

  const [currentStep, setCurrentStep] = useState(0)
  const [dateFocused, setDateFocused] = useState(false)
  const [availableTimes, setAvailableTimes] = useState([])
  const [selectedDate, setSelectedDate] = useState(Date.now())
  // const [selectedTime, setSelectedTime] = useState(null)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  // const [newAppointmentDate, setNewAppointmentDate] = useState(
  //   moment(Date.now())
  // )

  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFaild, setIsFaild] = useState(false)
  const [availableDays, setAvailableDays] = useState([])
  // const [payUsingOldPayment, setPayUsingOldPayment] = useState(false)

  const timeRef = useRef(null)
  const payButtonRef = useRef(null)

  if (typeof window !== "undefined") window.selectedDate = selectedDate

  const steps = [
    { title: "Step 1", content: "Content for Step 1" },
    { title: "Step 2", content: "Content for Step 2" },
    { title: "Step 3", content: "Content for Step 3" },
  ]

  // const handleSubmit = useRef(null)

  // const setSubmitFunction = (func) => {
  //   console.log("Next Button Clicked")
  //   handleSubmit.current = func
  // }

  const handleNext = (e) => {
    // if (currentStep == 1) {
    //   setNewAppointmentDate(selectedTime)
    // }

    if (currentStep == 2) {
      payButtonRef.current.dispatchEvent(
        new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        })
      )
      // if (!handleSubmit.current) {
      //   return setPayUsingOldPayment(true)
      // }
      // handleSubmit.current(e)
    }
    setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleAvailableTimes = async () => {
    const response = await getAvailableAppointmentInDay({
      doctorId: doctorId,
      requestDate: moment(selectedDate).format("YYYY/MM/DD"),
    })
    const extractData = extractArrayData(response)

    const times = extractData
      ?.map((availableTime) => {
        const startDate = moment(availableTime.appointment_date)
        const endDate = moment(availableTime.appointment_end_time)
        if (!isAftereNow(startDate)) return
        return {
          label: `${startDate.format("hh:mm A")} - ${endDate.format(
            "hh:mm A"
          )}`,
          // value: startDate.toISOString(),
          value: availableTime.id,
          isDiabled: false,
        }
      })
      .filter((item) => {
        if (item) return true
      })

    setAvailableTimes(times)

    setSelectedAppointment(times[0]?.value)
  }

  useEffect(() => {
    if (isOpen) {
      setAvailableTimes([])
      handleAvailableTimes()
    }
  }, [selectedDate])

  const getData = async () => {
    setIsLoadingData(true)
    const availableDatesData = await getAvailableDaysForDoctor({
      doctorId,
    })

    setAvailableDays(availableDatesData)

    if (availableDatesData && availableDatesData[0]) {
      setSelectedDate(moment(availableDatesData[0], "YYYY/MM/DD").toDate())
    }
    setIsLoadingData(false)
  }

  useEffect(() => {
    if (isOpen) {
      getData()
    }
  }, [isOpen])

  const getStepContent = (stepNumber) => {
    switch (stepNumber) {
      case 0:
        return (
          <div className="confiramtion-msg">
            <h1>{t("sure_reschedule_title")}</h1>
            <p>
              {t("sure_reschedule_desc")} {doctorName}?
            </p>
            <div className="note">
              <Image src={warningIcon} alt="Warning" />
              <span>
                {t("note_charge")}
                {/* {price} {t("AED")} + {t("vat5")} {t("for_the_reschedule")} */}
              </span>
            </div>
            <style jsx>
              {`
                .confiramtion-msg {
                  h1 {
                    @apply font-avenirBold text-3xl text-black-0 mb-6;
                    line-height: 2rem;
                  }

                  p {
                    @apply text-lg text-gray-999 mb-9;
                    line-height: 1.5rem;
                  }

                  .note {
                    @apply flex gap-3 py-2 px-4 rounded-sm;
                    background-color: rgb(235, 240, 249, 0.4);
                    span {
                      @apply font-avenirSlim text-sm text-gray-999;
                    }
                  }
                }
              `}
            </style>
          </div>
        )
      case 1:
        return (
          <div>
            <div id="appoint-container">
              <div className={"specialist-box"}>
                <div className={"avatar"}>
                  {doctorImage ? (
                    <NextImage media={doctorImage} className="!h-20" />
                  ) : (
                    <Image src={userAvatar} alt="avatar" className="!h-20" />
                  )}
                </div>

                <div
                  onClick={() => {
                    router.push(
                      `/cart/book-appointment?therapist=${therapistUserName}`
                    )
                  }}
                  className={"title"}
                >
                  <h6>{name}</h6>
                </div>
                <span className={"specialization"}>{specialization}</span>
              </div>
              <h6 className={"modal-title"}>{t("preferred_date_and_time")}</h6>
              <div className={"date-time-picker"}>
                <div className={"date-picker"}>
                  <Image
                    src={calenderIcon}
                    alt="calender"
                    className="calender-icon"
                  />

                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    minDate={new Date()}
                    dateFormat={"dd/MM/yyyy"}
                    className="bg-transparent border-none outline-none w-32"
                    filterDate={(date) => {
                      if (!availableDays) return true
                      return (
                        availableDays.indexOf(
                          moment(date).format("YYYY/MM/DD")
                        ) >= 0
                      )
                    }}
                  />
                </div>
                <div className={"separator"}></div>
                <div className={"time-picker"}>
                  <Image src={timeIcon} alt="alarm" className={"time-icon"} />
                  <select
                    onChange={(e) => setSelectedAppointment(e.target.value)}
                    className="select-time transition ease-in-out border-none p-0 bg-none focus:ring-0 align-text-top bg-transparent"
                    value={selectedAppointment}
                    ref={timeRef}
                  >
                    {availableTimes.map((item) => {
                      return (
                        <option
                          key={item.value}
                          value={item.value}
                          disabled={item.isDiabled}
                        >
                          {item.label}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>

              <div className={"actions-wrapper"}></div>
            </div>
            <style jsx>{`
              .specialist-box {
                @apply flex flex-col items-center;
              }

              .specialist-box .avatar {
                @apply flex justify-center items-end h-20 w-20 rounded-full overflow-hidden bg-white mb-4;
                border: solid 1px #707070;
              }

              .specialist-box .title {
                @apply flex items-center cursor-pointer;
              }

              .specialist-box .title h6 {
                @apply inline-block my-0 text-lg font-bold text-[#2e4765] capitalize;
              }
              .specialist-box .specialization {
                @apply text-lg text-[#707070] capitalize;
              }

              .modal-title {
                @apply text-base text-[#333333] capitalize mt-8 mb-3;
              }

              .date-time-picker {
                @apply flex w-full py-3 px-5;
                background-color: rgba(224, 224, 224, 0.5);
              }

              .date-picker,
              .time-picker {
                @apply flex gap-3 flex-1 items-center;
              }

              .separator {
                @apply w-[1px] h-[30px] bg-[#888] mx-3;
              }

              .actions-wrapper {
                @apply flex items-center mt-8;
              }
            `}</style>
          </div>
        )
      case 2:
        return (
          <>
            <PaymentStep
              // newDate={newAppointmentDate}
              newAppId={selectedAppointment}
              user={user}
              appointmentId={appId}
              onPrevious={() => {
                setCurrentStep(currentStep - 1)
              }}
            />
          </>
        )
    }
  }

  const getButtonText = () => {
    switch (currentStep) {
      case 0:
        return t("continue")
      case steps.length - 1:
        return t("pay")
      default:
        return t("next")
    }
  }

  return (
    <>
      <Modal
        show={isOpen}
        size="xl"
        popup={true}
        onClose={() => onClose()}
        style={{ zIndex: 100, backgroundColor: "rgb(255 255 255 / 0.7)" }}
      >
        <Modal.Body style={{ padding: 0 }}>
          <div className={"reschedule-appointment-modal"}>
            <div className="close-btn" onClick={() => onClose()}>
              <Image src={closeIcon} alt="Close" />
            </div>

            <div className="steps-header">
              <div
                className={`step-header ${currentStep === 0 ? "current" : ""} ${
                  currentStep > 0 ? "done" : ""
                }`}
              >
                <span className="step-number">1</span>
                <span className="step-title">{t("confirmation")}</span>
              </div>
              <div
                className={`step-separator ${
                  currentStep === 0 ? "current" : ""
                } ${currentStep > 0 ? "done" : ""}`}
              ></div>
              <div
                className={`step-header ${currentStep === 1 ? "current" : ""} ${
                  currentStep > 1 ? "done" : ""
                }`}
              >
                <span className="step-number">2</span>
                <span className="step-title">{t("date_time")}</span>
              </div>
              <div
                className={`step-separator ${
                  currentStep === 1 ? "current" : ""
                } ${currentStep > 1 ? "done" : ""}`}
              ></div>
              <div
                className={`step-header ${currentStep === 2 ? "current" : ""} ${
                  currentStep > 2 ? "done" : ""
                }`}
              >
                <span className="step-number">3</span>
                <span className="step-title">{t("payment")}</span>
              </div>
            </div>

            <div className="h-full">{getStepContent(currentStep)}</div>

            <div className="flex-space"></div>

            {currentStep != steps.length - 1 ? (
              <div
                className={`actions ${currentStep === 0 ? "first-step" : ""}`}
              >
                {currentStep !== 0 ? (
                  <button
                    className="btn back"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                  >
                    {t("back")}
                  </button>
                ) : null}

                <button
                  className="btn next"
                  onClick={handleNext}
                  // disabled={currentStep === steps.length - 1}
                >
                  {getButtonText()}
                </button>
              </div>
            ) : null}
          </div>
        </Modal.Body>
      </Modal>
      <style jsx>{`
         {
          /* Stepper */
        }
        .steps-header {
          @apply flex items-center mb-8;
        }
        .step-header {
          @apply flex gap-3 items-center;
          .step-number {
            @apply w-7 h-7 flex items-center justify-center text-center bg-[#e0e0e0] text-base text-white rounded-full transition-all ease-in-out duration-500;
          }
          .step-title {
            @apply text-base text-text-primary capitalize transition-all ease-in-out duration-500;
          }

          &.current {
            .step-number {
              @apply bg-[#3a86ff];
            }

            .step-title {
              @apply text-[#3a86ff];
            }
          }

          &.done {
            .step-number {
              @apply bg-dashboardBtnPrimary;
            }

            .step-title {
              @apply text-dashboardBtnPrimary;
            }
          }
        }
        .step-separator {
          @apply h-px mx-3 bg-text-primary flex-1 transition-all ease-in-out duration-500;

          &.current {
            @apply bg-[#3a86ff];
          }

          &.done {
            @apply bg-dashboardBtnPrimary;
          }
        }

        .step-body {
          @apply flex flex-col justify-between;
        }
        .reschedule-appointment-modal {
          @apply relative p-4 pt-16 min-h-[500px] flex flex-col;
        }

        .flex-space {
          @apply flex-1;
        }

        .close-btn {
          @apply absolute top-5 right-5 p-2 rounded-md cursor-pointer bg-white ease-out transition-all duration-300;
          box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.08);
          border: solid 0.5px rgba(112, 112, 112, 0.22);
          &:hover {
            box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
          }
        }

        .actions {
          @apply flex items-center justify-between mt-auto;
          &.first-step {
            @apply justify-end;
          }
        }

        .btn {
          @apply rounded-md text-white p-0 cursor-pointer outline-none text-base py-3 capitalize w-32 font-avenirBold;
          border: none;
          &.next {
            @apply bg-dashboardBtnPrimary;
          }
          &.back {
            @apply text-dashboardBtnPrimary bg-white;
            border: solid 1px #0a47ac;
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

export default RescheduleAppointmentModal
