import { getGlobalData, getQuizeData } from "utils/api"
import { getLocalizedPaths } from "utils/localize"
import DynamicQuize from "@/components/pages/quizes"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const DynamicQuizesPage = ({
  metadata,
  global,
  pageContext,
  questions,
  title,
  description,
  notes,
  category,
  time,
  image,
  article,
  showCorrectAnswer,
}) => {
  return (
    <DynamicQuize
      metadata={metadata}
      global={global}
      pageContext={pageContext}
      quize={questions}
      title={title}
      image={image}
      description={description}
      notes={notes}
      category={category}
      time={time}
      article={article}
      showCorrectAnswer={showCorrectAnswer}
    />
  )
}

export const getServerSideProps = async (context) => {
  const { params, locale, locales, defaultLocale } = context

  const globalLocale = await getGlobalData(locale)
  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getQuizeData({
    slug: (!params.slug ? [""] : params.slug).join(""),
    locale,
  })

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }
  // We have the required page data, pass it to the page component
  const {
    name: title,
    metadata,
    localizations,
    slug,
    category,
    questions,
    description,
    notes,
    time,
    image,
    article,
    showCorrectAnswer,
  } = pageData[0].attributes

  const pageContext = {
    locale,
    locales,
    defaultLocale,
    slug,
    localizations,
  }

  const localizedPaths = getLocalizedPaths(pageContext)
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      category,
      title,
      metadata,
      questions,
      description,
      time,
      notes,
      image,
      article,
      showCorrectAnswer,
      global: globalLocale.data,
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
    },
  }
}

export default DynamicQuizesPage
