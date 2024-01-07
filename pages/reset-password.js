import { getGlobalData } from "utils/api"
import { useRouter } from "next/router"
import Layout from "@/components/layout"
import axios from "axios"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ResetPassword from "@/components/pages/resetpassword"
import { withAuthProtected } from "@/utils/auth"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"

const ResetPasswordPage = ({ global, pageContext }) => {
  const router = useRouter()
  const handleReset = async (data) => {
    const body = {
      token: router.query.token,
      newPassword: data.password,
      confirmPassword: data.passwordConfirmation,
    }

    const user = await axios
      .post("/api/resetpassword", body)
      .then((res) => {
        toast.success("Password has been reset successfuly!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        router.push("/")
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
      <ResetPassword onReset={handleReset} />
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
