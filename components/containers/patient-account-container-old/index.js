import DashboardLoaderButton from "@/components/elements/dashboardLoaderButton"
import TextField from "@/components/elements/inputs/TextField"
import { Formik, Form, Field } from "formik"
import React, { useState } from "react"
import FileUploader from "./FileUploader"
import * as Yup from "yup"
import { UpdateUserAccount } from "@/utils/api"
// import { login } from "reduxStore/actions/authActions"
import { useTranslation } from "next-i18next"
import idFront from "@/images/account/id_front.png"
import idBack from "@/images/account/id_back.png"
import Passport1 from "@/images/account/passport1.png"
import Passport2 from "@/images/account/passport2.png"
import Passport3 from "@/images/account/passport3.png"
import Image from "next/image"
import SelectField from "@/components/elements/inputs/SelectField"

// const formSchema = () => Yup.object().shape({})

const formSchema = (t) =>
  Yup.object().shape({
    firstname: Yup.string()
      .min(3, t("name_minimum"))
      .max(40, t("name_maximum"))
      .required(t("enter_first_name")),
    surname: Yup.string()
      .min(3, t("name_minimum"))
      .max(40, t("name_maximum"))
      .required(t("enter_last_name")),
    email: Yup.string()
      .required(t("enter_email"))
      .email(t("enter_valid_email")),
    phone_number: Yup.string()
      .matches(
        RegExp(
          "^(?:\\+971|00971|0)?(?:50|51|52|53|54|55|56|57|58|59|2|3|4|6|7|9)\\d{7}$"
        ),
        t("enter_valid_uae_number")
      )
      .required("Please enter your phone number"),
    birthday: Yup.date(t("valid_birthday")).required(t("enter_birthday")),
    identityNumber: Yup.string()
      .required("Please enter an identity")
      .min(10, "Please enter valid Identity Number"),
    gender: Yup.string()
      .oneOf(["male", "female"], t("enter_gender_type"))
      .required(t("enter_gender")),
    mySelectField: "",
  })

function PatientAccountContainer({ user, store, locale }) {
  const { t } = useTranslation()
  const [identifierType, setIdentifierType] = useState("ID")
  const onSubmit = async (values) => {
    const response = await UpdateUserAccount({ user, data: values })
    // store.dispatch(login(locale))
  }

  const options = [
    { value: "MR", label: "MR" },
    { value: "MRS", label: "MRS" },
    { value: "DR", label: "DR" },
  ]

  return (
    <div className="outWrapper">
      <Formik
        initialValues={{
          firstname: user.firstname || "",
          surname: user.surname || "",
          birthday: user.birthday || "",
          email: user.email || "",
          gender: user.gender || "",
          phone_number: user.phone_number || "",
          frontIdFile: user.frontIdFile || null,
          backIdFile: user.backIdFile || null,
          passportFile: user.passportFile || null,
          identityNumber: user.identityNumber || "",
          passportNumber: user.passportNumber || "",
          salutation: "",
        }}
        onSubmit={onSubmit}
        validationSchema={formSchema(t)}
        validateOnMount={true}
      >
        {({ isSubmitting, isValid, setFieldValue, values, errors }) => {
          return (
            <Form>
              <div className="wrapper">
                <div className="form-grid">
                  <div className="line">
                    <SelectField
                      options={options}
                      label={t("salutation")}
                      name="salutation"
                    />
                  </div>
                  <div className="line">
                    <TextField name="firstname" label={t("first_name")} />
                  </div>
                  <div className="line">
                    <TextField name="middlename" label={t("middle_name")} />
                  </div>
                  <div className="line">
                    <TextField name="surname" label={t("sur_name")} />
                  </div>
                  <div className="line">
                    <SelectField
                      options={options}
                      label={t("gender")}
                      name="gender"
                    />
                  </div>

                  <div className="line">
                    <TextField
                      type="date"
                      name="birthday"
                      label={t("date_of_birth")}
                    />
                  </div>

                  <div className="line">
                    <TextField
                      className="flex-1"
                      name="phone_number"
                      label={t("phone_number")}
                    />
                  </div>
                  <div className="line">
                    <SelectField
                      options={options}
                      label={t("visa_status")}
                      name="visaStatus"
                    />
                  </div>
                  <div className="line">
                    <SelectField
                      options={options}
                      label={t("emirates")}
                      name="emirates"
                    />
                  </div>
                  <div className="line">
                    <SelectField
                      options={options}
                      label={t("nationality")}
                      name="nationality"
                    />
                  </div>
                  <div className="line">
                    <SelectField
                      options={options}
                      label={t("city")}
                      name="city"
                    />
                  </div>
                  <div className="line">
                    <TextField
                      className="flex-1"
                      name="email"
                      label={t("email")}
                    />
                  </div>
                  <div className="line">
                    <SelectField
                      options={options}
                      label={t("religion")}
                      name="religion"
                    />
                  </div>
                  <div className="line">
                    <SelectField
                      options={options}
                      label={t("marital_status")}
                      name="maritalStatus"
                    />
                  </div>
                  <div className="line">
                    <SelectField
                      options={options}
                      label={t("communication_language")}
                      name="communicationLanguage"
                    />
                  </div>
                  <div className="line">
                    <TextField name="relativeName" label={t("relative_name")} />
                  </div>
                  <div className="line">
                    <SelectField
                      options={options}
                      label={t("relation")}
                      name="relation"
                    />
                  </div>
                  <div className="line">
                    <TextField
                      name="relativePhone"
                      label={t("relative_phone")}
                    />
                  </div>
                  <div className="line">
                    <SelectField
                      options={options}
                      label={t("work_place")}
                      name="workPlace"
                    />
                  </div>
                  <div className="line">
                    <TextField
                      name="permanentAddress"
                      label={t("permanent_address")}
                    />
                  </div>
                  <div className="line">
                    <SelectField
                      options={options}
                      label={t("country_of_residence")}
                      name="countryOfResidence"
                    />
                  </div>
                  <div className="line">
                    <SelectField
                      options={options}
                      label={t("occupation")}
                      name="occupation"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="column">
                    <div className="radio-group">
                      <h6>{t("choose_your_identify_type")}</h6>
                      <div className="radio-wrapper">
                        <label className="radio">
                          <input
                            type="radio"
                            checked={identifierType === "ID"}
                            value="ID"
                            name="identify_type"
                            onClick={() => setIdentifierType("ID")}
                          />
                          <span></span>
                          {t("id")}
                        </label>
                        <label className="radio">
                          <input
                            type="radio"
                            checked={identifierType === "passport"}
                            value="passport"
                            name="identify_type"
                            onClick={() => setIdentifierType("passport")}
                          />
                          <span></span>
                          {t("passport")}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="column"></div>
                </div>
                {identifierType == "ID" ? (
                  <div className="id-tap">
                    <div className="row">
                      <div className="column">
                        <div className="line">
                          <TextField
                            className="flex-1"
                            name="identityNumber"
                            label={t("id_number")}
                          />
                        </div>
                      </div>
                      <div className="column"></div>
                    </div>
                    <p className="upload-msg">{t("upload_id_photo")}</p>
                    <div className="id-images">
                      <div className="col">
                        <div className="id-image-wrapper">
                          <span>{t("front_side")}</span>
                          <Image src={idFront} layout="raw" alt="ID front" />
                        </div>
                        <FileUploader
                          name="frontIdFile"
                          setFieldValue={setFieldValue}
                          files={values.frontIdFile}
                          title={t("upload_front")}
                          accept={{
                            "image/png": [],
                            "image/gif": [],
                            "image/jpeg": [],
                          }}
                        />
                      </div>
                      <div className="col">
                        <div className="id-image-wrapper mt-mb60 md:mt-60pxt lg:mt-0">
                          <span>{t("back_side")}</span>
                          <Image src={idBack} layout="raw" alt="ID front" />
                        </div>
                        <FileUploader
                          name="backIdFile"
                          setFieldValue={setFieldValue}
                          title={t("upload_back")}
                          files={values.backIdFile}
                          accept={{
                            "image/png": [],
                            "image/gif": [],
                            "image/jpeg": [],
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="passport-tap">
                    <div className="row">
                      <div className="column">
                        <div className="line">
                          <TextField
                            className="flex-1"
                            name="passportNumber"
                            label={t("passport_number")}
                          />
                        </div>
                      </div>
                      <div className="column"></div>
                    </div>
                    <p className="upload-msg">{t("upload_id_photo")}</p>
                    <div className="id-images">
                      <div className="col">
                        <div className="passport-image-wrapper">
                          <Image src={Passport1} layout="raw" alt="ID front" />
                        </div>
                      </div>
                      <div className="col">
                        <div className="passport-image-wrapper">
                          <Image src={Passport2} layout="raw" alt="ID front" />
                        </div>
                      </div>
                      <div className="col">
                        <div className="passport-image-wrapper">
                          <Image src={Passport3} layout="raw" alt="ID front" />
                        </div>
                      </div>
                    </div>

                    <FileUploader
                      name="passportFile"
                      setFieldValue={setFieldValue}
                      title={t("upload_document")}
                      files={values.passportFile}
                      accept={{
                        "image/png": [],
                        "image/gif": [],
                        "image/jpeg": [],
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="sumbit-container">
                <DashboardLoaderButton
                  isLoading={isSubmitting}
                  isDisabled={!isValid || isSubmitting}
                >
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
            @apply bg-white px-mb20 md:px-20pxt lg:px-vw20 pb-mb100 md:pb-100pxt lg:pb-vw100 rounded-lg text-[#0e0d47] text-14pxm md:text-18pxt lg:text-14px pt-mb40 md:pt-40pxt lg:pt-vw40;
          }
          .form-grid {
            @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8;
          }
          .row {
            @apply flex flex-col lg:flex-row gap-0 md:gap-0 lg:gap-12 pt-mb40 md:pt-40pxt lg:pt-vw40;
          }
          .column {
            @apply flex-1 flex flex-col;
          }
          .uploader-wrapper {
            @apply mt-mb12 md:mt-40pxt lg:mt-vw40;
          }
          .line {
            @apply border-b border-b-[#b7b7b7] relative min-h-40pxm md:min-h-40px lg:min-h-40px flex-1;
          }
          .flex-line {
            @apply flex;
          }
          .bold {
            @apply font-avenirBold;
          }
          .checkLabel {
            @apply text-[#0e0d47] text-14pxm md:text-18pxt lg:text-14px font-avenirSlim mx-mb10 md:mx-10pxt lg:mx-vw10;
          }
          .sumbit-container {
            @apply flex justify-end mt-mb60 md:mt-60pxt lg:mt-vw60;
          }
          .errorText {
            @apply text-red-500 ml-mb12 md:ml-12pxt lg:ml-vw12 text-14pxm md:text-18pxt lg:text-14px absolute -bottom-full;
          }

           {
            /* Radio */
          }
          .radio-group {
            h6 {
              @apply text-[#0e0d47] text-22pxm md:text-26pxt lg:text-22px font-avenirBold mt-mb40 md:mt-40pxt lg:mt-vw40 mb-mb16 md:mb-16pxt lg:mb-vw16;
            }
          }
          .radio-wrapper {
            @apply flex gap-20 md:gap-20 lg:gap-20;
          }
          .radio {
            @apply flex items-center text-20pxm md:text-24pxt lg:text-20px text-[#0e0d47] align-middle relative;

            input {
              @apply hidden;
            }

            span {
              @apply w-20pxm md:w-20pxt lg:w-20px h-20pxm md:h-20pxt lg:h-20px mr-mb12 md:mr-12pxt lg:mr-vw12;
              border-radius: 50%;
              border: 2px solid #b7b7b7;
              display: block;
              position: relative;
            }

            span:after {
              content: "";
              @apply w-12pxm md:w-12pxt lg:w-12px h-12pxm md:h-12pxt lg:h-12px;
              background: #0e0d47;
              display: block;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%) scale(0);
              border-radius: 50%;
              transition: 300ms ease-in-out 0s;
            }

            input[type="radio"]:checked ~ span:after {
              transform: translate(-50%, -50%) scale(1);
            }
          }

          .upload-msg {
            @apply mt-mb40 md:mt-30pxt lg:mt-vw30 text-18pxm md:text-22pxt lg:text-18px;
            width: 80%;
          }

          .id-images {
            @apply flex flex-col lg:flex-row mt-mb40 md:mt-40pxt lg:mt-vw40 lg:gap-8;
            .col {
              @apply flex flex-col lg:items-center;
            }
            .id-image-wrapper {
              @apply flex flex-col lg:items-center mb-mb40 md:mb-40pxt lg:mb-vw60;
              width: 55%;
            }
            .passport-image-wrapper {
              @apply flex flex-col lg:items-center mb-mb40 md:mb-40pxt lg:mb-vw60;
              width: 80%;
            }
          }

          :global(.rtl) {
            .errorText {
              @apply ml-0 md:ml-0 lg:ml-0 mr-mb12 md:mr-12pxt lg:mr-vw12;
            }

             {
              /* Radio */
            }
            .radio {
              span {
                @apply mr-0 md:mr-0 lg:mr-0 ml-mb12 md:ml-12pxt lg:ml-vw12;
              }
            }
          }
        `}
      </style>
    </div>
  )
}

PatientAccountContainer.propTypes = {}

export default PatientAccountContainer
