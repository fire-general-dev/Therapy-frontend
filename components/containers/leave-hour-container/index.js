import DashboardLoaderButton from "@/components/elements/dashboardLoaderButton"
import DateField from "@/components/elements/inputs/DateField"
import TimeField from "@/components/elements/inputs/TimeField"
import { submitLeaveHours } from "@/utils/api"
import { Form, Formik } from "formik"
import moment from "moment"
import { useTranslation } from "next-i18next"

const LeaveHourContainer = ({ user, onOpenInfoModal, onOpenSuccessModal }) => {
  const { t } = useTranslation()

  const handleSubmit = async (values) => {
    const requestDate = new Date(values.requestDate)
    requestDate.setUTCHours(0, 0, 0, 0)
    const response = await submitLeaveHours({
      user,
      requestDate: requestDate,
      startTime: moment(values.startTime).format("HH:mm:ss"),
      endTime: moment(values.endTime).format("HH:mm:ss"),
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
          requestDate: new Date(),
          startTime: new Date(),
          endTime: new Date(),
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
                    name="requestDate"
                    label={t("date")}
                    setFieldValue={setFieldValue}
                  />
                </div>
                <div className="time-wrapper">
                  <span>{t("time")}</span>
                  <div className="hours-wrapper">
                    <TimeField
                      name="startTime"
                      setFieldValue={setFieldValue}
                      selected={values.startTime}
                    />
                    <div className="">-</div>
                    <TimeField
                      name="endTime"
                      setFieldValue={setFieldValue}
                      selected={values.endTime}
                    />
                  </div>
                </div>
                <DashboardLoaderButton
                  classList="mt-vw100"
                  isLoading={isSubmitting}
                  classListContainer="flex justify-end"
                  isDisabled={!isValid || isSubmitting}
                >
                  {t("add_leave_hours")}
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
          @apply border-b border-b-[#b7b7b7] flex relative items-end;
          span {
            @apply flex-1;
          }
        }

        .time-wrapper {
          @apply flex items-center justify-between px-mb20 md:px-20pxt lg:px-vw24;
        }

        .hours-wrapper {
          @apply flex items-center gap-mb20 md:gap-20pxt lg:gap-vw20;
        }
      `}</style>
    </div>
  )
}

export default LeaveHourContainer
