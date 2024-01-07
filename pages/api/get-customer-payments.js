import axios from "axios"
import { withSessionRoute } from "middlewares/session"
import { getServerSession } from "next-auth"
import { getStrapiURL, getUserCarts } from "utils/api"
import { createStrapiAxios } from "utils/axiosWrapper"
import { authOptions } from "./auth/[...nextauth]"

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const createPaymentIntent = async (req, res) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: "You must be logged in." })
    return
  }

  const user = session

  let customer = null
  let payments = []

  try {
    const isExisting = await stripe.customers.search({
      query: `email:'${user.email}'`,
    })
    customer = isExisting?.data[0]
  } catch (e) {
    console.log("error on finding customer:", e)
    customer = null
  }

  if (customer) {
    try {
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customer.id,
        type: "card",
      })
      payments = paymentMethods.data.map((item) => {
        return {
          brand: item.card.brand,
          exp_month: item.card.exp_month,
          exp_year: item.card.exp_year,
          last4: item.card.last4,
        }
      })
    } catch (e) {
      console.log("error on fetching payments: ", e)
      payments = []
    }
  }

  return res.send({ payments })
}

export default withSessionRoute(createPaymentIntent)
