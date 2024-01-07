import React, { useEffect, useState } from "react"
import PaymentStepContainer from "./PaymentStepContainer"
import axios from "axios"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

export const PaymentStep = ({
  appointmentId,
  newDate,
  newAppId,
  user,
  onPrevious,
}) => {
  const router = useRouter()

  const [clientSecret, setClientSecret] = useState(null)
  const [fetchedPayments, setFetchedPayments] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState([])
  const [useNewCard, fetchNewCard] = useState(false)
  const [payUsingOldPayment, setPayUsingOldPayment] = useState(false)
  const [currentPayment, setCurrentPayment] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    setIsSubmitting(true)

    fetch("/api/create-reschedule-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newCard: useNewCard,
        appointmentId: appointmentId,
        newAppId: newAppId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)
        if (payUsingOldPayment) {
          setCurrentPayment(data.paymentIntent)
        }
        setIsSubmitting(false)
      })
      .catch((error) => console.error({ error }))
  }, [fetchedPayments, useNewCard, payUsingOldPayment])

  useEffect(() => {
    if (!currentPayment) return
    const paymentId = currentPayment.id
    const paymentSecret = currentPayment.client_secret

    router.push(
      `/dashboard/completed-payment?payment_intent=${paymentId}&payment_intent_client_secret=${paymentSecret}&redirect_status=succeeded`
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
    <div className="h-full">
      <div className="h-full">
        {fetchedPayments && newAppId && (
          <PaymentStepContainer
            paymentMethods={paymentMethods}
            clientSecret={clientSecret}
            paymentOptions={options}
            fetchNewCard={fetchNewCard}
            setPayUsingOldPayment={setPayUsingOldPayment}
            currentPayment={currentPayment}
            user={user}
            onPrevious={onPrevious}
            isSubmittingPayment={isSubmitting}
          />
        )}
        {!newAppId && <div>{t("no_selected_date")}</div>}
      </div>
    </div>
  )
}

export default PaymentStep
