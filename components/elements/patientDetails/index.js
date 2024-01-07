import React from "react"
import PropTypes from "prop-types"
import { useTranslation } from "next-i18next"

function PatientDetails(props) {
  const { data = {} } = props
  const { t } = useTranslation()
  const {
    dob,
    email,
    gender,
    phoneNumber,
    completedAppointments,
    upcomingAppointments,
  } = data
  return (
    <div className="wrapper">
      <div className="first-column">
        <div className="row">
          <div className="line">
            <span className="line-label">{t("date_of_birth")}</span>
            <span className="line-text">{dob}</span>
          </div>
          <div className="line">
            <span className="line-label">{t("gender")}</span>
            <span className="line-text">{gender}</span>
          </div>
        </div>
        <div className="row">
          <div className="line">
            <span className="line-label">{t("email")}</span>
            <span className="line-text">{email}</span>
          </div>
          <div className="line">
            <span className="line-label">{t("phone_number")}</span>
            <span className="line-text">{phoneNumber}</span>
          </div>
        </div>
        <div className="row">
          <div className="line">
            <span className="line-label">{t("completed_appointments")}</span>
            <span className="line-text">{completedAppointments}</span>
          </div>
          <div className="line">
            <span className="line-label">{t("upcoming_appointments")}</span>
            <span className="line-text">{upcomingAppointments}</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          @apply bg-white px-mb20 md:px-20pxt lg:px-vw20 pb-mb20 md:pb-24pxt lg:pb-vw24 flex flex-col lg:flex-row rounded-lg text-[#0e0d47] text-14pxm md:text-18pxt lg:text-14px;
        }
        .first-column,
        .second-column {
          @apply flex flex-col lg:px-vw08;
          flex: 4;
        }
        .row {
          @apply flex flex-col lg:flex-row gap-6 lg:gap-4;
        }
        .line {
          @apply border-b border-b-[#b7b7b7] mt-mb20 md:mt-20pxt lg:mt-vw40 px-mb12 md:px-12pxt lg:px-vw12 flex items-end;
          flex: 1;
          span {
            @apply inline-block;
          }
          .line-label {
            @apply min-w-175pxm md:min-w-240pxt lg:min-w-175px;
          }
        }
        .line-text {
          @apply font-avenirBold;
          overflow-wrap: break-word;
          word-wrap: break-word;
          -ms-word-break: break-word;
          word-break: break-word;
        }
      `}</style>
    </div>
  )
}

PatientDetails.propTypes = {}

export default PatientDetails
