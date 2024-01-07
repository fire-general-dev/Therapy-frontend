import MobileDetect from "mobile-detect"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import HeroBackground from "@/components/elements/HeroBackground"
import { getGlobalData, getUserCarts } from "utils/api"
import CheckoutPage from "@/components/pages/checkoutPage"
import axios from "axios"
import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import Layout from "@/components/layout/layout"
import HeroBg from "@/components/layout/HeroBg"

export const Checkout = (props) => {
  const { deviceType, pageContext, global, cart } = props

  const router = useRouter()

  const [clientSecret, setClientSecret] = useState(null)
  const [fetchedPayments, setFetchedPayments] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState([])
  const [useNewCard, fetchNewCard] = useState(false)
  const [payUsingOldPayment, setPayUsingOldPayment] = useState(false)
  const [currentPayment, setCurrentPayment] = useState(null)

  console.log("Cart: ", cart)

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
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newCard: useNewCard }),
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
      `/cart/confirm-payment?appId=${cart?.attributes?.doctor_appointment?.data?.id}&payment_intent=${paymentId}&payment_intent_client_secret=${paymentSecret}&redirect_status=succeeded`
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
    <Layout global={global} pageContext={pageContext}>
      <HeroBg>
        <div className="wrapper">
          <div className="title">{t("checkout")}</div>
          <div className="cards-wrapper">
            {fetchedPayments && cart && (
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
            {!cart && <div>{t("no_item_cart")}</div>}
          </div>
        </div>
      </HeroBg>
      <style jsx>{`
        .wrapper {
          @apply flex flex-col justify-center h-full w-full max-w-screen-xl mx-auto px-4 pb-20;
        }
        .title {
          @apply font-avenirSlim text-40pxm md:text-50pxt lg:text-50px text-black-333 text-center mb-mb30 md:mb-40pxt lg:mb-vw40 uppercase;
        }
        .cards-wrapper {
          @apply flex gap-7 w-full flex-col-reverse lg:flex-row-reverse transition-all;
        }
      `}</style>
    </Layout>
  )
}

Checkout.propTypes = {
  // second: PropTypes.third,
}

export const getServerSideProps = async (context) => {
  const { locale, req, locales, defaultLocale } = context

  // const user = req.session.user || null

  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    }
  }

  if (session.role.type == "doctors") {
    return {
      redirect: {
        permanent: false,
        destination: `/dashboard`,
      },
    }
  }

  const user = {
    strapiToken: session?.strapiToken,
    email: session?.email,
    id: session?.id,
  }

  const getCart = await getUserCarts(user)

  let userAgent
  let deviceType
  if (req) {
    userAgent = req.headers["user-agent"]
  } else {
    userAgent = navigator.userAgent
  }
  const md = new MobileDetect(userAgent)
  if (md.tablet()) {
    deviceType = "tablet"
  } else if (md.mobile()) {
    deviceType = "mobile"
  } else {
    deviceType = "desktop"
  }

  const globalLocale = await getGlobalData(locale)

  const pageContext = {
    locale,
    locales,
    defaultLocale,
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      deviceType,
      global: globalLocale.data,
      pageContext,
      cart: getCart[0] || null,
      user,
    },
  }
}

const mapStateToProps = (state) => ({
  // cart: state.cart,
  test: state,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
