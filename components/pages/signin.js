import React from "react"
import { Form, Formik } from "formik"
import Link from "next/link"
import AuthField from "../elements/inputs/AuthField"
import LoaderButton from "../elements/loaderButton"
import * as Yup from "yup"
import { useTranslation } from "next-i18next"
import NafsiLogo from "../nafsiLogo"
import { isRTLLayout } from "@/utils/helpers"
import { useRouter } from "next/router"
import ArabicLogo from "../icons/arabic-logo"

const formSchema = () =>
  Yup.object().shape({
    username: Yup.string().required("Please enter a username"),
    password: Yup.string().required("Please enter a password"),
  })

function Signin({ onLogin, callbackUrl = "" }) {
  const { t } = useTranslation("common")
  const router = useRouter()

  const onSubmit = async (values) => {
    await onLogin(values)
  }

  return (
    <div className="pageWrapper">
      <div className="secion left">
        <img
          src="https://strapi-nafsi-s3-images.s3.me-central-1.amazonaws.com/login_Page_b3a748388e.png?updated_at=2022-10-06T10:01:55.012Z"
          alt="test"
        />
      </div>
      <div className="secion right">
        <div className="logo">
          <Link href="/">
            {isRTLLayout(router) ? (
              <ArabicLogo fillColor="#fff" />
            ) : (
              <NafsiLogo fillColor="#fff" />
            )}
          </Link>
        </div>
        <h2 className="title">{t("sign_in")}</h2>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          initialErrors={{
            initial: "initial error",
          }}
          onSubmit={onSubmit}
          validationSchema={formSchema}
        >
          {({ isSubmitting, isValid }) => {
            return (
              <Form className="px-vw170 w-full">
                <div className="form">
                  {/* <div className="socialContainer">
                    <div className="socialIcon google">
                      <Image src={googleSvg} alt="google" />
                    </div>
                    <div className="socialIcon facebook">
                      <Image src={facebookSvg} alt="facebook" />
                    </div>
                  </div> */}
                  <div className="fileds-container">
                    <div>
                      <div className="user-box">
                        <AuthField
                          name="username"
                          label={t("email")}
                          id="username-id"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="user-box">
                        <AuthField
                          name="password"
                          type="password"
                          label={t("password")}
                          id="password-id"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="user-checkbox">
                        <input
                          id="rememberMe"
                          type="checkbox"
                          className="checkbox"
                        />
                        <label htmlFor="rememberMe" l>
                          {t("remember_me")}
                        </label>
                      </div>
                      <div className="forgotPassword">
                        <Link href="/forget-password">
                          {t("forgot_password")}
                        </Link>
                      </div>
                    </div>

                    <LoaderButton
                      isLoading={isSubmitting}
                      isDisabled={isSubmitting || !isValid}
                      classList="w-full"
                      type="submit"
                      variet="primary"
                    >
                      {t("login")}
                    </LoaderButton>
                  </div>
                  <Link
                    href={`/signup${
                      callbackUrl ? "?callbackUrl=" + callbackUrl : ""
                    }`}
                    passHref
                    legacyBehavior
                  >
                    <div className="card-bottom">{t("dont_have_account")}</div>
                  </Link>
                </div>
              </Form>
            )
          }}
        </Formik>
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
          @apply relative flex-col py-mb20 lg:py-vw20;
        }
        .logo {
          @apply absolute top-5 left-5 cursor-pointer;
        }
        .title {
          @apply text-40pxm md:text-50pxt lg:text-50px font-avenirBold mb-mb40 md:mb-40pxt lg:mb-vw40 text-white;
        }
        .form {
          @apply w-full bg-white pt-mb60 md:pt-60pxt lg:pt-vw75 rounded-xl relative;
        }
        .fileds-container {
          @apply grid grid-cols-1 gap-mb30 md:gap-34pxt lg:gap-vw24 pt-mb40 md:pt-40pxt lg:pt-0 px-mb20 md:px-40pxt lg:px-vw46;
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
        .forgotPassword {
          @apply cursor-pointer transition-all duration-500 hover:translate-x-0.5 hover:translate-y-0.5 ml-auto text-14pxm md:text-18pxt lg:text-14px text-gray-888;
        }

        .user-checkbox {
          @apply flex items-center;
          & label {
            @apply cursor-pointer text-left relative text-gray-888;
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
          .forgotPassword {
            @apply ml-0 mr-auto;
          }

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

Signin.propTypes = {}

export default Signin
