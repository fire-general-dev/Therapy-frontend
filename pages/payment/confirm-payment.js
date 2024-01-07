import HeroBackground from "@/components/elements/HeroBackground"
import ConfirmPaymentPage from "@/components/pages/confirmPayment"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import { getGlobalData, getUserAppointmentDetails } from "utils/api"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import Layout from "@/components/layout/layout"
import HeroBg from "@/components/layout/HeroBg"
import PaymentResultContainer from "@/components/containers/payment/PaymentResultContainer"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

function PaymentConfirm({ global, pageContext }) {
  const appearance = {
    theme: "stripe",
  }

  const options = {
    // clientSecret,
    appearance,
  }
  return (
    <Elements options={options} stripe={stripePromise}>
      <Layout global={global} pageContext={pageContext}>
        <HeroBg>
          <PaymentResultContainer appointment={appointmentDetailsData} />
        </HeroBg>
      </Layout>
    </Elements>
  )
}

export const getServerSideProps = async (context) => {
  const { locale, req, locales, defaultLocale } = context

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

  const appointmentDetails = await getUserAppointmentDetails({
    appId: context.query.appId,
    user: user,
  })

  const globalLocale = await getGlobalData(locale)

  const pageContext = {
    locale,
    locales,
    defaultLocale,
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      global: globalLocale.data,
      appointmentDetails,
      pageContext,
    },
  }
}

export default PaymentConfirm
