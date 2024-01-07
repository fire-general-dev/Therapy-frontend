import MobileDetect from "mobile-detect"
import React from "react"
import { getGlobalData } from "utils/api"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import Seo from "@/components/elements/seo"
import HeroBg from "@/components/layout/HeroBg"
import Layout from "@/components/layout/layout"
import PaymentCheckoutContainer from "@/components/containers/PaymentCheckoutContainer"

const PaymentCheckoutPage = ({ global, pageContext, deviceType }) => {
  const { t } = useTranslation()
  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo
        metadata={{
          ...global.attributes.metadata,
          metaTitle: t("checkout"),
          metaDescription: t("checkout"),
        }}
      />
      <HeroBg>
        <div className="hero-content">
          <h6 className="hero-title">{t("your_online_appointment_booking")}</h6>
          <span className="hero-subtitle">{t("complete_steps_on_nafsi")}</span>
        </div>
        <PaymentCheckoutContainer />
      </HeroBg>
      <style jsx>{`
        .hero-title {
          @apply text-[#2E3333] text-center text-2xl lg:text-4xl font-bold uppercase mb-4;
        }

        .hero-subtitle {
          @apply text-gray-64 text-sm lg:text-base inline-block text-center;
        }

        .hero-content {
          @apply text-center px-7 pb-16;
          font-family: "Poppins", sans-serif;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { locale, req, locales, defaultLocale } = context

  // const user = req.session.user || null

  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/cart/checkout",
      },
    }
  }

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
    },
  }
}

export default PaymentCheckoutPage
