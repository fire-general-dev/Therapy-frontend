import React, { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import CheckoutPage from "@/components/pages/paymentCheckoutPage"

export const CheckoutContainer = (props) => {
  const { deviceType, pageContext, global, appointmentDetails, appId, type } =
    props
  console.log("appId: ", appId)

  const router = useRouter()

  const [clientSecret, setClientSecret] = useState(null)
  const [fetchedPayments, setFetchedPayments] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState([])
  const [useNewCard, fetchNewCard] = useState(false)
  const [payUsingOldPayment, setPayUsingOldPayment] = useState(false)
  const [currentPayment, setCurrentPayment] = useState(null)

  const { t } = useTranslation()

  useEffect(() => {
    axios("/api/get-customer-payments")
      .then((data) => {
        setFetchedPayments(true)
        setPaymentMethods(data.data?.payments)
      })
      .catch((e) => {
        setFetchedPayments(true)
        console.log("e =>", e)
      })
  }, [])

  useEffect(() => {
    if (
      !fetchedPayments ||
      (paymentMethods.length > 0 && !useNewCard && !payUsingOldPayment)
    )
      return
    fetch("/api/complete-pending-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newCard: useNewCard,
        appointmentId: appId,
        paymentType: type,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)
        if (payUsingOldPayment) {
          setCurrentPayment(data.paymentIntent)
        }
      })
  }, [fetchedPayments, useNewCard, payUsingOldPayment])

  useEffect(() => {
    if (!currentPayment) return
    const paymentId = currentPayment.id
    const paymentSecret = currentPayment.client_secret

    router.push(
      `/cart/confirm-payment?appId=${appId}&payment_intent=${paymentId}&payment_intent_client_secret=${paymentSecret}&redirect_status=succeeded`
    )
  }, [currentPayment])

  const appearance = {
    theme: "stripe",
  }

  const options = {
    // clientSecret,
    appearance,
  }
  if (clientSecret) options.clientSecret = clientSecret

  return (
    <>
      <div className="wrapper">
        <div className="cards-wrapper">
          {fetchedPayments && appointmentDetails && (
            <CheckoutPage
              {...props}
              paymentMethods={paymentMethods}
              clientSecret={clientSecret}
              paymentOptions={options}
              fetchNewCard={fetchNewCard}
              setPayUsingOldPayment={setPayUsingOldPayment}
              currentPayment={currentPayment}
              deviceType={deviceType}
            />
          )}
          {!appointmentDetails && <div>{t("no_appointment")}</div>}
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          @apply flex flex-col justify-center max-w-screen-lg w-full mx-auto px-4;
        }
        .title {
          @apply font-avenirSlim text-40pxm md:text-50pxt lg:text-50px text-black-333 text-center mb-mb30 md:mb-40pxt lg:mb-vw40 uppercase;
        }
        .cards-wrapper {
          @apply flex gap-mb60 md:gap-60pxt lg:gap-vw60 w-full mb-mb60 md:mb-60pxt lg:mb-vw60 flex-col-reverse lg:flex-row-reverse transition-all;
        }
      `}</style>
    </>
  )
}

export default CheckoutContainer
