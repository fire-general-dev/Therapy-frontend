import { useState, useEffect } from "react"
import { getGlobalData, getUserUpcomingAppointments } from "utils/api"
import appointmentIcon from "@/images/icons/appointment.svg"
import RescheduleIcon from "@/images/icons/reschedule-icon.svg"
import CacneledAppointmentIcon from "@/images/icons/cancele-app-icon.svg"
// import { signIn } from "services/auth"
import {
  ReportsCardNumber,
  UpcomingAppointmentCardNumber,
  NotificationNumber,
} from "@/components/cards"
import UpcomingAppointmentCardDetails from "@/components/cards/upcomingAppointmentDetails"
import { extractArrayData } from "@/utils/extractData"
import { isDoctorUser } from "@/utils/helpers"
import CountingCard from "@/components/cards/CountingCard"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import BookPsychiatristCard from "@/components/cards/BookPsychiatristCard"
import StatisticsCard from "@/components/cards/StatisticsCard"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { authOptions } from "pages/api/auth/[...nextauth]"
import RecommendationsTipsCard from "@/components/cards/RecommendationsTipsCard"

const DoctorDashboard = ({ upcomingAppointments, isMobile }) => {
  const upcomingAppData = extractArrayData(upcomingAppointments)
  const [showBookPsychiatristCard, setShowBookPsychiatristCard] = useState(true)
  const { data: user } = useSession()

  const { t } = useTranslation("common")
  return (
    <>
      {!isMobile ? (
        <div className="top-card">
          <div className="col-span-2 grid grid-cols-2 gap-2">
            <UpcomingAppointmentCardNumber total={upcomingAppData.length} />
            <StatisticsCard
              color="#F86C00"
              title={t("reshduled_appointments")}
              number={0}
              icon={RescheduleIcon}
            />
            <StatisticsCard
              color="#8684E8"
              title={t("canceled_appointments")}
              number={0}
              icon={CacneledAppointmentIcon}
            />
            <RecommendationsTipsCard />
            {/* <ReportsCardNumber /> */}
          </div>
          {!isDoctorUser(user) && showBookPsychiatristCard ? (
            <BookPsychiatristCard
              onClose={() => setShowBookPsychiatristCard(false)}
            />
          ) : (
            <>
              <div></div>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="top-card-mobile">
            <CountingCard
              className="bg-gradient-to-bl from-[#0400ff] to-[#d3461a]"
              title={t("upcoming_appointments")}
              number={upcomingAppData.length}
              icon={appointmentIcon}
            />
            {/* <CountingCard
              className="bg-gradient-to-bl from-[#6a6a6a] to-[#353535]"
              title={t("upcoming_appointments")}
              number={upcomingAppData.length}
              icon={appointmentIcon}
            /> */}
          </div>
          <div className="mt-mb12">
            <RecommendationsTipsCard isMobile={isMobile} />
          </div>
        </>
      )}
      {isMobile && !isDoctorUser(user) && showBookPsychiatristCard ? (
        <>
          <div className="mt-mb12">
            <BookPsychiatristCard
              onClose={() => setShowBookPsychiatristCard(false)}
            />
          </div>
        </>
      ) : (
        <>
          <div></div>
        </>
      )}
      <div className="sectionTitle">{t("upcoming_appointments")}</div>
      {!isMobile ? (
        <div className="upcoming-appointments">
          {upcomingAppData.slice(0, 3).map((appointment) => (
            <UpcomingAppointmentCardDetails
              key={appointment.id}
              {...appointment}
              userData={user}
              isMobile={isMobile}
              isDoctor={isDoctorUser(user)}
            />
          ))}
          <div className="flex-1" />
        </div>
      ) : (
        <div className="mobile-upcoming-appointments">
          {upcomingAppData.slice(0, 4).map((appointment) => (
            <UpcomingAppointmentCardDetails
              key={appointment.id}
              {...appointment}
              userData={user}
              isMobile={isMobile}
              isDoctor={isDoctorUser(user)}
            />
          ))}
        </div>
      )}
      <style jsx>{`
        .top-card {
          @apply grid grid-cols-3 gap-2;
        }
        .top-card-mobile {
          @apply flex gap-2 md:px-mb40 lg:px-0;
        }
        .upcoming-appointments {
          @apply grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-mb16 md:gap-16pxt lg:grid-cols-3 lg:gap-vw16 md:px-mb40 lg:px-0;
        }
        .mobile-upcoming-appointments {
          @apply grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:grid-cols-4;
        }
        .sectionTitle {
          @apply mt-mb60 md:mt-60pxt lg:mt-vw100 mb-mb20 md:mb-20pxt lg:mb-vw20 text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c];
        }
      `}</style>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { params, locale, locales, defaultLocale, req } = context
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    }
  }

  const globalLocale = await getGlobalData(locale)

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
      // user,
    },
  }
}

export default DoctorDashboard
