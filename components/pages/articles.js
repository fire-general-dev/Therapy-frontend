import { useRouter } from "next/router"
import ErrorPage from "next/error"
import HeroBackground from "../elements/HeroBackground"
import NextImage from "../elements/image"
import Seo from "../elements/seo"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import Layout from "../layout/layout"

const DynamicArticle = ({
  metadata,
  global,
  pageContext,
  articleImage,
  article,
  title,
}) => {
  const router = useRouter()
  const { t } = useTranslation("common")

  // Check if the required data was provided
  if (!router.isFallback && !article) {
    return <ErrorPage statusCode={404} />
  }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">{t("loading")}...</div>
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
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadataWithDefaults} />
      {/* Display content sections */}
      <HeroBackground noCircle useCustomMobileHeight>
        <div className="divider"></div>
        <div className="content_wrapper">
          <div className="hero_title">{title}</div>
          <div className="path-wrapper">
            <Link href="/">{t("back_to_home")}</Link>&nbsp; //&nbsp;&nbsp;
            <Link href="/articles">{t("articles")}</Link>
          </div>
          <div className="image_wrapper">
            <NextImage
              media={articleImage}
              className="rounded-2xl !h-200pxm md:!h-250pxt lg:!h-500px"
            />
          </div>
        </div>
      </HeroBackground>
      <div className="article_wrapper">
        <div dangerouslySetInnerHTML={{ __html: article }}></div>
      </div>
      <style jsx>{`
        .hero_title {
          font-family: "Tajawal", sans-serif;
          @apply w-full lg:w-auto text-3xl text-black-333 uppercase text-center whitespace-pre-line leading-none max-w-3/4 lg:max-w-960px mx-auto mb-5;
        }
        .article_wrapper {
          font-family: "Tajawal", sans-serif;
          @apply px-5 lg:px-80 mt-36 lg:mt-80;
        }
        .divider {
          @apply h-52;
        }
        .content_wrapper {
          @apply absolute bottom-0 translate-y-[35%] lg:translate-y-[55%];
        }
        .image_wrapper {
          @apply rounded-2xl px-mb40 max-h-[50vw] lg:px-vw510 lg:max-h-vw705;
        }
        .path-wrapper {
          @apply text-16pxm md:text-20pxt lg:text-16px font-medium text-text-primary text-center  mb-mb20 md:mb-20pxt lg:mb-vw20;
        }
      `}</style>
    </Layout>
  )
}

export default DynamicArticle
