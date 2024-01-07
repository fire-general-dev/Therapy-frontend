import { getGlobalData } from "utils/api"
import { useRouter } from "next/router"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ContactUs from "@/components/pages/contact-us/contact-us"
import HeroBackground from "@/components/elements/HeroBackground"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Layout from "@/components/layout/layout"
import Seo from "@/components/elements/seo"
import { useTranslation } from "next-i18next"

const ContactUsPage = ({ global, pageContext, user }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const handleSubmit = async (data) => {
    const body = {
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    }

    const apiLink = process.env.NEXT_PUBLIC_STRAPI_API_URL + "/api/contact-uses"

    await axios
      .post(apiLink, body)
      .then((res) => {
        toast.success(
          "Thank you for contacting us, we will contact you soon!",
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        )
        router.push("/")
      })
      .catch((err) => {
        toast.error(
          err.response?.data.error?.message ||
            "An error occurred during the contact us process, please try againّ!",
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        )
      })
  }

  return (
    <Layout global={global} pageContext={pageContext}>
      <HeroBackground noCircle>
        <Seo
          metadata={{
            metaTitle: t("contact_us_title"),
            metaDescription: t("contact_us_title"),
          }}
        />
        <ContactUs user={user} onContact={handleSubmit} />
      </HeroBackground>
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

export default ContactUsPage
