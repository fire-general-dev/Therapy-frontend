import Spinner from "@/components/elements/spinner"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import CreditCardForm from "./CreditCardForm"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

function CreditCard(props) {
  const {
    paymentOptions,
    clientSecret,
    isLoading,
    setIsLoading,
    message,
    setMessage,
    showPaymentMethods,
    setShowPaymentMethod,
    paymentMethods,
    fetchNewCard,
    setSubmitFunction,
    user,
  } = props

  console.log("props ===>", props)

  if (showPaymentMethods) {
    const currentCardDetails = paymentMethods[0]
    return (
      <div className="mt-vw16 text-24pxm md:text-28pxt lg:text-24px">
        <div>
          do you want to use your saved <span>{currentCardDetails.brand}</span>{" "}
          thats end with <span>{currentCardDetails.last4}</span> to continue
          current payment ?
        </div>
        <div
          onClick={() => {
            setShowPaymentMethod(false)
            fetchNewCard(true)
          }}
          className="mt-vw16 text-green-600 hover:text-green-800 cursor-pointer"
        >
          or click here to use new card
        </div>
      </div>
    )
  }

  return (
    <div>
      {clientSecret ? (
        <Elements options={paymentOptions} stripe={stripePromise}>
          <CreditCardForm
            clientSecret={clientSecret}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            message={message}
            setMessage={setMessage}
            setSubmitFunction={setSubmitFunction}
            user={user}
          />
        </Elements>
      ) : (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default CreditCard
