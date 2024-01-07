import HeroBackground from "@/components/elements/HeroBackground"
import Seo from "@/components/elements/seo"
import { getGlobalData } from "utils/api"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import DisclaimerContainer from "@/components/containers/disclaimer-container"
import Layout from "@/components/layout/layout"

const CookiesPage = (props) => {
  const { t } = useTranslation()
  const { global, pageContext } = props

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo
        metadata={{
          ...global.attributes.metadata,
          metaTitle: t("disclaimer"),
          metaDescription: t("disclaimer"),
        }}
      />
      <HeroBackground>
        <h6 className="hero_title">{t("disclaimer")}</h6>
      </HeroBackground>
      <DisclaimerContainer />
      <style jsx>{`
        .hero_title {
          @apply font-avenirMedium text-28pxm md:text-40pxt lg:text-40px text-black-333 uppercase whitespace-pre-line leading-none mb-mb40 md:mb-50pxt lg:mb-vw50 w-full;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { locale, locales, defaultLocale } = context

  const globalLocale = await getGlobalData(locale)

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      global: globalLocale.data,
      pageContext: {
        locale,
        locales,
        defaultLocale,
      },
    },
  }
}

export default CookiesPage
