import axios from "axios"
import { withSessionRoute } from "middlewares/session"
import { getServerSession } from "next-auth"
import { getAppointmentData, getStrapiURL, getUserCarts } from "utils/api"
import { createStrapiAxios } from "utils/axiosWrapper"
import { authOptions } from "./auth/[...nextauth]"
import { isEmptyOpject } from "@/utils/helpers"

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const VAT = 0.05
const createPaymentIntent = async (req, res) => {
  try {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      res.status(401).json({ message: "You must be logged in." })
      return
    }

    const user = session
    const axiosInstance = createStrapiAxios(user)

    const userRequestNewCard = req.body.newCard
    const appointmentId = req.body.appointmentId

    // get appointment data
    const strapiAPIAgent = { ...user }
    strapiAPIAgent.strapiToken = process.env.STRAPI_API_TOKEN
    const appointmentData = await getAppointmentData({
      user: strapiAPIAgent,
      appId: appointmentId,
    })

    // extract price from appointment order
    const { attributes } = appointmentData?.data
    const { price } = attributes

    // continue the flow the with previous price
    // update up new payment and order

    let userPaymentInfo
    let customer
    let isNew = true
    let payment_meth_id = null
    let haveSavedPayment = false
    let paymentList = []

    try {
      userPaymentInfo = await axiosInstance(
        `/u-payments?filters[user]=${user.id}`
      )
    } catch (e) {
      console.log("e =>", e)
    }

    const isAlreadyRegisteredUsers = userPaymentInfo?.data?.data?.[0]

    if (isAlreadyRegisteredUsers?.attributes?.st_id) {
      customer = isAlreadyRegisteredUsers.attributes.st_id
      isNew = false
    } else {
      const newCustomer = await stripe.customers.create({
        email: user.email,
        name: user.firstname + " " + user.surname || user.email,
      })
      customer = newCustomer.id
    }

    if (isAlreadyRegisteredUsers?.attributes?.st_id && !userRequestNewCard) {
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customer,
        type: "card",
      })
      haveSavedPayment = true
      payment_meth_id = paymentMethods?.data?.[0]?.id
      paymentList = paymentMethods?.data
    }

    if (!isAlreadyRegisteredUsers?.attributes?.st_id) {
      const newuserPayment = await axiosInstance.post(`/u-payments`, {
        data: {
          st_id: customer,
          user: user.id,
        },
      })
    } else if (
      isAlreadyRegisteredUsers?.attributes?.st_id &&
      !isAlreadyRegisteredUsers?.attributes?.pay_meth &&
      payment_meth_id
    ) {
      const updateUserPayment = await axiosInstance.put(
        `/u-payments/${isAlreadyRegisteredUsers.id}`,
        {
          data: {
            pay_meth: payment_meth_id,
          },
        }
      )
    }

    console.log({ attributes })
    const paymentItentObject = {
      amount: price * 100,
      currency: "aed",
      //* change the name of payemnt sms message max 22 char */
      statement_descriptor: "Nafsi Health fees",
      metadata: {
        appointmentId,
        user: user.id,
        isReschedule: false,
        completePayment: true,
        isCaptured: req.body.paymentType === "payment_on_hold",
        payment_type: attributes.type,
      },
      customer: customer,
      // receipt_email: user.email,
      description: `payment for reschedule appointment on Nafsi for mentalHealth`,
    }

    const paymentMethodOption = {
      card: {},
    }

    // if (req.body.paymentType == "payment_on_hold") {
    paymentItentObject.capture_method = "manual"
    // paymentMethodOption.card.request_extended_authorization = "if_available"
    // }

    if (payment_meth_id && !userRequestNewCard) {
      paymentItentObject.payment_method = payment_meth_id
      paymentItentObject.off_session = true
      paymentItentObject.confirm = true
    }

    if (isNew || !payment_meth_id) {
      paymentItentObject.automatic_payment_methods = {
        enabled: true,
      }
      if (!userRequestNewCard) {
        // paymentItentObject.payment_method_options = {
        //   card: {
        //     setup_future_usage: "off_session",
        //   },
        // }

        paymentMethodOption.card.setup_future_usage = "off_session"
        paymentItentObject.setup_future_usage = "off_session"
      }
    }

    if (!isEmptyOpject(paymentMethodOption.card)) {
      paymentItentObject.payment_method_options = paymentMethodOption
    }

    console.log({ paymentItentObject })
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create(paymentItentObject)

    res.send({
      clientSecret: paymentIntent.client_secret,
      paymentIntent,
      paymentMethods: paymentList,
    })
  } catch (e) {
    console.log("error ==>", e)
    res.send({ success: false })
  }
}

export default withSessionRoute(createPaymentIntent)
