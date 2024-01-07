import MobileDetect from "mobile-detect"
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ErrorPage from "next/error"

import HeroBackground from "@/components/elements/HeroBackground"

// Dummy data
import TherapistHeroDesktop from "@/components/elements/TherapistHeroDesktop"
import TherapistsAbout from "@/components/elements/therapistsAbout"
import TherapyGroups from "@/components/sections/TherapyList"
import TherapistsWorkExperience from "@/components/elements/TherapistsWorkExperience"
import TherapistBarBackground from "@/components/elements/TherapistBarBackground"
import TherapistBar from "@/components/elements/therapistBar"
import TherapistHeroMobile from "@/components/elements/TherapistHeroMobile"
import { getDoctorData, getDoctorSettings, getGlobalData } from "utils/api"
import { extractSingleData } from "utils/extractData"
import Seo from "@/components/elements/seo"
import { useRouter } from "next/router"
import { getLocalizedPaths } from "utils/localize"
import { withSession } from "middlewares/session"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import Layout from "@/components/layout/layout"

const Home = (props) => {
  const {
    therapist,
    deviceType,
    pageContext,
    metadata,
    global,
    doctorSetting,
  } = props
  const [isMobile, setIsMobile] = useState(deviceType === "mobile")
  const HeroComponent = isMobile ? TherapistHeroMobile : TherapistHeroDesktop
  const doctorData = extractSingleData(therapist)
  const router = useRouter()
  const { t } = useTranslation("common")

  // If tablet in portrait mode make design as mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (deviceType == "tablet") {
        setIsMobile(window.innerHeight > window.innerWidth)
      }
    }
  }, [])

  const handleBookAppointment = () => {
    router.push(`/cart/book-appointment?therapist=${doctorData.slug}`)
  }

  // Check if the required data was provided
  if (!router.isFallback && !doctorData) {
    return <ErrorPage statusCode={404} />
  }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">{t("loading")}...</div>
  }

  // Merge default site SEO settings with page specific SEO settings
  if (metadata.shareImage?.data == null) {
    delete metadata.shareImage
  }
  const metadataWithDefaults = {
    ...global.attributes.metadata,
    ...metadata,
  }

  // return null;
  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadataWithDefaults} />
      <HeroBackground noCircle useCustomMobileHeight={isMobile}>
        <HeroComponent
          therapist={doctorData}
          doctorSetting={doctorSetting}
          handleBookAppointment={handleBookAppointment}
        />
      </HeroBackground>
      <TherapistsAbout therapist={doctorData} isMobile={isMobile} />
      <TherapyGroups
        data={{ categories: doctorData.categories }}
        title={t("field_of_experience")}
      />
      {doctorData?.doctorExcperinces && doctorData.doctorExcperinces.length ? (
        <TherapistsWorkExperience
          experienceDetails={doctorData.doctorExcperinces}
          isMobile={isMobile}
        />
      ) : null}
      <TherapistBarBackground>
        <TherapistBar
          therapist={doctorData}
          doctorSetting={doctorSetting}
          handleBookAppointment={handleBookAppointment}
        />
      </TherapistBarBackground>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { locale, req, query, params, locales, defaultLocale } = context

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

  const therapistUserName = query.therapist?.toLowerCase()

  const globalLocale = await getGlobalData(locale)

  const doctorData = await getDoctorData(therapistUserName, locale)
  const doctorSetting = await getDoctorSettings({ slug: therapistUserName })

  if (!doctorData) {
    return { props: {} }
    return {
      notFound: true,
    }
  }

  const { slug, metadata = {}, localizations } = doctorData.attributes

  const pageContext = {
    locale,
    locales,
    defaultLocale,
    slug,
    localizations,
  }

  const localizedPaths = getLocalizedPaths(pageContext)

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      deviceType,
      therapist: doctorData,
      global: globalLocale.data,
      metadata,
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
      doctorSetting,
    },
  }
}

export default Home
