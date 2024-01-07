import React, { useRef, useState } from "react"
import { Form, Formik } from "formik"
import Link from "next/link"
import ReCAPTCHA from "react-google-recaptcha"
import * as Yup from "yup"
import { useTranslation } from "next-i18next"
import moment from "moment"
import TextField from "./TextField"
import SubmitBtn from "@/components/buttons/SubmitBtn"
import { useRouter } from "next/router"
import DashboardPlainTextField from "@/components/inputs/DashboardPlainTextField"
import DashboardSelectField from "@/components/inputs/DashboardSelectField/DashboardSelectField"
import { MobilePrefixOptoins } from "@/utils/metadata"

function RegistrationForm({ onChangeForm, onSubmit, recaptchaRef }) {
  const { t } = useTranslation("common")
  const [agreeTerms, setAgreeTerms] = useState(false)

  const formSchema = () =>
    Yup.object().shape({
      firstname: Yup.string()
        .min(3, t("name_minimum"))
        .max(40, t("name_maximum"))
        .required(t("enter_first_name")),
      surname: Yup.string()
        .min(3, t("name_minimum"))
        .max(40, t("name_maximum"))
        .required(t("enter_surname")),
      email: Yup.string()
        .required(t("enter_email"))
        .email(t("enter_valid_email")),
      mobile_cc: Yup.string().required(t("enter_country_code")),
      mobile_c: Yup.string().required(t("enter_code")),
      mobile: Yup.number()
        .typeError(t("enter_valid_number"))
        .positive(t("enter_valid_number"))
        .integer(t("enter_valid_number"))
        .min(1)
        .required(t("enter_mobile_number")),
      birthday: Yup.date(t("valid_birthday"))
        .min(
          moment().subtract(150, "years").format("YYYY-MM-DD"),
          t("early_date")
        )
        .max(
          moment().subtract(18, "years").format("YYYY-MM-DD"),
          t("must_over_18")
        ),
      password: Yup.string()
        .required(t("enter_password"))
        .min(8, t("passwrod_must_at_least"))
        .test("isValidPass", t("password_must_contain"), (value, context) => {
          const validValue = value || ""
          const hasUpperCase = /[A-Z]/.test(validValue)
          const hasLowerCase = /[a-z]/.test(validValue)
          const hasNumber = /[0-9]/.test(validValue)
          const hasSymbol = /(?=.*[.?!@#$%^&*])/.test(validValue)
          if (hasLowerCase && hasUpperCase && hasNumber && hasSymbol) {
            return true
          }
          return false
        }),
      passwordConfirmation: Yup.string()
        .required(t("enter_password"))
        .when("password", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf([Yup.ref("password")], t("password_same")),
        }),
    })

  return (
    <div className="pageWrapper">
      <div className="form-container">
        <div>
          <h2 className="title">{t("registration")}</h2>
          <div className="subtitle">
            {t("have_already_account")}{" "}
            <span onClick={() => onChangeForm(true)}>{t("login")}</span>
          </div>
        </div>

        <Formik
          initialValues={{
            firstname: "",
            surname: "",
            email: "",
            password: "",
            mobile_cc: "+971",
            mobile_c: "",
            mobile: "",
            phone_number: "",
            passwordConfirmation: "",
          }}
          initialErrors={{
            initial: "initial error",
          }}
          validationSchema={formSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, isValid, values }) => {
            return (
              <Form autoComplete="off">
                <div className="form">
                  <div className="fileds-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 gap-y-7">
                      <TextField
                        name="firstname"
                        label={t("first_name")}
                        id="firstname-id"
                        placeholder={t("enter_first_name")}
                        isRequired={true}
                      />
                      <TextField
                        name="surname"
                        label={t("last_name")}
                        id="surname-id"
                        placeholder={t("enter_last_name")}
                        isRequired={true}
                      />
                      <div className="col-span-2">
                        <span className="label">{t("mobile_number")} *</span>
                        <div className="grid grid-cols-4 gap-2 items-end">
                          <DashboardPlainTextField
                            isDisabled={true}
                            isPublic={true}
                            className="col-span-1"
                            name="mobile_cc"
                            placeholder={t("country_code")}
                            isRequired={true}
                          />
                          <DashboardSelectField
                            className="col-span-1"
                            isPublic={true}
                            options={MobilePrefixOptoins}
                            placeholder={t("code")}
                            // label={t("code")}
                            name="mobile_c"
                          />
                          <DashboardPlainTextField
                            className="col-span-2"
                            name="mobile"
                            isPublic={true}
                            placeholder={t("enter_number")}
                          />
                        </div>
                      </div>
                      <TextField
                        name="email"
                        type="email"
                        className="col-span-2"
                        label={t("email_address")}
                        placeholder={t("enter_your_email")}
                        id="email-id"
                        isRequired={true}
                      />
                      <TextField
                        name="password"
                        type="password"
                        label={t("password")}
                        placeholder={t("enter_password")}
                        isRequired={true}
                        id="password-id"
                      />
                      <TextField
                        name="passwordConfirmation"
                        type="password"
                        label={t("password_confirmation")}
                        placeholder={t("enter_confirm_password")}
                        isRequired={true}
                        id="passsord-confirmation-id"
                      />
                    </div>
                    <div className="user-checkbox">
                      <input
                        id="readAndAgree"
                        type="checkbox"
                        className="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                      />
                      <label htmlFor="readAndAgree">
                        {t("read_and_agree")}&nbsp;
                        <Link
                          href="/terms"
                          className="text-[#25a9ad] border-b border-b-[#25a9ad]"
                        >
                          {t("terms_and_conditions")}
                        </Link>
                      </label>
                    </div>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      size="invisible"
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    />
                    <SubmitBtn
                      isDisabled={isSubmitting || !isValid || !agreeTerms}
                      className={"!w-full"}
                      text={t("continue")}
                    />
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
      <style jsx>{`
        .pageWrapper {
          @apply p-8 max-w-xl mx-auto;
        }
        .form-container {
          @apply bg-white rounded-[1.25rem] p-8;
        }
        .title {
          @apply text-[#2E3333] text-base lg:text-2xl font-medium mb-4;
        }
        .subtitle {
          @apply mb-5 text-gray-64 text-sm lg:text-base cursor-pointer transition-all ease-in duration-300;
          span {
            @apply text-[#1BBEC3] text-base font-medium hover:text-[#15989C];
          }
        }

        .label {
          @apply block text-gray-64 text-sm lg:text-base font-medium mb-2;
        }

        .user-checkbox {
          @apply flex items-center;
          & label {
            @apply cursor-pointer text-left relative text-gray-64 text-xs lg:text-sm mb-10 mt-8;
          }
          & input {
            @apply absolute cursor-pointer opacity-0;
          }
          & label::before {
            @apply relative inline-block bg-transparent border border-solid border-[#1BBEC3] appearance-none content-[""] rounded-md p-3 w-5 h-5 align-middle cursor-pointer mr-2;
          }
          & label:hover::before,
          & input:hover + label::before {
            @apply bg-[#d0f6f8];
          }
          & input:checked + label::after {
            @apply content-[""] block absolute top-[4px] left-[10px] w-[6px] h-[14px] border-solid border-white rotate-45;
            border-width: 0 2px 2px 0;
          }
          & input:checked + label::before {
            @apply bg-btnPrimary;
          }
        }

        .user-checkbox {
           {
            /* @apply text-gray-64 text-sm mb-10 mt-8; */
          }
        }

        :global(.rtl) {
          .user-checkbox {
            & label {
              @apply text-right;
            }
            & label::before {
              @apply mr-0 md:mr-0 lg:mr-0 ml-2;
            }

            & input:checked + label::after {
              @apply left-auto md:left-auto lg:left-auto right-[10px];
            }
          }
        }
      `}</style>
    </div>
  )
}

export default RegistrationForm
