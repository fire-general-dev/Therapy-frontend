import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useCallback, useEffect } from "react"
import CheckoutForm from "./CheckoutForm"

function CreditCardForm({
  clientSecret,
  isLoading,
  message,
  setMessage,
  setIsLoading = false,
  setSubmitFunction,
  user,
}) {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return
      }

      setIsLoading(true)
      // confirmParams.payment_method_data.billing_details.email
      const { error } = await stripe.confirmPayment({
        // const { error } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${window?.origin}/dashboard/completed-payment`,
          payment_method_data: {
            billing_details: {
              email: user.email,
            },
          },
        },
      })

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message)
      } else {
        console.log("errrorrr ===>", error)
        setMessage("An unexpected error occurred.")
      }

      setIsLoading(false)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    setSubmitFunction(handleSubmit)
  }, [stripe, elements])

  return (
    <>
      <div className="cardTitle">Enter Your Card Information</div>
      {clientSecret && (
        <CheckoutForm
          stripe={stripe}
          elements={elements}
          isLoading={isLoading}
          message={message}
          handleSubmit={handleSubmit}
          setMessage={setMessage}
        />
      )}
      <style jsx>{`
        .cardTitle {
          @apply font-avenirMedium text-20pxm md:text-24pxt lg:text-20px my-mb20 md:my-24pxt lg:my-vw24 text-center;
        }
      `}</style>
    </>
  )
}

export default CreditCardForm
