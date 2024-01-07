import React, { useRef, useState } from "react"
import { Form, Formik } from "formik"
import Image from "next/image"
import googleSvg from "@/images/icons/google.svg"
import facebookSvg from "@/images/icons/facebook.svg"
import Link from "next/link"
import AuthField from "../elements/inputs/AuthField"
import ReCAPTCHA from "react-google-recaptcha"
import * as Yup from "yup"
import LoaderButton from "../elements/loaderButton"
import { useTranslation } from "next-i18next"
import NafsiLogo from "../nafsiLogo"
import DateAuthField from "../elements/inputs/DateAuthField"
import moment from "moment"
import { isRTLLayout } from "@/utils/helpers"
import { useRouter } from "next/router"
import ArabicLogo from "../icons/arabic-logo"
import DashboardPlainTextField from "../inputs/DashboardPlainTextField"
import DashboardTextField from "../inputs/DashboardTextField"
import { MobilePrefixOptoins } from "@/utils/metadata"
import SelectField from "../elements/inputs/SelectField"
import AuthSelectField from "../elements/inputs/AuthSelectField"
// import TermsModal from "../modal/TermsModal"

function Signup(props) {
  const { t } = useTranslation("common")
  const recaptchaRef = useRef()
  const router = useRouter()
  // const [isOpenTerms, setIsOpenTerms] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  // const [shareHealthInfo, setShareHealthInfo] = useState(true)

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
      // .required("Please enter your phone number"),
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

  const onSubmit = async (data) => {
    const token = await recaptchaRef.current.executeAsync()
    if (token) {
      const response = await props.onSignup({
        ...data,
        agreedToNabidh: true,
      })
    }
  }

  return (
    <div className="pageWrapper">
      <div className="secion left">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://strapi-nafsi-s3-images.s3.me-central-1.amazonaws.com/login_Page_b3a748388e.png?updated_at=2022-10-06T10:01:55.012Z"
          alt="test"
        />
      </div>
      <div className="secion right">
        <div className="form-container">
          <div className="logo">
            <Link href="/">
              {isRTLLayout(router) ? (
                <ArabicLogo fillColor="#fff" />
              ) : (
                <NafsiLogo fillColor="#fff" />
              )}
            </Link>
          </div>
          <h2 className="title">{t("registration")}</h2>

          <Formik
            initialValues={{
              firstname: "",
              surname: "",
              email: "",
              address: "",
              password: "",
              phone_number: "",
              birthday: "",
              passwordConfirmation: "",
              mobile_cc: "+971",
              mobile_c: "",
              mobile: "",
            }}
            initialErrors={{
              initial: "initial error",
            }}
            validationSchema={formSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, isValid, values }) => {
              return (
                <Form
                  className="px-vw170 pb-mb60 lg:pb-vw60 w-full"
                  autoComplete="off"
                >
                  <div className="form">
                    {/* <div className="socialContainer">
                      <div className="socialIcon google">
                        <Image src={googleSvg} alt="test" />
                      </div>
                      <div className="socialIcon facebook">
                        <Image src={facebookSvg} alt="test" />
                      </div>
                    </div> */}
                    <div className="fileds-container">
                      <div className="name-wrapper">
                        <AuthField
                          name="firstname"
                          label={t("first_name")}
                          id="firstname-id"
                          style={{ flex: 1 }}
                        />

                        <AuthField
                          name="surname"
                          label={t("sur_name")}
                          id="surname-id"
                          style={{ flex: 1 }}
                        />
                      </div>
                      <DateAuthField
                        name="birthday"
                        label={t("birthday")}
                        id="birthday-id"
                      />

                      <div>
                        <div className="grid grid-cols-4 gap-2 items-end">
                          <AuthField
                            isDisabled={true}
                            className="col-span-1"
                            label={t("mobile_number")}
                            name="mobile_cc"
                            id="mobile-cc-id"
                            authFieldClassName="!mb-0"
                            placeholder={t("country_code")}
                            isRequired={true}
                          />
                          <AuthSelectField
                            name="mobile_c"
                            isRequired={true}
                            options={MobilePrefixOptoins}
                          />
                          {/* <DashboardTextField
                            className="col-span-1"
                            isPublic={true}
                            options={MobilePrefixOptoins}
                            placeholder={t("code")}
                            // label={t("code")}
                            name="mobile_c"
                          /> */}
                          <AuthField
                            className="col-span-2"
                            name="mobile"
                            id="mobile-id"
                            inputmode="numeric"
                            authFieldClassName="!mb-0"
                            placeholder={t("enter_number")}
                          />
                        </div>
                      </div>
                      {/* <AuthField
                        name="phone_number"
                        label={t("phone_number")}
                        id="phone-id"
                      /> */}
                      <AuthField
                        name="email"
                        type="email"
                        label={t("email_address")}
                        id="email-id"
                      />
                      <AuthField
                        name="address"
                        type="text"
                        label={t("address")}
                        id="address-id"
                      />
                      {/* <AuthField
                        name="username"
                        label={t("username")}
                        id="username-id"
                      /> */}
                      <AuthField
                        name="password"
                        type="password"
                        label={t("password")}
                        id="password-id"
                      />
                      <AuthField
                        name="passwordConfirmation"
                        type="password"
                        label={t("password_confirmation")}
                        id="passsord-confirmation-id"
                      />
                      <div className="user-checkbox">
                        <input
                          id="readAndAgree"
                          type="checkbox"
                          className="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                        />
                        <label htmlFor="readAndAgree" l>
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
                      <LoaderButton
                        isLoading={isSubmitting}
                        text={t("register")}
                        isDisabled={isSubmitting || !isValid || !agreeTerms}
                        classList="w-full"
                        type="submit"
                        variet="primary"
                      >
                        {t("register")}
                      </LoaderButton>
                    </div>
                    <Link
                      href={`/signin${
                        props.callbackUrl
                          ? "?callbackUrl=" + props.callbackUrl
                          : ""
                      }`}
                      passHref
                      legacyBehavior
                    >
                      <div className="card-bottom">{t("have_account")}</div>
                    </Link>
                  </div>
                </Form>
              )
            }}
          </Formik>
          {/* <TermsModal
            isOpen={isOpenTerms}
            onReject={() => {
              setAgreeTerms(false)
              setIsOpenTerms(false)
            }}
            onAccept={(value) => {
              setShareHealthInfo(value)
              setAgreeTerms(true)
              setIsOpenTerms(false)
            }}
          /> */}
        </div>
      </div>
      <style jsx>{`
        .pageWrapper {
          @apply flex min-h-screen;
        }
        .secion {
          @apply flex-1 flex justify-center items-center h-full;
          min-height: inherit;
        }
        .left {
          @apply bg-blue-300 hidden lg:flex;
          img {
            @apply px-vw30;
          }
        }
        .right {
          background-image: linear-gradient(
            to bottom,
            theme("colors.black.111"),
            theme("colors.black.6060")
          );
          @apply relative flex-col py-mb20 md:py-24pxt lg:py-vw20 overflow-y-scroll;
        }
        .logo {
          @apply absolute top-5 left-5 cursor-pointer;
        }
        .title {
          @apply text-40pxm md:text-50pxt lg:text-50px font-avenirBold mb-mb40 md:mb-40pxt lg:mb-vw40 text-white;
        }
        .form-container {
          @apply w-full max-h-70vh text-center;
        }
        .form {
          @apply w-full bg-white lg:pt-vw40 rounded-xl relative;
        }
        .fileds-container {
          @apply grid grid-cols-1 gap-mb30 md:gap-30pxt lg:gap-vw24 pt-mb40 lg:pt-0 px-mb20 lg:px-vw46;
        }
        .socialContainer {
          @apply absolute left-1/2 top-0 flex -translate-x-1/2;
        }
        .socialIcon {
          @apply w-mb60 h-mb60 lg:w-vw75 lg:h-vw75 rounded-lg -translate-y-1/2 mx-mb12 lg:mx-vw30 flex justify-center items-center cursor-pointer;
          &.facebook {
            @apply bg-[#1268fb];
          }
          &.google {
            @apply bg-[#e8e8e8];
          }
        }
        .card-bottom {
          @apply bg-gray-300 w-full h-mb40 md:h-50pxt lg:h-vw50 flex justify-center items-center text-black-333 text-14pxm md:text-18pxt lg:text-14px font-avenirBlack rounded-b-xl cursor-pointer;
        }
        .name-wrapper {
          @apply flex gap-2 md:gap-4 lg:gap-6;
        }

        .user-checkbox {
          @apply flex items-center;
          & label {
            @apply cursor-pointer text-left relative text-gray-888 text-20pxm md:text-20pxt lg:text-18px;
          }
          & input {
            @apply absolute cursor-pointer opacity-0;
          }
          & label::before {
            @apply relative inline-block bg-transparent border border-solid border-btnPrimary appearance-none content-[""] rounded-md p-mb12 md:p-12pxt lg:p-vw12 w-20pxm md:w-20pxt lg:w-20px h-20pxm md:h-20pxt lg:h-20px align-middle cursor-pointer mr-mb8 md:mr-8pxt lg:mr-vw08;
          }
          & label:hover::before,
          & input:hover + label::before {
            @apply bg-[#d0f6f8];
          }
          & input:checked + label::after {
            @apply content-[""] block absolute top-mb6 md:top-6pxt lg:top-vw06 left-mb10 md:left-10pxt lg:left-vw10 w-6pxm md:w-6pxt lg:w-6px  h-14pxm md:h-14pxt lg:h-14px border-solid border-white rotate-45;
            border-width: 0 2px 2px 0;
          }
          & input:checked + label::before {
            @apply bg-btnPrimary;
          }
        }

        :global(.rtl) {
          .user-checkbox {
            & label {
              @apply text-right;
            }
            & label::before {
              @apply mr-0 md:mr-0 lg:mr-0 ml-mb8 md:ml-8pxt lg:ml-vw08;
            }

            & input:checked + label::after {
              @apply left-auto md:left-auto lg:left-auto right-mb10 md:right-10pxt lg:right-vw10;
            }
          }
        }
      `}</style>
    </div>
  )
}

Signup.propTypes = {}

export default Signup
