import Image from "next/image"

import React, { useRef, useState } from "react"
import moment from "moment"

import NextImage from "@/components/elements/image"
import locationIcon from "@/images/icon-location.svg"
import { extractArrayData, extractSingleData } from "utils/extractData"
import ServiceButton from "@/components/elements/cartElements/serviceButton"
import calenderIcon from "@/images/icons/calender.svg"
import alarmIcon from "@/images/icons/alarm.svg"
import Tabs from "../elements/tabs"
import InsuranceForm from "./checkoutPage/InsuranceForm"
import CreditCardSection from "./checkoutPage/CreditCardSection"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import CalendarIcon from "@/images/icons/checkout/calendar-icon.svg"
import ClockIcon from "@/images/icons/checkout/clock-icon.svg"
import CallNafsiCard from "../cards/CallNafsiCard"

export const CheckoutPage = (props) => {
  const {
    cart,
    clientSecret,
    paymentOptions,
    paymentMethods,
    fetchNewCard,
    currentPayment,
    setPayUsingOldPayment,
    deviceType,
    user,
  } = props

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = React.useState(null)
  const [active, setActive] = useState("creditCardPayment")
  const { t } = useTranslation()
  const [showPaymentMethods, setShowPaymentMethod] = useState(
    paymentMethods.length > 0
  )
  const router = useRouter()

  const handleSubmit = useRef(null)

  const setSubmitFunction = (func) => {
    handleSubmit.current = func
  }

  const onClick = (e) => {
    if (!handleSubmit.current) {
      return setPayUsingOldPayment(true)
    }
    handleSubmit.current(e)
  }
  const cartData = extractSingleData(cart)
  const doctorData = extractSingleData(cartData.doctor?.data) //extractSingleData(cartData.therapist)
  const appData = extractSingleData(cartData.doctor_appointment?.data)

  const content = {
    creditCardPayment: (
      <CreditCardSection
        clientSecret={clientSecret}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        message={message}
        setMessage={setMessage}
        paymentOptions={paymentOptions}
        showPaymentMethods={showPaymentMethods}
        setShowPaymentMethod={setShowPaymentMethod}
        paymentMethods={paymentMethods}
        fetchNewCard={fetchNewCard}
        setSubmitFunction={setSubmitFunction}
        appId={appData.id}
        user={user}
      />
    ),
    insurancePayment: <InsuranceForm deviceType={deviceType} />,
  }

  const location = extractSingleData(doctorData?.location?.data)
  const appointmentInfo = moment(cartData.appointment_date)
  // const startTime = moment(cartData.appointment_date, "HH:mm")
  const endTime = moment(appData?.appointment_end_time).format("HH:mm")
  const bookedTime = `${appointmentInfo.format("HH:mm")} - ${endTime}`

  const categories = extractArrayData(cartData.categories?.data)
  // window.startTime = startTime
  // window.moment = moment
  // console.log("startTime ===>", startTime)

  return (
    <>
      {doctorData.company_name == "novomed" ? (
        <CallNafsiCard />
      ) : (
        <div className="card payment-card">
          <Tabs active={active} onChange={setActive}>
            <div key={"creditCardPayment"}>{t("credit_card")}</div>
            <div key={"insurancePayment"}>{t("insurance")}</div>
          </Tabs>

          <div className="payment-card-body">
            {content[active]}

            <button
              onClick={
                active == "creditCardPayment"
                  ? onClick
                  : () => {
                      router.push("/")
                    }
              }
              className="sbmtButton"
              disabled={isLoading}
            >
              {active == "creditCardPayment" ? t("pay_now") : t("done")}
            </button>
          </div>
        </div>
      )}
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
        {categories && categories.length > 0 ? (
          <div className="servcies-container">
            <div>{t("chosen_services")}:</div>
            <div className="services-wrapper">
              {categories.map((service) => (
                <ServiceButton
                  key={`serviceSelection-checkout-${service.id}`}
                  service={service}
                  isDisabled={true}
                  onClick={() => {}}
                />
              ))}
            </div>
          </div>
        ) : null}
        <div className="appointment">
          <div className="text-[#2E3333] text-sm font-medium mb-2">
            {t("preferred_date_and_time")}:
          </div>
          <div className="date-time">
            <div className="date">
              <Image src={CalendarIcon} alt="calendar" />
              <span>
                {moment(cartData.appointment_date).format("DD/MM/YYYY")}
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
        <div>
          <div className="cart-item">
            <span className="cart-item-label">{t("session_price")}:</span>
            <span className="cart-item-value">
              {t("AED")} {cartData.price}
            </span>
          </div>
          {/* <div className="cart-item">
            <span className="cart-item-label">{t("vat5p")}:</span>
            <span className="cart-item-value">
              {t("AED")} {Number(cartData.price) * 0.05}
            </span>
          </div>
          <div className="cart-item">
            <span className="cart-item-label">{t("total_amount_to_pay")}:</span>
            <span className="cart-item-value !font-bold">
              {t("AED")}{" "}
              {Number(cartData.price) + Number(cartData.price) * 0.05}
            </span>
          </div> */}
        </div>
      </div>

      <style jsx>{`
         {
          /* px-mb20 md:px-20pxt lg:px-vw20 py-mb20 md:py-24pxt lg:py-vw24 */
        }
        .card {
          @apply flex-1 bg-white rounded-md h-full text-base text-black-333 p-7;
          font-family: "Poppins", sans-serif;
        }
        .order-card {
          @apply flex flex-col;
        }
        .payment-card {
          @apply flex flex-col;
        }
         {
          /* .payment-card-body {
          @apply px-5 py-6;
        } */
        }
        .doctor-details {
          @apply flex items-center lg:items-start flex-col lg:flex-row gap-10 mb-7;
        }
        .name-wrapper {
          @apply flex items-center lg:items-start justify-center flex-col;
        }
        .doctor-image {
          @apply rounded-full overflow-hidden w-24 h-24;
        }
        .location {
          @apply text-sm flex items-center;
        }
        .name {
          @apply uppercase text-2xl lg:text-4xl text-[#2E3333] font-semibold mb-1;
        }
        .speciality {
          @apply font-sans text-sm text-gray-64;
        }
        .servcies-container {
          @apply text-base;
        }
        .services-wrapper {
          @apply mb-5 lg:mb-10 gap-5 flex;
        }
        .date-time {
          @apply flex py-3 text-black-3232 text-xs lg:text-sm mb-7;
        }
        .date {
          @apply flex items-center gap-2 pr-2 lg:pr-9 border-r border-solid border-[#EEEFF0];
        }
        .time {
          @apply flex items-center gap-2 pl-2 lg:pl-9;
        }
        .cart-item {
          @apply flex gap-10 mb-4;
          .cart-item-label {
            @apply block w-40 text-black-3232 text-sm;
          }
          .cart-item-value {
            @apply block text-black-3232 text-base font-medium;
          }
        }
        .sbmtButton {
          @apply w-full bg-[#1BBEC3] hover:bg-[#15989c] rounded-full py-3 text-white text-base mb-2 mt-5;
        }
      `}</style>
    </>
  )
}

export default CheckoutPage
