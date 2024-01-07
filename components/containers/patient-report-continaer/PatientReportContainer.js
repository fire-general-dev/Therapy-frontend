import DashboardLoaderButton from "@/components/elements/dashboardLoaderButton"
import DocumentsUploadTable from "@/components/elements/documentsUploadTable"
import TextArea from "@/components/elements/inputs/TextArea"
import PatientDetails from "@/components/elements/patientDetails"
import { submitUserSession } from "@/utils/api"
import { Formik } from "formik"
import { useTranslation } from "next-i18next"
import CKEditorComponent from "@/components/elements/inputs/ckEditorInput"

const PatientReportContainer = ({
  reportDetails,
  reportId,
  deviceType,
  user,
}) => {
  const { t } = useTranslation()

  const onSubmit = async (values) => {
    const data = {
      ...values,
      id: reportId,
      userId: reportDetails.userId,
      doctor: reportDetails.doctorId,
    }

    const submit = await submitUserSession({
      user,
      values: data,
      files: values.sessionAttachments,
    })
  }

  const initialValues = {
    ...reportDetails.sessionData,
    sessionAttachments: reportDetails.sessionData.sessionAttachments ?? [],
  }

  const patientsDetails = {
    id: reportDetails.userId,
    dob: reportDetails.userBirthday,
    email: reportDetails.patientEmail,
    gender: reportDetails.userGender,
    phoneNumber: reportDetails.PatentPhone,
    completedAppointments: reportDetails.PreviousVists,
    upcomingAppointments: reportDetails.UpcomingVists,
  }

  return (
    <>
      <div className="wrapper">
        <div className="sessionName">
          <span>
            {t("session_id")} {reportDetails?.sessionData?.id}
          </span>
          <div className="patientName">
            {t("patient")} <span>{reportDetails.patentName}</span>
          </div>
        </div>
        <PatientDetails data={patientsDetails} />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={() => {}}
        >
          {({
            isSubmitting,
            isValid,
            setFieldValue,
            values,
            touched,
            setFieldTouched,
            handleSubmit,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="sectionTitle">{t("sessions_report")}</div>
                {/* <TextArea
                  label={t("sessions_report")}
                  id="Sessions_Report"
                  isRequired={true}
                  name="report"
                  placeholder={t("add_session_report")}
                /> */}
                <CKEditorComponent
                  name="report"
                  value={values.report}
                  onChange={setFieldValue}
                />
                {/* <DashboardTextArea /> */}
                <div className="sectionTitle">{t("private_notes")}</div>
                {/* <TextArea
                  label={t("sessions_notes")}
                  id="Sessions_notes"
                  isRequired={true}
                  name="notes"
                  placeholder={t("add_session_private_notes")}
                /> */}
                <CKEditorComponent
                  name="notes"
                  value={values.notes}
                  onChange={setFieldValue}
                />
                {/* <DashboardTextArea /> */}
                <div className="sectionTitle">{t("documents")}</div>
                <div className="row">
                  <DocumentsUploadTable
                    name="sessionAttachments"
                    files={values.sessionAttachments}
                    setFieldValue={setFieldValue}
                    className="flex-1"
                    setFieldTouched={setFieldTouched}
                    deviceType={deviceType}
                  />
                </div>
                <div className="row contentEnd">
                  <DashboardLoaderButton
                    isDisabled={Object.keys(touched).length == 0}
                    isLoading={isSubmitting}
                  >
                    {t("update")}
                  </DashboardLoaderButton>
                </div>
              </form>
            )
          }}
        </Formik>
      </div>
      <style jsx>{`
        .wrapper {
          @apply lg:w-3/4;
        }
        .sectionTitle {
          @apply mb-mb20 md:mb-20pxt lg:mb-vw20 text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c] mt-mb60 md:mt-60pxt lg:mt-vw60;
        }
        .patientName {
          @apply text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c];
          span {
            @apply ml-mb20 md:ml-20pxt lg:ml-vw60 font-avenirBlack text-30pxm md:text-34pxt lg:text-30px text-[#0090dd];
          }
        }
        .sessionName {
          @apply mt-mb28 md:mt-28pxt lg:mt-vw30 mb-mb8 md:mb-8pxt lg:mb-vw24 flex items-center text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c] justify-between;
        }
        .row {
          @apply flex mt-mb40 md:mt-40pxt lg:mt-vw40;
        }
        .contentEnd {
          @apply justify-end;
        }

        :global(.rtl) {
          .patientName {
            span {
              @apply ml-0 md:ml-0 lg:ml-0 mr-mb20 md:mr-20pxt lg:mr-vw60;
            }
          }
        }
      `}</style>
    </>
  )
}

export default PatientReportContainer
