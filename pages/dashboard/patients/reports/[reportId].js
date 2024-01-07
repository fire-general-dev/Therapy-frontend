import { getGlobalData, getSessionDetailsForDoctor } from "utils/api"
import { withSession } from "middlewares/session"
import { isDoctorUser } from "@/utils/helpers"
import PatientReportContainer from "@/components/containers/patient-report-continaer/PatientReportContainer"
import PatientReportForPatientContainer from "@/components/containers/patient-report-for-patient-container/PatientRerpotForPatinetContainer"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

const SessionDetailsDashboard = ({
  user,
  reportDetails,
  reportId,
  deviceType,
  isDoctor,
}) => {
  return isDoctor ? (
    <PatientReportContainer
      user={user}
      reportDetails={reportDetails}
      reportId={reportId}
      deviceType={deviceType}
    />
  ) : (
    <PatientReportForPatientContainer
      reportDetails={reportDetails}
      deviceType={deviceType}
    />
  )
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
    strapiToken: session?.strapiToken,
  }

  const isDoctor = isDoctorUser(session)

  const reportId = query.reportId || null

  const reportDetails = await getSessionDetailsForDoctor({
    user,
    sessionId: reportId,
  })

  if (reportDetails == null) {
    return {
      redirect: {
        permanent: false,
        destination: `/dashboard/patients/reports`,
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
      reportId,
      user,
      reportDetails,
      isDoctor,
    },
  }
}

export default SessionDetailsDashboard
