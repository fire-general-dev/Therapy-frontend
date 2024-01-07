import { getGlobalData } from "utils/api"
import { withSession } from "middlewares/session"
import "react-toastify/dist/ReactToastify.css"
import HeroBackground from "@/components/elements/HeroBackground"
import ReviewUsContainer from "@/components/containers/review-us-container"
import Layout from "@/components/layout/layout"

const ReviewPage = ({ global, pageContext }) => {
  return (
    <Layout global={global} pageContext={pageContext}>
      <HeroBackground noCircle>
        <ReviewUsContainer />
      </HeroBackground>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { locale, locales, defaultLocale } = context

  const globalLocale = await getGlobalData(locale)

  return {
    props: {
      global: globalLocale.data,
      pageContext: {
        locale,
        locales,
        defaultLocale,
      },
    },
  }
}

export default ReviewPage
