import {
  getDoctorData,
  getDoctorDataById,
  getGlobalData,
  submitDoctorData,
} from "utils/api"
import { useRouter } from "next/router"
import { withSession } from "middlewares/session"
import DoctorDetails from "@/components/elements/doctorDetails.js"
import { useState } from "react"
import DocumentsUploadTable from "@/components/elements/documentsUploadTable"
import DashboardLoaderButton from "@/components/elements/dashboardLoaderButton"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import TextArea from "@/components/elements/inputs/TextArea"
import FileUploader from "@/components/elements/inputs/FileUploader"
import { extractSingleData } from "@/utils/extractData"
import { pick } from "lodash"
import CKEditorComponent from "@/components/elements/inputs/ckEditorInput"
import ProfilePictureUploader from "@/components/elements/inputs/profilePictureUploader"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { withDoctorProtected } from "@/utils/auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth"

// const formSchema = () => Yup.object().shape({})

const DoctorsAccount = ({
  doctorData,
  global,
  pageContext,
  user,
  deviceType,
}) => {
  const { t } = useTranslation()

  const onSubmit = async (values) => {
    const doctorDataUpdate = pick(values, [
      "title",
      "speciality",
      "personal_image",
      "longDescription",
      "shortDescription",
      "speakingLanguages",
      "doctorExcperinces",
      "categories",
      "documents",
    ])

    if (typeof doctorDataUpdate.personal_image === "string")
      delete doctorDataUpdate.personal_image

    const update = await submitDoctorData({ user, data: doctorDataUpdate })
  }

  const doctor = extractSingleData(doctorData)

  const personalImage = doctor?.personal_image?.data?.attributes?.url

  return (
    <>
      <div className="wrapper">
        <div className="main-title">{t("account")}</div>

        <Formik
          initialValues={{
            title: doctor?.title || "",
            birthday: user?.birthday || "",
            email: user?.email || "",
            speciality: doctor?.speciality || "",
            gender: user?.gender || "",
            phone_number: user?.phone_number || "",
            isEmailPublic: true,
            isPhoneNumberPublic: false,
            longDescription: doctor?.longDescription,
            shortDescription: doctor?.shortDescription,
            personal_image: personalImage,
            documents: [],
          }}
          onSubmit={onSubmit}
          // validationSchema={formSchema}
        >
          {({
            isSubmitting,
            isValid,
            setFieldValue,
            setFieldTouched,
            values,
          }) => {
            return (
              <Form>
                <DoctorDetails doctor={doctor} />
                {/* <div className="sectionTitle">Sessions Report</div> */}

                <div className="row">
                  <div className="sectionLong">
                    <div className="sectionTitle">{t("short_description")}</div>
                    <div className="pr-vw20">
                      <TextArea name="shortDescription" />
                    </div>
                  </div>
                  <div className="sectionShort mt-mb40 md:mt-40pxt lg:mt-0">
                    <div className="sectionTitle">{t("profile_picture")}</div>
                    <div className="dndContainer">
                      <ProfilePictureUploader
                        name="personal_image"
                        setFieldValue={setFieldValue}
                        files={values.personal_image}
                        accept={{
                          "image/png": [],
                          "image/gif": [],
                          "image/jpeg": [],
                        }}
                        showPreview
                      />
                    </div>
                  </div>
                </div>
                <div className="block">
                  <div className="sectionLong">
                    <div className="sectionTitle">{t("long_description")}</div>
                    <div className="">
                      <CKEditorComponent
                        name="longDescription"
                        value={values.longDescription}
                        onChange={setFieldValue}
                      />
                      {/* <DashboardTextArea noPadding /> */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <DocumentsUploadTable
                    name="documents"
                    files={values.documents}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    className="flex-1"
                    deviceType={deviceType}
                  />
                </div>
                <div className="row contentEnd">
                  <DashboardLoaderButton isLoading={isSubmitting}>
                    {t("update")}
                  </DashboardLoaderButton>
                  {/* <div className="updateButton">UPDATE</div> */}
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
      <style jsx>{`
        .wrapper {
          @apply lg:w-3/4;
        }
        .sectionTitle {
          @apply mb-mb20 md:mb-20pxt lg:mb-vw20 text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c] capitalize;
        }
        .main-title {
          @apply mt-mb28 md:mt-28pxt lg:mt-vw30 mb-mb20 md:mb-20pxt lg:mb-vw24 text-20pxm md:text-24pxt lg:text-20px font-avenirMedium text-[#1c1c1c];
        }
        .row {
          @apply flex flex-col lg:flex-row mt-mb40 md:mt-40pxt lg:mt-vw40;
        }
        .block {
          @apply mt-mb40 md:mt-40pxt lg:mt-vw40;
        }
        .sectionLong {
          @apply flex-2;
        }
        .sectionShort {
          @apply flex-1 flex flex-col;
        }
        .dndContainer {
          @apply bg-white rounded-sm p-mb12 md:p-12pxt lg:p-vw12 h-full;
        }
        .updateButton {
          @apply bg-[#0a47ac] flex justify-center items-center text-white text-16px font-avenirMedium py-vw16 px-vw60 w-fit;
        }
        .contentEnd {
          @apply justify-end;
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

  if (session?.role?.type !== "doctors") {
    return {
      redirect: {
        permanent: false,
        destination: `/dashboard`,
      },
    }
  }

  let doctorData = null
  if (session) {
    doctorData = await getDoctorDataById(session, locale)
  }

  const user = {
    birthday: session?.birthday || "",
    email: session?.email || "",
    gender: session?.gender || "",
    phone_number: session?.phone_number || "",
    strapiToken: session?.strapiToken,
  }

  const patientId = query.patientsId || null

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      global: globalLocale.data,
      pageContext: {
        locale,
        locales,
        defaultLocale,
      },
      patientId,
      user,
      doctorData: doctorData,
    },
  }
}

export default DoctorsAccount
