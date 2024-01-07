import Seo from "@/components/elements/seo"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import HeroBg from "@/components/layout/HeroBg"
import MobileDetect from "mobile-detect"
import { getGlobalData } from "utils/api"
import GetStartedContainer from "@/components/containers/get-started-container"
import Layout from "@/components/layout/layout"

const GetStartedPage = ({ global, pageContext, deviceType }) => {
  const { t } = useTranslation()
  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo
        metadata={{
          ...global.attributes.metadata,
          metaTitle: t("get_started"),
          metaDescription: t("online_journey"),
        }}
      />
      <HeroBg>
        <div className="hero-content">
          <h6 className="hero-title">{t("online_journey")}</h6>
          <span className="hero-subtitle">{t("complete_journey")}</span>
        </div>
      </HeroBg>
      <GetStartedContainer isMobile={deviceType == "mobile"} />
      <style jsx>{`
        .hero-title {
          @apply text-[#2E3333] text-center text-4xl font-bold uppercase mb-4;
        }

        .hero-subtitle {
          @apply text-gray-64 text-base inline-block text-center;
        }

        .hero-content {
          @apply text-center pb-16;
          font-family: "Poppins", sans-serif;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { params, locale, locales, defaultLocale, req } = context

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
      global: globalLocale.data,
      pageContext: {
        ...pageContext,
      },
      deviceType,
    },
  }
}

export default GetStartedPage
