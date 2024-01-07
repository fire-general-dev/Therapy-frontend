import { getGlobalData, getUserReports } from "utils/api"
import { useRouter } from "next/router"
import UserReportsTable from "@/components/elements/userReportsTable"
import { withSession } from "middlewares/session"
import moment from "moment"
import { useState, useEffect } from "react"
import Grid from "@/components/elements/grid"
import ReportCard from "@/components/cards/ReportCard"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

const PatientsReports = ({ userReports, isMobile }) => {
  const router = useRouter()
  const { t } = useTranslation()

  const userReportsData = userReports.map((item) => ({
    id: item.id,
    session: item.id,
    Report: item.report ? t("available") : t("pending"),
    doctorName: item.doctorName,
    completedPayment: item.completedPayment ? t("paid") : t("pending"),
    Reviews: item.report ? t("added") : t("pending"),
    sessionDate: moment(item.sessionDate).format("DD.MM.YYYY"),
    onClick: () => {
      router.push(`/dashboard/patients/reports/${item.id}`)
    },
  }))

  const tableHeader = [
    t("session"),
    t("report"),
    t("specialist"),
    t("payments"),
    t("reviews"),
    t("session_date"),
  ]

  return (
    <>
      <div className="sectionTitle">{t("sessions_report")}</div>
      {!isMobile ? (
        <UserReportsTable header={tableHeader} reports={userReportsData} />
      ) : (
        <Grid>
          {userReports.map((item) => (
            <ReportCard
              key={item.id}
              sessionNumber={item.id}
              medicalReport={item.report ? t("available") : t("pending")}
              speciallist={item.doctorName}
              payments={item.completedPayment ? t("paid") : t("pending")}
              reviews={item.report ? t("added") : t("pending")}
              sessionDate={moment(item.sessionDate).format("DD.MM.YYYY")}
              onClick={() => {
                router.push(`/dashboard/patients/reports/${item.id}`)
              }}
            />
          ))}
        </Grid>
      )}
      <style jsx>{`
        .top-card {
          @apply flex gap-2;
        }
        .sectionTitle {
          @apply mb-mb20 md:mb-20pxt lg:mb-vw20 text-20pxm md:text-20pxt lg:text-20px font-avenirMedium text-[#1c1c1c];
        }
      `}</style>
    </>
  )
}

export const getServerSideProps = async (context) => {
  // export async function getServerSideProps(context) {
  const { params, locale, locales, defaultLocale, req } = context

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

  const user = {
    strapiToken: session?.strapiToken,
  }

  // const user = req.session.user

  const userReports = await getUserReports({ user })

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      global: globalLocale.data,
      pageContext: {
        locale,
        locales,
        defaultLocale,
      },
      userReports,
    },
  }
}

export default PatientsReports
