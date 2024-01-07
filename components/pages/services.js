import { useRouter } from "next/router"
import ErrorPage from "next/error"
import HeroBackground from "../elements/HeroBackground"
import NextImage from "../elements/image"
import Seo from "../elements/seo"
import { BsArrowRight } from "react-icons/bs"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import Layout from "../layout/layout"

const DynamicService = ({
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
            <Link href="/specialties">{t("specialties")}</Link>
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

      <div className="booking-bar">
        <Link href={`/therapists?service=${title}`}>
          <div className="btn">
            {t("book_appointment")}
            <BsArrowRight className="text-30pxm md:text-34pxt lg:text-30px ml-mb20 md:ml-20pxt lg:ml-vw20 rtL:ml-0 md:rtl:ml-0 lg:rtl:ml-0 rtl:mr-mb20 md:rtl:mr-20pxt lg:rtl:mr-vw20 rtl:rotate-180" />
          </div>
        </Link>
      </div>
      <style jsx>{`
        .hero_title {
          @apply font-avenirBlack w-full lg:w-auto text-24pxm md:text-28pxt lg:text-30px text-black-333 uppercase text-center whitespace-pre-line leading-none max-w-3/4 lg:max-w-960px mx-auto mb-mb20 md:mb-20pxt lg:mb-vw20;
        }
        .booking-bar {
          @apply fixed bottom-0 w-full py-mb28 md:py-28pxt lg:py-vw30 text-center bg-gradient-to-br from-pink-300 to-blue-100 z-10;
          & .btn {
            @apply bg-white uppercase shadow-infoButton flex justify-between w-fit items-center cursor-pointer rounded-full py-mb10 md:py-10pxt lg:py-vw10 font-avenirMedium text-14pxm md:text-18pxt lg:text-base px-mb12 mx-auto transition-all duration-500 hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-btnPrimary hover:text-white;
          }
        }
        .article_wrapper {
          @apply px-mb20 lg:px-vw360 mt-mb150 md:mt-150pxt lg:mt-vw360;
        }
        .divider {
          @apply h-200pxm md:h-200pxt lg:h-200px;
        }
        .content_wrapper {
          @apply absolute  bottom-0 translate-y-[35%] lg:translate-y-[55%];
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

export default DynamicService
