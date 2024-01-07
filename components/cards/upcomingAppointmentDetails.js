import React, { useEffect, useState } from "react"
import alarmIcon from "@/images/icons/alarm-icon.svg"
import Image from "next/image"
import moment from "moment"
import { extractSingleData } from "@/utils/extractData"
import { useTranslation } from "next-i18next"
import { IoMdClose } from "react-icons/io"
import PopupModal from "../modal/pop-up-modal"
import { useRouter } from "next/router"
import {
  checkLessTen,
  getMinsDiff,
  isAftereNow,
  isBefore24Hours,
  isBeforeNow,
} from "@/utils/helpers"
import BookAppointmentModal from "../modal/book-appointment-modal"
import CancelAppointmentModal from "../modal/cancel-appointment-modal"
import RescheduleAppointmentModal from "../modal/reschedule-appointment-modal"
import Timer from "./Timer"
import Link from "next/link"
import { appointmentStatus, requestStusts, requestType } from "@/utils/enums"
import InfoIcon from "@/images/icons/pending-icon.svg"
import WarningIcon from "@/images/icons/info-red-icon.svg"
import RemoveIcon from "@/images/icons/remove-icon.svg"
import APPROVED_ICON from "@/images/icons/approved-green.svg"
import REASON_ICON from "@/images/icons/reason-icon.svg"
import Undo_Icon from "@/images/icons/undo-button.svg"
import Spinner from "../modal/spinner"
import { Tooltip } from "react-tooltip"
import { isRTLLayout } from "utils/helpers"
import PendingRequestModel from "../modal/pending-request-modal"
import CancelRequestRecheduleAppointment from "../modal/cancel-request-rechedule-appointment-modal"
import RequestRescheduleAppointmentModal from "../modal/request-reschedule-appointment-modal"
import RequestCancelAppointmentModal from "../modal/request-cancel-appointment-modal"
import CancelRequestCancelAppointment from "../modal/cancel-request-rechedule-appointment-modal"
import AcceptRecheduleModal from "../modal/accept-reschedule-modal"
import RejectRescheduleModal from "../modal/reject-reschedule-modal"
import { concatAST } from "graphql"
import {
  getUserAppointmentStatus,
  requestHideAppointment,
  sendPationtJoinEmail,
} from "@/utils/api"
import InfoModal from "../modal/info-modal"
import CallAgentModal from "../modal/call-agent-modal"
import { useSession } from "next-auth/react"

var stringToColour = function (str) {
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  var colour = "#"
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff
    colour += ("00" + value.toString(16)).substr(-2)
  }
  return colour
}

function getBackgroundColor(stringInput) {
  let stringUniqueHash = [...stringInput].reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)
  return `hsl(${stringUniqueHash % 360}, 95%, 35%)`
}

function hashCode(str) {
  // java String#hashCode
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase()

  return "#" + "00000".substring(0, 6 - c.length) + c
}

var stringToColor = (string, saturation = 100, lightness = 75) => {
  let hash = 0
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  return `hsl(${hash % 360}, ${saturation}%, ${lightness}%)`
}

const UpcomingAppointmentCardDetails = ({
  id,
  name,
  lastVisted,
  lastAppointments,
  appointment_duration,
  medicalReports,
  doctor,
  appointment_date,
  user,
  isDoctor,
  userData,
  isMobile,
  status,
  session_place,
  price,
  appointment_request,
}) => {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const doctorData = extractSingleData(doctor.data)
  const userDate = extractSingleData(user.data)
  const appointmentRequest = extractSingleData(appointment_request?.data)

  //*mohmmad code */
  const [showModal, setShowModal] = useState({ action: "", isOpen: false })
  //*end mohammad code */
  const [showPendingRequestModel, setShowPendingRequestModel] = useState(false)
  const [showPendingRescheduleModal, setShowPendingRescheduleModal] =
    useState(false)
  const [showCanceldAppointmentInfoModal, setShowCanceldAppointmentInfoModal] =
    useState(false)
  const [
    showCanceledAppointmentDoctorInfoModal,
    setShowCanceledDoctorAppointmentDoctorInfoModal,
  ] = useState(false)
  const [
    showRescheduledAppointmentInfoModal,
    setShowRescheduledAppointmentInfoModal,
  ] = useState()
  const [meetingActive, setMeetingActive] = useState(
    !isAftereNow(appointment_date)
  )
  const [showBookAppointmentModal, setShowBookAppointmentModal] =
    useState(false)
  const [showAcceptRescheduleModal, setShowAcceptRescheduleModal] =
    useState(false)
  const [showRejectRescheduleModal, setShowRejectRescheduleModal] =
    useState(false)
  const [
    showRequestRescheduleAppointmentModal,
    setShowRequestRescheduleAppointmentModal,
  ] = useState(false)
  const [showRescheduleAppointmentModal, setShowRescheduleAppointmentModal] =
    useState(false)
  const [showCancelAppointmentModal, setShowCancelAppointmentModal] =
    useState(false)
  const [
    showRequestCancelAppointmentModal,
    setShowRequestCancelAppointmentModal,
  ] = useState(false)
  const [
    showCancelRequestRechedualAppointment,
    setShowCancelRequestRechedualAppointment,
  ] = useState(false)
  const [
    showCancelRequestCancelAppointment,
    setShowCancelRequestCancelAppointment,
  ] = useState(false)
  const [isLoadingRemove, setIsLoadingRemove] = useState(false)
  const router = useRouter()
  const isRTL = isRTLLayout(router)

  const getTime = () => {
    if (status === appointmentStatus.PENDING_PAYMENT)
      return <span className="block h-vw40"></span>
    if (isAftereNow(appointment_date) && getMinsDiff(appointment_date) < 15) {
      return (
        <Timer
          appointmentDate={appointment_date}
          onMeetingActive={() => {
            setMeetingActive(true)
          }}
        />
      )
    }
    if (!isAftereNow(appointment_date)) {
      return (
        <span className="block text-center mb-mb16 md:mb-16pxt lg:mb-vw16 text-[#00930b] text-14pxm md:text-16pxt lg:text-14px capitalize">
          {t("join_now")}
        </span>
      )
    }

    return <span className="block h-vw40"></span>
  }

  const titleName = isDoctor
    ? userDate?.firstname + " " + userDate?.surname
    : doctorData?.title

  const doctorImage = doctorData?.personal_image

  const shortName = titleName
    .split(" ")
    .splice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

  const getRandomColor = stringToColour(titleName)

  const getAppointmentStatus = async () => {
    try {
      const response = await getUserAppointmentStatus({
        appId: id,
        user: userData,
      })
      return extractSingleData(response)
    } catch (e) {
      console.log("e: ", e)
      return null
    }
  }

  const handleJoinMeeting = async () => {
    if (status === appointmentStatus.PENDING_PAYMENT) return
    if (!isAftereNow(appointment_date)) {
      const appData = await getAppointmentStatus()
      if (appData?.status == appointmentStatus.CANCELED) {
        setShowCanceledDoctorAppointmentDoctorInfoModal(true)
        return
      }
      if (!moment(appointment_date).isSame(appData.appointment_date)) {
        setShowRescheduledAppointmentInfoModal(true)
        return
      }
      router.push(`/dashboard/meeting/${id}`)
    }
  }

  const handleJoinMeetingPatient = async () => {
    if (status === appointmentStatus.PENDING_PAYMENT) return
    if (!isAftereNow(appointment_date)) {
      const appData = await getAppointmentStatus()
      if (appData?.status == appointmentStatus.PATIENT_ACTION_REQUIRED) {
        setShowPendingRescheduleModal(true)
        return
      }
      if (appData?.status == appointmentStatus.CANCELED) {
        setShowCanceldAppointmentInfoModal(true)
        return
      }
      console.log({ session, id })
      if (!isDoctor) await sendPationtJoinEmail(session.strapiToken, id)
      router.push(`/dashboard/meeting/${id}`)
    }
  }

  const handleRescheduleMeeting = async (appointmentDate) => {
    const appData = await getAppointmentStatus()
    if (doctorData.company_name === "novomed") {
      setShowModal({ action: "reschedule", isOpen: true })
      return
    }
    const createBy = extractSingleData(appData?.user_created?.data)
    console.log("userData.id: ", createBy?.id)
    if (createBy?.id !== userData.id) {
      setShowModal({ action: "reschedule", isOpen: true })
      return
    }
    if (appData?.status == appointmentStatus.PATIENT_ACTION_REQUIRED) {
      setShowPendingRescheduleModal(true)
      return
    }
    if (appData?.status == appointmentStatus.CANCELED) {
      setShowCanceldAppointmentInfoModal(true)
      return
    }
    if (isBefore24Hours(moment(appointmentDate))) {
      setShowBookAppointmentModal(true)
    } else {
      setShowRescheduleAppointmentModal(true)
    }
  }

  const handleCancelAppointmentPatient = async () => {
    const appData = await getAppointmentStatus()
    if (doctorData.company_name === "novomed") {
      setShowModal({ action: "cancel", isOpen: true })
      return
    }
    const createBy = extractSingleData(appData?.user_created?.data)
    if (createBy?.id !== userData.id) {
      setShowModal({ action: "cancel", isOpen: true })
      return
    }
    if (
      status != appointmentStatus.PATIENT_ACTION_REQUIRED &&
      appData?.status == appointmentStatus.PATIENT_ACTION_REQUIRED
    ) {
      setShowPendingRescheduleModal(true)
      return
    }
    if (appData?.status == appointmentStatus.CANCELED) {
      setShowCanceldAppointmentInfoModal(true)
      return
    }
    setShowCancelAppointmentModal(true)
  }

  const handleCancelAppointmentDoctor = async () => {
    const appData = await getAppointmentStatus()
    if (appData?.status == appointmentStatus.CANCELED) {
      setShowCanceledDoctorAppointmentDoctorInfoModal(true)
      return
    }
    if (!moment(appointment_date).isSame(appData.appointment_date)) {
      setShowRescheduledAppointmentInfoModal(true)
      return
    }
    setShowRequestCancelAppointmentModal(true)
  }

  const handleDoctorRescheduleMeeting = async (appointmentDate) => {
    const appData = await getAppointmentStatus()
    if (appData?.status == appointmentStatus.CANCELED) {
      setShowCanceledDoctorAppointmentDoctorInfoModal(true)
      return
    }
    if (!moment(appointment_date).isSame(appData.appointment_date)) {
      setShowRescheduledAppointmentInfoModal(true)
      return
    }
    setShowRequestRescheduleAppointmentModal(true)
  }

  const handleRemoveAppointment = async () => {
    setIsLoadingRemove(true)

    try {
      const response = await requestHideAppointment({
        user: userData,
        appId: id,
      })
      if (typeof window !== "undefined") window.location.reload()
    } catch (e) {
      // console.error("remove error", e)
    }
    setIsLoadingRemove(false)
  }

  const getStatusMsg = (status) => {
    let appStatus = status
    if (isDoctor) {
      if (
        appointmentRequest &&
        appointmentRequest.type == requestType.RESCHEDULE &&
        appointmentRequest.status == requestStusts.ON_HOLD
      ) {
        appStatus = appointmentStatus.PENDING_RESCHEDULE_AGENT
      }
      if (
        appointmentRequest &&
        appointmentRequest.type == requestType.RESCHEDULE &&
        appointmentRequest.status == requestStusts.PATIENT_ACTION_REQUIRED
      ) {
        appStatus = appointmentStatus.PATIENT_ACTION_REQUIRED
      }
      if (
        appointmentRequest &&
        appointmentRequest.type == requestType.RESCHEDULE &&
        appointmentRequest.status == requestStusts.REJECT
      ) {
        appStatus = appointmentStatus.REJECT_RESCHEDULE_REQUEST
      }
      if (
        appointmentRequest &&
        appointmentRequest.type == requestType.CANCEL &&
        appointmentRequest.status == requestStusts.ON_HOLD
      ) {
        appStatus = appointmentStatus.PENDING_CANCELE_AGENT
      }
      if (
        appointmentRequest &&
        appointmentRequest.type == requestType.CANCEL &&
        appointmentRequest.status == requestStusts.REJECT
      ) {
        appStatus = appointmentStatus.REJECT_CANCELE_REQUEST
      }
      switch (appStatus) {
        case appointmentStatus.PENDING_PAYMENT:
          return (
            <div className="status-msg">
              <Image src={InfoIcon} alt="Info" />
              {t("pending_payment_doctor")}
              <style jsx>{`
                .status-msg {
                  @apply h-mb60 md:h-60pxt lg:h-vw60 flex items-center gap-mb16 md:gap-16pxt lg:gap-vw16 text-14pxm md:text-18pxt lg:text-14px text-text-primary p-mb16 md:p-16pxt lg:p-vw16;
                  background-color: rgba(58, 134, 255, 0.1);
                }
              `}</style>
            </div>
          )

        case appointmentStatus.PENDING_RESCHEDULE_AGENT:
          return (
            <div className="status-msg">
              <Image src={InfoIcon} alt="Info" />
              {t("request_reschedule_pending")}
              <Image
                className={`cursor-pointer ${isRTL ? "mr-auto" : "ml-auto"}`}
                src={Undo_Icon}
                alt="Undo"
                onClick={() => setShowCancelRequestRechedualAppointment(true)}
              />
              <style jsx>{`
                .status-msg {
                  @apply h-mb60 md:h-60pxt lg:h-vw60 flex items-center gap-mb16 md:gap-16pxt lg:gap-vw16 text-14pxm md:text-18pxt lg:text-14px text-text-primary p-mb16 md:p-16pxt lg:p-vw16;
                  background-color: rgba(58, 134, 255, 0.1);
                }
              `}</style>
            </div>
          )
        case appointmentStatus.PATIENT_ACTION_REQUIRED:
          return (
            <div className="status-msg">
              <Image src={InfoIcon} alt="Info" />
              {t("request_reschedule_pending")}
              <style jsx>{`
                .status-msg {
                  @apply h-mb60 md:h-60pxt lg:h-vw60 flex items-center gap-mb16 md:gap-16pxt lg:gap-vw16 text-14pxm md:text-18pxt lg:text-14px text-text-primary p-mb16 md:p-16pxt lg:p-vw16;
                  background-color: rgba(58, 134, 255, 0.1);
                }
              `}</style>
            </div>
          )
        case appointmentStatus.PENDING_CANCELE_AGENT:
          return (
            <div className="status-msg">
              <Image src={WarningIcon} alt="Warning" />
              {t("request_cancel_pending")}
              <Image
                className={`cursor-pointer ${isRTL ? "mr-auto" : "ml-auto"}`}
                src={Undo_Icon}
                alt="Undo"
                onClick={() => setShowCancelRequestCancelAppointment(true)}
              />
              <style jsx>{`
                .status-msg {
                  @apply h-mb60 md:h-60pxt lg:h-vw60 flex items-center gap-mb16 md:gap-16pxt lg:gap-vw16 text-14pxm md:text-18pxt lg:text-14px text-text-primary p-mb16 md:p-16pxt lg:p-vw16;
                  background-color: rgba(255, 76, 76, 0.2);
                }
              `}</style>
            </div>
          )
        case appointmentStatus.REJECT_CANCELE_REQUEST:
          return (
            <div className="status-msg">
              <Image src={WarningIcon} alt="Warning" />
              {t("reject_cancel_request")}
              <style jsx>{`
                .status-msg {
                  @apply h-mb60 md:h-60pxt lg:h-vw60 flex items-center gap-mb16 md:gap-16pxt lg:gap-vw16 text-14pxm md:text-18pxt lg:text-14px text-text-primary p-mb16 md:p-16pxt lg:p-vw16;
                  background-color: rgba(255, 76, 76, 0.2);
                }
              `}</style>
            </div>
          )
        case appointmentStatus.REJECT_RESCHEDULE_REQUEST:
          return (
            <div className="status-msg">
              <Image src={WarningIcon} alt="Warning" />
              {t("reject_reschedule_request")}
              <style jsx>{`
                .status-msg {
                  @apply h-mb60 md:h-60pxt lg:h-vw60 flex items-center gap-mb16 md:gap-16pxt lg:gap-vw16 text-14pxm md:text-18pxt lg:text-14px text-text-primary p-mb16 md:p-16pxt lg:p-vw16;
                  background-color: rgba(255, 76, 76, 0.2);
                }
              `}</style>
            </div>
          )
        case appointmentStatus.PENDING_RESCHEDULE_PATIENT:
          return (
            <div className="status-msg">
              <Image src={InfoIcon} alt="Info" />
              {t("request_reschedule_pending")}
              <style jsx>{`
                .status-msg {
                  @apply h-mb60 md:h-60pxt lg:h-vw60 flex items-center gap-mb16 md:gap-16pxt lg:gap-vw16 text-14pxm md:text-18pxt lg:text-14px text-text-primary p-mb16 md:p-16pxt lg:p-vw16;
                  background-color: rgba(58, 134, 255, 0.1);
                }
              `}</style>
            </div>
          )
        case appointmentStatus.REJECTED_AGENT:
          return (
            <div className="status-msg">
              <Image src={WarningIcon} alt="Warning" />
              {t("rejected_agent_msg")}
              <style jsx>{`
                .status-msg {
                  @apply h-mb60 md:h-60pxt lg:h-vw60 flex items-center gap-mb16 md:gap-16pxt lg:gap-vw16 text-14pxm md:text-18pxt lg:text-14px text-text-primary p-mb16 md:p-16pxt lg:p-vw16;
                  background-color: rgba(255, 76, 76, 0.2);
                }
              `}</style>
            </div>
          )
        case appointmentStatus.CANCELED_PATIENT:
          return (
            <div className="status-msg">
              <Image src={WarningIcon} alt="Warning" />
              {titleName} {t("canceled_appointment")}
              <style jsx>{`
                .status-msg {
                  @apply h-mb60 md:h-60pxt lg:h-vw60 flex items-center gap-mb16 md:gap-16pxt lg:gap-vw16 text-14pxm md:text-18pxt lg:text-14px text-text-primary p-mb16 md:p-16pxt lg:p-vw16;
                  background-color: rgba(255, 76, 76, 0.2);
                }
              `}</style>
            </div>
          )
        case appointmentStatus.RESCHEDULE:
          return (
            <div className="status-msg">
              <Image src={APPROVED_ICON} alt="Updated" />
              {t("appointment_updated")}
              <style jsx>{`
                .status-msg {
                  @apply h-mb60 md:h-60pxt lg:h-vw60 flex items-center gap-mb16 md:gap-16pxt lg:gap-vw16 text-14pxm md:text-18pxt lg:text-14px text-text-primary p-mb16 md:p-16pxt lg:p-vw16;
                  background-color: rgba(0, 147, 11, 0.1);
                }
              `}</style>
            </div>
          )

        case appointmentStatus.CANCELED_DOCTOR:
        case appointmentStatus.CANCELED:
          return (
            <div className="status-msg">
              <Image src={WarningIcon} alt="Warning" />
              {t("appointment_has_canceled")}
              <style jsx>{`
                .status-msg {
                  @apply h-mb60 md:h-60pxt lg:h-vw60 flex items-center gap-mb16 md:gap-16pxt lg:gap-vw16 text-14pxm md:text-18pxt lg:text-14px text-text-primary p-mb16 md:p-16pxt lg:p-vw16;
                  background-color: rgba(255, 76, 76, 0.2);
                }
              `}</style>
            </div>
          )
        default:
          return (
            <div className="status-msg">
              <style jsx>{`
                .status-msg {
                  @apply h-mb60 md:h-60pxt lg:h-vw60 flex gap-mb16 md:gap-16pxt lg:gap-vw16 text-14pxm md:text-18pxt lg:text-14px text-white p-mb16 md:p-16pxt lg:p-vw16;
                }
              `}</style>
            </div>
          )
      }
    } else {
      switch (appStatus) {
        case appointmentStatus.PENDING_PAYMENT:
          return (
            <div className="status-msg">
              <Image src={InfoIcon} alt="Info" />
              {t("pending_payment")}
              <style jsx>{`
                .status-msg {
                  @apply h-mb60 md:h-60pxt lg:h-vw60 flex items-center gap-mb16 md:gap-16pxt lg:gap-vw16 text-14pxm md:text-18pxt lg:text-14px text-text-primary p-mb16 md:p-16pxt lg:p-vw16;
                  background-color: rgba(58, 134, 255, 0.1);
                }
              `}</style>
            </div>
          )
        case appointmentStatus.REJECTED_AGENT:
        case appointmentStatus.CANCELED_DOCTOR:
          return (
            <div className="status-msg">
              <Image src={WarningIcon} alt="Warning" />
              {titleName} {t("canceled_appointment")}
              <style jsx>{`
                .status-msg {
                  @apply h-mb60 md:h-60pxt lg:h-vw60 flex items-center gap-mb16 md:gap-16pxt lg:gap-vw16 text-14pxm md:text-18pxt lg:text-14px text-text-primary p-mb16 md:p-16pxt lg:p-vw16;
                  background-color: rgba(255, 76, 76, 0.2);
                }
              `}</style>
            </div>
          )
        case appointmentStatus.CANCELED_PATIENT:
        case appointmentStatus.CANCELED:
          return (
            <div className="status-msg">
              <Image src={WarningIcon} alt="Warning" />
              {t("appointment_has_canceled")}
              <style jsx>{`
                .status-msg {
                  @apply h-mb60 md:h-60pxt lg:h-vw60 flex items-center gap-mb16 md:gap-16pxt lg:gap-vw16 text-14pxm md:text-18pxt lg:text-14px text-text-primary p-mb16 md:p-16pxt lg:p-vw16;
                  background-color: rgba(255, 76, 76, 0.2);
                }
              `}</style>
            </div>
          )
        case appointmentStatus.PATIENT_ACTION_REQUIRED:
          return (
            <div className="status-msg">
              <Image src={InfoIcon} alt="Info" />
              {titleName} {t("doctor_request_reschedule")}
              <style jsx>{`
                .status-msg {
                  @apply h-mb60 md:h-60pxt lg:h-vw60 flex items-center gap-mb16 md:gap-16pxt lg:gap-vw16 text-14pxm md:text-18pxt lg:text-14px text-text-primary p-mb16 md:p-16pxt lg:p-vw16;
                  background-color: rgba(58, 134, 255, 0.1);
                }
              `}</style>
            </div>
          )
        default:
          return (
            <div className="status-msg">
              <style jsx>{`
                .status-msg {
                  @apply h-mb60 md:h-60pxt lg:h-vw60 flex gap-mb16 md:gap-16pxt lg:gap-vw16 text-14pxm md:text-18pxt lg:text-14px text-white p-mb16 md:p-16pxt lg:p-vw16;
                }
              `}</style>
            </div>
          )
      }
    }
  }

  const getActionsButtons = (status) => {
    let appStatus = status
    if (
      appointmentRequest &&
      appointmentRequest.type == requestType.RESCHEDULE &&
      appointmentRequest.status == requestStusts.ON_HOLD
    ) {
      appStatus = appointmentStatus.PENDING_RESCHEDULE_AGENT
    }

    if (
      appointmentRequest &&
      (appointmentRequest.type == requestType.RESCHEDULE ||
        appointmentRequest.type == requestType.CANCEL) &&
      (appointmentRequest.status == requestStusts.ON_HOLD ||
        appointmentRequest.status == appointmentStatus.PATIENT_ACTION_REQUIRED)
    ) {
      appStatus = appointmentStatus.PENDING_REQUEST
    }
    if (isDoctor) {
      switch (appStatus) {
        case appointmentStatus.PENDING_PAYMENT:
          return (
            <div className="buttonContainer">
              <div className={`button join unactive`}>{t("join_meeting")}</div>
              <div className={`button resc resc-unactive`}>
                {t("reschedule")}
              </div>
              <style jsx>{`
                .buttonContainer {
                  @apply flex mt-auto;
                }
                .button {
                  @apply py-mb16 md:py-16pxt lg:py-vw16 text-white text-12pxm md:text-16pxt lg:text-12px font-avenirMedium flex-1 bg-[#3a86ff] text-center transition-colors ease-in duration-300 cursor-pointer hover:bg-[#629FFF];
                  &.join {
                    @apply rounded-bl-lg;
                  }
                  &.resc {
                    @apply bg-white text-[#999999] hover:bg-[#ebebeb] rounded-br-lg;
                  }
                  &.resc-unactive {
                    @apply cursor-default hover:bg-white;
                    color: rgba(153, 153, 153, 0.5);
                  }
                  &.unactive {
                    @apply cursor-default;
                    background-color: rgba(208, 229, 250, 0.7);
                  }
                }
                :global(.rtl) {
                  .button {
                    &.join {
                      @apply rounded-bl-none rounded-br-lg;
                    }
                    &.resc {
                      @apply rounded-br-none rounded-bl-lg;
                    }
                  }
                }
              `}</style>
            </div>
          )

        case appointmentStatus.REJECTED_AGENT:
        case appointmentStatus.CANCELED:
          return (
            <button
              className={`remove-btn ${isLoadingRemove ? "loading" : ""}`}
              onClick={handleRemoveAppointment}
              disabled={isLoadingRemove}
            >
              <Image src={RemoveIcon} alt="Remove" />
              {t("remove")}
              {isLoadingRemove ? <Spinner /> : null}
              <style jsx>{`
                .remove-btn {
                  @apply flex items-center justify-center gap-mb12 md:gap-16pxt lg:gap-vw12 py-mb16 md:py-16pxt lg:py-vw16 text-white text-12pxm md:text-16pxt lg:text-12px font-avenirMedium flex-1 bg-dashboardBtnDanger text-center transition-colors ease-in duration-300 cursor-pointer hover:bg-[#ff3232] rounded-bl-lg rounded-br-lg capitalize;
                  &.loading {
                    @apply cursor-default;
                    fill: white;
                    background-color: rgba(255, 0, 0, 0.3);
                    &:hover {
                      background-color: rgba(255, 0, 0, 0.3);
                    }
                  }
                }
              `}</style>
            </button>
          )

        case appointmentStatus.PENDING_RESCHEDULE_AGENT:
        case appointmentStatus.PENDING_RESCHEDULE_PATIENT:
          return (
            <div className="buttonContainer">
              <div
                onClick={handleJoinMeeting}
                className={`button join ${!meetingActive ? "unactive" : ""}`}
              >
                {t("join_meeting")}
              </div>
              <div
                className={`button resc`}
                onClick={() => setShowPendingRequestModel(true)}
              >
                {t("reschedule")}
              </div>
              <style jsx>{`
                .buttonContainer {
                  @apply flex mt-auto;
                }
                .button {
                  @apply py-mb16 md:py-16pxt lg:py-vw16 text-white text-12pxm md:text-16pxt lg:text-12px font-avenirMedium flex-1 bg-[#3a86ff] text-center transition-colors ease-in duration-300 cursor-pointer hover:bg-[#629FFF];
                  &.join {
                    @apply rounded-bl-lg;
                  }
                  &.resc {
                    @apply bg-white text-[#999999] hover:bg-[#ebebeb] rounded-br-lg;
                  }
                  &.resc-unactive {
                    @apply cursor-default hover:bg-white;
                    color: rgba(153, 153, 153, 0.5);
                  }
                  &.unactive {
                    @apply cursor-default;
                    background-color: rgba(208, 229, 250, 0.7);
                  }
                }
                :global(.rtl) {
                  .button {
                    &.join {
                      @apply rounded-bl-none rounded-br-lg;
                    }
                    &.resc {
                      @apply rounded-br-none rounded-bl-lg;
                    }
                  }
                }
              `}</style>
            </div>
          )
        case appointmentStatus.PENDING_REQUEST:
          return (
            <div className="buttonContainer">
              <div
                onClick={handleJoinMeeting}
                className={`button join ${!meetingActive ? "unactive" : ""}`}
              >
                {t("join_meeting")}
              </div>
              <div className={`button resc resc-unactive`}>
                {t("reschedule")}
              </div>
              <style jsx>{`
                .buttonContainer {
                  @apply flex mt-auto;
                }
                .button {
                  @apply py-mb16 md:py-16pxt lg:py-vw16 text-white text-12pxm md:text-16pxt lg:text-12px font-avenirMedium flex-1 bg-[#3a86ff] text-center transition-colors ease-in duration-300 cursor-pointer hover:bg-[#629FFF];
                  &.join {
                    @apply rounded-bl-lg;
                  }
                  &.resc {
                    @apply bg-white text-[#999999] hover:bg-[#ebebeb] rounded-br-lg;
                  }
                  &.resc-unactive {
                    @apply cursor-default hover:bg-white;
                    color: rgba(153, 153, 153, 0.5);
                  }
                  &.unactive {
                    @apply cursor-default;
                    background-color: rgba(208, 229, 250, 0.7);
                  }
                }
                :global(.rtl) {
                  .button {
                    &.join {
                      @apply rounded-bl-none rounded-br-lg;
                    }
                    &.resc {
                      @apply rounded-br-none rounded-bl-lg;
                    }
                  }
                }
              `}</style>
            </div>
          )
        default:
          return (
            <div className="buttonContainer">
              <div
                onClick={handleJoinMeeting}
                className={`button join ${!meetingActive ? "unactive" : ""}`}
              >
                {t("join_meeting")}
              </div>
              <div
                className={`button resc`}
                onClick={() => handleDoctorRescheduleMeeting(appointment_date)}
              >
                {t("reschedule")}
              </div>
              <style jsx>{`
                .buttonContainer {
                  @apply flex mt-auto;
                }
                .button {
                  @apply py-mb16 md:py-16pxt lg:py-vw16 text-white text-12pxm md:text-16pxt lg:text-12px font-avenirMedium flex-1 bg-[#3a86ff] text-center transition-colors ease-in duration-300 cursor-pointer hover:bg-[#629FFF];
                  &.join {
                    @apply rounded-bl-lg;
                  }
                  &.resc {
                    @apply bg-white text-[#999999] hover:bg-[#ebebeb] rounded-br-lg;
                  }
                  &.resc-unactive {
                    @apply cursor-default hover:bg-white;
                    color: rgba(153, 153, 153, 0.5);
                  }
                  &.unactive {
                    @apply cursor-default;
                    background-color: rgba(208, 229, 250, 0.7);
                  }
                }
                :global(.rtl) {
                  .button {
                    &.join {
                      @apply rounded-bl-none rounded-br-lg;
                    }
                    &.resc {
                      @apply rounded-br-none rounded-bl-lg;
                    }
                  }
                }
              `}</style>
            </div>
          )
      }
    } else {
      switch (appStatus) {
        case appointmentStatus.PENDING_PAYMENT:
          return (
            <div className="buttonContainer">
              <div className={`button join unactive`}>{t("join_meeting")}</div>
              <div className={`button resc resc-unactive`}>
                {t("reschedule")}
              </div>
              <style jsx>{`
                .buttonContainer {
                  @apply flex mt-auto;
                }
                .button {
                  @apply py-mb16 md:py-16pxt lg:py-vw16 text-white text-12pxm md:text-16pxt lg:text-12px font-avenirMedium flex-1 bg-[#3a86ff] text-center transition-colors ease-in duration-300 cursor-pointer hover:bg-[#629FFF];
                  &.join {
                    @apply rounded-bl-lg;
                  }
                  &.resc {
                    @apply bg-white text-[#999999] hover:bg-[#ebebeb] rounded-br-lg;
                  }
                  &.resc-unactive {
                    @apply cursor-default hover:bg-white;
                    color: rgba(153, 153, 153, 0.5);
                  }
                  &.unactive {
                    @apply cursor-default;
                    background-color: rgba(208, 229, 250, 0.7);
                  }
                }
                :global(.rtl) {
                  .button {
                    &.join {
                      @apply rounded-bl-none rounded-br-lg;
                    }
                    &.resc {
                      @apply rounded-br-none rounded-bl-lg;
                    }
                  }
                }
              `}</style>
            </div>
          )

        case appointmentStatus.REJECTED_AGENT:
        case appointmentStatus.CANCELED:
          return (
            <button
              className={`remove-btn ${isLoadingRemove ? "loading" : ""}`}
              onClick={handleRemoveAppointment}
            >
              <Image src={RemoveIcon} alt="Remove" />
              {t("remove")}
              {isLoadingRemove ? <Spinner /> : null}
              <style jsx>{`
                .remove-btn {
                  @apply flex items-center justify-center gap-mb12 md:gap-16pxt lg:gap-vw12 py-mb16 md:py-16pxt lg:py-vw16 text-white text-12pxm md:text-16pxt lg:text-12px font-avenirMedium flex-1 bg-dashboardBtnDanger text-center transition-colors ease-in duration-300 cursor-pointer hover:bg-[#ff3232] rounded-bl-lg rounded-br-lg capitalize;
                  &.loading {
                    @apply cursor-default;
                    fill: white;
                    background-color: rgba(255, 0, 0, 0.3);
                    &:hover {
                      background-color: rgba(255, 0, 0, 0.3);
                    }
                  }
                }
              `}</style>
            </button>
          )
        case appointmentStatus.PATIENT_ACTION_REQUIRED:
          return (
            <div className="buttonContainer">
              <div
                onClick={() => setShowAcceptRescheduleModal(true)}
                className={`button join`}
              >
                {t("accept")}
              </div>
              <div
                className={`button resc`}
                onClick={() => setShowRejectRescheduleModal(true)}
              >
                {t("reject")}
              </div>
              <style jsx>{`
                .buttonContainer {
                  @apply flex mt-auto;
                }
                .button {
                  @apply py-mb16 md:py-16pxt lg:py-vw16 text-white text-12pxm md:text-16pxt lg:text-12px font-avenirMedium flex-1 bg-[#3a86ff] text-center transition-colors ease-in duration-300 cursor-pointer hover:bg-[#629FFF];
                  &.join {
                    @apply rounded-bl-lg;
                  }
                  &.resc {
                    @apply bg-white text-[#999999] hover:bg-[#ebebeb] rounded-br-lg;
                  }
                  &.resc-unactive {
                    @apply cursor-default hover:bg-white;
                    color: rgba(153, 153, 153, 0.5);
                  }
                  &.unactive {
                    @apply cursor-default;
                    background-color: rgba(208, 229, 250, 0.7);
                  }
                }
                :global(.rtl) {
                  .button {
                    &.join {
                      @apply rounded-bl-none rounded-br-lg;
                    }
                    &.resc {
                      @apply rounded-br-none rounded-bl-lg;
                    }
                  }
                }
              `}</style>
            </div>
          )
        default:
          return (
            <div className="buttonContainer">
              <div
                onClick={handleJoinMeetingPatient}
                className={`button join ${!meetingActive ? "unactive" : ""}`}
              >
                {t("join_meeting")}
              </div>
              <div
                className={`button resc`}
                onClick={() => handleRescheduleMeeting(appointment_date)}
              >
                {t("reschedule")}
              </div>
              <style jsx>{`
                .buttonContainer {
                  @apply flex mt-auto;
                }
                .button {
                  @apply py-mb16 md:py-16pxt lg:py-vw16 text-white text-12pxm md:text-16pxt lg:text-12px font-avenirMedium flex-1 bg-[#3a86ff] text-center transition-colors ease-in duration-300 cursor-pointer hover:bg-[#629FFF];
                  &.join {
                    @apply rounded-bl-lg;
                  }
                  &.resc {
                    @apply bg-white text-[#999999] hover:bg-[#ebebeb] rounded-br-lg;
                  }
                  &.resc-unactive {
                    @apply cursor-default hover:bg-white;
                    color: rgba(153, 153, 153, 0.5);
                  }
                  &.unactive {
                    @apply cursor-default;
                    background-color: rgba(208, 229, 250, 0.7);
                  }
                }
                :global(.rtl) {
                  .button {
                    &.join {
                      @apply rounded-bl-none rounded-br-lg;
                    }
                    &.resc {
                      @apply rounded-br-none rounded-bl-lg;
                    }
                  }
                }
              `}</style>
            </div>
          )
      }
    }
  }

  const getCancelButton = (status) => {
    let appStatus = status
    if (isDoctor) {
      if (
        appointmentRequest &&
        (appointmentRequest.type == requestType.RESCHEDULE ||
          appointmentRequest.type == requestType.CANCEL) &&
        (appointmentRequest.status == requestStusts.ON_HOLD ||
          appointmentRequest.status ==
            appointmentStatus.PATIENT_ACTION_REQUIRED)
      ) {
        appStatus = appointmentStatus.PENDING_REQUEST
      }
      switch (appStatus) {
        case appointmentStatus.CANCELED:
        case appointmentStatus.CANCELED_DOCTOR:
        case appointmentStatus.CANCELED_PATIENT:
          return (
            <div className={`close-icon unactive`}>
              <IoMdClose />
              <style jsx>{`
                .close-icon {
                  @apply px-mb12 md:px-12pxt lg:px-vw12 pb-mb28 md:pb-28pxt lg:pb-vw30 pt-mb12 md:pt-12pxt lg:pt-vw12 text-24pxm md:text-28pxt lg:text-26px text-[#0e0d47] cursor-pointer transition-colors ease-in duration-200 hover:text-dashboardBtnDanger;
                  visibility: hidden;
                  &.unactive {
                    @apply cursor-default;
                    color: rgba(14, 13, 71, 0.5);
                    &:hover {
                      color: rgba(14, 13, 71, 0.5);
                    }
                  }
                }
              `}</style>
            </div>
          )
        case appointmentStatus.REJECTED_AGENT:
          return (
            <div className={`reason-icon`}>
              <Image
                src={REASON_ICON}
                alt="Reason"
                data-tooltip-id="reason-id"
                data-tooltip-content="Reason of Reject"
              />
              <Tooltip id="reason-id" className="!bg-dashboardBtnDanger" />
              <style jsx>{`
                .reason-icon {
                  @apply px-mb12 md:px-12pxt lg:px-vw12 py-mb20 md:py-20pxt lg:py-vw20 cursor-pointer;
                }
              `}</style>
            </div>
          )
        case appointmentStatus.PENDING_PAYMENT:
        case appointmentStatus.PENDING_REQUEST:
          return (
            <div className={`close-icon unactive`}>
              <IoMdClose />
              <style jsx>{`
                .close-icon {
                  @apply px-mb12 md:px-12pxt lg:px-vw12 pb-mb28 md:pb-28pxt lg:pb-vw30 pt-mb12 md:pt-12pxt lg:pt-vw12 text-24pxm md:text-28pxt lg:text-26px text-[#0e0d47] cursor-pointer transition-colors ease-in duration-200 hover:text-dashboardBtnDanger;
                  &.unactive {
                    @apply cursor-default;
                    color: rgba(14, 13, 71, 0.5);
                    &:hover {
                      color: rgba(14, 13, 71, 0.5);
                    }
                  }
                }
              `}</style>
            </div>
          )
        default:
          return (
            <div
              className={`close-icon`}
              onClick={handleCancelAppointmentDoctor}
              data-tooltip-id="cancel-appointment-tooltip"
              data-tooltip-content={t("cancel_appointment")}
            >
              <IoMdClose />
              <Tooltip
                id="cancel-appointment-tooltip"
                className="!bg-dashboardBtnDanger"
              />
              <style jsx>{`
                .close-icon {
                  @apply px-mb12 md:px-12pxt lg:px-vw12 pb-mb28 md:pb-28pxt lg:pb-vw30 pt-mb12 md:pt-12pxt lg:pt-vw12 text-24pxm md:text-28pxt lg:text-26px text-[#0e0d47] cursor-pointer transition-colors ease-in duration-200 hover:text-dashboardBtnDanger;
                  &.unactive {
                    @apply cursor-default;
                    color: rgba(14, 13, 71, 0.5);
                    &:hover {
                      color: rgba(14, 13, 71, 0.5);
                    }
                  }
                }
              `}</style>
            </div>
          )
      }
    } else {
      switch (appStatus) {
        case appointmentStatus.REJECTED_AGENT:
        case appointmentStatus.CANCELED:
        case appointmentStatus.CANCELED_DOCTOR:
        case appointmentStatus.CANCELED_PATIENT:
          return (
            <div className={`close-icon unactive`}>
              <IoMdClose />
              <style jsx>{`
                .close-icon {
                  @apply px-mb12 md:px-12pxt lg:px-vw12 pb-mb28 md:pb-28pxt lg:pb-vw30 pt-mb12 md:pt-12pxt lg:pt-vw12 text-24pxm md:text-28pxt lg:text-26px text-[#0e0d47] cursor-pointer transition-colors ease-in duration-200 hover:text-dashboardBtnDanger;
                  visibility: hidden;
                  &.unactive {
                    @apply cursor-default;
                    color: rgba(14, 13, 71, 0.5);
                    &:hover {
                      color: rgba(14, 13, 71, 0.5);
                    }
                  }
                }
              `}</style>
            </div>
          )
        case appointmentStatus.PENDING_PAYMENT:
          return (
            <div className={`close-icon unactive`}>
              <IoMdClose />
              <style jsx>{`
                .close-icon {
                  @apply px-mb12 md:px-12pxt lg:px-vw12 pb-mb28 md:pb-28pxt lg:pb-vw30 pt-mb12 md:pt-12pxt lg:pt-vw12 text-24pxm md:text-28pxt lg:text-26px text-[#0e0d47] cursor-pointer transition-colors ease-in duration-200 hover:text-dashboardBtnDanger;
                  &.unactive {
                    @apply cursor-default;
                    color: rgba(14, 13, 71, 0.5);
                    &:hover {
                      color: rgba(14, 13, 71, 0.5);
                    }
                  }
                }
              `}</style>
            </div>
          )
        default:
          return (
            <div
              className={`close-icon`}
              onClick={handleCancelAppointmentPatient}
              data-tooltip-id="cancel-appointment-tooltip"
              data-tooltip-content={t("cancel_appointment")}
            >
              <IoMdClose />
              <Tooltip
                id="cancel-appointment-tooltip"
                className="!bg-dashboardBtnDanger"
              />
              <style jsx>{`
                .close-icon {
                  @apply px-mb12 md:px-12pxt lg:px-vw12 pb-mb28 md:pb-28pxt lg:pb-vw30 pt-mb12 md:pt-12pxt lg:pt-vw12 text-24pxm md:text-28pxt lg:text-26px text-[#0e0d47] cursor-pointer transition-colors ease-in duration-200 hover:text-dashboardBtnDanger;
                  &.unactive {
                    @apply cursor-default;
                    color: rgba(14, 13, 71, 0.5);
                    &:hover {
                      color: rgba(14, 13, 71, 0.5);
                    }
                  }
                }
              `}</style>
            </div>
          )
      }
    }
  }

  useEffect(() => {
    setMeetingActive(!isAftereNow(appointment_date))
  }, [appointment_date])

  return (
    <div className="cardWrapper" id={id}>
      <InfoModal
        isOpen={showPendingRescheduleModal}
        onClose={() => {
          setShowPendingRescheduleModal(false)
          if (typeof window !== "undefined") window.location.reload()
        }}
        title={t("pending_request")}
        message={t("request_reschedule_currently_pending")}
      />
      <CallAgentModal
        isOpen={showModal.isOpen}
        isMobile={isMobile}
        onClose={() => {
          setShowModal({ action: "", isOpen: false })
          if (typeof window !== "undefined") window.location.reload()
        }}
        action={showModal.action}
      />
      <InfoModal
        isOpen={showCanceldAppointmentInfoModal}
        variet="warning"
        onClose={() => {
          setShowCanceldAppointmentInfoModal(false)
          if (typeof window !== "undefined") window.location.reload()
        }}
        title={t("canceled_appointment_info")}
        message={t("canceled_appointment_info_message")}
      />
      <InfoModal
        isOpen={showCanceledAppointmentDoctorInfoModal}
        variet="warning"
        onClose={() => {
          setShowCanceledDoctorAppointmentDoctorInfoModal(false)
          if (typeof window !== "undefined") window.location.reload()
        }}
        title={t("canceled_appointment_info")}
        message={t("canceled_appointment_info_doctor_message")}
      />
      <InfoModal
        isOpen={showRescheduledAppointmentInfoModal}
        onClose={() => {
          setShowRescheduledAppointmentInfoModal(false)
          if (typeof window !== "undefined") window.location.reload()
        }}
        title={t("rescheduled_appointment")}
        message={t("patient_rescheduled_appointment")}
      />
      <CancelRequestRecheduleAppointment
        onClose={() => setShowCancelRequestRechedualAppointment(false)}
        isOpen={showCancelRequestRechedualAppointment}
        user={userData}
        appointmentID={id}
        requestStateId={appointmentRequest?.id}
        appointmentDate={appointment_date}
      />
      <CancelRequestCancelAppointment
        onClose={() => setShowCancelRequestCancelAppointment(false)}
        isOpen={showCancelRequestCancelAppointment}
        user={userData}
        appointmentID={id}
        requestStateId={appointmentRequest?.id}
        appointmentDate={appointment_date}
      />
      <PendingRequestModel
        onClose={() => setShowPendingRequestModel(false)}
        isOpen={showPendingRequestModel}
        title={t("pending_request")}
        message={t("request_reschedule_pending")}
      />
      <RequestRescheduleAppointmentModal
        onClose={() => setShowRequestRescheduleAppointmentModal(false)}
        isOpen={showRequestRescheduleAppointmentModal}
        name={titleName}
        specialization={doctorData.speciality}
        therapistUserName={doctorData.slug}
        user={userData}
        appId={id}
        doctorId={doctorData.id}
      />
      <BookAppointmentModal
        onClose={() => setShowBookAppointmentModal(false)}
        isOpen={showBookAppointmentModal}
        name={titleName}
        specialization={doctorData.speciality}
        therapistUserName={doctorData.slug}
        user={userData}
        appId={id}
        doctorImage={doctorImage}
        doctorId={doctorData.id}
      />
      <AcceptRecheduleModal
        onClose={() => setShowAcceptRescheduleModal(false)}
        isOpen={showAcceptRescheduleModal}
        name={titleName}
        specialization={doctorData.speciality}
        therapistUserName={doctorData.slug}
        user={userData}
        reqId={appointmentRequest?.id}
        doctorImage={doctorImage}
        doctorId={doctorData.id}
      />
      <RejectRescheduleModal
        onClose={() => setShowRejectRescheduleModal(false)}
        isOpen={showRejectRescheduleModal}
        user={userData}
        reqId={appointmentRequest?.id}
      />
      <RescheduleAppointmentModal
        onClose={() => setShowRescheduleAppointmentModal(false)}
        isOpen={showRescheduleAppointmentModal}
        name={titleName}
        specialization={"Consultant Psychiatrist"}
        user={userData}
        appId={id}
        price={price}
        therapistUserName={doctorData.slug}
        doctorImage={doctorImage}
        doctorId={doctorData.id}
        doctorName={doctorData?.title}
      />
      <CancelAppointmentModal
        onClose={() => setShowCancelAppointmentModal(false)}
        isOpen={showCancelAppointmentModal}
        user={userData}
        appointmentID={id}
        appointmentDate={appointment_date}
      />
      <RequestCancelAppointmentModal
        onClose={() => setShowRequestCancelAppointmentModal(false)}
        isOpen={showRequestCancelAppointmentModal}
        user={userData}
        appointmentID={id}
        appointmentDate={appointment_date}
      />
      <div className="row borderb">
        <div
          className="shortName"
          style={{
            backgroundColor: getRandomColor,
            color: `color-contrast(${getRandomColor} vs white, black`,
          }}
        >
          {shortName}
        </div>
        {!isDoctor ? (
          <Link
            href={`therapists/${doctorData.slug}`}
            className="text-black-333 font-avenirMedium uppercase text-16pxm md:text-20pxt lg:text-16px cursor-pointer"
          >
            {titleName}
          </Link>
        ) : (
          <div className="doctorName">{titleName}</div>
        )}
        {getCancelButton(status)}
      </div>
      {getStatusMsg(status)}
      {/* <div className="time">{lastVisted}</div> */}
      {/* <div className="row table">
        <div className="tableTitle">Previous Appointments</div>
        <div>{lastAppointments}</div>
      </div> */}
      <div className="row table content-row">
        <div className="tableTitle">{t("next_appointment")}</div>
        <div>
          {moment(appointment_date).calendar({
            sameDay: "[Today]",
            nextDay: "[Tomorrow]",
            nextWeek: "dddd",
            lastDay: "[Yesterday]",
            lastWeek: "[Last] dddd",
            sameElse: "DD/MM/YYYY",
          })}
          <span className="time-app">
            {moment(appointment_date).format("hh:mm A")} {t("gst_time")}
          </span>
        </div>
      </div>
      <div className="row table content-row">
        <div className="tableTitle">{t("session_duration")}</div>
        <div>
          {appointment_duration}
          <span className="time-app">{t("min")}</span>
        </div>
      </div>
      {/* <div className="row table content-row">
        <div className="tableTitle underline">Medical Report</div>
        <div>{medicalReports}</div>
      </div> */}
      {/* <div className="row table content-row">
        <div className="tableTitle underline">{t("meeting_room")}</div>
        <div></div>
      </div> */}
      {getTime()}
      {getActionsButtons(status)}
      <style jsx>{`
        .cardWrapper {
          @apply relative flex flex-col flex-1 rounded-lg shadow-appointmentCard bg-white;
        }
        .close-icon {
          @apply px-mb12 md:px-12pxt lg:px-vw12 pb-mb28 md:pb-28pxt lg:pb-vw30 pt-mb12 md:pt-12pxt lg:pt-vw12 text-24pxm md:text-28pxt lg:text-26px text-[#0e0d47] cursor-pointer transition-colors ease-in duration-200 hover:text-dashboardBtnDanger;
          &.unactive {
            @apply cursor-default;
            color: rgba(14, 13, 71, 0.5);
            &:hover {
              color: rgba(14, 13, 71, 0.5);
            }
          }
        }
        .row {
          @apply flex items-center justify-between;
        }
        .content-row {
          @apply mb-mb12 md:mb-12pxt lg:mb-vw12;
        }
        .shortName {
          @apply flex items-center justify-center rounded-full text-16pxm md:text-20pxt lg:text-16px font-avenirSlim p-mb16 md:p-20pxt lg:p-vw08 ml-mb20 md:ml-20pxt lg:ml-vw20 text-white w-20pxm h-20pxm md:w-20pxt md:h-20pxt lg:w-vw40 lg:h-vw40 text-center;
        }
        .doctorName {
          @apply text-black-333 font-avenirMedium uppercase text-16pxm md:text-20pxt lg:text-16px;
        }
        .videoS {
          @apply px-mb20 md:px-20pxt lg:px-vw24 py-mb28 md:py-28pxt lg:py-vw30 bg-blue-300 rounded-tr-lg;
        }
        .borderb {
          @apply border-b-[1px] border-b-[#d5d5d5];
        }
        .time {
          @apply text-black-333 text-12pxm md:text-12pxt lg:text-12px font-avenirMedium mb-mb20 md:mb-20pxt lg:mb-vw20 text-center;
        }
        .table {
          @apply px-mb20 md:px-20pxt lg:px-vw20 text-14pxm md:text-18pxt lg:text-14px text-black-333 font-avenirSlim;
        }
        .colum {
          @apply flex flex-col;
        }
        .buttonContainer {
          @apply flex mt-auto;
        }
        .button {
          @apply py-mb16 md:py-16pxt lg:py-vw16 text-white text-12pxm md:text-16pxt lg:text-12px font-avenirMedium flex-1 bg-[#3a86ff] text-center transition-colors ease-in duration-300 cursor-pointer hover:bg-[#629FFF];
          &.join {
            @apply rounded-bl-lg;
          }
          &.resc {
            @apply bg-white text-[#999999] hover:bg-[#ebebeb] rounded-br-lg;
          }
          &.resc-unactive {
            @apply cursor-default hover:bg-white;
            color: rgba(153, 153, 153, 0.5);
          }
          &.unactive {
            @apply cursor-default;
            background-color: rgba(208, 229, 250, 0.7);
          }
        }

        .remove-btn {
          @apply flex items-center justify-center gap-mb12 md:gap-16pxt lg:gap-vw12 py-mb16 md:py-16pxt lg:py-vw16 text-white text-12pxm md:text-16pxt lg:text-12px font-avenirMedium flex-1 bg-dashboardBtnDanger text-center transition-colors ease-in duration-300 cursor-pointer hover:bg-[#ff3232] rounded-bl-lg rounded-br-lg capitalize;
          &.loading {
            @apply cursor-default;
            fill: white;
            background-color: rgba(255, 0, 0, 0.3);
            &:hover {
              background-color: rgba(255, 0, 0, 0.3);
            }
          }
        }

        .time-app {
          @apply ml-mb10 md:ml-10pxt lg:ml-vw10 text-black-333 font-avenirBlack text-14pxm md:text-18pxt lg:text-14px;
        }

        :global(.rtl) {
          .shortName {
            @apply ml-0 md:ml-0 lg:ml-0 mr-mb20 md:mr-20pxt lg:mr-vw20;
          }
           {
            /* .time-app {
            @apply ml-0 md:ml-0 lg:ml-0 mr-mb10 md:mr-10pxt lg:mr-vw10;
          } */
          }
          .videoS {
            @apply rounded-tl-lg rounded-tr-none;
          }
          .button {
            &.join {
              @apply rounded-bl-none rounded-br-lg;
            }
            &.resc {
              @apply rounded-br-none rounded-bl-lg;
            }
          }
        }
      `}</style>
    </div>
  )
}

UpcomingAppointmentCardDetails.propTypes = {}

export default UpcomingAppointmentCardDetails
