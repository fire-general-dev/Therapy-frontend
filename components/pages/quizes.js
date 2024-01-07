import { useRouter } from "next/router"
import ErrorPage from "next/error"
import HeroBackground from "../elements/HeroBackground"
import NextImage from "../elements/image"
import Seo from "../elements/seo"
import { useState } from "react"
import { getIsRTL } from "utils/localize"
import QuizeView from "../elements/quizes/quizeView"
import QuizeArticle from "../elements/quizes/quizeArticle"
import TimeConverter from "utils/timeConverter"
import { useTranslation } from "react-i18next"
import Layout from "../layout/layout"

const DynamicQuize = ({
  metadata,
  global,
  pageContext,
  image,
  quize,
  title,
  description,
  notes,
  article,
  time,
  showCorrectAnswer,
}) => {
  const router = useRouter()
  const [showCorrectAns, setShowCorrectAns] = useState(false)
  const [showQuizArticle, setShowQuizArticle] = useState(false)
  const { t } = useTranslation("common")
  const isRTL = getIsRTL(router?.locale)

  // Check if the required data was provided
  if (!router.isFallback && !quize) {
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

  const questionCounts = quize.length

  const onSubmitClick = () => {
    if (!showCorrectAns && showCorrectAnswer) {
      setShowCorrectAns(true)
    } else {
      setShowQuizArticle(true)
      // redirect
    }
  }

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadataWithDefaults} />
      {/* Display content sections */}
      <HeroBackground noCircle useCustomMobileHeight>
        <div className="hero_title">{title}</div>
        <div className="quiz_box_info">
          {image?.data?.attributes && (
            <div className="image_wrapper">
              <NextImage
                media={image}
                className="!w-150pxm md:!w-200pxt lg:!w-200px"
              />
            </div>
          )}
          <div className="info_box">
            <span className="capitalize">
              {questionCounts} {t("questions")}
            </span>
            <span>
              {TimeConverter(time)} {t("min")}
            </span>
          </div>
        </div>
      </HeroBackground>
      <div className="wrapper">
        {!showQuizArticle ? (
          <QuizeView
            onSubmitClick={onSubmitClick}
            showCorrectAns={showCorrectAns}
            description={description}
            quize={quize}
            questionCounts={questionCounts}
            isRTL={isRTL}
            notes={notes}
          />
        ) : (
          <QuizeArticle article={article} />
        )}
      </div>
      <style jsx>{`
        .hero_title {
          @apply font-avenirBlack w-full lg:w-auto text-24pxm md:text-50pxt lg:text-50px text-black-333 uppercase text-center whitespace-pre-line leading-none;
        }
        .wrapper {
          @apply px-mb20 lg:px-vw360 mt-mb60 md:mt-60pxt lg:mt-vw60 text-18pxm md:text-22pxt lg:text-18px;
        }
        .quiz_box_info {
          @apply rounded-xl translate-y-15perc block relative py-mb20 px-mb100 md:py-24pxt md:px-100pxt lg:py-vw24 lg:px-vw140;
          background-image: linear-gradient(61deg, #fdd5c6, #a0e3e5 100%);
        }
        .info_box {
          @apply absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-evenly text-green-100 text-12pxm md:text-18pxt lg:text-14px bg-white rounded-t-xl py-mb12 md:py-12pxt lg:py-vw12 w-4/5;
        }
      `}</style>
    </Layout>
  )
}

export default DynamicQuize
