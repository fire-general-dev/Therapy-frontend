import MobileDetect from "mobile-detect"
import ErrorPage from "next/error"

import { serverSideTranslations } from "next-i18next/serverSideTranslations"

// Dummy data
import { getDoctorData, getGlobalData } from "utils/api"
import { extractSingleData } from "utils/extractData"
import { getLocalizedPaths } from "utils/localize"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import Layout from "@/components/layout/layout"
import HeroBg from "@/components/layout/HeroBg"
import { useRouter } from "next/router"
import HeroBookAppointmentCard from "@/components/containers/book-appointment-container/HeroBookAppointmentCard"
import BookAppointmentContainer from "@/components/containers/book-appointment-container/BookAppointmentContainer"

const BookAppointment = (props) => {
  const { therapist, deviceType, pageContext, global } = props
  const doctorData = extractSingleData(therapist)
  const isMobile = deviceType === "mobile"
  const router = useRouter()

  // Check if the required data was provided
  if (!router.isFallback && !doctorData) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout global={global} pageContext={pageContext}>
      <HeroBg>
        <HeroBookAppointmentCard isMobile={isMobile} doctor={doctorData} />
      </HeroBg>
      <BookAppointmentContainer doctor={doctorData} />
      {/* <style jsx>{`
        @apply max-w-screen-xl w-full mx-auto px-4;
      `}</style> */}
    </Layout>
  )
}

// export const getServerSideProps = withSession(async (context) => {
export const getServerSideProps = async (context) => {
  const { locale, req, query, params, locales, defaultLocale } = context

  const session = await getServerSession(context.req, context.res, authOptions)

  if (session && session.role.type == "doctors") {
    return {
      redirect: {
        permanent: false,
        destination: `/dashboard`,
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

  if (!query?.therapist) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }

  const therapistUserName = query.therapist?.toLowerCase()

  const globalLocale = await getGlobalData(locale)

  const doctorData = await getDoctorData(therapistUserName, locale)

  const user = {
    strapiToken: session?.strapiToken || "",
    id: session?.id || "",
  }

  if (!doctorData) {
    return { props: {} }
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
      user,
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
    },
  }
}

export default BookAppointment
