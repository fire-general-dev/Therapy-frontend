import { getGlobalData } from "utils/api"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import CompatedPaymentContainer from "@/components/containers/completed-payment-container"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const CompletedPayment = ({}) => {
  const { t } = useTranslation()
  const appearance = {
    theme: "stripe",
  }

  const options = {
    // clientSecret,
    appearance,
  }

  return (
    <Elements options={options} stripe={stripePromise}>
      <CompatedPaymentContainer />
    </Elements>
  )
}

export const getServerSideProps = async (context) => {
  const { locale, locales, defaultLocale, req } = context

  const globalLocale = await getGlobalData(locale)

  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      global: globalLocale.data,
      pageContext: {
        locale,
        locales,
        defaultLocale,
      },
    },
  }
}

export default CompletedPayment
