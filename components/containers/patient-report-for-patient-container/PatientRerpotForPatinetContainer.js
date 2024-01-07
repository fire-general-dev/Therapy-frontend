import { isRTLLayout } from "@/utils/helpers"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import DocumentsTable from "./DocumentsTable"

const PatientReportForPatientContainer = ({ reportDetails, deviceType }) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <>
      <div className="wrapper">
        <div className="header">
          <div className="sessionName">
            <span>
              {t("session_id")} {reportDetails?.sessionData?.id}
            </span>
            <span className="doctor_name">{reportDetails.doctorName}</span>
          </div>
          <button onClick={() => router.back()} className="back-btn">
            {isRTLLayout(router) ? (
              <BsArrowRight className="text-24pxm md:text-28pxt lg:text-24px" />
            ) : (
              <BsArrowLeft className="text-24pxm md:text-28pxt lg:text-24px" />
            )}{" "}
            {t("back")}
          </button>
        </div>
        <div className="report-container">
          <h6 className="report-label">{t("diagnosis_report")}</h6>
          <p>{reportDetails?.sessionData?.report}</p>
        </div>
        <div className="sectionTitle">{t("documents")}</div>

        <DocumentsTable
          files={reportDetails?.sessionData?.sessionAttachments}
          deviceType={deviceType}
        />
      </div>
      <style jsx>{`
        .wrapper {
          @apply lg:w-3/4;
        }
        .header {
          @apply flex justify-between items-center;
        }
        .sessionName {
          @apply mt-mb28 md:mt-28pxt lg:mt-vw30 mb-mb8 md:mb-8pxt lg:mb-vw24 text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c];
          & span {
            @apply block;
          }
          & .doctor_name {
            @apply mt-mb8 md:mt-8pxt lg:mt-vw08;
          }
        }
        .back-btn {
          @apply flex items-center gap-1 lg:gap-2 px-mb30 md:px-30pxt lg:px-vw30 transition-all duration-200  hover:translate-x-0.5 hover:translate-y-0.5 rounded-full py-mb8 md:py-12pxt lg:py-vw12 text-18pxm md:text-22pxt lg:text-18px bg-white shadow-infoButton hover:bg-dashboardBtnPrimary hover:text-white uppercase;
        }
        .report-container {
          @apply bg-white px-mb20 md:px-20pxt lg:px-vw20 py-mb20 md:py-24pxt lg:py-vw24 rounded-lg;
          .report-label {
            @apply text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c] mb-mb30 md:mb-30pxt lg:mb-vw30;
          }
        }
        .sectionTitle {
          @apply mb-mb20 md:mb-20pxt lg:mb-vw20 text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c] mt-mb60 md:mt-60pxt lg:mt-vw60;
        }
      `}</style>
    </>
  )
}

export default PatientReportForPatientContainer
