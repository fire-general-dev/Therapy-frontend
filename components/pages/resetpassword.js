import React, { useState } from "react"
import { Form, Formik } from "formik"
import AuthField from "../elements/inputs/AuthField"
import * as Yup from "yup"
import LoaderButton from "../elements/loaderButton"
import NafsiLogo from "../nafsiLogo"
import Link from "next/link"
import { useRouter } from "next/router"
import { isRTLLayout } from "@/utils/helpers"
import ArabicLogo from "../icons/arabic-logo"

const formSchema = () =>
  Yup.object().shape({
    password: Yup.string()
      .required("Please enter a password")
      .min(8, "Passwrod must contain at least 8 characters")
      .test(
        "isValidPass",
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special characters",
        (value, context) => {
          const validValue = value || ""
          const hasUpperCase = /[A-Z]/.test(validValue)
          const hasLowerCase = /[a-z]/.test(validValue)
          const hasNumber = /[0-9]/.test(validValue)
          const hasSymbol = /(?=.*[.?!@#$%^&*])/.test(validValue)
          if (hasLowerCase && hasUpperCase && hasNumber && hasSymbol) {
            return true
          }
          return false
        }
      ),
    passwordConfirmation: Yup.string()
      .required("Please enter a password")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
  })

function ResetPassword({ onReset, ...props }) {
  const router = useRouter()
  const onSubmit = async (data) => {
    const response = await onReset(data)
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
        <div className="logo">
          <Link href="/">
            {isRTLLayout(router) ? (
              <ArabicLogo fillColor="#fff" />
            ) : (
              <NafsiLogo fillColor="#fff" />
            )}
          </Link>
        </div>
        <h2 className="title">Reset Password</h2>

        <Formik
          initialValues={{
            password: "",
            passwordConfirmation: "",
          }}
          initialErrors={{
            initial: "initial error",
          }}
          validationSchema={formSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, isValid, isInitialValid }) => {
            return (
              <Form className="px-vw170 w-full">
                <div className="form">
                  <div className="fileds-container">
                    <AuthField
                      name="password"
                      type="password"
                      label="Password"
                      id="password-id"
                    />
                    <AuthField
                      name="passwordConfirmation"
                      type="password"
                      label="Password Confirmation"
                      id="passsord-confirmation-id"
                    />
                    <LoaderButton
                      isLoading={isSubmitting}
                      type="submit"
                      variet="primary"
                      classList="w-full"
                      isDisabled={isSubmitting || !isValid}
                    >
                      Reset
                    </LoaderButton>
                  </div>
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
          @apply text-40pxm lg:text-50px font-avenirBold mb-mb28 lg:mb-vw30 text-white;
        }
        .form {
          @apply w-full bg-white pt-vw75 rounded-xl relative;
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
      `}</style>
    </div>
  )
}

export default ResetPassword
