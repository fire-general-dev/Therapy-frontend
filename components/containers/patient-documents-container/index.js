import DashboardLoaderButton from "@/components/elements/dashboardLoaderButton"
import DocumentsUploadTable from "@/components/elements/documentsUploadTable"
import { Formik, Form } from "formik"
import React from "react"
import { useTranslation } from "next-i18next"

// const formSchema = () => Yup.object().shape({})

function PatientDocumentsContainer({ documents, deviceType }) {
  const { t } = useTranslation()

  const onSubmit = async (values) => {}
  return (
    <div className="outWrapper">
      <Formik
        initialValues={{
          documents: documents,
        }}
        onSubmit={onSubmit}
        // validationSchema={formSchema}
      >
        {({ isSubmitting, isValid, setFieldValue, values }) => {
          return (
            <Form>
              <div className="wrapper">
                <DocumentsUploadTable
                  name="documents"
                  files={values.documents}
                  setFieldValue={setFieldValue}
                  className="flex-1"
                  deviceType={deviceType}
                  isPatient={true}
                />
              </div>
              <div className="submit-container">
                <DashboardLoaderButton isLoading={false}>
                  {t("update")}
                </DashboardLoaderButton>
              </div>
            </Form>
          )
        }}
      </Formik>
      <style jsx>
        {`
          .wrapper {
            @apply bg-white px-mb20 md:px-20pxt lg:px-vw20 py-mb20 md:py-20pxt lg:py-vw20 flex flex-col lg:flex-row gap-4 md:gap-8 lg:gap-12 rounded-lg text-[#0e0d47] text-14pxm md:text-18pxt lg:text-14px;
          }
          .submit-container {
            @apply flex justify-end mt-mb60 md:mt-60pxt lg:mt-vw60;
          }
        `}
      </style>
    </div>
  )
}
PatientDocumentsContainer.propTypes = {}
export default PatientDocumentsContainer
