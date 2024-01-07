import {
  captureAppointmentAmount,
  getGlobalData,
  getMeetingData,
} from "utils/api"
import { withSession } from "middlewares/session"
import { isDoctorUser } from "@/utils/helpers"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
// import ZoomVideoContainer from "@/components/pages/ZoomVideoContainer"

const ZoomMeetingComponent = dynamic(
  () => import("@/components/pages/ZoomVideoContainer"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
)

const MeetingPage = ({ user, isDoctor, meetingData, appointmentId }) => {
  const [isReady, setIsReady] = useState(false)

  async function captureAmount() {
    if (
      isDoctor &&
      meetingData?.meeting?.attributes?.payment_status === "ready_to_capture" &&
      meetingData?.meeting?.attributes?.type === "cash"
    ) {
      await captureAppointmentAmount(user.strapiToken, appointmentId)
    }
  }
  captureAmount()

  return <ZoomMeetingComponent user={user} meetingData={meetingData} />
}

export const getServerSideProps = async (context) => {
  const { params, locale, locales, defaultLocale, req, query } = context

  const globalLocale = await getGlobalData(locale)

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

  const user = {
    firstname: session?.firstname,
    email: session?.email,
    strapiToken: session?.strapiToken,
  }

  const isDoctor = isDoctorUser(session)

  const meetingId = query.meetingId || null

  const meetingData = await getMeetingData({ user, meetingId })

  if (meetingData == null) {
    return {
      redirect: {
        permanent: false,
        destination: `/dashboard`,
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
      user,
      meetingData,
      isDoctor,
      appointmentId: meetingId,
    },
  }
}

export default MeetingPage
