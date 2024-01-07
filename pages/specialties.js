import MobileDetect from "mobile-detect"
import { connect } from "react-redux"
import { wrapper } from "reduxStore"
import { bindActionCreators } from "redux"

import Seo from "@/components/elements/seo"
import { getGlobalData } from "utils/api"
import { getLocalizedPaths } from "utils/localize"
import { fetchCategoriesList } from "reduxStore/actions/categoriesListAction"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import Layout from "@/components/layout/layout"
import HeroBg from "@/components/layout/HeroBg"
import HomePath from "@/components/buttons/HomePath"
import SpecialitiesContainer from "@/components/containers/specialities-container"

const SpecialitiesPage = (props) => {
  const { deviceType, global, pageContext, categoriesList } = props
  const { t } = useTranslation()
  // Merge default site SEO settings with page specific SEO settings
  const metadataWithDefaults = {
    ...global.attributes.metadata,
    metaTitle: "Specialities List | Nafsi",
    metaDescription: "",
  }

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadataWithDefaults} />
      <HeroBg>
        <div className="hero-content">
          <h6 className="hero-title">{t("we_specialize_in")}</h6>
          <HomePath title={t("specialties")} />
        </div>
      </HeroBg>
      <SpecialitiesContainer categories={categoriesList} />
      <style jsx>{`
        .hero-title {
          @apply text-[#2E3333] text-center text-2xl lg:text-4xl font-bold uppercase mb-4;
        }

        .hero-subtitle {
          @apply text-gray-64 text-base inline-block text-center;
        }

        .hero-content {
          @apply text-center pb-16;
          font-family: "Poppins", sans-serif;
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

    await store.dispatch(fetchCategoriesList({ locale, page: 1, pageSize: 1 }))
    const pageContext = {
      locale,
      locales,
      defaultLocale,
      // slug,
    }

    const localizedPaths = getLocalizedPaths(pageContext)

    return {
      props: {
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
  categoriesList: state.categoriesList.categoriesList,
  // pagination: state.categoriesList.pagination,
  isLoading: state.categoriesList.isLoading,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategoriesList: bindActionCreators(fetchCategoriesList, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialitiesPage)
