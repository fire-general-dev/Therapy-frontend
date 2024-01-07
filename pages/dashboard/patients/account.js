import { getGlobalData, getMeData } from "utils/api"
import PatientAccountContainer from "@/components/containers/patient-account-container"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import axios from "axios"
import { useEffect } from "react"

const PatientAccount = ({ user, store, pageContext }) => {
  const { t } = useTranslation()
  return (
    <>
      <div className="wrapper">
        <div className="main-title">{t("account_information")}</div>
        <PatientAccountContainer
          user={user}
          store={store}
          locale={pageContext.locale}
        />
      </div>
      <style jsx>{`
        .main-title {
          @apply text-black-3232 text-2xl mb-8;
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

  const userData = await getMeData({ token: session?.strapiToken })
  if (userData) {
    userData.strapiToken = session?.strapiToken
  }

  const user = {
    salutation: userData?.data?.salutation || "",
    firstname: userData?.data?.firstname || "",
    middlename: userData?.data?.middlename || "",
    surname: userData?.data?.surname || "",
    gender: userData?.data?.gender || "",
    birthday: userData?.data?.birthday || "",
    email: userData?.data?.email || "",
    material_status: userData?.data?.material_status || "",
    religion: userData?.data?.religion || "",
    nationality: userData?.data?.nationality || "",
    comunication_lang: userData?.data?.comunication_lang || "",
    mobile_cc: userData?.data?.mobile_cc || "+971",
    mobile_c: userData?.data?.mobile_c || "",
    mobile: userData?.data?.mobile || "",
    city: userData?.data?.city || "",
    zone: userData?.data?.zone || "",
    district: userData?.data?.district || "",
    emrg_name: userData?.data?.emrg_name || "",
    emrg_relation: userData?.data?.emrg_relation || "",
    emrg_mobile_cc: userData?.data?.emrg_mobile_cc || "",
    emrg_mobile_c: userData?.data?.emrg_mobile_c || "",
    emrg_mobile: userData?.data?.emrg_mobile || "",
    emrg_country: userData?.data?.emrg_country || "",
    emrg_address: userData?.data?.emrg_address || "",
    address: userData?.data?.address || "",
    visa_status: userData?.data?.visa_status || "",
    em_front: userData?.data?.em_front || null,
    em_back: userData?.data?.em_back || null,
    passport: userData?.data?.passport || null,
    profile_img: userData?.data?.profile_img || null,
    identityNumber: userData?.data?.identityNumber || "",
    passportNumber: userData?.data?.passportNumber || "",
    strapiToken: session?.strapiToken,
  }

  // const user = req.session.user || null

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      global: globalLocale.data,
      pageContext: {
        locale,
        locales,
        defaultLocale,
      },
      user,
    },
  }
}

export default PatientAccount
