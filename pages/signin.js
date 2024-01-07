import { getGlobalData } from "utils/api"
import { useRouter } from "next/router"
import Layout from "@/components/layout"
import Signin from "@/components/pages/signin"
// import { withSession } from "middlewares/session"
import { toast } from "react-toastify"
// import { login } from "reduxStore/actions/authActions"
import { useEffect } from "react"
import { withAuthProtected } from "@/utils/auth"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { signIn } from "next-auth/react"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"

const SigninPage = (props) => {
  const { sections, metadata, preview, global, pageContext } = props
  const router = useRouter()

  const handleLogin2 = async (data) => {
    const user = await signIn("credentials", {
      username: data.username,
      password: data.password,
      locale: pageContext.locale,
      redirect: false,
      // callbackUrl: router.query.callbackUrl
      //   ? router.query.callbackUrl
      //   : "/dashboard",
    })
      .then(({ ok, error }) => {
        if (ok) {
          const url = router.query.callbackUrl
            ? router.query.callbackUrl
            : "/dashboard"
          router.push(url)
        } else {
          console.log(error)
          toast.error(
            error.response?.data.error?.message || "Credentials do not match!",
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
        }
      })
      .catch((error) => {
        console.log(error)
        toast.error(
          err.response?.data.error?.message || "Credentials do not match!",
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

    // const body = {
    //   identifier: data.username,
    //   password: data.password,
    //   locale: pageContext.locale,
    // }

    // const user = await axios
    //   .post("/api/login", body)
    //   .then((res) => {
    //     store.dispatch(login(pageContext.locale))
    //     if (router.query.callbackUrl) {
    //       router.push(router.query.callbackUrl)
    //     } else {
    //       router.push("/dashboard")
    //     }
    // })
    // .catch((err) => {
    // })
  }

  useEffect(() => {
    if (router.query.callbackUrl) {
      toast.warning("You must be logged in to access this page", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }, [])

  return (
    <Layout fullPage global={global} pageContext={pageContext}>
      <Signin onLogin={handleLogin2} callbackUrl={router.query.callbackUrl} />
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  // export async function getServerSideProps(context) {
  const {
    params,
    locale,
    locales,
    defaultLocale,
    preview = null,
    req,
  } = context

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

  // Fetch pages. Include drafts if preview mode is on

  // We have the required page data, pass it to the page component
  // const { contentSections, metadata, localizations, slug } = pageData.attributes

  // const pageContext = {
  //   locale,
  //   locales,
  //   defaultLocale,
  //   slug,
  //   localizations,
  // }

  // const localizedPaths = getLocalizedPaths(pageContext)

  return {
    props: {
      // preview,
      // sections: contentSections,
      // metadata,
      ...(await serverSideTranslations(locale, ["common"])),
      global: globalLocale.data,
      pageContext: {
        // ...pageContext,
        // localizedPaths,
        locale,
        locales,
        defaultLocale,
      },
    },
  }
}

export default SigninPage
