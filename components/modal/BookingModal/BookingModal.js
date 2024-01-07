import Image from "next/image"
import { useTranslation } from "react-i18next"
import Modal from "react-modal"
import CalendarIcon from "@/images/icons/services/calendar-icon.svg"
import BookedCalendarIcon from "@/images/icons/services/booked-calendar-icon.svg"
import ClockIcon from "@/images/icons/services/booked-clock-icon.svg"
import { useState } from "react"
import CloseIcon from "@/images/icons/services/close-icon.svg"
import DateField from "./DateField"
import TimeField from "./TimeField"
import moment from "moment"

const BookingModal = ({
  selectedDate,
  onChangeDate,
  availableDays,
  onChangeTime,
  selectedTime,
  selectedAppointment,
  timeRef,
  availableTimes,
  onSetSchedule,
  isOpen,
  onOpen,
  onClose,
  isBooked = false,
  isMobile = false,
}) => {
  const { t } = useTranslation()
  // const appointmentInfo = moment(cartData.appointment_date)
  // const startTime = moment(selectedAppointment?.appointment_date).format("HH:mm")
  // const endTime = moment(selectedAppointment?.appointment_end_time).format("HH:mm")
  // const bookedTime = `${startTime} - ${endTime}`=

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: isMobile ? "90vw" : "570px",
      maxHeight: "600px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "15px",
      border: "none",
      padding: "0",
    },
    overlay: {
      background: "rgba(26, 36, 55, 0.50)",
    },
  }

  const handleOpen = () => {
    onOpen(true)
  }

  const handleClose = () => {
    onClose(false)
  }

  return (
    <div>
      {/* {isBooked ? (
        <div className="preferred-date">
          <div className="preferred-date-title">
            {t("your_preferred_date_and_time")}
          </div>
          <div className="preferred-date-time-container">
            <div className="date" onClick={handleOpen}>
              <Image src={BookedCalendarIcon} alt="calendar-icon" />
              <span className="time-title">
                {moment(selectedDate).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="seprator"></div>
            <div className="time" onClick={handleOpen}>
              <Image src={ClockIcon} alt="calendar-icon" />
              <div>
                <span className="time-title">{selectedTime}</span>
                <span className="time-gulf">
                  {t("gulf_standard_time")} {t("gst_time")}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="booking-btn" onClick={handleOpen}>
          <Image src={CalendarIcon} alt="calendar-icon" />
          <div>
            <span className="booking-btn-title">
              {t("select_date_and_time")}
            </span>
            <span className="booking-btn-gulf">
              {t("gulf_standard_time")} {t("gst_time")}
            </span>
          </div>
        </div>
      )} */}
      <Modal isOpen={isOpen} onRequestClose={handleClose} style={customStyles}>
        <div className="header">
          <h3 className="modal-title">{t("select_date_and_time")}</h3>
          <Image
            className="cursor-pointer"
            onClick={handleClose}
            src={CloseIcon}
            alt="Close"
          />
        </div>
        <div className="body">
          <h6 className="title">{t("pick_preferred_date_time")}</h6>
          <div className="date-time">
            <DateField
              selectedDate={selectedDate}
              onChangeDate={onChangeDate}
              availableDays={availableDays}
            />
            <TimeField
              onChange={onChangeTime}
              selectedAppointment={selectedAppointment}
              timeRef={timeRef}
              availableTimes={availableTimes}
            />
          </div>
          <button className="btn" onClick={onSetSchedule}>
            {t("set_schedule")}
          </button>
        </div>
      </Modal>
      <style jsx>{`
        .preferred-date-time-container .time {
          @apply flex items-center gap-2 text-black-3232 text-base cursor-pointer transition-all ease-in duration-300 hover:text-[#1BBEC3];

          .time-gulf {
            @apply block text-[#718384] text-xs mt-[2px] hover:text-[#1BBEC3] transition-all ease-in duration-300;
          }

          &:hover {
            .time-gulf {
              @apply text-[#1BBEC3];
            }
          }
        }

        .seprator {
          @apply w-px h-10 bg-[#EEF0F0] mx-7;
        }

        .preferred-date-time-container .date {
          @apply flex items-center gap-2 text-black-3232 text-base cursor-pointer transition-all ease-in duration-300 hover:text-[#1BBEC3];
        }

        .preferred-date-title {
          @apply text-[#323232] text-sm mb-4;
        }

        .booking-btn {
          @apply flex items-center gap-2 text-black-3232 text-base cursor-pointer transition-all ease-in duration-300 hover:text-[#1BBEC3];

          .booking-btn-gulf {
            @apply block text-[#718384] text-xs mt-[2px] hover:text-[#1BBEC3] transition-all ease-in duration-300;
          }

          &:hover {
            .booking-btn-gulf {
              @apply text-[#1BBEC3];
            }
          }
        }

        .header {
          @apply p-7 bg-[#FAFAFA] flex items-center justify-between rounded-2xl;
          font-family: "Poppins", sans-serif;
        }

        .title {
          @apply text-[#2E3333] text-lg font-medium mb-7;
        }

        .body {
          @apply pt-12 px-7 pb-7;
          font-family: "Poppins", sans-serif;
        }

        .modal-title {
          @apply text-[#25A9AD] text-xl font-medium;
        }

        .date-time {
          @apply flex flex-col lg:flex-row justify-between gap-5 mb-5;
        }

        .preferred-date-time-container {
          @apply flex;
        }

        .btn {
          @apply w-full rounded-full bg-[#1BBEC3] p-3 text-center text-base text-white font-medium transition-all ease-in duration-300;
          &:hover {
            @apply bg-[#15989c];
          }
        }
      `}</style>
    </div>
  )
}

export default BookingModal
