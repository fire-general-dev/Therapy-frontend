import { useStripe } from "@stripe/react-stripe-js"
import React, { useEffect, useState } from "react"
import Spinner from "../elements/spinner"
import OrderFailurPage from "./confirmPayment/orderFailurPage"
import OrderSuccessPage from "./confirmPayment/orderSuccessPage"
import { useTranslation } from "next-i18next"

function ConfirmPaymentPage() {
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
        case "requires_capture":
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
    <div className="wrapper">
      {loading ? (
        <Spinner />
      ) : isSucced ? (
        <OrderSuccessPage paymentIntent={paymentIntent} />
      ) : (
        <OrderFailurPage errorMessage={message} paymentIntent={paymentIntent} />
      )}

      {/* {message} */}
      <style jsx>{`
        .wrapper {
          @apply flex flex-col h-full lg:pt-vw120 justify-center items-center;
        }
      `}</style>
    </div>
  )
}

export default ConfirmPaymentPage
