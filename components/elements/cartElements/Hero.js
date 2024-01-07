import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import locationIcon from "@/images/icon-location.svg"
import CTAButton from "../CTAButton"
import NextImage from "../image"
import { extractArrayData, extractSingleData } from "utils/extractData"
import ServiceButton from "./serviceButton"
import Modal from "../modal"
import DatePicker from "react-datepicker"
import moment from "moment"
import { useRouter } from "next/router"
import {
  getDayName,
  isAftereNow,
  isPreviouseTime,
  isRTLLayout,
  isSameDay,
} from "utils/helpers"
import { getTimeStops } from "utils/getTimeStops"
import { BsPlus } from "react-icons/bs"
import calenderIcon from "@/images/icons/calender.svg"
import alarmIcon from "@/images/icons/alarm.svg"
import ShowServiceButton from "./showServiceButton"
import { useTranslation } from "next-i18next"
import { getAvailableAppointmentInDay } from "@/utils/api"

function CartHeroDesktop(props) {
  const {
    therapist,
    servicesList,
    doctorSetting,
    handleBooking,
    availableDays,
  } = props
  const router = useRouter()
  const isRTL = isRTLLayout(router)

  const [availableTimes, setAvailableTimes] = useState([])
  const [selectedServices, setSelectedServices] = useState([])
  // const [sessionsCount, setSessionsCount] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  // const [selectedTime, setSelectedTime] = useState(null)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const { t } = useTranslation("common")

  const timeRef = useRef(null)

  const doctorSettingData = extractSingleData(doctorSetting[0])

  if (typeof window !== "undefined") window.selectedDate = selectedDate

  const onClick = () => {
    handleBooking({
      therapist,
      // sessionsCount,
      sessionsCount: 1,
      selectedDate: moment(selectedDate) || moment(Date.now()),
      // selectedTime: selectedTime || timeRef.current.value,
      appointmentId: selectedAppointment,
      selectedServices,
      sessionDuration: doctorSettingData.session_duration.split("m")[1],
      doctorSetting: doctorSettingData,
    })
  }

  const handleAvailableTimes = async () => {
    const response = await getAvailableAppointmentInDay({
      doctorId: therapist.id,
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
          value: availableTime.id,
          // value: startDate.toISOString(),
          isDiabled: false,
        }
      })
      .filter((item) => {
        if (item) return true
      })

    setAvailableTimes(times)

    setSelectedAppointment(times[0]?.value)
    // setSelectedTime(times[0]?.value)
  }

  useEffect(() => {
    if (availableDays && availableDays[0]) {
      setSelectedDate(moment(availableDays[0], "YYYY/MM/DD").toDate())
    }
  }, [])

  useEffect(() => {
    setAvailableTimes([])
    handleAvailableTimes()
  }, [selectedDate])

  // const increament = () => {
  //   setSessionsCount(sessionsCount + 1)
  // }

  // const decreament = () => {
  //   if (sessionsCount > 1) {
  //     setSessionsCount(sessionsCount - 1)
  //   }
  // }

  const location = extractSingleData(therapist.location?.data)

  const onServiceClick = (service) => {
    setSelectedServices([...selectedServices, service])
  }

  const onServiceRemove = (service) => {
    const removeService = selectedServices.filter(
      (serv) => serv.id !== service.id
    )
    setSelectedServices([...removeService])
  }

  const nonSelectedServices = servicesList.filter(
    (serv) => !selectedServices.find((item) => item.id == serv.id)
  )

  return (
    <div className="wrapper">
      <NextImage
        media={therapist.personal_image}
        className={
          "lg:absolute min-w-200pxm md:min-w-200pxt lg:min-w-0 max-h-340pxm md:max-h-340pxt lg:max-h-none md:mx-auto lg:mx-0"
        }
        priority
        height={"100%"}
      />
      <div className="therapists-container">
        <div className="location glass">
          <Image layout="raw" src={locationIcon} alt="location" />
          <div className="mx-vw08">{location?.name}</div>
        </div>
        <h1 className="name leading-px57">{therapist.title}</h1>
        <h2 className="speciality">{therapist.speciality}</h2>

        <div className="mb-vw10">{t("choose_your_services")}</div>
        <div>
          <div className="services-wrapper">
            {selectedServices.map((service) => (
              <ShowServiceButton
                key={`service-${service.id}`}
                className={
                  "mr-mb20 md:mr-20pxt lg:mr-vw20 mb-mb10 md:mb-10pxt lg:mb-vw10"
                }
                service={service}
                onRemove={onServiceRemove}
              />
            ))}

            {nonSelectedServices?.length > 0 && (
              <button
                type="button"
                className="rounded-full bg-gray-150 py-mb6 px-mb20 md:py-6pxt md:px-20pxt lg:py-vw06 lg:px-vw20  mb-mb10 md:mb-10pxt lg:mb-vw10 text-14pxm md:text-18pxt lg:text-14px text-green-100 cursor-pointer transition-all duration-500 hover:bg-gradient-to-r hover:from-pink-300 hover:to-blue-100 hover:translate-x-0.5 hover:translate-y-0.5"
                data-bs-toggle="modal"
                data-bs-target="#serviceList"
              >
                <BsPlus className="text-14pxm md:text-18pxt lg:text-14px" />
              </button>
            )}
          </div>
          <Modal id="serviceList">
            <div className="services-wrapper">
              {nonSelectedServices.map((service) => (
                <ServiceButton
                  key={`serviceSelection-${service.id}`}
                  className={
                    "mr-mb20 md:mr-20pxt lg:mr-vw20 mb-mb10 md:mb-10pxt lg:mb-vw10"
                  }
                  service={service}
                  onClick={onServiceClick}
                  extraDataFiled={{ "data-bs-dismiss": "modal" }}
                />
              ))}
            </div>
          </Modal>
        </div>
        <div className="date-time-label">
          Pick your preferred Date and Time *
        </div>
        <div className="date-time-wrapper">
          <div className="card-wrapper">
            <Image
              src={calenderIcon}
              alt="calender"
              layout="raw"
              className="mx-mb10 md:mx-10pxt lg:mx-vw10 !w-18pxm md:!w-20pxt lg:!w-20px"
            />
            <div
              className="datepicker relative form-floating"
              data-mdb-toggle-button="false"
            >
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                dateFormat={"dd/MM/yyyy"}
                className="bg-transparent border-none outline-none w-32"
                filterDate={(date) => {
                  if (!availableDays) return true
                  return (
                    availableDays.indexOf(moment(date).format("YYYY/MM/DD")) >=
                    0
                  )
                }}
              />
            </div>
          </div>
          <div className="card-wrapper seperator">
            <Image
              src={alarmIcon}
              alt="alarm"
              layout="raw"
              className="mx-mb10 md:mx-10pxt lg:mx-vw10 !w-18pxm md:!w-20pxt lg:!w-20px"
            />
            <div
              className="datepicker relative form-floating"
              data-mdb-toggle-button="false"
            >
              <select
                onChange={(e) => setSelectedAppointment(e.target.value)}
                className="select-time transition ease-in-out border-none p-0 bg-none focus:ring-0 align-text-top"
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
              <div className="block text-[#717784]">{t("gst_time")}</div>
            </div>
          </div>
        </div>
        <div className="price-wrapper">
          <div className={`price ${isRTL ? "rtl" : ""}`}>
            AED {doctorSettingData.sessionPrice} /
            {/* &nbsp; ( &nbsp;
              <span className="per-s">
                <div className="session-number-container">
                  <div className="session-counts">{sessionsCount}</div>
                  <div className="session-controllers">
                    <div className="arrow up" onClick={() => increament()}>
                      <ArrowDownButton fillColor="#333" />
                    </div>
                    <div className="arrow down" onClick={() => decreament()}>
                      <ArrowDownButton fillColor="#333" />
                    </div>
                  </div>
                </div>
                &nbsp; session&nbsp;
              </span>
              ) */}
          </div>
          <div className="bookCTA">
            <CTAButton
              title={t("book_now")}
              fillColor="#000"
              bgColor={"white"}
              classes="!mx-0"
              onClick={onClick}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          @apply lg:relative flex flex-col lg:flex-row w-full items-start lg:items-end text-black-333;
        }
        .image-wrapper {
           {
            /* @apply flex flex-1 relative h-full; */
          }
        }
        .therapists-container {
          @apply flex lg:flex-1 flex-col pb-mb40 md:pb-40pxt lg:pb-vw46 lg:ml-vw475 lg:rtl:ml-0 lg:rtl:mr-vw475 mt-mb40 md:mt-20pxt lg:mt-0 w-full;
        }
        .date-time-label {
          @apply mb-mb8 md:mb-8pxt lg:mb-vw08;
        }
        .location {
          @apply text-14pxm md:text-14pxt lg:text-14px flex mb-mb16 md:mb-16pxt lg:mb-vw16 md:mx-auto lg:mx-0;
        }
        .name {
          @apply uppercase font-avenirBlack text-28pxm md:text-28pxt lg:text-50px mb-mb6 md:mb-6pxt lg:mb-vw06 md:mx-auto lg:mx-0;
        }
        .speciality {
          @apply font-sans  text-20pxm md:text-24pxt lg:text-20px mb-mb28 md:mb-28pxt lg:mb-vw30 md:mx-auto lg:mx-0;
        }
        .boxes-wrapper {
          @apply flex mb-mb40 md:mb-40pxt lg:mb-vw46;
        }
        .description {
          @apply font-avenirMedium text-16pxm md:text-20pxt lg:text-16px mb-mb40 md:mb-40pxt lg:mb-vw60;
        }
        .price-wrapper {
          @apply flex items-end justify-center lg:justify-end;
        }
        .price {
          @apply font-avenirBlack text-30pxm md:text-34pxt lg:text-30px flex mr-vw40;
          &.rtl {
            @apply mr-0 ml-vw40;
          }
        }
        .per-s {
          @apply font-sans text-20pxm md:text-24pxt lg:text-20px;
        }
        .bookCTA {
          @apply mt-mb12 md:mt-12pxt lg:mt-vw12 flex;
        }
        .date-time-wrapper {
          @apply flex bg-white rounded-md p-mb10 md:p-10pxt lg:p-vw10 mb-mb40 md:mb-40pxt lg:mb-vw50 lg:w-3/4;
        }
        .card-wrapper {
          @apply flex-1 flex items-center;
        }
        .select-time {
          padding: 7px 7px 5px;
        }
        .seperator {
          @apply border-l border-l-gray-500;
        }
        .session-number-container {
          @apply inline-flex bg-white bg-opacity-40 h-vw40 w-vw80;
        }
        .session-counts {
          @apply flex flex-1 border-[0.5px] border-[#999999] border-r-0 justify-center items-center;
        }
        .session-controllers {
          @apply flex flex-1 flex-col border-[0.5px] border-[#999999];
        }
        .arrow {
          @apply flex-1 flex justify-center items-center h-1/2;
          &.up {
            @apply border-t-[0.5px] border-[#999999] rotate-180;
          }
        }

        :global(.rtl) {
          .therapists-container {
            @apply lg:ml-0 lg:mr-vw475;
          }
          .price {
            @apply mr-0 ml-vw40;
          }
          .seperator {
            @apply border-l-0 border-r border-r-gray-500;
          }
          .session-counts {
            @apply border-[0.5px] border-[#999999] border-l-0;
          }
          .session-controllers {
            @apply border-[0.5px] border-[#999999];
          }
        }
      `}</style>
    </div>
  )
}

CartHeroDesktop.propTypes = {}

export default CartHeroDesktop
