import Spinner from "@/components/elements/spinner"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import CreditCardForm from "./CreditCardForm"
import { useTranslation } from "next-i18next"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

function CreditCardSection(props) {
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
    appId,
  } = props

  console.log("props ===>", props)
  const { t } = useTranslation()

  if (showPaymentMethods) {
    const currentCardDetails = paymentMethods[0]
    return (
      <div className="mt-vw16 text-24pxm md:text-28pxt lg:text-24px">
        <div>
          {t("do_you_want_to_use")} <span>{currentCardDetails.brand}</span>{" "}
          {t("thats_end_with")} <span>{currentCardDetails.last4}</span>{" "}
          {t("to_continue_current_payment")}
        </div>
        <div
          onClick={() => {
            setShowPaymentMethod(false)
            fetchNewCard(true)
          }}
          className="mt-vw16 text-green-600"
        >
          {t("click_here_to_use_new_card")}
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
            appId={appId}
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

export default CreditCardSection
