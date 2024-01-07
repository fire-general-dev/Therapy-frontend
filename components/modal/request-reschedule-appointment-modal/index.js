import { Modal } from "flowbite-react"
import calenderIcon from "@/images/icons/calender.svg"
import timeIcon from "@/images/icons/time-icon.svg"
import closeIcon from "@/images/icons/close-icon.svg"
import arrowIcon from "@/images/icons/arrow-icon.svg"
import SuccessIcon from "@/images/icons/success-icon.svg"
import FailedIcon from "@/images/icons/failed-icon.svg"
import InfoIcon from "@/images/icons/circle-info-icon.svg"
import TC_Icon from "@/images/icons/tc_icon.svg"
import Image from "next/image"
import { useTranslation } from "next-i18next"
import "react-dates/initialize"
import "react-dates/lib/css/_datepicker.css"
import { useState } from "react"
import { useRouter } from "next/router"
import {
  getDayName,
  isAftereNow,
  isPreviouseTime,
  isRTLLayout,
  isSameDay,
} from "@/utils/helpers"
import moment from "moment"
import { getTimeStops } from "@/utils/getTimeStops"
import { useEffect } from "react"
import {
  doctorAppointmentRequest,
  getAvailableAppointmentInDay,
  getAvailableDaysForDoctor,
  getDoctorAppointments,
  getDoctorSettings,
} from "@/utils/api"
import { useRef } from "react"
import Spinner from "../spinner"
import { extractArrayData, extractSingleData } from "@/utils/extractData"
import SwitchButton from "@/components/elements/switchButton"
import NoteField from "../NoteField"
import Link from "next/link"
import { requestType } from "@/utils/enums"
import DatePicker from "react-datepicker"

const RequestRescheduleAppointmentModal = ({
  isOpen = false,
  onClose,
  name,
  appId,
  specialization,
  therapistUserName,
  user,
  doctorId,
  ...props
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const isRTL = isRTLLayout(router)

  const [dateFocused, setDateFocused] = useState(false)
  const [availableTimes, setAvailableTimes] = useState([])
  const [selectedDate, setSelectedDate] = useState(Date.now())
  const [selectedTime, setSelectedTime] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFaild, setIsFaild] = useState(false)
  const [showSelectPreferredDate, setShowSelectPreferredDate] = useState(false)
  const [availableDays, setAvailableDays] = useState([])
  const [note, setNote] = useState("")

  const timeRef = useRef(null)

  if (typeof window !== "undefined") window.selectedDate = selectedDate

  const handleBooking = async (data) => {
    setIsSubmitting(true)

    try {
      const response = await doctorAppointmentRequest({
        user: user,
        requestList: [
          {
            id: appId,
            doctor_note: note,
            type: requestType.RESCHEDULE,
            newDate: showSelectPreferredDate ? selectedTime : null,
          },
        ],
      })
      setIsSuccess(true)
    } catch {
      setIsFaild(true)
      setIsSubmitting(false)
    }
    setIsSubmitting(false)
  }

  const onClick = () => {
    handleBooking({
      selectedDate: moment(selectedDate) || moment(Date.now()),
      selectedTime: selectedTime || timeRef.current.value,
    })
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
          value: startDate.toISOString(),
          isDiabled: false,
        }
      })
      .filter((item) => {
        if (item) return true
      })

    setAvailableTimes(times)

    setSelectedTime(times[0]?.value)
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

  const handleClose = () => {
    setIsSuccess(false)
    setIsFaild(false)
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
          <div className={"book-appointment-modal"}>
            <div className="close-btn" onClick={handleClose}>
              <Image src={closeIcon} alt="Close" />
            </div>
            {isSuccess ? (
              <div className="success-wrapper">
                <div className="success-image-wrapper">
                  <Image src={SuccessIcon} alt="Success" />
                </div>
                <h3>{t("thank_you")}</h3>
                <p>{t("request_appointment_successed")}</p>
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
                <p>{t("request_booking_failed")}</p>
                <button className="ok-btn" onClick={handleClose}>
                  {t("ok")}
                </button>
              </div>
            ) : null}
            {!isSuccess && !isFaild ? (
              <div id="appoint-container">
                <div className="success-image-wrapper">
                  <Image src={InfoIcon} alt="Info" />
                </div>
                <h1 className="title">
                  {t("want_request_reschedule_appointment")}
                </h1>
                <SwitchButton
                  value={showSelectPreferredDate}
                  onChange={(value) => setShowSelectPreferredDate(value)}
                  label={t("select_preferred_date")}
                />

                <div className={"date-time-picker"}>
                  <div className={"date-picker"}>
                    <Image
                      src={calenderIcon}
                      alt="calender"
                      className="calender-icon"
                    />

                    <DatePicker
                      disabled={!showSelectPreferredDate}
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
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="select-time transition ease-in-out border-none p-0 bg-none focus:ring-0 align-text-top bg-transparent"
                      value={selectedTime}
                      disabled={!showSelectPreferredDate}
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

                <NoteField
                  value={note}
                  onChange={(value) => setNote(value)}
                  placeholder={t("add_notes_here")}
                  maxLength={60}
                />

                <div className="terms_conditions">
                  <Image src={TC_Icon} alt="terms" />
                  <Link href="/terms" target="blank">
                    {t("see_our_terms_and_conditions")}
                  </Link>
                </div>
                <div className="actions-btns">
                  <button
                    disabled={isSubmitting}
                    className={`btn yes-btn ${isSubmitting ? "loading" : ""}`}
                    onClick={onClick}
                  >
                    {t("yes")}
                    {isSubmitting ? <Spinner /> : null}
                  </button>
                  <button className="btn no-btn" onClick={handleClose}>
                    {t("no")}
                  </button>
                </div>
              </div>
            ) : null}

            {/* {isLoadingData ? <div>Loading...</div> : null} */}
          </div>
        </Modal.Body>
      </Modal>
      <style jsx>{`
        .book-appointment-modal {
          @apply relative p-4 pb-8 min-h-[425px];
        }

        .close-btn {
          @apply absolute top-5 right-5 p-2 rounded-md cursor-pointer bg-white ease-out transition-all duration-300;
          box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.08);
          border: solid 0.5px rgba(112, 112, 112, 0.22);
          &:hover {
            box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
          }
        }

        .specialist-box {
          @apply flex flex-col items-center pt-11;
        }

        .specialist-box .avatar {
          @apply flex justify-center items-end h-20 w-20 rounded-full overflow-hidden bg-white mb-4;
          border: solid 1px #707070;
        }

        .specialist-box .title {
          @apply flex items-center;
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
          @apply flex w-full py-3 px-5 mt-4;
          background-color: rgba(224, 224, 224, 0.5);
        }

        .date-picker,
        .time-picker {
          @apply flex gap-3 flex-1 items-center;
        }

        .separator {
          @apply w-[1px] h-[30px] bg-[#888] mx-3;
        }

        .actions-btns {
          @apply flex gap-3 mt-14;
        }
        .btn {
          @apply rounded-md bg-dashboardBtnPrimary text-white cursor-pointer outline-none text-lg py-4 px-10 flex-1;
          border: none;
          &.yes-btn.loading {
            @apply flex items-center justify-center gap-3 cursor-auto;
            background-color: rgba(10, 71, 172, 0.2);
            fill: white;
          }
          &.no-btn {
            @apply bg-white text-black-0;
            box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.16);
          }
        }

        .actions-wrapper {
          @apply flex items-center mt-8;
        }

        .btn {
          @apply flex justify-center items-center gap-4 rounded-md bg-dashboardBtnPrimary text-white cursor-pointer outline-none text-lg py-4 px-10 flex-1;
          border: none;
          &.book-btn.loading {
            @apply flex items-center justify-center gap-3 cursor-auto;
            background-color: rgb(10, 71, 172, 0.2);
            fill: white;
          }
        }

        .title {
          @apply text-2xl font-avenirBold text-black-0 text-center mb-10;
        }

        .terms_conditions {
          @apply flex gap-2 items-center text-xs text-dashboardBtnPrimary underline mb-6;
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
          @apply mt-12 flex justify-center mb-5;
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

export default RequestRescheduleAppointmentModal
