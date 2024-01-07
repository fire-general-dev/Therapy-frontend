import { getGlobalData } from "utils/api"
import { useRouter } from "next/router"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ForgetPassword from "@/components/pages/forgetpassword"
import { useState } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"
import Layout from "@/components/layout"

const ResetPasswordPage = ({ global, pageContext }) => {
  const [isEmailSent, setIsEmailSent] = useState(false)
  const router = useRouter()
  const handleReset = async (data) => {
    const body = {
      email: data.email,
    }

    const user = await axios
      .post("/api/forgetpassword", body)
      .then((res) => {
        toast.success("Email has been sent successfuly!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setIsEmailSent(true)
      })
      .catch((err) => {
        toast.error(
          err.response?.data.error?.message ||
            "An error occurred during the reset password process, please try againّ!",
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
    <Layout fullPage global={global} pageContext={pageContext}>
      <ForgetPassword
        onReset={handleReset}
        isEmailSent={isEmailSent}
        onResend={() => setIsEmailSent(false)}
      />
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { locale, locales, defaultLocale } = context

  const globalLocale = await getGlobalData(locale)

  const session = await getServerSession(context.req, context.res, authOptions)
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
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
    },
  }
}

export default ResetPasswordPage
