import {
  getDoctorSettingsByEmail,
  getGlobalData,
  submitDoctorSetting,
} from "utils/api"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { withDoctorProtected } from "@/utils/auth"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import DashboardTabs from "@/components/elements/DashboardTabs/DashboardTabs"
import TabPane from "@/components/elements/DashboardTabs/TabPane"
import { Field, Form, Formik } from "formik"
import AvailabilityContainer from "@/components/containers/availability-container"
import LeaveDayContainer from "@/components/containers/leave-day-container"
import { useState } from "react"
import InfoModal from "@/components/modal/info-modal"
import DashboardDropboxInput from "@/components/elements/dashboardInput/dropbox"
import DashboardInput from "@/components/elements/dashboardInput"
import { extractSingleData } from "@/utils/extractData"
import moment from "moment"
import LeaveHourContainer from "@/components/containers/leave-hour-container"
import InfoAlert from "@/components/modal/InfoAlert"

// import dynamic from "next/dynamic"
// dynamic(import("tw-elements"), { ssr: false })

// if (typeof window !== "undefined") {
//   // import("tw-elements").default
//   const loadTwElement = async () => {
//     const twEle = (await import("tw-elements")).default
//     console.log("twEle ===>", twEle)
//   }
//   loadTwElement()
// }

// if (typeof window !== "undefined") {
//   console.log("requiring")
//   require("tw-elements")
// }

const START_DATE = "startDate"

const availableTimeSlots = [
  "m5",
  "m10",
  "m15",
  "m20",
  "m25",
  "m30",
  "m35",
  "m40",
  "m45",
  "m50",
  "m55",
  "m60",
  "m65",
  "m70",
  "m75",
  "m80",
  "m85",
  "m90",
]

const DoctorsSettings = ({ user, global, pageContext, doctorSettings }) => {
  const { t } = useTranslation()
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false)
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)
  const [duration, setDuration] = useState("m30")
  const [price, setPrice] = useState(200)
  const currentDate = new Date()

  const doctorSettingData = extractSingleData(doctorSettings[0])

  // if (typeof window !== undefined) {
  //   window.test = moment
  // }
  const [configuration, setConfigurations] = useState({
    advance: true,
    availableHourFrom: moment(doctorSettingData.availableHourFrom, "HH:mm A"),
    availableHourTo: moment(doctorSettingData.availableHourTo, "HH:mm A"),
    advance: {
      startDate: moment(currentDate),
      endDate: null,
    },
    weekDays: doctorSettingData.weekDays,
    sessionPrice: doctorSettingData.sessionPrice,
    session_duration: doctorSettingData.session_duration,
  })

  const handleFiledChange = (event) => {
    const newConfiguration = { ...configuration }
    newConfiguration[event.target.name] = event.target.value
    setConfigurations(newConfiguration)
  }

  const handleOpenInfoModal = (message) => {
    setErrorMessage(message)
    setIsOpenInfoModal(true)
  }

  const handleOpenSucessModal = (message) => {
    setSuccessMessage(message)
    setIsOpenSuccessModal(true)
  }

  const handleSubmit = async (values) => {
    const response = await submitDoctorSetting({
      user: user,
      data: {
        ...values,
        price: Number(price),
        duration,
      },
    })
  }

  return (
    <>
      <div className="settings">
        <div className="patientName">{t("settings")}</div>
        <div className="row box">
          <div className="inputWrapper">
            <label>{t("session_duration")}</label>
            <DashboardDropboxInput
              value={duration}
              setValue={(event) => setDuration(event.target.value)}
              filedName="session_duration"
              label="min"
              extraClasses="flex-1"
              options={availableTimeSlots}
            />
          </div>
          <div className="inputWrapper">
            <label>{t("session_price")}</label>
            <DashboardInput
              value={price}
              setValue={(event) => setPrice(event.target.value)}
              filedName="sessionPrice"
              label="Session Duration"
              extraClasses="flex-1"
            />
            <span>AED</span>
          </div>
        </div>
        <DashboardTabs>
          <TabPane key={"availability"} title={t("availability")}>
            <AvailabilityContainer
              onSubmit={handleSubmit}
              onOpenInfoModal={handleOpenInfoModal}
              onOpenSuccessModal={handleOpenSucessModal}
            />
          </TabPane>
          <TabPane key={"upcoming-appointments"} title={t("leave_day")}>
            <LeaveDayContainer
              user={user}
              onOpenInfoModal={handleOpenInfoModal}
              onOpenSuccessModal={handleOpenSucessModal}
            />
          </TabPane>
          <TabPane key={"performance-review"} title={t("leave_hour")}>
            <LeaveHourContainer
              user={user}
              onOpenInfoModal={handleOpenInfoModal}
              onOpenSuccessModal={handleOpenSucessModal}
            />
          </TabPane>
        </DashboardTabs>

        <InfoAlert
          message={errorMessage}
          variet="error"
          isOpen={isOpenInfoModal}
          onClose={() => setIsOpenInfoModal(false)}
          title={t("error")}
        />

        <InfoAlert
          message={successMessage}
          variet="success"
          isOpen={isOpenSuccessModal}
          onClose={() => setIsOpenSuccessModal(false)}
          title={t("updated")}
        />
      </div>
      <style jsx>{`
        .settings {
          @apply pb-mb80 md:pb-80pxt lg:pb-vw80;
        }
        .wrapper {
          @apply lg:w-3/4;
        }
        .sectionTitle {
          @apply text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c];
        }
        .patientName {
          @apply mt-mb30 md:mt-30pxt lg:mt-vw30 mb-mb24 md:mb-24pxt lg:mb-vw24 text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c];
          span {
            @apply mx-mb60 md:mx-60pxt lg:mx-vw60 font-avenirBlack text-30pxm md:text-34pxt lg:text-30px text-[#0090dd];
          }
        }
        .row {
          @apply flex flex-col lg:flex-row mt-mb20 md:mt-20pxt lg:mt-vw40;
        }
        .colum {
          @apply flex flex-col;
        }
        .box {
          @apply bg-white px-mb20 md:px-24pxt lg:px-vw20 py-mb30 md:py-30pxt lg:py-vw30 rounded-md gap-mb20 md:gap-20pxt lg:gap-vw20 mb-mb80 md:mb-80pxt lg:mb-vw80;
        }
        .block {
          @apply mt-mb60 md:mt-60pxt lg:mt-vw60;
        }
        .sectionLong {
          @apply mb-mb20 md:mb-20pxt lg:mb-vw20 flex items-center justify-between flex-2;
        }
        .advance {
          @apply ml-auto text-16pxm md:text-20pxt lg:text-16px text-[#0400ff];
        }
        .sectionShort {
          @apply flex-1 flex flex-col;
        }
        .dndContainer {
          @apply bg-white rounded-sm p-mb12 md:p-12pxt lg:p-vw12 h-full;
        }
        .updateButton {
          @apply bg-[#0a47ac] flex justify-center items-center text-white text-16pxm md:text-16pxt lg:text-16px font-avenirMedium py-mb16 md:py-16pxt lg:py-vw16 px-mb60 md:px-60pxt lg:px-vw60 w-fit;
        }
        .contentEnd {
          @apply justify-end;
        }
        .inputWrapper {
          @apply flex border-b border-b-[#b7b7b7] mt-mb40 md:mt-40pxt lg:mt-vw40 px-mb24 md:px-24pxt lg:px-vw24 relative items-baseline text-18pxm md:text-22pxt lg:text-18px;
          flex: 1;
          label {
            @apply mr-vw75 min-w-125pxm md:min-w-150pxt lg:min-w-125px;
          }
        }

        :global(.rtl) {
          .advance {
            @apply ml-0 mr-auto;
          }
          .inputWrapper {
            label {
              @apply mr-0 ml-vw75;
            }
          }
        }
      `}</style>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { params, locale, locales, defaultLocale, req, query } = context

  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    }
  }

  if (session?.role?.type !== "doctors") {
    return {
      redirect: {
        permanent: false,
        destination: `/dashboard`,
      },
    }
  }

  const globalLocale = await getGlobalData(locale)
  // const user = req.session.user || null

  const doctorSettings = await getDoctorSettingsByEmail({
    email: session.email,
  })

  const patientId = query.patientsId || null

  const user = {
    strapiToken: session?.strapiToken,
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
      patientId,
      user,
      doctorSettings,
    },
  }
}

export default DoctorsSettings
