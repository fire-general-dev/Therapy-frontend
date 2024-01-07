import { getGlobalData } from "utils/api"
import PatientDocumentsContainer from "@/components/containers/patient-documents-container"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

const PatientDocuments = ({ documents, deviceType }) => {
  const { t } = useTranslation()
  return (
    <>
      <div className="wrapper">
        <div className="main-title">{t("documents")}</div>
        <PatientDocumentsContainer
          documents={documents}
          deviceType={deviceType}
        />
      </div>
      <style jsx>{`
        .wrapper {
          @apply lg:w-3/4;
        }
        .main-title {
          @apply mt-mb28 md:mt-28pxt lg:mt-vw30 mb-mb20 md:mb-20pxt lg:mb-vw24 text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c];
        }
      `}</style>
    </>
  )
}
export const getServerSideProps = async (context) => {
  const { params, locale, locales, defaultLocale, req, query } = context
  const globalLocale = await getGlobalData(locale)

  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    }
  }

  if (session.role.type == "doctors") {
    return {
      redirect: {
        permanent: false,
        destination: `/dashboard`,
      },
    }
  }

  // TODO get documents from server
  const documents = []

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      global: globalLocale.data,
      pageContext: {
        locale,
        locales,
        defaultLocale,
      },
      documents,
    },
  }
}
export default PatientDocuments
