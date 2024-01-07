import ErrorPage from "next/error"
import { getGlobalData, getUserUpcomingAppointments } from "utils/api"
import { useRouter } from "next/router"
import UpcomingAppointmentCardDetails from "@/components/cards/upcomingAppointmentDetails"
import Grid from "@/components/elements/grid"
import moment from "moment"
import { extractArrayData } from "@/utils/extractData"
import { isDoctorUser } from "@/utils/helpers"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { withUserProtected } from "@/utils/auth"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { useSession } from "next-auth/react"

const CalendarDashboard = ({ upcomingAppointments }) => {
  const router = useRouter()
  const upcomingAppData = extractArrayData(upcomingAppointments)
  const { data: user } = useSession()
  const { t } = useTranslation()

  const appointmentsGrid = []
  upcomingAppData.forEach((appointment) => {
    const date = moment(appointment.appointment_date).calendar({
      sameDay: "[Today] DD/MM/YYYY",
      nextDay: "[Tomorrow]",
      nextWeek: "dddd",
      lastDay: "[Yesterday]",
      lastWeek: "[Last] dddd",
      sameElse: "dddd DD/MM/YYYY",
    })
    const appointmentIndex = appointmentsGrid.findIndex(
      (item) => item.date === date
    )
    if (appointmentIndex >= 0) {
      appointmentsGrid[appointmentIndex].appointments.push(appointment)
    } else {
      appointmentsGrid.push({ date: date, appointments: [appointment] })
    }
  })

  const dummyAppointments = [
    {
      date: 1665998911053,
      appointments: [
        {
          id: 1,
          name: "MOHAMMAD KASSEM",
          lastVisted: "Last Visited date On 24-Nov-2018 at 02:14 PM",
          lastAppointments: 5,
          nextAppointment: 1665998911053,
          medicalReports: 7,
          meetingUrl: "",
        },
        {
          id: 2,
          name: "Ashraf Al Tawashi",
          lastVisted: "Last Visited date On 24-Nov-2018 at 02:14 PM",
          lastAppointments: 5,
          nextAppointment: 1665764165053,
          medicalReports: 7,
          meetingUrl: "",
        },
        {
          id: 3,
          name: "ahmad yaaqba",
          lastVisted: "Last Visited date On 24-Nov-2018 at 02:14 PM",
          lastAppointments: 5,
          nextAppointment: 1666664165053,
          medicalReports: 7,
          meetingUrl: "",
        },
      ],
    },
    {
      date: 1667664165053,
      appointments: [
        {
          id: 1,
          name: "MOHAMMAD KASSEM",
          lastVisted: "Last Visited date On 24-Nov-2018 at 02:14 PM",
          lastAppointments: 5,
          nextAppointment: 1666664165053,
          medicalReports: 7,
          meetingUrl: "",
        },
        {
          id: 2,
          name: "Ashraf Al Tawashi",
          lastVisted: "Last Visited date On 24-Nov-2018 at 02:14 PM",
          lastAppointments: 5,
          nextAppointment: 1665764165053,
          medicalReports: 7,
          meetingUrl: "",
        },
      ],
    },
  ]

  return (
    <>
      <div className="sectionTitle">{t("upcoming_appointments")}</div>
      <div className="top-card">
        {appointmentsGrid.map((day) => (
          <div className="colum" key={day.date}>
            <h2 className="date-title">{day.date}</h2>
            <Grid>
              {day.appointments.map((appointment) => (
                <UpcomingAppointmentCardDetails
                  key={appointment.id}
                  {...appointment}
                  userData={user}
                  isDoctor={isDoctorUser(user)}
                />
              ))}
            </Grid>
          </div>
        ))}
        <div className="flex-1" />
      </div>
      <style jsx>{`
        .top-card {
          @apply flex gap-2 flex-col;
        }
        .upcoming-appointments {
          @apply flex flex-col gap-2 md:px-mb40 lg:px-0;
        }
        .sectionTitle {
          @apply mb-mb20 md:mb-20pxt lg:mb-vw46 mt-mb40 md:mt-40pxt lg:mt-0 text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c] md:text-center lg:text-left;
        }
        .colum {
          @apply flex flex-col mb-vw75;
        }
        .row {
          @apply flex;
        }
        .date-title {
          @apply text-20pxm md:text-24pxt lg:text-20px font-avenirBlack text-[#1c1c1c] mb-mb16 md:mb-20pxt lg:mb-vw20 mt-mb20 md:mt-20pxt lg:mt-0;
        }

        :global(.rtl) {
          .sectionTitle {
            @apply lg:text-right;
          }
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

  // const user = req.session.user

  const upcomingAppointments = await getUserUpcomingAppointments({
    token: session.accessToken,
  })

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      global: globalLocale.data,
      pageContext: {
        locale,
        locales,
        defaultLocale,
      },
      upcomingAppointments,
    },
  }
}

export default CalendarDashboard
