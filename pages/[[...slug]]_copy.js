import ErrorPage from "next/error"
import {
  getPageData,
  getGlobalData,
  getRecentArticles,
  getQuizzes,
} from "utils/api"
import Sections from "@/components/sections"
import Seo from "@/components/elements/seo"
import { useRouter } from "next/router"
import { getLocalizedPaths } from "utils/localize"
import { connect } from "react-redux"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Layout from "@/components/layout/layout"
import MobileDetect from "mobile-detect"

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const HomePage = (props) => {
  const { sections, metadata, preview, global, pageContext, locale } = props
  const router = useRouter()
  // Check if the required data was provided
  if (!router.isFallback && !sections?.length) {
    return <ErrorPage statusCode={404} />
  }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">Loading...</div>
  }

  // Merge default site SEO settings with page specific SEO settings
  if (metadata.shareImage?.data == null) {
    delete metadata.shareImage
  }
  const metadataWithDefaults = {
    ...global.attributes.metadata,
    ...metadata,
  }

  return (
    <Layout showFAQ={true} global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadataWithDefaults} />
      {/* Display content sections */}
      <div className="home">
        <Sections locale={locale} sections={sections} preview={preview} />
        <style jsx>{`
          .home {
            font-family: "Poppins", sans-serif;
          }
        `}</style>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const {
    params,
    locale,
    locales,
    defaultLocale,
    preview = null,
    req,
  } = context

  const globalLocale = await getGlobalData(locale)
  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getPageData({
    slug: (!params.slug ? [""] : params.slug).join("/"),
    locale,
    preview,
  })

  let userAgent
  let deviceType
  if (req) {
    userAgent = req.headers["user-agent"]
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

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }

  // We have the required page data, pass it to the page component
  const { contentSections, metadata, localizations, slug } = pageData.attributes

  const pageContext = {
    locale,
    locales,
    defaultLocale,
    slug,
    localizations,
  }

  const localizedPaths = getLocalizedPaths(pageContext)
  let recentArticles = []
  let recentQuizzes = []

  const recentArticleIndex = contentSections.findIndex(
    (section) => section.__typename == "ComponentSectionsRecentArticles"
  )

  const quizzesIndex = contentSections.findIndex(
    (section) => section.__typename == "ComponentSectionsQuizzesList"
  )

  const ourNetworkIndex = contentSections.findIndex(
    (section) => section.__typename == "ComponentSectionsTherapyCarousel"
  )

  if (recentArticleIndex >= 0) {
    recentArticles = await getRecentArticles({ locale })
    contentSections[recentArticleIndex].articles = recentArticles
  }

  if (quizzesIndex >= 0) {
    recentQuizzes = await getQuizzes({ locale })
    contentSections[quizzesIndex].quizzes = recentQuizzes
  }

  if (ourNetworkIndex >= 0) {
    contentSections[ourNetworkIndex].deviceType = deviceType
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      preview,
      sections: contentSections,
      metadata,
      locale,
      global: globalLocale.data,
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
    },
  }
}

export default connect((state) => ({
  state,
}))(HomePage)
