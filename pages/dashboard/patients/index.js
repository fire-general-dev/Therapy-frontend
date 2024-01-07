import { useState, useEffect } from "react"
import { getDoctorPatientList, getGlobalData } from "utils/api"
import { useRouter } from "next/router"
import TableComponent from "@/components/elements/table"
import { withSession } from "middlewares/session"
import PatientCard from "@/components/cards/PatientCard"
import Grid from "@/components/elements/grid"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { withDoctorProtected } from "@/utils/auth"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

const PatientsDashboard = ({ patientList, isMobile }) => {
  const router = useRouter()
  const { t } = useTranslation()

  const patientListTableData = patientList.map((item) => ({
    name: item.patentName,
    email: item.patientEmail,
    phone: item.PatentPhone ?? "00",
    previouse: item.PreviousVists,
    upcoming: item.UpcomingVists,
    id: item.id,
    onClick: () => {
      router.push(`/dashboard/patients/${item.userId}`)
    },
  }))

  const tableHeader = [
    t("name"),
    t("email"),
    t("phone"),
    t("previous"),
    t("upcoming"),
  ]

  return (
    <>
      <div className="sectionTitle">{t("patients_list")}</div>
      {!isMobile ? (
        <TableComponent header={tableHeader} patients={patientListTableData} />
      ) : (
        <Grid>
          {patientList.map((patient) => (
            <PatientCard
              key={patient.id}
              name={patient.patentName}
              email={patient.patientEmail}
              phone={patient.PatentPhone ?? "00"}
              previous={patient.PreviousVists}
              upcoming={patient.UpcomingVists}
              onClick={() => {
                router.push(`/dashboard/patients/${patient.userId}`)
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
          @apply mb-vw20 text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c];
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

  // const user = req.session.user

  const patientList = await getDoctorPatientList({ user })

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      global: globalLocale.data,
      pageContext: {
        locale,
        locales,
        defaultLocale,
      },
      patientList,
    },
  }
}

export default PatientsDashboard
