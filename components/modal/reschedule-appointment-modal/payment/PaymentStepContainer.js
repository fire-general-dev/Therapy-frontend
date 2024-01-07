import React, { useRef, useState } from "react"
import CreditCard from "./CreditCard"
import { useTranslation } from "next-i18next"
import { Spinner } from "flowbite-react"

export const PaymentStepContainer = (props) => {
  const {
    clientSecret,
    paymentOptions,
    paymentMethods,
    fetchNewCard,
    setPayUsingOldPayment,
    user,
    onPrevious,
    isSubmittingPayment = false,
  } = props

  const [isLoading, setIsLoading] = useState(isSubmittingPayment)
  const [message, setMessage] = React.useState(null)
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

  return (
    <>
      <div className="card payment-card">
        <div className="payment-card-body">
          <CreditCard
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
          />

          <div className={`actions`}>
            <button onClick={() => onPrevious()} className="btn back">
              {t("previous")}
            </button>

            <button
              className={`btn next ${
                isLoading || isSubmittingPayment ? "loading" : ""
              }`}
              onClick={onClick}
              disabled={isLoading || isSubmittingPayment}
              // disabled={currentStep === steps.length - 1}
            >
              {t("pay")}
              {isSubmittingPayment ? <Spinner /> : null}
            </button>
          </div>
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
          @apply flex flex-col justify-between h-full min-h-[360px];
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

        .actions {
          @apply flex items-center justify-between mt-auto;
        }

        .btn {
          @apply rounded-md text-white p-0 cursor-pointer outline-none text-base py-3 capitalize w-32;
          border: none;
          &.next {
            @apply bg-dashboardBtnPrimary;
          }
          &.next.loading {
            @apply flex items-center justify-center gap-3 cursor-auto;
            background-color: rgb(10, 71, 172, 0.2);
            fill: white;
          }
          &.back {
            @apply text-dashboardBtnPrimary bg-white;
            border: solid 1px #0a47ac;
          }
        }
      `}</style>
    </>
  )
}

export default PaymentStepContainer
