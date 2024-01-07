import Seo from "@/components/elements/seo"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import HeroBg from "@/components/layout/HeroBg"
import CoupleTherapyContainer from "@/components/containers/couple-therapy-container"
import MobileDetect from "mobile-detect"
import { connect } from "react-redux"
import { wrapper } from "reduxStore"
import { getGlobalData } from "utils/api"
import { fetchCategoriesList } from "reduxStore/actions/categoriesListAction"
import { bindActionCreators } from "redux"
import Layout from "@/components/layout/layout"
import HomePath from "@/components/buttons/HomePath"

const CoupleTherapyPage = ({
  categoriesList,
  global,
  pageContext,
  deviceType,
}) => {
  const { t } = useTranslation()
  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo
        metadata={{
          ...global.attributes.metadata,
          metaTitle: t("couple_therapy"),
          metaDescription: t("couple_therapy"),
        }}
      />
      <HeroBg>
        <div className="hero-content">
          <h6 className="hero-title">{t("therapy_for_me_and_my_partner")}</h6>
          <HomePath title={t("couple_therapy")} />
        </div>
      </HeroBg>
      <CoupleTherapyContainer
        categoriesList={categoriesList}
        deviceType={deviceType}
      />
      <style jsx>{`
        .hero-title {
          @apply text-[#2E3333] text-center text-4xl font-bold uppercase mb-4;
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
    }

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        global: globalLocale.data,
        pageContext: {
          ...pageContext,
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

export default connect(mapStateToProps, mapDispatchToProps)(CoupleTherapyPage)
