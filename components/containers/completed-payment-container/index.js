import { useStripe } from "@stripe/react-stripe-js"
import { useState, useEffect } from "react"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import SuccessIcon from "@/images/icons/success-icon.svg"

const CompatedPaymentContainer = () => {
  const [message, setMessage] = useState()
  const [isSucced, setIsSucced] = useState(false)
  const [loading, isLoading] = useState(true)
  const [paymentIntent, setPaymentIntent] = useState({})
  const stripe = useStripe()
  const { t } = useTranslation()

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
      // "setup_intent_client_secret"
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      // stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }) => {
      isLoading(false)
      console.log("paymentIntent ===>", paymentIntent)
      setPaymentIntent(paymentIntent)
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage(`${t("payment_succeeded")}!`)
          setIsSucced(true)
          break
        case "processing":
          setMessage(`${t("your_payment_is_processing")}.`)
          break
        case "requires_payment_method":
          setMessage(`${t("payment_was_not_successful")}.`)
          break
        default:
          setMessage(`${t("something_went_wrong")}`)
          break
      }
    })
  }, [stripe])
  return (
    <div>
      <div className="completed-payment-wrapper">
        <Image
          className="mb-mb24 md:mb-24pxt lg:mb-vw24 mt-mb60 md:mt-60pxt lg:mt-vw60"
          src={SuccessIcon}
          alt="Success"
        />
        <h1 className="title">{t("thank_you")}</h1>
        <p className="description">{t("success_confirmation_msg")}</p>
        <div className="order-card">
          <div className="order-row mb-mb28 md:mb-28pxt lg:mb-vw28">
            <h1>{t("order_number")}:</h1>
            <span>{paymentIntent.id?.slice(-6)}</span>
          </div>
          <div className="order-row">
            <h1>{t("amount")}</h1>
            <span>
              {paymentIntent.currency} {(paymentIntent.amount / 100).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .completed-payment-wrapper {
          @apply flex flex-col justify-center items-center text-center;
        }
        .title {
          @apply text-dashboardBtnPrimary text-40pxm md:text-40pxt lg:text-40px text-center mb-mb12 md:mb-12pxt lg:mb-vw12;
        }
        .description {
          @apply text-gray-999 text-20pxm md:text-24pxt lg:text-20px w-mb300 md:w-320pxt lg:w-vw360 text-center mb-mb40 md:mb-40pxt lg:mb-vw40;
        }

        .order-card {
          @apply min-w-300pxm md:min-w-320pxt lg:min-w-360px p-vw16 rounded-2xl bg-white;
        }

        .order-row h1 {
          @apply text-24pxm md:text-28pxt lg:text-24px text-gray-999;
        }

        .order-row span {
          @apply text-24pxm md:text-28pxt lg:text-24px text-text-primary;
        }
      `}</style>
    </div>
  )
}

export default CompatedPaymentContainer
