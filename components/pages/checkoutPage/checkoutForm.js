import React from "react"
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"

export default function CheckoutForm({
  stripe,
  message,
  handleSubmit,
  setMessage,
}) {
  const paymentElementOptions = {
    layout: "tabs",
    fields: { billingDetails: { email: "never" } },
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      /> */}
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      {/* <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button> */}
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}
