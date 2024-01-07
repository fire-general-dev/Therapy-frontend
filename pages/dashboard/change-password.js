import { getDoctorDataById, getGlobalData, submitDoctorData } from "utils/api"
import { useRouter } from "next/router"
import { withSession } from "middlewares/session"
import DoctorDetails from "@/components/elements/doctorDetails.js"
import DashboardLoaderButton from "@/components/elements/dashboardLoaderButton"
import { Form, Formik } from "formik"
import { extractSingleData } from "@/utils/extractData"
import { pick } from "lodash"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import TextField from "@/components/elements/inputs/TextField"
import axios from "axios"
import { toast } from "react-toastify"
import * as Yup from "yup"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

const formSchema = () =>
  Yup.object().shape({
    currentPassword: Yup.string().required("Please enter the current password"),
    password: Yup.string()
      .required("Please enter a new password")
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
      .required("Please enter a password confirmation")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref("password")], "Password don't match"),
      }),
  })

const ChangePassword = ({}) => {
  const { t } = useTranslation()

  const onSubmit = async (values) => {
    await axios
      .post("/api/changepassword", values)
      .then((res) => {
        toast.success("Password successfully changed!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      })
      .catch((err) => {
        toast.error(
          err.response?.data.error?.message ||
            "An error occurred during the change password process, please try againّ!",
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        )
      })
  }

  return (
    <>
      <div>
        <div className="main-title">{t("new_password_creation")}</div>

        <Formik
          initialValues={{
            currentPassword: "",
            password: "",
            passwordConfirmation: "",
          }}
          initialErrors={{
            initial: "initial error",
          }}
          onSubmit={onSubmit}
          validationSchema={formSchema}
        >
          {({ isSubmitting, isValid, setFieldValue, values }) => {
            return (
              <Form>
                <div className="wrapper">
                  <div className="line">
                    <TextField
                      labelClassName="!min-w-140pxm md:!min-w-200pxt lg:!min-w-150px"
                      name="currentPassword"
                      type="password"
                      label={t("current_password")}
                    />
                  </div>
                  <div className="line">
                    <TextField
                      labelClassName="!min-w-140pxm md:!min-w-200pxt lg:!min-w-150px"
                      name="password"
                      type="password"
                      label={t("new_password")}
                    />
                  </div>
                  <div className="line">
                    <TextField
                      labelClassName="!min-w-140pxm md:!min-w-200pxt lg:!min-w-150px"
                      name="passwordConfirmation"
                      type="password"
                      label={t("confirm_new_password")}
                    />
                  </div>
                </div>
                <div className="row contentEnd">
                  <DashboardLoaderButton
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting || !isValid}
                  >
                    {t("update")}
                  </DashboardLoaderButton>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
      <style jsx>{`
        .sectionTitle {
          @apply mb-mb20 md:mb-20pxt lg:mb-vw20 text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c] capitalize;
        }
        .main-title {
          @apply mt-mb28 md:mt-28pxt lg:mt-vw30 mb-mb20 md:mb-20pxt lg:mb-vw24 text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c];
        }
        .wrapper {
          @apply bg-white px-mb20 md:px-20pxt lg:px-vw20 pt-mb20 md:pt-20pxt lg:pt-vw24 pb-mb20 md:pb-20pxt lg:pb-vw24 rounded-lg text-[#0e0d47] text-14pxm md:text-18pxt lg:text-14px;
        }
        .line {
          @apply border-b border-b-[#b7b7b7] mb-mb40 md:mb-40pxt lg:mb-vw40;
        }
        .row {
          @apply flex flex-col lg:flex-row mt-mb40 md:mt-40pxt lg:mt-vw40;
        }
        .contentEnd {
          @apply justify-end;
        }
      `}</style>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { params, locale, locales, defaultLocale, req, query } = context

  const globalLocale = await getGlobalData(locale)

  // const user = req.session.user || null

  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    }
  }

  let doctorData = null
  if (session) {
    doctorData = await getDoctorDataById(session, locale)
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      global: globalLocale.data,
      pageContext: {
        locale,
        locales,
        defaultLocale,
      },
      doctorData: doctorData,
    },
  }
}

export default ChangePassword
