import TextField from "@/components/elements/inputs/TextField"
import TimeField from "@/components/elements/inputs/TimeField"
import { Field, FieldArray, Form, Formik } from "formik"
import { useTranslation } from "next-i18next"
import DeleteIcon from "@/images/icons/delete-icon.svg"
import AddIcon from "@/images/icons/add-icon.svg"
import Image from "next/image"
import DashboardLoaderButton from "@/components/elements/dashboardLoaderButton"
import DateField from "@/components/elements/inputs/DateField"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import moment from "moment"

const AvailabilityContainer = ({ onOpenSuccessModal, onSubmit }) => {
  const { t } = useTranslation()

  const validateTimes = (values, props) => {
    // (StartA <= EndB) and (EndA >= StartB)
    const errors = {}
    // Saturday
    values.Saturday.workTimes.forEach((mainValue, index) => {
      values.Saturday.workTimes.forEach((subValue, idx) => {
        if (index == idx) return
        if (
          mainValue.startTime == "" ||
          mainValue.endTime == "" ||
          subValue.startTime == "" ||
          subValue.endTime == ""
        ) {
          return
        }
        if (
          mainValue.startTime <= subValue.endTime &&
          mainValue.endTime >= subValue.startTime
        ) {
          errors.Saturday = "overlapping_error"
        }
      })
    })

    // Sunday
    values.Sunday.workTimes.forEach((mainValue, index) => {
      values.Sunday.workTimes.forEach((subValue, idx) => {
        if (index == idx) return
        if (
          mainValue.startTime == "" ||
          mainValue.endTime == "" ||
          subValue.startTime == "" ||
          subValue.endTime == ""
        ) {
          return
        }
        if (
          mainValue.startTime <= subValue.endTime &&
          mainValue.endTime >= subValue.startTime
        ) {
          errors.Sunday = "overlapping_error"
        }
      })
    })

    // Monday
    values.Monday.workTimes.forEach((mainValue, index) => {
      values.Monday.workTimes.forEach((subValue, idx) => {
        if (index == idx) return
        if (
          mainValue.startTime == "" ||
          mainValue.endTime == "" ||
          subValue.startTime == "" ||
          subValue.endTime == ""
        ) {
          return
        }
        if (
          mainValue.startTime <= subValue.endTime &&
          mainValue.endTime >= subValue.startTime
        ) {
          errors.Monday = "overlapping_error"
        }
      })
    })

    // Tuesday
    values.Tuesday.workTimes.forEach((mainValue, index) => {
      values.Tuesday.workTimes.forEach((subValue, idx) => {
        if (index == idx) return
        if (
          mainValue.startTime == "" ||
          mainValue.endTime == "" ||
          subValue.startTime == "" ||
          subValue.endTime == ""
        ) {
          return
        }
        if (
          mainValue.startTime <= subValue.endTime &&
          mainValue.endTime >= subValue.startTime
        ) {
          errors.Tuesday = "overlapping_error"
        }
      })
    })

    // Wednesday
    values.Wednesday.workTimes.forEach((mainValue, index) => {
      values.Wednesday.workTimes.forEach((subValue, idx) => {
        if (index == idx) return
        if (
          mainValue.startTime == "" ||
          mainValue.endTime == "" ||
          subValue.startTime == "" ||
          subValue.endTime == ""
        ) {
          return
        }
        if (
          mainValue.startTime <= subValue.endTime &&
          mainValue.endTime >= subValue.startTime
        ) {
          errors.Wednesday = "overlapping_error"
        }
      })
    })

    // Thursday
    values.Thursday.workTimes.forEach((mainValue, index) => {
      values.Thursday.workTimes.forEach((subValue, idx) => {
        if (index == idx) return
        if (
          mainValue.startTime == "" ||
          mainValue.endTime == "" ||
          subValue.startTime == "" ||
          subValue.endTime == ""
        ) {
          return
        }
        if (
          mainValue.startTime <= subValue.endTime &&
          mainValue.endTime >= subValue.startTime
        ) {
          errors.Thursday = "overlapping_error"
        }
      })
    })

    // Firday
    values.Friday.workTimes.forEach((mainValue, index) => {
      values.Friday.workTimes.forEach((subValue, idx) => {
        if (index == idx) return
        if (
          mainValue.startTime == "" ||
          mainValue.endTime == "" ||
          subValue.startTime == "" ||
          subValue.endTime == ""
        ) {
          return
        }
        if (
          mainValue.startTime <= subValue.endTime &&
          mainValue.endTime >= subValue.startTime
        ) {
          errors.Friday = "overlapping_error"
        }
      })
    })

    return errors
  }

  return (
    <div className="wrapper">
      <Formik
        initialValues={{
          startDate: new Date(),
          endDate: new Date(),
          Saturday: {
            enabled: true,
            workTimes: [
              {
                startTime: "",
                endTime: "",
              },
            ],
          },
          Sunday: {
            enabled: true,
            workTimes: [
              {
                startTime: "",
                endTime: "",
              },
            ],
          },
          Monday: {
            enabled: true,
            workTimes: [
              {
                startTime: "",
                endTime: "",
              },
            ],
          },
          Tuesday: {
            enabled: true,
            workTimes: [
              {
                startTime: "",
                endTime: "",
              },
            ],
          },
          Wednesday: {
            enabled: true,
            workTimes: [
              {
                startTime: "",
                endTime: "",
              },
            ],
          },
          Thursday: {
            enabled: true,
            workTimes: [
              {
                startTime: "",
                endTime: "",
              },
            ],
          },
          Friday: {
            enabled: false,
            workTimes: [
              {
                startTime: "",
                endTime: "",
              },
            ],
          },
        }}
        onSubmit={async (values) => {
          const nowDate = new Date()

          const saturdayTimes = values.Saturday.workTimes
            .filter((time) => {
              if (time.startTime && time.endTime) return time
            })
            .map((time) => {
              return {
                ...time,
                startTime: moment(time.startTime).format("HH:mm:ss"),
                endTime: moment(time.endTime).format("HH:mm:ss"),
              }
            })

          const sundayTimes = values.Sunday.workTimes
            .filter((time) => {
              if (time.startTime && time.endTime) return time
            })
            .map((time) => {
              return {
                ...time,
                startTime: moment(time.startTime).format("HH:mm:ss"),
                endTime: moment(time.endTime).format("HH:mm:ss"),
              }
            })

          const mondayTimes = values.Monday.workTimes
            .filter((time) => {
              if (time.startTime && time.endTime) return time
            })
            .map((time) => {
              return {
                ...time,
                startTime: moment(time.startTime).format("HH:mm:ss"),
                endTime: moment(time.endTime).format("HH:mm:ss"),
              }
            })

          const tuesdayTimes = values.Tuesday.workTimes
            .filter((time) => {
              if (time.startTime && time.endTime) return time
            })
            .map((time) => {
              return {
                ...time,
                startTime: moment(time.startTime).format("HH:mm:ss"),
                endTime: moment(time.endTime).format("HH:mm:ss"),
              }
            })

          const wednesdayTimes = values.Wednesday.workTimes
            .filter((time) => {
              if (time.startTime && time.endTime) return time
            })
            .map((time) => {
              return {
                ...time,
                startTime: moment(time.startTime).format("HH:mm:ss"),
                endTime: moment(time.endTime).format("HH:mm:ss"),
              }
            })

          const thursdayTimes = values.Thursday.workTimes
            .filter((time) => {
              if (time.startTime && time.endTime) return time
            })
            .map((time) => {
              return {
                ...time,
                startTime: moment(time.startTime).format("HH:mm:ss"),
                endTime: moment(time.endTime).format("HH:mm:ss"),
              }
            })

          const fridayTimes = values.Friday.workTimes
            .filter((time) => {
              if (time.startTime && time.endTime) return time
            })
            .map((time) => {
              return {
                ...time,
                startTime: moment(time.startTime).format("HH:mm:ss"),
                endTime: moment(time.endTime).format("HH:mm:ss"),
              }
            })

          const weekDays = {
            Saturday: { ...values.Saturday, workTimes: saturdayTimes },
            Sunday: { ...values.Sunday, workTimes: sundayTimes },
            Monday: { ...values.Monday, workTimes: mondayTimes },
            Tuesday: { ...values.Tuesday, workTimes: tuesdayTimes },
            Wednesday: { ...values.Wednesday, workTimes: wednesdayTimes },
            Thursday: { ...values.Thursday, workTimes: thursdayTimes },
            Friday: { ...values.Friday, workTimes: fridayTimes },
          }

          if (weekDays.Saturday.workTimes.length < 1) delete weekDays.Saturday
          if (weekDays.Sunday.workTimes.length < 1) delete weekDays.Sunday
          if (weekDays.Monday.workTimes.length < 1) delete weekDays.Monday
          if (weekDays.Tuesday.workTimes.length < 1) delete weekDays.Tuesday
          if (weekDays.Wednesday.workTimes.length < 1) delete weekDays.Wednesday
          if (weekDays.Thursday.workTimes.length < 1) delete weekDays.Thursday
          if (weekDays.Friday.workTimes.length < 1) delete weekDays.Friday

          await onSubmit({
            startDate: values.startDate,
            endDate: values.endDate,
            weekDays,
          })

          onOpenSuccessModal(true)
        }}
        validate={validateTimes}
      >
        {({ setFieldValue, values, isSubmitting, isValid, errors }) => {
          return (
            <Form>
              <div className="flex gap-mb30 md:gap-30pxt lg:gap-vw30">
                <div className="line">
                  <DateField
                    name="startDate"
                    label={t("from")}
                    setFieldValue={setFieldValue}
                  />
                </div>
                <div className="line">
                  <DateField
                    name="endDate"
                    label={t("to")}
                    setFieldValue={setFieldValue}
                  />
                </div>
              </div>

              <div className="tables-wrapper">
                <div className="coulm flex-2 mr-vw40">
                  <div className="coulmn-header">
                    <div className="line flex-1">
                      <label className="flex-1">{t("available_days")}</label>
                      <div className="flex-2 hidden lg:flex">
                        <span>{t("set_hours")}</span>
                      </div>
                    </div>
                  </div>

                  {/* days info here */}
                  {/* Saturday */}
                  <div className="days-wrapper">
                    <div className="user-checkbox">
                      <Field
                        name="Saturday.enabled"
                        type="checkbox"
                        className="checkbox"
                      />
                      <label>{t("saturday")}</label>
                    </div>
                    <div className="flex-2">
                      <FieldArray
                        validate
                        name="Saturday.workTimes"
                        render={(arrayHelpers) => {
                          const workTimes = values?.Saturday?.workTimes
                          return (
                            <div>
                              {workTimes && workTimes.length > 0
                                ? workTimes.map((time, index) => (
                                    <div key={index}>
                                      <div
                                        className={`hours-wrapper ${
                                          !values?.Saturday?.enabled
                                            ? "opacity-30"
                                            : ""
                                        }`}
                                      >
                                        <TimeField
                                          name={`Saturday.workTimes.${index}.startTime`}
                                          setFieldValue={setFieldValue}
                                          disabled={!values?.Saturday?.enabled}
                                          selected={
                                            values?.Saturday?.workTimes[index]
                                              ?.startTime
                                          }
                                        />
                                        <div className="">-</div>
                                        <TimeField
                                          name={`Saturday.workTimes.${index}.endTime`}
                                          setFieldValue={setFieldValue}
                                          disabled={!values?.Saturday?.enabled}
                                          selected={
                                            values?.Saturday?.workTimes[index]
                                              ?.endTime
                                          }
                                        />

                                        {workTimes.length == index + 1 ? (
                                          <div className="w-mb30 md:w-30pxt lg:w-vw30">
                                            <Image
                                              className={`${
                                                errors?.Saturday
                                                  ? "opacity-30"
                                                  : "cursor-pointer"
                                              }`}
                                              src={AddIcon}
                                              alt="Add"
                                              onClick={() => {
                                                if (errors?.Saturday) {
                                                  return
                                                }
                                                if (
                                                  !values?.Saturday?.enabled
                                                ) {
                                                  return
                                                }
                                                arrayHelpers.push({
                                                  startTime: "",
                                                  endTime: "",
                                                })
                                              }}
                                            />
                                          </div>
                                        ) : (
                                          <div className="w-vw30"></div>
                                        )}
                                        {index > 0 ? (
                                          <Image
                                            onClick={() => {
                                              if (!values?.Saturday?.enabled) {
                                                return
                                              }
                                              arrayHelpers.remove(index)
                                            }}
                                            className="cursor-pointer"
                                            src={DeleteIcon}
                                            alt="Delete"
                                          />
                                        ) : null}
                                      </div>
                                    </div>
                                  ))
                                : null}
                              <div className="error-message">
                                {errors?.Saturday ? t(errors.Saturday) : null}
                              </div>
                            </div>
                          )
                        }}
                      />
                    </div>
                  </div>

                  {/* Sunday */}
                  <div className="days-wrapper">
                    <div className="user-checkbox">
                      <Field
                        name="Sunday.enabled"
                        type="checkbox"
                        className="checkbox"
                      />
                      <label>{t("sunday")}</label>
                    </div>
                    <div className="flex-2">
                      <FieldArray
                        name="Sunday.workTimes"
                        render={(arrayHelpers) => {
                          const workTimes = values?.Sunday?.workTimes
                          return (
                            <div>
                              {workTimes && workTimes.length > 0
                                ? workTimes.map((time, index) => (
                                    <div key={index}>
                                      <div
                                        className={`hours-wrapper ${
                                          !values?.Sunday?.enabled
                                            ? "opacity-30"
                                            : ""
                                        }`}
                                      >
                                        <TimeField
                                          name={`Sunday.workTimes.${index}.startTime`}
                                          disabled={!values?.Sunday?.enabled}
                                          setFieldValue={setFieldValue}
                                          selected={
                                            values?.Sunday?.workTimes[index]
                                              ?.startTime
                                          }
                                        />
                                        <div className="">-</div>
                                        <TimeField
                                          name={`Sunday.workTimes.${index}.endTime`}
                                          setFieldValue={setFieldValue}
                                          disabled={!values?.Sunday?.enabled}
                                          selected={
                                            values?.Sunday?.workTimes[index]
                                              ?.endTime
                                          }
                                        />

                                        {workTimes.length == index + 1 ? (
                                          <div className="w-mb30 md:w-30pxt lg:w-vw30">
                                            <Image
                                              className={`${
                                                errors?.Sunday
                                                  ? "opacity-30"
                                                  : "cursor-pointer"
                                              }`}
                                              src={AddIcon}
                                              alt="Add"
                                              onClick={() => {
                                                if (errors?.Sunday) return
                                                if (!values?.Sunday?.enabled)
                                                  return
                                                arrayHelpers.push({
                                                  startTime: "",
                                                  endTime: "",
                                                })
                                              }}
                                            />
                                          </div>
                                        ) : (
                                          <div className="w-vw30"></div>
                                        )}
                                        {index > 0 ? (
                                          <Image
                                            onClick={() => {
                                              if (!values?.Sunday?.enabled)
                                                return
                                              arrayHelpers.remove(index)
                                            }}
                                            className="cursor-pointer"
                                            src={DeleteIcon}
                                            alt="Delete"
                                          />
                                        ) : null}
                                      </div>
                                    </div>
                                  ))
                                : null}
                              <div className="error-message">
                                {errors?.Sunday ? t(errors.Sunday) : null}
                              </div>
                            </div>
                          )
                        }}
                      />
                    </div>
                  </div>

                  {/* Monday */}
                  <div className="days-wrapper">
                    <div className="user-checkbox">
                      <Field
                        name="Monday.enabled"
                        type="checkbox"
                        className="checkbox"
                      />
                      <label>{t("monday")}</label>
                    </div>
                    <div className="flex-2">
                      <FieldArray
                        name="Monday.workTimes"
                        render={(arrayHelpers) => {
                          const workTimes = values?.Monday?.workTimes
                          return (
                            <div>
                              {workTimes && workTimes.length > 0
                                ? workTimes.map((time, index) => (
                                    <div key={index}>
                                      <div
                                        className={`hours-wrapper ${
                                          !values?.Monday?.enabled
                                            ? "opacity-30"
                                            : ""
                                        }`}
                                      >
                                        <TimeField
                                          name={`Monday.workTimes.${index}.startTime`}
                                          disabled={!values?.Monday?.enabled}
                                          setFieldValue={setFieldValue}
                                          selected={
                                            values?.Monday?.workTimes[index]
                                              ?.startTime
                                          }
                                        />
                                        <div className="">-</div>
                                        <TimeField
                                          name={`Monday.workTimes.${index}.endTime`}
                                          disabled={!values?.Monday?.enabled}
                                          setFieldValue={setFieldValue}
                                          selected={
                                            values?.Monday?.workTimes[index]
                                              ?.endTime
                                          }
                                        />

                                        {workTimes.length == index + 1 ? (
                                          <div className="w-mb30 md:w-30pxt lg:w-vw30">
                                            <Image
                                              className={`${
                                                errors?.Monday
                                                  ? "opacity-30"
                                                  : "cursor-pointer"
                                              }`}
                                              src={AddIcon}
                                              alt="Add"
                                              onClick={() => {
                                                if (errors?.Monday) return
                                                if (!values?.Monday?.enabled)
                                                  return
                                                arrayHelpers.push({
                                                  startTime: "",
                                                  endTime: "",
                                                })
                                              }}
                                            />
                                          </div>
                                        ) : (
                                          <div className="w-vw30"></div>
                                        )}
                                        {index > 0 ? (
                                          <Image
                                            onClick={() => {
                                              if (!values?.Monday?.enabled)
                                                return
                                              arrayHelpers.remove(index)
                                            }}
                                            className="cursor-pointer"
                                            src={DeleteIcon}
                                            alt="Delete"
                                          />
                                        ) : null}
                                      </div>
                                    </div>
                                  ))
                                : null}

                              <div className="error-message">
                                {errors?.Monday ? t(errors.Monday) : null}
                              </div>
                            </div>
                          )
                        }}
                      />
                    </div>
                  </div>

                  {/* Tuesday */}
                  <div className="days-wrapper">
                    <div className="user-checkbox">
                      <Field
                        name="Tuesday.enabled"
                        type="checkbox"
                        className="checkbox"
                      />
                      <label>{t("tuesday")}</label>
                    </div>
                    <div className="flex-2">
                      <FieldArray
                        name="Tuesday.workTimes"
                        render={(arrayHelpers) => {
                          const workTimes = values?.Tuesday?.workTimes
                          return (
                            <div>
                              {workTimes && workTimes.length > 0
                                ? workTimes.map((time, index) => (
                                    <div key={index}>
                                      <div
                                        className={`hours-wrapper ${
                                          !values?.Tuesday?.enabled
                                            ? "opacity-30"
                                            : ""
                                        }`}
                                      >
                                        <TimeField
                                          name={`Tuesday.workTimes.${index}.startTime`}
                                          setFieldValue={setFieldValue}
                                          disabled={!values?.Tuesday?.enabled}
                                          selected={
                                            values?.Tuesday?.workTimes[index]
                                              ?.startTime
                                          }
                                        />
                                        <div className="">-</div>
                                        <TimeField
                                          name={`Tuesday.workTimes.${index}.endTime`}
                                          setFieldValue={setFieldValue}
                                          disabled={!values?.Tuesday?.enabled}
                                          selected={
                                            values?.Tuesday?.workTimes[index]
                                              ?.endTime
                                          }
                                        />

                                        {workTimes.length == index + 1 ? (
                                          <div className="w-mb30 md:w-30pxt lg:w-vw30">
                                            <Image
                                              className={`${
                                                errors?.Tuesday
                                                  ? "opacity-30"
                                                  : "cursor-pointer"
                                              }`}
                                              src={AddIcon}
                                              alt="Add"
                                              onClick={() => {
                                                if (errors?.Tuesday) return
                                                if (!values?.Tuesday?.enabled)
                                                  return
                                                arrayHelpers.push({
                                                  startTime: "",
                                                  endTime: "",
                                                })
                                              }}
                                            />
                                          </div>
                                        ) : (
                                          <div className="w-vw30"></div>
                                        )}
                                        {index > 0 ? (
                                          <Image
                                            onClick={() => {
                                              if (!values?.Tuesday?.enabled)
                                                return
                                              arrayHelpers.remove(index)
                                            }}
                                            className="cursor-pointer"
                                            src={DeleteIcon}
                                            alt="Delete"
                                          />
                                        ) : null}
                                      </div>
                                    </div>
                                  ))
                                : null}

                              <div className="error-message">
                                {errors?.Tuesday ? t(errors.Tuesday) : null}
                              </div>
                            </div>
                          )
                        }}
                      />
                    </div>
                  </div>

                  {/* Wednesday */}
                  <div className="days-wrapper">
                    <div className="user-checkbox">
                      <Field
                        name="Wednesday.enabled"
                        type="checkbox"
                        className="checkbox"
                      />
                      <label>{t("wednesday")}</label>
                    </div>
                    <div className="flex-2">
                      <FieldArray
                        name="Wednesday.workTimes"
                        render={(arrayHelpers) => {
                          const workTimes = values?.Wednesday?.workTimes
                          return (
                            <div>
                              {workTimes && workTimes.length > 0
                                ? workTimes.map((time, index) => (
                                    <div key={index}>
                                      <div
                                        className={`hours-wrapper ${
                                          !values?.Wednesday?.enabled
                                            ? "opacity-30"
                                            : ""
                                        }`}
                                      >
                                        <TimeField
                                          name={`Wednesday.workTimes.${index}.startTime`}
                                          setFieldValue={setFieldValue}
                                          disabled={!values?.Wednesday?.enabled}
                                          selected={
                                            values?.Wednesday?.workTimes[index]
                                              ?.startTime
                                          }
                                        />
                                        <div className="">-</div>
                                        <TimeField
                                          name={`Wednesday.workTimes.${index}.endTime`}
                                          setFieldValue={setFieldValue}
                                          disabled={!values?.Wednesday?.enabled}
                                          selected={
                                            values?.Wednesday?.workTimes[index]
                                              ?.endTime
                                          }
                                        />

                                        {workTimes.length == index + 1 ? (
                                          <div className="w-mb30 md:w-30pxt lg:w-vw30">
                                            <Image
                                              className={`${
                                                errors?.Wednesday
                                                  ? "opacity-30"
                                                  : "cursor-pointer"
                                              }`}
                                              src={AddIcon}
                                              alt="Add"
                                              onClick={() => {
                                                if (errors?.Wednesday) return
                                                if (!values?.Wednesday?.enabled)
                                                  return
                                                arrayHelpers.push({
                                                  startTime: "",
                                                  endTime: "",
                                                })
                                              }}
                                            />
                                          </div>
                                        ) : (
                                          <div className="w-vw30"></div>
                                        )}
                                        {index > 0 ? (
                                          <Image
                                            onClick={() => {
                                              if (!values?.Wednesday?.enabled)
                                                return
                                              arrayHelpers.remove(index)
                                            }}
                                            className="cursor-pointer"
                                            src={DeleteIcon}
                                            alt="Delete"
                                          />
                                        ) : null}
                                      </div>
                                    </div>
                                  ))
                                : null}

                              <div className="error-message">
                                {errors?.Wednesday ? t(errors.Wednesday) : null}
                              </div>
                            </div>
                          )
                        }}
                      />
                    </div>
                  </div>

                  {/* Thursday */}
                  <div className="days-wrapper">
                    <div className="user-checkbox">
                      <Field
                        name="Thursday.enabled"
                        type="checkbox"
                        className="checkbox"
                      />
                      <label>{t("thursday")}</label>
                    </div>
                    <div className="flex-2">
                      <FieldArray
                        name="Thursday.workTimes"
                        render={(arrayHelpers) => {
                          const workTimes = values?.Thursday?.workTimes
                          return (
                            <div>
                              {workTimes && workTimes.length > 0
                                ? workTimes.map((time, index) => (
                                    <div key={index}>
                                      <div
                                        className={`hours-wrapper ${
                                          !values?.Thursday?.enabled
                                            ? "opacity-30"
                                            : ""
                                        }`}
                                      >
                                        <TimeField
                                          name={`Thursday.workTimes.${index}.startTime`}
                                          setFieldValue={setFieldValue}
                                          disabled={!values?.Thursday?.enabled}
                                          selected={
                                            values?.Thursday?.workTimes[index]
                                              ?.startTime
                                          }
                                        />
                                        <div className="">-</div>
                                        <TimeField
                                          name={`Thursday.workTimes.${index}.endTime`}
                                          setFieldValue={setFieldValue}
                                          disabled={!values?.Thursday?.enabled}
                                          selected={
                                            values?.Thursday?.workTimes[index]
                                              ?.endTime
                                          }
                                        />

                                        {workTimes.length == index + 1 ? (
                                          <div className="w-mb30 md:w-30pxt lg:w-vw30">
                                            <Image
                                              className={`${
                                                errors?.Thursday
                                                  ? "opacity-30"
                                                  : "cursor-pointer"
                                              }`}
                                              src={AddIcon}
                                              alt="Add"
                                              onClick={() => {
                                                if (errors?.Thursday) return
                                                if (!values?.Thursday?.enabled)
                                                  return
                                                arrayHelpers.push({
                                                  startTime: "",
                                                  endTime: "",
                                                })
                                              }}
                                            />
                                          </div>
                                        ) : (
                                          <div className="w-vw30"></div>
                                        )}
                                        {index > 0 ? (
                                          <Image
                                            onClick={() => {
                                              if (!values?.Thursday?.enabled)
                                                return
                                              arrayHelpers.remove(index)
                                            }}
                                            className="cursor-pointer"
                                            src={DeleteIcon}
                                            alt="Delete"
                                          />
                                        ) : null}
                                      </div>
                                    </div>
                                  ))
                                : null}
                              <div className="error-message">
                                {errors?.Thursday ? t(errors.Thursday) : null}
                              </div>
                            </div>
                          )
                        }}
                      />
                    </div>
                  </div>

                  {/* Friday */}
                  <div className="days-wrapper">
                    <div className="user-checkbox">
                      <Field
                        name="Friday.enabled"
                        type="checkbox"
                        className="checkbox"
                      />
                      <label>{t("friday")}</label>
                    </div>
                    <div className="flex-2">
                      <FieldArray
                        name="Friday.workTimes"
                        render={(arrayHelpers) => {
                          const workTimes = values?.Friday?.workTimes
                          return (
                            <div>
                              {workTimes && workTimes.length > 0
                                ? workTimes.map((time, index) => (
                                    <div key={index}>
                                      <div
                                        className={`hours-wrapper ${
                                          !values?.Friday?.enabled
                                            ? "opacity-30"
                                            : ""
                                        }`}
                                      >
                                        <TimeField
                                          name={`Friday.workTimes.${index}.startTime`}
                                          setFieldValue={setFieldValue}
                                          disabled={!values?.Friday?.enabled}
                                          selected={
                                            values?.Friday?.workTimes[index]
                                              ?.startTime
                                          }
                                        />
                                        <div className="">-</div>
                                        <TimeField
                                          name={`Friday.workTimes.${index}.endTime`}
                                          setFieldValue={setFieldValue}
                                          disabled={!values?.Friday?.enabled}
                                          selected={
                                            values?.Friday?.workTimes[index]
                                              ?.endTime
                                          }
                                        />

                                        {workTimes.length == index + 1 ? (
                                          <div className="w-mb30 md:w-30pxt lg:w-vw30">
                                            <Image
                                              className={`${
                                                errors?.Friday
                                                  ? "opacity-30"
                                                  : "cursor-pointer"
                                              }`}
                                              src={AddIcon}
                                              alt="Add"
                                              onClick={() => {
                                                if (errors?.Friday) return
                                                if (!values?.Friday?.enabled)
                                                  return
                                                arrayHelpers.push({
                                                  startTime: "",
                                                  endTime: "",
                                                })
                                              }}
                                            />
                                          </div>
                                        ) : (
                                          <div className="w-vw30"></div>
                                        )}
                                        {index > 0 ? (
                                          <Image
                                            onClick={() => {
                                              if (!values?.Friday?.enabled)
                                                return
                                              arrayHelpers.remove(index)
                                            }}
                                            className="cursor-pointer"
                                            src={DeleteIcon}
                                            alt="Delete"
                                          />
                                        ) : null}
                                      </div>
                                    </div>
                                  ))
                                : null}

                              <div className="error-message">
                                {errors?.Friday ? t(errors.Friday) : null}
                              </div>
                            </div>
                          )
                        }}
                      />
                    </div>
                  </div>

                  <DashboardLoaderButton
                    classList="mt-vw100"
                    isLoading={isSubmitting}
                    classListContainer="flex justify-end"
                    isDisabled={!isValid || isSubmitting}
                  >
                    {t("submit")}
                  </DashboardLoaderButton>
                </div>
                <div className="coulm flex-1">
                  <div className="coulmn-header">
                    {/* <div className="line flex-1">
                      <span>{t("add_dates_override")}</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
      <style jsx>{`
        .wrapper {
          @apply bg-white rounded-md px-mb20 md:px-20pxt lg:px-vw20 py-mb40 md:py-40pxt lg:py-vw40;
        }
        .line {
          @apply border-b border-b-[#b7b7b7];
        }

        .box {
          @apply bg-white px-mb20 md:px-24pxt lg:px-vw20 py-mb30 md:py-30pxt lg:py-vw30 rounded-md gap-mb20 md:gap-20pxt lg:gap-vw20;
        }
        .block {
          @apply mt-mb40 md:mt-40pxt lg:mt-vw40;
        }
        .line {
          @apply border-b border-b-[#b7b7b7] flex px-mb24 md:px-24pxt lg:px-vw24 relative items-end;
          span {
            @apply flex-1;
          }
        }
        .title {
          @apply text-14pxm md:text-18pxt lg:text-14px text-[#0e0d47] font-sans;
        }
        .checkbox {
          @apply w-mb20 h-mb20 md:w-20pxt md:h-20pxt lg:w-vw20 lg:h-vw20 mr-3;
        }
        .user-checkbox {
          @apply flex items-center text-16pxm md:text-20pxt lg:text-20px text-[#0e0d47] font-avenirBold flex-1;
          label {
            @apply ml-vw40;
          }
        }
        .hours-wrapper {
          @apply flex-2 flex items-center gap-mb16 md:gap-16pxt lg:gap-vw16 mt-mb20 md:mt-20pxt lg:mt-0 lg:mb-vw20;
          &.extra {
            @apply lg:mt-vw10;
          }
        }

        .unavailable-box {
          flex: 1;
        }

        .switch {
          @apply text-14pxm md:text-18pxt lg:text-14px text-[#0400ff] ml-vw30;
        }
        .row {
          @apply flex mt-vw40;
        }
        .coulmn-header {
          @apply flex mt-mb40 md:mt-40pxt lg:mt-vw40 w-full;
        }
        .dates-wrapper {
          @apply flex flex-col lg:flex-row mt-vw40;
        }
        .coulm {
          @apply flex flex-col;
        }
        .tables-wrapper {
          @apply flex flex-col lg:flex-row;
        }
        .days-wrapper {
          @apply flex flex-col lg:flex-row mt-mb30 md:mt-30pxt lg:mt-vw30 px-vw24 items-start;
          &.unavailable {
            @apply flex-row;
          }
        }
        .hour-box {
          @apply flex justify-center items-center py-mb10 md:py-12pxt lg:py-vw10 border border-[#b7b7b7] rounded-md w-mb80 md:w-80pxt lg:w-vw80;
          input {
            @apply w-full text-center text-14pxm md:text-18pxt lg:text-14px;
          }
        }
        .updateButton {
          @apply bg-[#0a47ac] flex justify-center items-center text-white text-16pxm md:text-20pxt lg:text-16px font-avenirMedium py-mb16 md:py-16pxt lg:py-vw16 px-mb60 md:px-60pxt lg:px-vw60 w-fit;
        }
        .contentCenter {
          @apply justify-center;
        }

        .error-message {
          @apply text-red-500;
        }

        :global(.react-datepicker__input-container input) {
          @apply py-mb10 md:py-12pxt lg:py-vw10 border border-[#b7b7b7] rounded-md w-125pxm md:w-125pxt lg:w-125px text-center outline-none;
          -webkit-appearance: none;
        }

        :global(.rtl) {
          .checkbox {
            @apply mr-0 ml-3;
          }
          .user-checkbox {
            label {
              @apply ml-0 mr-vw40;
            }
          }

          .switch {
            @apply ml-0 mr-vw30;
          }
        }
      `}</style>
    </div>
  )
}

export default AvailabilityContainer
