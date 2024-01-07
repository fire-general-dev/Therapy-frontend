import SubmitBtn from "@/components/buttons/SubmitBtn"
import NextImage from "@/components/elements/image"
import BookingModal from "@/components/modal/BookingModal/BookingModal"
import {
  getAvailableAppointmentInDay,
  getAvailableDaysForDoctor,
  getDoctorSettings,
} from "@/utils/api"
import { extractArrayData, extractSingleData } from "@/utils/extractData"
import { isAftereNow } from "@/utils/helpers"
import moment, { duration } from "moment"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useState } from "react"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { createStrapiAxios } from "@/utils/axiosWrapper"
import LanguageCard from "./LanguageCard"
import ExperienceYearsCard from "./ExperienceYearsCard"

const HeroBookAppointmentCard = ({ isMobile, doctor }) => {
  const [doctorSettings, setDoctorSettings] = useState()
  const [availableDays, setAvailableDays] = useState()
  const [selectedDate, setSelectedDate] = useState(null)
  const { t } = useTranslation()
  const [availableTimes, setAvailableTimes] = useState([])
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [cart, setCart] = useState()
  const [isOpenBookingModal, setIsOpenBookingModal] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const handleOpenBookingModal = () => {
    setIsOpenBookingModal(true)
  }

  const handleCloseBookingModal = () => {
    setIsOpenBookingModal(false)
  }

  const handleAvailableTimes = async () => {
    const response = await getAvailableAppointmentInDay({
      doctorId: doctor?.id,
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
    setSelectedTime(times[0]?.label)
    // setSelectedTime(times[0]?.value)
  }

  const handleSetSchedule = () => {
    setCart({
      appointmentId: selectedAppointment,
      doctorId: doctor?.id,
      sessionCount: 1,
    })
    handleBooking()
    // handleCloseBookingModal()
  }

  const handleBooking = async () => {
    if (session) {
      const cartData = {
        doctor: doctor?.id,
        sessionCount: 1,
        categories: [],
        doctor_appointment: selectedAppointment,
      }

      const addCartItem = await createStrapiAxios({
        strapiToken: session?.strapiToken,
      }).post(`/carts`, {
        data: cartData,
      })
      router.push({
        pathname: "/cart/checkout",
      })
    } else {
      router.push({
        pathname: "/checkout",
        query: {
          appointmentId: selectedAppointment,
          doctorId: doctor?.id,
          sessionCount: 1,
        },
      })
    }
  }

  useEffect(() => {
    if (availableDays && availableDays[0]) {
      setSelectedDate(moment(availableDays[0], "YYYY/MM/DD").toDate())
    }
  }, [availableDays])

  useEffect(() => {
    setAvailableTimes([])
    handleAvailableTimes()
  }, [selectedDate])

  const getData = async () => {
    const doctorSettingsData = await getDoctorSettings({ slug: doctor?.slug })
    if (doctorSettingsData) {
      setDoctorSettings(extractSingleData(doctorSettingsData[0]))
    }

    const availableDaysData = await getAvailableDaysForDoctor({
      doctorId: doctor?.id,
    })
    setAvailableDays(availableDaysData)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="doctor-booking-card">
      <div className="image-wrapper">
        <NextImage
          media={doctor?.doctorImage}
          alt={doctor?.title}
          className="!w-full lg:!w-96"
          fallbackSrc={{
            url: "@/images/placeholder.jpg",
            alternativeText: "",
            width: 262,
            height: 363,
          }}
        />
      </div>
      <div className="body">
        <h3 className="name">{doctor?.title}</h3>
        <span className="specialist">{doctor?.speciality}</span>
        <div className="flex justify-center lg:justify-start gap-2 mb-5 lg:mb-10">
          <LanguageCard langauges={doctor?.speakingLanguages} />
          <ExperienceYearsCard expYears={doctor?.totalYearOfExp} />
        </div>
        {/* <p className="desc">{doctor?.shortDescription}</p> */}
        <span className="duration">
          <span>
            {doctorSettings && doctorSettings?.session_duration?.split("m")[1]}
          </span>{" "}
          {doctorSettings && doctorSettings?.session_duration && t("min")}
        </span>
        <div className="price-book">
          <div className="price-container">
            <span className="price">
              {t("aed")} {doctorSettings && doctorSettings?.sessionPrice}
            </span>
            <span className="unit"> / {t("session")}</span>
          </div>
          <div>
            <BookingModal
              isOpen={isOpenBookingModal}
              onOpen={handleOpenBookingModal}
              onClose={handleCloseBookingModal}
              isBooked={cart}
              selectedDate={selectedDate}
              onChangeDate={(date) => setSelectedDate(date)}
              availableDays={availableDays}
              availableTimes={availableTimes}
              selectedAppointment={selectedAppointment}
              selectedTime={selectedTime}
              onChangeTime={(time, text) => {
                setSelectedAppointment(time)
                setSelectedTime(text)
              }}
              onSetSchedule={handleSetSchedule}
              isMobile={isMobile}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-5">
          <SubmitBtn
            text={t("proceed_to_book")}
            // isDisabled={!cart}
            onClick={handleOpenBookingModal}
            haveArrow={false}
          />
        </div>
      </div>
      <style jsx>{`
        .doctor-booking-card {
          @apply max-w-screen-xl w-full mx-auto px-4 flex flex-col items-center lg:flex-row gap-10 lg:gap-20 pb-10 lg:pb-0;
        }
        .image-wrapper {
          @apply flex-shrink-0 w-[90vw] h-[90vw] overflow-hidden rounded-3xl lg:rounded-none lg:overflow-auto lg:w-96 lg:h-fit;
        }
        .body {
          @apply text-center lg:text-left flex-grow;
          .name {
            @apply text-[#2E3333] text-3xl lg:text-4xl font-bold uppercase mb-5;
          }
          .specialist {
            @apply block text-gray-64 text-sm lg:text-base mb-5;
          }

          .desc {
            @apply text-sm text-gray-64 mb-7;
          }

          .duration {
            @apply block text-[#2E3333] text-base lg:text-2xl mb-2;
            span {
              @apply font-bold;
            }
          }
          .price-container {
            @apply flex items-center gap-2;
          }

          .price {
            @apply text-[#2E3333] text-2xl lg:text-4xl font-bold uppercase;
          }

          .unit {
            @apply text-[#2E3333] text-base lg:text-2xl;
          }
          .price-book {
            @apply flex flex-col lg:flex-row gap-5 lg:gap-14 items-center mb-10;
          }
        }

        :global(.rtl) {
          .body {
            @apply lg:text-right;
          }
        }
      `}</style>
    </div>
  )
}

export default HeroBookAppointmentCard
