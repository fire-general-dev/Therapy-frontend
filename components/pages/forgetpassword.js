import React from "react"
import { Form, Formik } from "formik"
import Link from "next/link"
import AuthField from "../elements/inputs/AuthField"
import LoaderButton from "../elements/loaderButton"
import * as Yup from "yup"
import NafsiLogo from "../nafsiLogo"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { isRTLLayout } from "@/utils/helpers"
import ArabicLogo from "../icons/arabic-logo"

function ForgetPassword({ onReset, isEmailSent = false, onResend }) {
  const { t } = useTranslation()
  const router = useRouter()
  const onSubmit = async (values) => {
    await onReset(values)
  }

  const formSchema = () =>
    Yup.object().shape({
      email: Yup.string()
        .required("Please enter an email")
        .email("Please enter a valid email"),
    })

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
        <h2 className="title">{t("forget_password")}</h2>
        {!isEmailSent ? (
          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={onSubmit}
            validationSchema={formSchema}
          >
            {({ isSubmitting }) => {
              return (
                <Form className="px-vw170 w-full">
                  <div className="form">
                    <div className="fileds-container">
                      <p>{t("enter_email_address_to_send_link")}</p>
                      <div>
                        <div className="user-box">
                          <AuthField
                            name="email"
                            label={"Email"}
                            id="email-id"
                          />
                        </div>
                      </div>

                      <LoaderButton
                        isLoading={isSubmitting}
                        isDisabled={isSubmitting}
                        classList="w-full"
                        type="submit"
                        variet="primary"
                      >
                        {t("submit")}
                      </LoaderButton>
                    </div>
                    <Link href="/signup" passHref legacyBehavior>
                      <div className="card-bottom">
                        {t("register_no_account")}
                      </div>
                    </Link>
                  </div>
                </Form>
              )
            }}
          </Formik>
        ) : (
          <div className="email-sent-container">
            <div className="email-sent">
              <div className="email-sent-msg">
                {t("forget_password_sentence1")}
                <br />
                {t("forget_password_sentence2")}
              </div>

              <LoaderButton
                // isLoading={isSubmitting}
                // isDisabled={isSubmitting}
                classList="w-full"
                type="submit"
                variet="primary"
              >
                {t("resend")}
              </LoaderButton>
            </div>
          </div>
        )}
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
          @apply text-40pxm lg:text-50px font-avenirBold mb-mb28 lg:mb-vw30 text-white uppercase;
        }
        .form {
          @apply w-full bg-white pt-vw30 rounded-xl relative;
        }
        .email-sent-container {
          @apply w-full px-vw170;
        }
        .email-sent {
          @apply w-full bg-white pt-mb30 md:pt-30pxt lg:pt-vw30 rounded-xl relative px-mb20 lg:px-vw46 text-center text-20pxm md:text-24pxt lg:text-20px font-avenirMedium;
        }

        .email-sent-msg {
          @apply mb-mb50 md:mb-50pxt lg:mb-vw50;
        }
        .fileds-container {
          @apply grid grid-cols-1 gap-mb20 lg:gap-vw24 pt-mb40 lg:pt-0 px-mb20 lg:px-vw46;
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
          @apply bg-gray-300 w-full h-mb40 lg:h-vw50 flex justify-center items-center text-black-333 text-14pxm lg:text-14px font-avenirBlack rounded-b-xl cursor-pointer;
        }
        .forgotPassword {
          @apply cursor-pointer transition-all duration-500 hover:translate-x-0.5 hover:translate-y-0.5 ml-auto text-14pxm lg:text-14px text-gray-888;
        }
      `}</style>
    </div>
  )
}

export default ForgetPassword
