import Image from "next/image"
import { useTranslation } from "next-i18next"
import { useStripe } from "@stripe/react-stripe-js"
import React, { useEffect, useState } from "react"
// import Spinner from "../elements/spinner"
import { useRouter } from "next/router"
import Spinner from "@/components/elements/spinner"
import { extractSingleData } from "@/utils/extractData"
import NextImage from "@/components/elements/image"
import moment from "moment"
import CalendarIcon from "@/images/icons/checkout/calendar-icon.svg"
import ClockIcon from "@/images/icons/checkout/clock-icon.svg"
import Link from "next/link"
import ArrowNext from "@/components/icons/arrow-next"

const PaymentMessage = ({ isSuccess, title, message, bookingReference }) => {
  const { t } = useTranslation()
  return (
    <div className="payment-msg">
      <Image
        className="mb-12"
        loader={({ src }) => src}
        src={
          isSuccess
            ? "https://strapi-nafsi-s3-images.s3.me-central-1.amazonaws.com/success_icon_c85b42dbb1.svg"
            : "https://strapi-nafsi-s3-images.s3.me-central-1.amazonaws.com/faild_icon_9927834b85.svg"
        }
        width={140}
        height={140}
      />
      <h3 className="payment-title">{title}</h3>
      <p className="msg">{message}</p>
      {isSuccess ? (
        <div className="ref-container">
          <span className="ref-label">{t("booking_reference")}</span>
          <span className="ref-value">{bookingReference}</span>
        </div>
      ) : null}
      <style jsx>{`
        .payment-msg {
          @apply flex flex-col items-center mx-auto;
        }
        .payment-title {
          @apply text-[#2E3333] mb-5 text-center text-2xl lg:text-4xl font-semibold;
        }
        .msg {
          @apply max-w-md text-[#718384] text-sm lg:text-lg text-center;
        }
        .ref-label {
          @apply block text-[#2E3333] text-sm lg:text-lg mb-1;
        }
        .ref-value {
          @apply text-[#2E3333] text-xl lg:text-2xl font-semibold;
        }
        .ref-container {
          @apply mt-5 flex flex-col justify-center text-center;
        }
      `}</style>
    </div>
  )
}

const AppointmentCard = ({ appointment, price }) => {
  console.log("Appointment: ", appointment)
  const { t } = useTranslation()
  const appointmentData = extractSingleData(appointment)
  const doctorData = extractSingleData(appointmentData?.doctor?.data)
  const endTime = moment(appointmentData?.appointment_end_time).format("HH:mm")
  const bookedTime = `${moment(appointmentData?.appointment_date).format(
    "HH:mm"
  )} - ${endTime}`
  return (
    <div className="card order-card">
      <div className="doctor-details">
        <div className="doctor-image">
          <NextImage media={doctorData?.doctorImage} />
        </div>
        <div className="name-wrapper">
          <h1 className="name">{doctorData?.title}</h1>
          <h2 className="speciality">{doctorData?.speciality}</h2>
        </div>
      </div>
      <div className="appointment">
        <div className="date-time-label">{t("appointment_date_and_time")}:</div>
        <div className="date-time">
          <div className="date">
            <Image src={CalendarIcon} alt="calendar" />
            <span>
              {moment(appointmentData?.appointment_date).format("DD/MM/YYYY")}
            </span>
          </div>
          <div className="time">
            <Image src={ClockIcon} alt="clock" />
            <div>
              <span className="block">{bookedTime}</span>
              <div className="block text-[#717784]">
                <span className="hidden lg:inline-block">
                  {t("gulf_standard_time")}{" "}
                </span>
                {t("gst_time")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="cart-item">
          <span className="cart-item-label">{t("amount_paid")}:</span>
          <span className="cart-item-value">
            {t("AED")} {price}
          </span>
        </div>
      </div>

      <style jsx>{`
        .card {
          @apply mt-8 max-w-lg lg:mx-auto flex-1 bg-white rounded-2xl h-full text-base text-black-333 p-7 mb-12;
          font-family: "Poppins", sans-serif;
        }
        .order-card {
          @apply flex flex-col;
        }
        .doctor-details {
          @apply flex items-center lg:items-start flex-col lg:flex-row gap-10 mb-5;
        }
        .name-wrapper {
          @apply flex items-center lg:items-start justify-center flex-col;
        }
        .doctor-image {
          @apply rounded-full overflow-hidden w-24 h-24;
        }
        .name {
          @apply uppercase text-2xl text-[#2E3333] font-semibold mb-1;
        }
        .speciality {
          @apply font-sans text-sm text-gray-64;
        }
        .date-time-label {
          @apply text-center lg:text-left text-[#2E3333] text-sm font-medium mb-2;
        }
        .date-time {
          @apply flex py-3 text-black-3232 text-sm mb-5;
        }
        .date {
          @apply flex items-center gap-2 pr-2 lg:pr-9 border-r border-solid border-[#EEEFF0];
        }
        .time {
          @apply flex items-center gap-2 pl-2 lg:pl-9;
        }
        .cart-item {
          @apply flex items-center justify-between lg:justify-start gap-5 mb-4;
          .cart-item-label {
            @apply block text-black-3232 text-sm;
          }
          .cart-item-value {
            @apply block text-black-3232 text-base font-semibold;
          }
        }
        :global(.rtl) {
          .date-time-label {
            @apply text-right;
          }
        }
      `}</style>
    </div>
  )
}

const PaymentResultContainer = ({ appointment }) => {
  const [message, setMessage] = useState()
  const [isSucced, setIsSucced] = useState(false)
  const [loading, isLoading] = useState(true)
  const [paymentIntent, setPaymentIntent] = useState({})
  const router = useRouter()
  const stripe = useStripe()
  const { t } = useTranslation()

  useEffect(() => {
    if (!stripe) {
      return
    }

    // const clientSecret = new URLSearchParams(window.location.search).get(
    //   "payment_intent_client_secret"
    //   // "setup_intent_client_secret"
    // )

    if (!router.query.payment_intent_client_secret) {
      return
    }

    stripe
      .retrievePaymentIntent(router.query.payment_intent_client_secret)
      .then(({ paymentIntent }) => {
        // stripe.retrieveSetupIntent(router.query.payment_intent_client_secret).then(({ setupIntent }) => {
        isLoading(false)
        console.log("paymentIntent ===>", paymentIntent)
        setPaymentIntent(paymentIntent)
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage(`${t("payment_success_msg")}!`)
            setIsSucced(true)
            break
          case "requires_capture":
            setMessage(`${t("payment_success_msg")}!`)
            setIsSucced(true)
            break
          case "processing":
            setMessage(`${t("your_payment_is_processing")}.`)
            break
          case "requires_payment_method":
            setMessage(`${t("payment_was_not_successful")}.`)
            break
          default:
            setMessage(`${t("payment_failed_msg")}`)
            break
        }
      })
  }, [stripe])

  return (
    <div className="payment-result-container">
      {loading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        <div className="pb-12">
          <PaymentMessage
            isSuccess={isSucced}
            title={isSucced ? t("payment_success") : t("payment_failed")}
            message={message}
            bookingReference={paymentIntent.id?.slice(-6)}
          />
          <AppointmentCard
            appointment={appointment}
            price={(paymentIntent.amount / 100).toFixed(2)}
          />
          <Link passHref href={"/"}>
            <div className="link_button">
              <div className="arrow">
                <ArrowNext />
              </div>
              <span>{t("back_to_home")}</span>
            </div>
          </Link>
        </div>
      )}
      <style jsx>{`
        .payment-result-container {
          @apply px-5;
        }

        .arrow {
          @apply rotate-180;
        }

        .link_button {
          @apply py-4 px-8 bg-[#1BBDC3] text-base text-white font-bold uppercase flex justify-center items-center gap-2 cursor-pointer rounded-full mx-auto transition-all duration-500 ease-in fill-white hover:bg-[#15989c] lg:w-fit;
        }

         {
          /* :global(.rtl) {
            .arrow {
                @apply rotate-0;
            } */
        }
      `}</style>
    </div>
  )
}

export default PaymentResultContainer
