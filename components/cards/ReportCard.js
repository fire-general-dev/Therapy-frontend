import React from "react"
import { useTranslation } from "next-i18next"

const ReportCard = ({
  sessionNumber,
  medicalReport,
  speciallist,
  payments,
  reviews,
  sessionDate,
  onClick,
}) => {
  const { t } = useTranslation()

  return (
    <div className="patient-card">
      <div className="header">
        <div>{t("session")} #</div>
        <div className="name">{sessionNumber}</div>
        <div className="w-40pxm"></div>
      </div>
      <div className="content-row">
        <div className={`content-row-title`}>{t("medical_report")}</div>
        <div
          className={`content-row-body ${
            medicalReport == "Pending" ? "text-[#f00]" : "text-green-300"
          }`}
        >
          {medicalReport}
        </div>
      </div>
      <div className="content-row">
        <div className="content-row-title">{t("speciallist")}</div>
        <div className="content-row-body">{speciallist}</div>
      </div>
      <div className="content-row">
        <div className="content-row-title">{t("payments")}</div>
        <div className="content-row-body">{payments}</div>
      </div>
      <div className="content-row">
        <div className="content-row-title">{t("reviews")}</div>
        <div className="content-row-body">{reviews}</div>
      </div>
      <div className="content-row">
        <div className="content-row-title">{t("session_date")}</div>
        <div className="content-row-body">{reviews}</div>
      </div>
      <div onClick={onClick} className="card-btn">
        {t("check_report")}
      </div>
      <style jsx>{`
        .patient-card {
          @apply flex flex-col rounded-lg shadow-appointmentCard bg-white overflow-hidden;
        }
        .header {
          @apply flex items-center justify-between py-mb12 md:my-12pxt mb-mb20 md:mb-20pxt border-b-[1px] border-b-[#d5d5d5] px-mb8 md:px-8pxt lg:px-vw08;
        }
        .content-row {
          @apply flex items-center justify-between px-mb20 md:px-20pxt lg:px-vw20 text-14pxm md:text-18pxt lg:text-14px text-black-333 font-avenirSlim mb-mb12 md:mb-12pxt lg:mb-vw12;
        }
        .short-name {
          @apply flex items-center justify-center rounded-full text-18pxm md:text-22pxt lg:text-18px font-avenirSlim p-mb16 md:p-20pxt lg:p-vw08 ml-mb20 md:ml-20pxt lg:ml-vw20 text-white w-20pxm h-20pxm md:w-20pxt md:h-20pxt lg:w-vw40 lg:h-vw40 text-center;
        }
        .name {
          @apply text-black-333 font-avenirMedium uppercase text-16pxm md:text-20pxt lg:text-16px;
        }
        .card-btn {
          @apply py-mb16 md:py-16pxt lg:py-vw16 text-white text-12pxm md:text-16pxt lg:text-12px font-avenirMedium flex-1 bg-[#3a86ff] text-center cursor-pointer;
        }
        .content-row-title {
          flex: 1;
        }
        .content-row-body {
          flex: 1;
        }

        :global(.rtl) {
          .short-name {
            @apply ml-0 md:ml-0 lg:ml-0 mr-mb20 md:mr-20pxt lg:mr-vw20;
          }
        }
      `}</style>
    </div>
  )
}

export default ReportCard
