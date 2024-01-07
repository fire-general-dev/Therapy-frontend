import MobileDetect from "mobile-detect"
import { connect } from "react-redux"
import { wrapper } from "reduxStore"
import { bindActionCreators } from "redux"
import HeroBackground from "@/components/elements/HeroBackground"
import Seo from "@/components/elements/seo"
import { getGlobalData } from "utils/api"
import { getLocalizedPaths } from "utils/localize"
import { fetchQuizzesList } from "reduxStore/actions/quizzesListAction"
import QuizzesListContainer from "@/components/containers/quizzes-list"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "react-i18next"
import Layout from "@/components/layout/layout"

const QuizzesPage = (props) => {
  const {
    deviceType,
    global,
    pageContext,
    title,
    quizzesList,
    fetchQuizzesList,
    pagination,
    isLoading,
  } = props
  const metadataWithDefaults = {
    ...global.attributes.metadata,
    metaTitle: "Quizzes List",
    metaDescription: "Quizzes description",
  }

  const { t } = useTranslation("common")
  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadataWithDefaults} />
      <HeroBackground>
        <h6 className="hero_title">{t("am_ok")}</h6>
        {/* <p className="hero_description">
          Eiusmod anim eu velit et est. Et pariatur qui voluptate officia dolore
          nisi. Ad enim sunt adipisicing veniam ad. Eiusmod anim eu velit et
          est. Et pariatur qui voluptate officia dolore nisi. Ad enim sunt
          adipisicing veniam ad.
        </p> */}
      </HeroBackground>
      <QuizzesListContainer
        quizzes={quizzesList}
        fetchQuizzesList={fetchQuizzesList}
        isLoading={isLoading}
        pagination={pagination}
      />
      <style jsx>{`
        .hero_title {
          @apply font-avenirMedium text-28pxm md:text-40pxt lg:text-50px text-black-333 uppercase text-center whitespace-pre-line leading-none mb-mb20 md:mb-20pxt lg:mb-vw20;
        }
        .hero_description {
          @apply text-18pxm md:text-22pxt lg:text-18px text-black-333 text-center whitespace-pre-line leading-none mb-mb60 md:mb-60pxt lg:mb-vw60 mx-mb20 md:mx-100pxt lg:mx-vw100;
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
    // const quizzesPageData = await getQuizzesPageData(locale)
    await store.dispatch(fetchQuizzesList({ locale, page: 1, pageSize: 10 }))
    // const { metadata, localizations, title } =
    //   quizzesPageData.attributes
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
  quizzesList: state.quizzesList.quizzesList,
  pagination: state.quizzesList.pagination,
  isLoading: state.quizzesList.isLoading,
})
const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizzesList: bindActionCreators(fetchQuizzesList, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizzesPage)
