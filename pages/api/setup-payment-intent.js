// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400
}

export default async function handler(req, res) {
  // const { items } = req.body

  // create customer
  // const customer = await stripe.customers.create({
  //   email: "ahmad.y91@hotmail.com",
  // })

  let customer = ""

  const isExisting = await stripe.customers.search({
    query: "email:'ahmad.y91@hotmail.com'",
  })

  console.log("isExisting ===>", isExisting)

  if (isExisting?.data?.[0]) {
    customer = isExisting?.data?.[0].id
  } else {
    const newCustomer = await stripe.customers.create({
      email: "ahmad.y91@hotmail.com",
    })
    customer = newCustomer.id
  }

  // if we have already created stripe customer we have to save and use it id in our database

  console.log("customer ===>", customer)

  const setupIntent = await stripe.setupIntents.create({
    customer: customer,
    payment_method_types: ["card"],
  })

  // Create a PaymentIntent with the order amount and currency
  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: calculateOrderAmount(items),
  //   currency: "aed",
  //   automatic_payment_methods: {
  //     enabled: true,
  //   },
  //   setup_future_usage: "off_session",
  //   statement_descriptor: "Nafsi Payment",
  //   metadata: { order_id: "6735" },
  // })

  res.send({
    clientSecret: setupIntent.client_secret,
  })
}
