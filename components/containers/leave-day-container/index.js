import DashboardLoaderButton from "@/components/elements/dashboardLoaderButton"
import DateField from "@/components/elements/inputs/DateField"
import TextField from "@/components/elements/inputs/TextField"
import { submitLeaveDays } from "@/utils/api"
import { Form, Formik } from "formik"
import { useTranslation } from "next-i18next"

const LeaveDayContainer = ({ user, onOpenInfoModal, onOpenSuccessModal }) => {
  const { t } = useTranslation()

  const handleSubmit = async (values) => {
    const start = new Date(values.startDate)
    const end = new Date(values.endDate)
    start.setUTCHours(0, 0, 0, 0)
    end.setUTCHours(23, 59, 59, 999)
    const response = await submitLeaveDays({
      user,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    })
    if (!response.success) {
      onOpenInfoModal(response.message || t("have_appointments"))
      return
    }
    onOpenSuccessModal(t("leave_updated"))
  }

  return (
    <div className="wrapper">
      <Formik
        initialValues={{
          startDate: new Date(),
          endDate: new Date(),
        }}
        onSubmit={async (values) => {
          await handleSubmit(values)
        }}
      >
        {({ setFieldValue, values, isSubmitting, isValid }) => (
          <Form>
            <div className="flex flex-col lg:flex-row gap-mb60 md:gap-60pxt lg:gap-vw60">
              <div className="mb-mb30 md:mb-30pxt lg:mb-vw30 flex-1">
                <div className="line mb-mb30 md:mb-30pxt lg:mb-vw30">
                  <DateField
                    name="startDate"
                    label={t("from")}
                    setFieldValue={setFieldValue}
                  />
                  {/* <TextField name="startDate" type="date" label={t("from")} /> */}
                </div>
                <div className="line">
                  <DateField
                    name="endDate"
                    label={t("to")}
                    setFieldValue={setFieldValue}
                  />
                  {/* <TextField name="endDate" type="date" label={t("to")} /> */}
                </div>
                <DashboardLoaderButton
                  classList="mt-vw100"
                  isLoading={isSubmitting}
                  classListContainer="flex justify-end"
                  isDisabled={!isValid || isSubmitting}
                >
                  {t("add_leave_days")}
                </DashboardLoaderButton>
              </div>
              <div className="flex-1">
                {/* <div className="line">
                  <span>{t("add_dates_override")}</span>
                </div> */}
              </div>
              <div className="flex-1"></div>
            </div>
          </Form>
        )}
      </Formik>
      <style jsx>{`
        .wrapper {
          @apply bg-white rounded-md px-mb20 md:px-20pxt lg:px-vw20 py-mb40 md:py-40pxt lg:py-vw40;
        }

        .line {
          @apply border-b border-b-[#b7b7b7] flex px-mb24 md:px-24pxt lg:px-vw24 relative items-end;
          span {
            @apply flex-1;
          }
        }
      `}</style>
    </div>
  )
}

export default LeaveDayContainer
