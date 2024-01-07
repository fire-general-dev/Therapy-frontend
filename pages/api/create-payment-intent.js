import axios from "axios"
import { withSessionRoute } from "middlewares/session"
import { getServerSession } from "next-auth"
import { getStrapiURL, getUserCarts } from "utils/api"
import { createStrapiAxios } from "utils/axiosWrapper"
import { authOptions } from "./auth/[...nextauth]"

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

    let userPaymentInfo
    let customer
    let isNew = true
    let payment_meth_id = null
    let haveSavedPayment = false
    let paymentList = []

    const userCart = await getUserCarts(user)

    const { id: cartId, attributes } = userCart[0]
    const { price, sessionCount, doctor } = attributes

    try {
      userPaymentInfo = await axiosInstance(
        `/u-payments?filters[user]=${user.id}`
      )
    } catch (e) {
      console.log("e =>", e)
    }

    const isAlreadyRegisteredUsers = userPaymentInfo?.data?.data?.[0]

    // const isExisting = await stripe.customers.search({
    //   query: `email:'${user.email}'`,
    // })

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

    // if (isAlreadyRegisteredUsers?.attributes?.pay_meth) {
    //   payment_meth_id = isAlreadyRegisteredUsers.attributes?.pay_meth
    //   haveSavedPayment = true
    // }

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

    const paymentItentObject = {
      amount: price * 100,
      currency: "aed",
      statement_descriptor: "Nafsi Health fees",
      metadata: { cartId: cartId, user: user.id, doctor: doctor?.data?.id },
      customer: customer,
      // receipt_email: user.email,
      description: `payment for ${sessionCount} session on Nafsi for mentalHealth`,
    }

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
        paymentItentObject.payment_method_options = {
          card: {
            setup_future_usage: "off_session",
          },
        }
        paymentItentObject.setup_future_usage = "off_session"
      }
    }

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
