import React, { useRef, useState } from "react"
import { Form, Formik } from "formik"
import { useTranslation } from "next-i18next"
import TextField from "./TextField"
import SubmitBtn from "@/components/buttons/SubmitBtn"
import Link from "next/link"

function LoginForm({ onChangeForm, onSubmit }) {
  const { t } = useTranslation("common")

  return (
    <div className="pageWrapper">
      <div className="form-container">
        <div>
          <h2 className="title">{t("login")}</h2>
          <div className="subtitle">
            {t("do_not_have_account")}{" "}
            <span onClick={() => onChangeForm(false)}>{t("register")}</span>
          </div>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          initialErrors={{
            initial: "initial error",
          }}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, isValid, values }) => {
            return (
              <Form autoComplete="off">
                <div className="form">
                  <div className="fileds-container">
                    <TextField
                      name="email"
                      type="email"
                      label={t("email_address")}
                      placeholder={t("enter_your_email")}
                      id="email-id"
                      className="mb-4"
                      isRequired={true}
                    />
                    <TextField
                      name="password"
                      type="password"
                      className="mb-4"
                      label={t("password")}
                      placeholder={t("enter_password")}
                      id="password-id"
                    />
                    <div className="forget-password-container">
                      <Link href={"/forget-password"}>
                        <span className="forget-password">
                          {t("forget_password")}
                        </span>
                      </Link>
                    </div>
                    <SubmitBtn
                      isDisabled={isSubmitting || !isValid}
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
          @apply max-w-xl mx-auto p-8;
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

        .forget-password-container {
          @apply flex justify-end mb-5;
        }

        .forget-password {
          @apply inline-block text-gray-64 text-xs lg:text-sm hover:text-[#505050] cursor-pointer transition-all ease-in duration-300 hover:translate-x-[2px] hover:translate-y-[2px];
        }
        .user-checkbox {
          @apply flex items-center;
          & label {
            @apply cursor-pointer text-left relative text-gray-64 text-sm mb-10 mt-8;
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
      `}</style>
    </div>
  )
}

export default LoginForm
