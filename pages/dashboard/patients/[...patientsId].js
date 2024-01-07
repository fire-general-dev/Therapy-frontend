import ErrorPage from "next/error"
import { useState, useEffect } from "react"
import { getGlobalData, getUserReportsForDoctor } from "utils/api"
import { useRouter } from "next/router"
import { withSession } from "middlewares/session"
import PatientDetails from "@/components/elements/patientDetails"
import moment from "moment"
import DoctorSessionsTable from "@/components/elements/doctorSessionReports"
import SessionReportCard from "@/components/cards/SessionReportCard"
import Grid from "@/components/elements/grid"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { withDoctorProtected } from "@/utils/auth"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

const PatientsDetailsDashboard = ({ patientData, isMobile }) => {
  const router = useRouter()
  const { t } = useTranslation()

  const tableHeader = [
    t("session") + " #",
    t("medical_report"),
    t("session_report"),
    t("session_date"),
  ]

  const sessionReports = patientData?.sessions.map((item) => ({
    id: item.id,
    sessionNumber: item.id, // to find fix for this later
    medicalReport: item.pending ? t("not_available") : t("available"),
    notes: item.notes,
    sessionDate: moment(item.sessionDate).format("DD.MM.YYYY"),
  }))

  const patientInfo = {
    id: patientData.userId,
    dob: patientData.userBirthday,
    email: patientData.patientEmail,
    gender: patientData.userGender,
    phoneNumber: patientData.PatentPhone,
    completedAppointments: patientData.PreviousVists,
    upcomingAppointments: patientData.UpcomingVists,
  }

  return (
    <>
      <div className="wrapper">
        <div className="patientName">
          {t("patient")} <span>{patientData.patentName}</span>
        </div>
        <PatientDetails data={patientInfo} />
        <div className="sectionTitle">{t("sessions_report")}</div>
        {!isMobile ? (
          <DoctorSessionsTable
            header={tableHeader}
            patients={sessionReports}
            // className={"w-3/4"}
          />
        ) : (
          <div className="sessions-wrapper">
            <Grid>
              {patientData.sessions.map((session) => (
                <SessionReportCard
                  key={session.id}
                  sessionNumber={session.id}
                  medicalReport={
                    session.pending ? t("not_available") : t("available")
                  }
                  notes={
                    "Aliqua quis et est minim eiusmod ut proident duis veniam mollit irure."
                  }
                  sessionDate={moment(session.sessionDate).format("DD.MM.YYYY")}
                  onClick={() => {
                    router.push(`/dashboard/patients/reports/${session.id}`)
                  }}
                />
              ))}
            </Grid>
          </div>
        )}
      </div>
      <style jsx>{`
        .wrapper {
          @apply lg:w-3/4;
        }
        .sectionTitle {
          @apply mb-mb20 md:mb-20pxt lg:mb-vw20 text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c] mt-mb60 md:mt-60pxt lg:mt-vw60;
        }
        .patientName {
          @apply mt-mb28 md:mt-28pxt lg:mt-vw30 mb-mb20 md:mb-24pxt lg:mb-vw24 text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c];
          span {
            @apply uppercase mx-mb12 md:mx-12pxt lg:mx-vw60 font-avenirBlack text-30pxm md:text-34pxt lg:text-30px text-[#0090dd];
          }
        }
      `}</style>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { params, locale, locales, defaultLocale, req, query } = context

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

  if (session.role.type !== "doctors") {
    return {
      redirect: {
        permanent: false,
        destination: `/dashboard`,
      },
    }
  }

  const user = {
    strapiToken: session?.strapiToken,
  }

  // const user = req.session.user || null

  const patientId = query.patientsId[0] || null

  const patientData = await getUserReportsForDoctor({ user, patientId })

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      global: globalLocale.data,
      pageContext: {
        locale,
        locales,
        defaultLocale,
      },
      patientId,
      patientData,
    },
  }
}

export default PatientsDetailsDashboard
