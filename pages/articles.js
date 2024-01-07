import MobileDetect from "mobile-detect"
import { connect } from "react-redux"
import { wrapper } from "reduxStore"
import { bindActionCreators } from "redux"
import HeroBackground from "@/components/elements/HeroBackground"

import Seo from "@/components/elements/seo"
import { getGlobalData } from "utils/api"
import { getLocalizedPaths } from "utils/localize"
import { fetchArticlesList } from "reduxStore/actions/articlesListAction"
import ArticlesListContainer from "@/components/containers/articles-list"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import Layout from "@/components/layout/layout"

const ArticlesPage = (props) => {
  const { t } = useTranslation("common")

  const {
    deviceType,
    global,
    pageContext,
    title,
    articlesList,
    fetchArticlesList,
    pagination,
    isLoading,
  } = props

  const metadataWithDefaults = {
    ...global.attributes.metadata,
    metaTitle: "Articles List",
    metaDescription: "Articles description",
  }

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadataWithDefaults} />
      <HeroBackground>
        <h6 className="hero_title">{t("read_article")}</h6>
        <p className="hero_description">{t("knowledge_base")}</p>
        <div className="path-wrapper">
          <Link href="/">{t("back_to_home")}</Link>&nbsp; //&nbsp;&nbsp;
          <span className="text-green-200">{t("articles")}</span>
        </div>
      </HeroBackground>
      <ArticlesListContainer
        articles={articlesList}
        fetchArticlesList={fetchArticlesList}
        isLoading={isLoading}
        pagination={pagination}
      />
      <style jsx>{`
        .hero_title {
          @apply font-avenirMedium text-28pxm md:text-40pxt lg:text-50px text-black-333 uppercase text-center whitespace-pre-line leading-none mb-mb20 md:mb-20pxt lg:mb-vw20;
        }
        .hero_description {
          @apply text-18pxm md:text-22pxt lg:text-18px text-black-333 text-center whitespace-pre-line leading-none mx-mb20 md:mx-100pxt lg:mx-vw100  mb-mb20 md:mb-20pxt lg:mb-vw20;
        }
        .path-wrapper {
          @apply text-16pxm md:text-20pxt lg:text-16px font-medium text-text-primary mb-mb60 md:mb-60pxt lg:mb-vw60;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params, locale, locales, defaultLocale, req } = context

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

    const globalLocale = await getGlobalData(locale)

    // const articlesPageData = await getArticlesPageData(locale)
    await store.dispatch(fetchArticlesList({ locale, page: 1, pageSize: 10 }))

    // const { metadata, localizations, title } =
    //   articlesPageData.attributes

    const pageContext = {
      locale,
      locales,
      defaultLocale,
      // slug,
    }

    const localizedPaths = getLocalizedPaths(pageContext)

    return {
      props: {
        // metadata,
        ...(await serverSideTranslations(locale, ["common"])),
        global: globalLocale.data,
        pageContext: {
          ...pageContext,
          localizedPaths,
        },
        deviceType,
      },
    }
  }
)

const mapStateToProps = (state) => ({
  articlesList: state.articlesList.articlesList,
  pagination: state.articlesList.pagination,
  isLoading: state.articlesList.isLoading,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticlesList: bindActionCreators(fetchArticlesList, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesPage)
