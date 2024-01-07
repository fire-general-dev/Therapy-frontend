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

export const CheckoutPage = (props) => {
  const {
    appointmentDetails,
    clientSecret,
    paymentOptions,
    paymentMethods,
    fetchNewCard,
    currentPayment,
    setPayUsingOldPayment,
    deviceType,
    user,
  } = props

  console.log({ props })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = React.useState(null)
  const [active, setActive] = useState("creditCardPayment")
  const { t } = useTranslation()
  const [showPaymentMethods, setShowPaymentMethod] = useState(
    paymentMethods.length > 0
  )

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
  const appointmentData = extractSingleData(appointmentDetails)

  const doctorData = extractSingleData(appointmentData.doctor?.data) //extractSingleData(appointmentData.therapist)
  const location = extractSingleData(doctorData.location?.data)
  const appointmentInfo = moment(appointmentData.appointment_date)
  // const startTime = moment(appointmentData.appointment_date, "HH:mm")
  const endTime = moment(appointmentData.appointment_date)
    .add(appointmentData.appointment_duration, "minutes")
    .format("HH:mm")
  const bookedTime = `${appointmentInfo.format("HH:mm")} - ${endTime}`

  const categories = extractArrayData(appointmentData.categories?.data)

  return (
    <>
      <div className="card payment-card">
        {appointmentDetails.attributes.payment_status === "ready_to_capture" ||
        appointmentDetails.attributes.payment_status === "done" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 250,
            }}
          >
            <p>You already paid</p>
          </div>
        ) : (
          <div className="payment-card-body">
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
              user={user}
              appId={appointmentDetails.id}
            />
            <button
              onClick={onClick}
              className="sbmtButton"
              disabled={isLoading}
            >
              {t("pay_now")}
            </button>
          </div>
        )}
      </div>
      <div className="card order-card">
        <div className="doctor-details">
          <div className="doctor-image">
            <NextImage media={doctorData?.doctorImage} />
          </div>
          <div className="name-wrapper">
            <div className="location glass">
              <Image layout="raw" src={locationIcon} alt="location" />
              <div>{location?.name}</div>
            </div>
            <h1 className="name">{doctorData.title}</h1>
            <h2 className="speciality">{doctorData.speciality}</h2>
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
        <div>{t("preferred_date_and_time")}:</div>
        <div className="date-time-wrapper">
          <div className="flex-1 ">
            <div className="flex items-center justify-center">
              <Image
                src={calenderIcon}
                alt="calender"
                layout="raw"
                className="mx-mb10 md:mx-10pxt lg:mx-vw10 !w-18pxm md:!w-20pxt lg:!w-20px"
              />
              <div className="inline-block relative form-floating w-[80%]">
                <input
                  type="text"
                  className="bg-transparent border-none rounded transition ease-in-out m-0  focus:border-none focus:outline-none focus:ring-0 p-0 align-text-top"
                  placeholder="date"
                  value={moment(appointmentData.appointment_date).format(
                    "DD/MM/YYYY"
                  )}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="flex-1 seperator">
            <div className="flex items-center justify-center">
              <Image
                src={alarmIcon}
                alt="calender"
                layout="raw"
                className="mx-mb10 md:mx-10pxt lg:mx-vw10 !w-18pxm md:!w-20pxt lg:!w-20px"
              />
              <div
                className="datepicker relative form-floating w-[80%]"
                data-mdb-toggle-button="false"
              >
                <input
                  type="text"
                  className="inline-block bg-transparent border-none rounded transition ease-in-out m-0  focus:border-none focus:outline-none focus:ring-0 p-0 align-text-top"
                  placeholder="date"
                  value={bookedTime}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className="price-wrapper">
          <div className="lg:flex-1">{t("total_amount_to_pay")}:</div>
          <div className="session-value lg:flex-2">{`AED ${
            appointmentDetails?.attributes?.price +
            (appointmentDetails?.attributes?.additional_amount || 0)
          }`}</div>
        </div>
      </div>

      <style jsx>{`
         {
          /* px-mb20 md:px-20pxt lg:px-vw20 py-mb20 md:py-24pxt lg:py-vw24 */
        }
        .card {
          @apply bg-white rounded-md flex-1 h-full text-16pxm md:text-20pxt lg:text-16px text-black-333;
          transition: flex-grow 1s;
          flex: 1 0 48px; /* adjusted */
          max-height: min-content;
        }
        .order-card {
          @apply flex flex-col px-mb20 md:px-20pxt lg:px-vw20 py-mb20 md:py-24pxt lg:py-vw24;
        }
        .payment-card {
          @apply flex flex-col;
        }
        .payment-card-body {
          @apply px-mb20 md:px-20pxt lg:px-vw20 py-mb20 md:py-24pxt lg:py-vw24;
        }
        .doctor-details {
          @apply flex gap-vw40 mb-mb20 md:mb-24pxt lg:mb-vw24;
        }
        .name-wrapper {
          @apply flex justify-center flex-col;
        }
        .doctor-image {
          @apply rounded-full overflow-hidden w-mb100 h-mb100 md:w-100pxt md:h-100pxt lg:w-vw120 lg:h-vw120;
        }
        .location {
          @apply text-14pxm md:text-18pxt lg:text-14px flex items-center;
        }
        .name {
          @apply uppercase font-avenirBlack text-28pxm md:text-34pxt lg:text-30px;
        }
        .speciality {
          @apply font-sans text-14pxm md:text-18pxt lg:text-14px;
        }
        .servcies-container {
          @apply text-16pxm md:text-20pxt lg:text-16px;
        }
        .services-wrapper {
          @apply mb-mb20 md:mb-40pxt lg:mb-vw40 gap-mb20 md:gap-20pxt lg:gap-vw20 flex;
        }
        .date-time-wrapper {
          @apply flex bg-black-333 bg-opacity-5 rounded-md p-mb10 px-mb10 md:p-10pxt lg:p-vw10 mb-mb20 md:mb-20pxt lg:mb-vw30;
        }
        .seperator {
          @apply border-l border-l-gray-500;
        }
        .session-count {
          @apply flex mb-mb8 md:mb-8pxt lg:mb-vw20 items-center;
        }
        .session-value {
          @apply text-30pxm md:text-34pxt lg:text-30px font-avenirBold mx-mb10 md:mx-10pxt lg:mx-vw10;
        }
        .price-wrapper {
          @apply font-avenirBlack flex items-center;
        }
        .sbmtButton {
          @apply w-full font-avenirMedium bg-gradient-to-r from-pink-300 to-blue-100 hover:bg-pink-400 rounded-full py-mb12 md:py-12pxt lg:py-vw12 text-black-333 text-16pxm md:text-24pxt lg:text-16px disabled:bg-gradient-to-r disabled:from-slate-400 disabled:to-slate-400 mb-mb10 md:mb-10pxt lg:mb-vw10 mt-mb20 md:mt-20pxt lg:mt-vw20;
        }
      `}</style>
    </>
  )
}

export default CheckoutPage
