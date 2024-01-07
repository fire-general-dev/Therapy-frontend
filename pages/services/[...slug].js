import { getGlobalData, getCategoryArticleData } from "utils/api"
import { getLocalizedPaths } from "utils/localize"
import DynamicService from "@/components/pages/services"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const DynamicCategoryArticle = ({
  metadata,
  global,
  pageContext,
  articleImage,
  article,
  title,
}) => {
  return (
    <DynamicService
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
  const { params, locale, locales, defaultLocale } = context

  const globalLocale = await getGlobalData(locale)
  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getCategoryArticleData({
    slug: (!params.slug ? [""] : params.slug).join(""),
    locale,
  })

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }
  // We have the required page data, pass it to the page component
  const { title, metadata, localizations, alias, article_image, article } =
    pageData.attributes

  const pageContext = {
    locale,
    locales,
    defaultLocale,
    slug: alias,
    localizations,
  }

  const localizedPaths = getLocalizedPaths(pageContext)
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      articleImage: article_image,
      article,
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

export default DynamicCategoryArticle
