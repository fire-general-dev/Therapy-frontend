import React from "react"

const SessionReportCard = ({
  sessionNumber,
  medicalReport,
  notes,
  sessionDate,
  onClick,
}) => {
  return (
    <div className="session-report-card">
      <div className="header">
        <div className="header-label">Session #</div>
        <div className="session-number">{sessionNumber}</div>
        <div className="w-40pxm"></div>
      </div>
      <div className="content-row">
        <div className="content-row-title">Medical Report</div>
        <div className="content-row-body">{medicalReport}</div>
      </div>
      <div className="content-row">
        <div className="content-row-title">Notes</div>
        <div className="content-row-body">
          {notes.slice(0, 50)}
          {notes.length > 51 ? "..." : ""}
        </div>
      </div>
      <div className="content-row">
        <div className="content-row-title">Session Date</div>
        <div className="content-row-body">{sessionDate}</div>
      </div>
      <div onClick={onClick} className="card-btn">
        Check Report
      </div>
      <style jsx>{`
        .session-report-card {
          @apply flex flex-col rounded-lg shadow-appointmentCard bg-white overflow-hidden;
        }
        .header {
          @apply flex items-center justify-between p-mb12 md:m-12pxt mb-mb20 md:mb-20pxt border-b-[1px] border-b-[#d5d5d5];
          .header-label {
            @apply font-avenirMedium text-18pxm md:text-22pxt lg:text-18px text-[#2E4765];
          }
        }
        .content-row {
          @apply flex px-mb20 md:px-20pxt lg:px-vw20 text-14pxm md:text-18pxt lg:text-14px text-black-333 font-avenirSlim mb-mb12 md:mb-12pxt lg:mb-vw12;
          .content-row-title {
            @apply w-200pxm;
            width: 50%;
          }
          .content-row-body {
            width: 40%;
          }
        }
        .session-number {
          @apply text-black-333 font-avenirMedium uppercase text-16pxm md:text-20pxt lg:text-16px;
        }
        .card-btn {
          @apply py-mb16 md:py-16pxt lg:py-vw16 text-white text-12pxm md:text-16pxt lg:text-12px font-avenirMedium flex-1 bg-[#3a86ff] text-center cursor-pointer;
        }
      `}</style>
    </div>
  )
}

export default SessionReportCard
