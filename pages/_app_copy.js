import RefreshTokenHandler from "@/utils/refreshTokenHandler"
import MobileDetect from "mobile-detect"
import { SessionProvider } from "next-auth/react"
import { appWithTranslation } from "next-i18next"
import { DefaultSeo } from "next-seo"
import App from "next/app"
import ErrorPage from "next/error"
import Head from "next/head"
import { useRouter } from "next/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { getGlobalData } from "utils/api"
import { getStrapiMedia } from "utils/media"
import { wrapper } from "../reduxStore"
// import { SessionProvider } from "next-auth/react"

import DashboardLayout from "@/components/dashboardLayout"
import "@/styles/index.css"
import { useEffect, useState } from "react"

// Stylesheet
import AuthWrapper from "@/components/authWrapper"
import "@/styles/datepicker-front-public.css"
import { getServerSession } from "next-auth"
import "react-datepicker/dist/react-datepicker.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "react-tooltip/dist/react-tooltip.css"
import { authOptions } from "./api/auth/[...nextauth]"

NProgress.configure({ showSpinner: false })
NProgress.configure({ parent: "#__next" })
// if (typeof window !== "undefined") {
//   console.log("requested")
//   require("tw-elements")
// }

console.log({
  d: process.env.NEXT_PUBLIC_DOMAIN,
  t: process.env.NEXT_PUBLIC_EXPIRE_TIME,
})
const MyApp = ({ Component, ...rest }) => {
  const session = rest.pageProps.session
  // Extract the data we need
  const { store, props } = wrapper.useWrappedStore(rest)
  const { global, pageContext, userData, deviceType } = props.pageProps

  const router = useRouter()
  const isDashboardLink = router.route.indexOf("/dashboard") > -1

  const [isMobile, setIsMobile] = useState()
  const [interval, setInterval] = useState(0)
  // If tablet in portrait mode make design as mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (deviceType == "tablet") {
        setIsMobile(window.innerHeight > window.innerWidth)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 1024)
      if (deviceType == "tablet") {
        setIsMobile(window.innerHeight > window.innerWidth)
      }
    }
    const handleResize = () => {
      if (typeof window !== "undefined") {
        // Get the screen width
        const screenWidth = window.innerWidth

        if (screenWidth < 1024) {
          setIsMobile(true)
        } else {
          setIsMobile(false)
        }
      }
    }

    // Add event listener when component mounts
    window.addEventListener("resize", handleResize)

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const myEvent = new Event("twElementInitilized")

    const use = async () => {
      ;(await import("tw-elements")).default
      document.dispatchEvent(myEvent)
    }
    use()
  }, [])

  useEffect(() => {
    const handleRouteStart = () => NProgress.start()
    const handleRouteDone = () => NProgress.done()

    router.events.on("routeChangeStart", handleRouteStart)
    router.events.on("routeChangeComplete", handleRouteDone)
    router.events.on("routeChangeError", handleRouteDone)

    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off("routeChangeStart", handleRouteStart)
      router.events.off("routeChangeComplete", handleRouteDone)
      router.events.off("routeChangeError", handleRouteDone)
    }
  }, [])

  if (global == null) {
    return <ErrorPage statusCode={404} />
  }

  const { metadata, favicon, metaTitleSuffix } = global.attributes

  return (
    <SessionProvider session={session} refetchInterval={interval}>
      <AuthWrapper>
        {/* <Provider store={store}> */}
        {/* Favicon */}
        <Head>
          <link
            rel="shortcut icon"
            href={getStrapiMedia(favicon.data.attributes.url)}
          />
        </Head>
        {/* Global site metadata */}
        <DefaultSeo
          titleTemplate={`%s | ${metaTitleSuffix}`}
          title="Page"
          description={metadata.metaDescription}
          openGraph={
            metadata?.shareImage?.data?.attributes?.formats
              ? {
                  images: Object.values(
                    metadata.shareImage.data.attributes.formats
                  ).map((image) => {
                    return {
                      url: getStrapiMedia(image.url),
                      width: image.width,
                      height: image.height,
                    }
                  }),
                }
              : {}
          }
          twitter={{
            cardType: metadata.twitterCardType,
            handle: metadata.twitterUsername,
          }}
        />

        {/* Display the content */}
        {isDashboardLink ? (
          <DashboardLayout
            global={global}
            store={store}
            pageContext={pageContext}
            userData={userData}
            isMobile={isMobile}
          >
            <Component store={store} isMobile={isMobile} {...props.pageProps} />
          </DashboardLayout>
        ) : (
          <Component store={store} {...props.pageProps} />
        )}
        <RefreshTokenHandler setInterval={setInterval} />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* </Provider> */}
      </AuthWrapper>
    </SessionProvider>
  )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (appContext) => {
    // Calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext)
    console.log("appProps", appProps)
    const globalLocale = await getGlobalData(appContext.router.locale || "en")
    let userData = null

    const session = await getServerSession(
      appContext.ctx.req,
      appContext.ctx.res,
      authOptions
    )
    userData = {
      role: session?.role,
      doctor: session?.doctor,
      firstname: session?.firstname,
      profile_img: session?.profile_img,
    }

    let userAgent
    let deviceType
    if (appContext.ctx.req) {
      userAgent = appContext.ctx.req.headers["user-agent"]
    } else {
      userAgent = navigator.userAgent
    }

    const md = new MobileDetect(userAgent)
    if (md.tablet()) {
      deviceType = "tablet"
    } else if (md.mobile()) {
      deviceType = "mobile"
    } else {
      deviceType = "desktop"
    }

    const newPageProps = {
      global: globalLocale.data,
      deviceType,
    }

    if (userData) newPageProps.user = userData

    return {
      ...appProps,
      pageProps: {
        ...newPageProps,
        userData,
      },
    }
  }
)

export default wrapper.withRedux(appWithTranslation(MyApp))
