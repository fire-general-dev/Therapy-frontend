import { getGlobalData, verifyPaymentToken } from "utils/api"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { authOptions } from "./api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import ExpireContainer from "@/components/containers/expire-container/ExpireContainer"
import Layout from "@/components/layout/layout"
import HeroBg from "@/components/layout/HeroBg"

const ConfirmationPage = ({ global, pageContext }) => {
  return (
    <Layout global={global} pageContext={pageContext}>
      <HeroBg>
        <ExpireContainer />
      </HeroBg>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { locale, locales, defaultLocale, resolvedUrl, query } = context

  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `/payment/payment-checkout?token=${query.token}`,
      },
    }
  }

  try {
    const paymentData = await verifyPaymentToken({
      token: session.strapiToken,
      paymentToken: query.token,
    })
    const verifyTokenLink = paymentData?.data?.verifyTokenLink
    if (!verifyTokenLink) {
      const globalLocale = await getGlobalData(locale)

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

    return {
      redirect: {
        permanent: false,
        destination: `/payment/checkout?appId=${verifyTokenLink.appointmentId}&type=${verifyTokenLink.type}`,
      },
    }
  } catch (e) {
    const globalLocale = await getGlobalData(locale)
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
}

export default ConfirmationPage
