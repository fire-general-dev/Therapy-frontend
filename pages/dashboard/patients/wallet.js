import { getGlobalData } from "utils/api"
import { withPatientProtected } from "@/utils/auth"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import WalletContainer from "@/components/containers/wallet-container"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

const WalletPage = () => {
  const { t } = useTranslation()
  return (
    <>
      <div className="wrapper">
        <WalletContainer />
      </div>
      <style jsx>{`
        .wrapper {
          @apply mt-vw80;
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

export default WalletPage
