import { getGlobalData, getArticleData } from "utils/api"
import { getLocalizedPaths } from "utils/localize"
import DynamicArticle from "@/components/pages/articles"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const DynamicArticlesPage = ({
  metadata,
  global,
  pageContext,
  articleImage,
  article,
  title,
}) => {
  return (
    <DynamicArticle
      metadata={metadata}
      global={global}
      pageContext={pageContext}
      article={article}
      title={title}
      articleImage={articleImage}
    />
  )
}

export const getServerSideProps = async (context) => {
  // export async function getServerSideProps(context) {
  const { params, locale, locales, defaultLocale } = context

  const globalLocale = await getGlobalData(locale)
  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getArticleData({
    slug: (!params.slug ? [""] : params.slug).join(""),
    locale,
  })

  if (pageData?.length === 0) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }

  // We have the required page data, pass it to the page component
  const { title, metadata, localizations, slug, articleImage, body } =
    pageData[0].attributes

  const pageContext = {
    locale,
    locales,
    defaultLocale,
    slug,
    localizations,
  }

  const localizedPaths = getLocalizedPaths(pageContext)
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      articleImage,
      article: body,
      title,
      metadata,
      global: globalLocale.data,
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
    },
  }
}

export default DynamicArticlesPage
