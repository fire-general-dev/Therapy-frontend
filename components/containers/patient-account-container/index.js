import { Formik, Form, Field } from "formik"
import React, { useState } from "react"
import * as Yup from "yup"
import { UpdateUserAccount } from "@/utils/api"
// import { login } from "reduxStore/actions/authActions"
import { useTranslation } from "next-i18next"
import DashboardTabs from "@/components/elements/DashboardTabs/DashboardTabs"
import TabPane from "@/components/elements/DashboardTabs/TabPane"
import DashboardTextField from "@/components/inputs/DashboardTextField"
import InfoSection from "./info-section"
import ProfileImageUploader from "@/components/inputs/ProfileImageUploader"
import DashboardSelectField from "@/components/inputs/DashboardSelectField/DashboardSelectField"
import DashboardDateField from "@/components/inputs/DashboardDateField"
import DashboardPlainTextField from "@/components/inputs/DashboardPlainTextField"
import DashboardSwitcher from "@/components/inputs/DashboardSwitcher/DashboardSwitcher"
import FileUploader from "@/components/inputs/FileUploader"
import DashboardButton from "@/components/buttons/DashboardButton"
import {
  CountriesOptions,
  DistrictOptionsZone1,
  DistrictOptionsZone2,
  DistrictOptionsZone3,
  EmiratesOptions,
  GenderOptions,
  LanguageOptions,
  MaterialStatusOptions,
  MobilePrefixOptoins,
  NationalityOptions,
  RelationshipOptions,
  ReligionOptions,
  SalutationOptions,
  VisaStatusOptions,
  ZoneOptions,
} from "@/utils/metadata"
import { toast } from "react-toastify"
import moment from "moment"

const formSchema = (t) =>
  Yup.object().shape({
    salutation: Yup.string().required(t("enter_salutation")),
    firstname: Yup.string()
      .min(3, t("name_minimum"))
      .max(40, t("name_maximum"))
      .required(t("enter_first_name")),
    surname: Yup.string()
      .min(3, t("name_minimum"))
      .max(40, t("name_maximum"))
      .required(t("enter_surname")),
    gender: Yup.string().required(t("enter_gender")),
    material_status: Yup.string().required(t("enter_material_status")),
    religion: Yup.string().required(t("enter_religion")),
    nationality: Yup.string().required(t("enter_nationality")),
    comunication_lang: Yup.string().required(t("enter_comunication_lang")),
    mobile_cc: Yup.string().required(t("enter_mobile_cc")),
    mobile_c: Yup.string().required(t("enter_mobile_c")),
    mobile: Yup.number()
      .typeError(t("enter_valid_number"))
      .positive(t("enter_valid_number"))
      .integer(t("enter_valid_number"))
      .min(1)
      .required(t("enter_mobile_number")),
    zone: Yup.string().required(t("enter_zone")),
    district: Yup.string().required(t("enter_district")),
    emrg_name: Yup.string().required(t("enter_name")),
    emrg_mobile_cc: Yup.string().required(t("enter_mobile_cc")),
    emrg_mobile_c: Yup.string().required(t("enter_mobile_c")),
    emrg_mobile: Yup.number()
      .typeError(t("enter_valid_number"))
      .positive(t("enter_valid_number"))
      .integer(t("enter_valid_number"))
      .min(1)
      .required(t("enter_mobile_number")),
    emrg_country: Yup.string().required(t("enter_country")),
    visa_status: Yup.string().required(t("enter_visa_status")),
    emrg_relation: Yup.string().required(t("enter_emrg_relation")),
    email: Yup.string()
      .required(t("enter_email"))
      .email(t("enter_valid_email")),
    address: Yup.string().required(t("enter_address")),
    emrg_address: Yup.string().required(t("enter_address")),
    identityNumber: Yup.string().required(t("this_field_required")),
    birthday: Yup.date(t("valid_birthday"))
      .min(
        moment().subtract(150, "years").format("YYYY-MM-DD"),
        t("early_date")
      )
      .max(
        moment().subtract(18, "years").format("YYYY-MM-DD"),
        t("must_over_18")
      ),
  })

function PatientAccountContainer({ user, store, locale }) {
  const { t } = useTranslation()
  const [identifierType, setIdentifierType] = useState("ID")
  const [isResident, setIsResident] = useState(true)

  const onSubmit = async (values) => {
    const response = await UpdateUserAccount({ user, data: values })

    toast.success(t("data_updated"), {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

  const options = [
    { value: "MR", label: "MR" },
    { value: "MRS", label: "MRS" },
    { value: "DR", label: "DR" },
  ]

  const getDistrictOptions = (value) => {
    switch (value) {
      case "Zone1":
        return DistrictOptionsZone1
      case "Zone2":
        return DistrictOptionsZone2
      case "Zone3":
        return DistrictOptionsZone3
      default:
        return []
    }
  }

  return (
    <div className="outWrapper">
      <Formik
        initialValues={{
          salutation: user.salutation,
          firstname: user.firstname || "",
          middlename: user.middlename || "",
          surname: user.surname || "",
          gender: user.gender || "",
          birthday: user.birthday || "",
          material_status: user.material_status || "",
          religion: user.religion || "",
          nationality: user.nationality || "",
          comunication_lang: user.comunication_lang || "",
          mobile_cc: user.mobile_cc || "+971",
          mobile_c: user.mobile_c || "",
          mobile: user.mobile || "",
          email: user.email || "",
          country: user.country || "183",
          city: user.city || "A005",
          zone: user.zone || "",
          district: user.district || "",
          emrg_name: user.emrg_name || "",
          emrg_relation: user.emrg_relation || "",
          emrg_mobile_cc: user.emrg_mobile_cc || "+971",
          emrg_mobile_c: user.emrg_mobile_c || "",
          emrg_mobile: user.emrg_mobile || "",
          emrg_country: user.emrg_country || "",
          emrg_address: user.emrg_address || "",
          address: user.address || "",
          visa_status: user.visa_status || "",
          phone_number: user.phone_number || "",
          em_front: null,
          em_back: null,
          passport: null,
          profile_img: null,
          identityNumber: user.identityNumber || "",
          passportNumber: user.passportNumber || "",
        }}
        onSubmit={onSubmit}
        validationSchema={formSchema(t)}
        validateOnMount={true}
      >
        {({ isSubmitting, isValid, setFieldValue, values, errors }) => {
          return (
            <Form>
              <DashboardTabs>
                <TabPane key={"information"} title={t("information")}>
                  <InfoSection title={t("personal_information")}>
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
                      <div className="col-span-1">
                        <ProfileImageUploader
                          setFieldValue={setFieldValue}
                          previewFile={user.profile_img}
                          name="profile_img"
                          label={t("profile_picture")}
                          files={values.profile_img}
                          accept={{
                            "image/png": [],
                            "image/gif": [],
                            "image/jpeg": [],
                          }}
                          showPreview
                        />
                      </div>
                      <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-x-5 gap-y-8">
                        <DashboardSelectField
                          isRequired={true}
                          options={SalutationOptions}
                          label={t("salutation")}
                          name="salutation"
                        />
                        <DashboardTextField
                          isRequired={true}
                          name="firstname"
                          label={t("first_name")}
                          placeholder={t("enter_first_name")}
                        />
                        <DashboardTextField
                          name="middlename"
                          label={t("middle_name")}
                          placeholder={t("enter_middle_name")}
                        />
                        <DashboardTextField
                          isRequired={true}
                          name="surname"
                          label={t("sur_name")}
                          placeholder={t("enter_surname")}
                        />
                        <DashboardSelectField
                          isRequired={true}
                          options={GenderOptions}
                          label={t("gender")}
                          name="gender"
                        />
                        <DashboardDateField
                          isRequired={true}
                          name="birthday"
                          label={t("date_of_birth")}
                        />
                        <DashboardSelectField
                          isRequired={true}
                          options={MaterialStatusOptions}
                          label={t("marital_status")}
                          name="material_status"
                        />
                        <DashboardSelectField
                          isRequired={true}
                          options={ReligionOptions}
                          label={t("religion")}
                          name="religion"
                        />
                        <DashboardSelectField
                          isRequired={true}
                          options={NationalityOptions}
                          label={t("nationality")}
                          name="nationality"
                        />
                      </div>
                    </div>
                  </InfoSection>

                  <InfoSection title={t("contact_information")}>
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 items-start">
                      <div className="grid lg:grid-cols-2 gap-5">
                        <DashboardSelectField
                          isRequired={true}
                          options={LanguageOptions}
                          label={t("communication_language")}
                          name="comunication_lang"
                        />
                        <DashboardTextField
                          isRequired={true}
                          name="email"
                          label={t("email")}
                        />
                      </div>

                      <div className="">
                        <span className="label">{t("mobile_number")} *</span>
                        <div className="grid gap-2 grid-cols-4 lg:gap-5 items-end">
                          <DashboardPlainTextField
                            isDisabled={true}
                            className="col-span-1"
                            name="mobile_cc"
                            placeholder={t("mobile_number")}
                          />
                          <DashboardSelectField
                            className="col-span-1"
                            // isRequired={true}
                            options={MobilePrefixOptoins}
                            // label={t("code")}
                            name="mobile_c"
                          />
                          <DashboardPlainTextField
                            className="col-span-2"
                            name="mobile"
                            placeholder={t("enter_number")}
                          />
                        </div>
                      </div>
                      {/* <div className="grid gap-2 lg:gap-5 grid-cols-4 items-end">
                        <DashboardPlainTextField
                          isDisabled={true}
                          className="col-span-1"
                          name="mobile_cc"
                          placeholder={t("mobile_number")}
                        />
                        <DashboardSelectField
                          className="col-span-1"
                          // isRequired={true}
                          options={MobilePrefixOptoins}
                          // label={t("code")}
                          name="mobile_c"
                        />
                        <DashboardPlainTextField
                          className="col-span-2"
                          name="mobile"
                          placeholder={t("enter_number")}
                        />
                      </div> */}
                    </div>
                  </InfoSection>

                  <InfoSection title={t("address_information")}>
                    <div className="grid grid-cols-1 gap-5">
                      <div className="grid lg:grid-cols-4 gap-5">
                        <DashboardSelectField
                          isDisabled={true}
                          options={CountriesOptions}
                          name="country"
                          label={t("country")}
                        />
                        <DashboardSelectField
                          isDisabled={true}
                          options={EmiratesOptions}
                          name="city"
                          label={t("city")}
                        />
                        <DashboardSelectField
                          isRequired={true}
                          options={ZoneOptions}
                          label={t("zone")}
                          name="zone"
                        />
                        <DashboardSelectField
                          isRequired={true}
                          options={getDistrictOptions(values["zone"])}
                          label={t("district")}
                          name="district"
                        />
                      </div>
                      <div>
                        <DashboardTextField
                          isRequired={true}
                          name="address"
                          label={t("permanent_address")}
                          placeholder={t("enter_address")}
                        />
                      </div>
                    </div>
                  </InfoSection>

                  <InfoSection title={t("emergency_contact_information")}>
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 items-start mb-5">
                      <div className="grid lg:grid-cols-2 gap-5">
                        <DashboardTextField
                          isRequired={true}
                          name="emrg_name"
                          label={t("name")}
                          placeholder={t("enter_name")}
                        />
                        <DashboardSelectField
                          isRequired={true}
                          options={RelationshipOptions}
                          label={t("relation")}
                          name="emrg_relation"
                        />
                      </div>

                      <div className="">
                        <span className="label">{t("mobile_number")} *</span>
                        <div className="grid gap-2 grid-cols-4 lg:gap-5 items-end">
                          <DashboardPlainTextField
                            isDisabled={true}
                            className="col-span-1"
                            name="emrg_mobile_cc"
                            placeholder={t("mobile_number")}
                          />
                          <DashboardSelectField
                            className="col-span-1"
                            options={MobilePrefixOptoins}
                            name="emrg_mobile_c"
                          />
                          <DashboardPlainTextField
                            className="col-span-2"
                            name="emrg_mobile"
                            placeholder={t("enter_number")}
                          />
                        </div>
                      </div>
                      {/* <div className="grid gap-2 lg:gap-5 grid-cols-4 items-end">
                        <DashboardPlainTextField
                          isDisabled={true}
                          className="col-span-1"
                          name="emrg_mobile_cc"
                          placeholder={t("mobile_number")}
                        />
                        <DashboardSelectField
                          className="col-span-1"
                          isRequired={true}
                          options={MobilePrefixOptoins}
                          label={t("code")}
                          name="emrg_mobile_c"
                        />
                        <DashboardPlainTextField
                          className="col-span-2"
                          name="emrg_mobile"
                          placeholder={t("enter_number")}
                        />
                      </div> */}
                    </div>
                    <div className="grid gap-5 lg:grid-cols-4">
                      <DashboardSelectField
                        isRequired={true}
                        options={CountriesOptions}
                        label={t("country_of_residence")}
                        name="emrg_country"
                      />
                      <DashboardTextField
                        isRequired={true}
                        className="lg:col-span-3"
                        name="emrg_address"
                        label={t("permanent_address")}
                        placeholder={t("enter_address")}
                      />
                    </div>
                  </InfoSection>

                  <InfoSection title={t("choose_your_identify_type")}>
                    <div className="grid lg:grid-cols-4 gap-5">
                      <DashboardSelectField
                        isRequired={true}
                        options={VisaStatusOptions}
                        label={t("visa_status")}
                        name="visa_status"
                      />
                      <DashboardSwitcher
                        isRequired={true}
                        label={t("type")}
                        isDisabledOn={values["visa_status"] == "V001"}
                        isOn={
                          values["visa_status"] == "V001" ? false : isResident
                        }
                        onChange={(value) => setIsResident(value)}
                        onText={t("emirates_id")}
                        offText={t("passport")}
                      />
                      {isResident ? (
                        <DashboardTextField
                          className="lg:col-span-2"
                          isRequired={true}
                          name="identityNumber"
                          label={t("eid_number")}
                          placeholder={t("enter_number")}
                        />
                      ) : (
                        <DashboardTextField
                          className="lg:col-span-2"
                          isRequired={true}
                          name="identityNumber"
                          label={t("passport_number")}
                          placeholder={t("enter_number")}
                        />
                      )}
                    </div>
                    <div>
                      <p className="upload-msg">{t("upload_eid_message")}</p>
                    </div>
                    {isResident ? (
                      <div className="flex flex-col lg:flex-row gap-5">
                        <FileUploader
                          setFieldValue={setFieldValue}
                          name="em_front"
                          label={t("first_front_side")}
                          files={values.em_front}
                          previewFile={user.em_front}
                          accept={{
                            "image/png": [],
                            "image/gif": [],
                            "image/jpeg": [],
                            "application/pdf": [],
                          }}
                          showPreview
                        />

                        <FileUploader
                          setFieldValue={setFieldValue}
                          name="em_back"
                          label={t("second_back_side")}
                          files={values.em_back}
                          previewFile={user.em_back}
                          accept={{
                            "image/png": [],
                            "image/gif": [],
                            "image/jpeg": [],
                            "application/pdf": [],
                          }}
                          showPreview
                        />
                      </div>
                    ) : (
                      <div className="flex gap-5">
                        <FileUploader
                          setFieldValue={setFieldValue}
                          name="passport"
                          label={t("front_side_doc")}
                          files={values.passport}
                          previewFile={user.passport}
                          accept={{
                            "image/png": [],
                            "image/gif": [],
                            "image/jpeg": [],
                            "application/pdf": [],
                          }}
                          showPreview
                        />
                      </div>
                    )}
                  </InfoSection>
                </TabPane>
                {/* <TabPane key={"insurance"} title={t("insurance")}>
                  <InfoSection title={t("insurance_information")}>
                    <div className="grid lg:grid-cols-4 gap-5">
                      <DashboardSelectField
                        isRequired={true}
                        options={options}
                        label={t("insurance")}
                        name="insurance"
                      />
                      <DashboardSelectField
                        isRequired={true}
                        options={options}
                        label={t("network_type")}
                        name="networkType"
                      />
                      <DashboardTextField
                        isRequired={true}
                        name="insuranceCardNumber"
                        label={t("insurance_card_number")}
                      />
                      <DashboardDateField
                        isRequired={true}
                        name="insuranceExpiryDate"
                        label={t("insurance_expiry_date")}
                      />
                    </div>
                  </InfoSection>
                </TabPane> */}
              </DashboardTabs>

              <div className="sumbit-container">
                <DashboardButton
                  isLoading={isSubmitting}
                  isDisabled={!isValid || isSubmitting}
                >
                  {t("save_information")}
                </DashboardButton>
              </div>
            </Form>
          )
        }}
      </Formik>

      <style jsx>
        {`
          .upload-msg {
            @apply text-gray-64 text-base my-8;
          }
          .wrapper {
            @apply bg-white px-mb20 md:px-20pxt lg:px-vw20 pb-mb100 md:pb-100pxt lg:pb-vw100 rounded-lg text-[#0e0d47] text-14pxm md:text-18pxt lg:text-14px pt-mb40 md:pt-40pxt lg:pt-vw40;
          }
          .form-grid {
            @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8;
          }
          .row {
            @apply flex flex-col lg:flex-row gap-0 md:gap-0 lg:gap-12 pt-mb40 md:pt-40pxt lg:pt-vw40;
          }
          .column {
            @apply flex-1 flex flex-col;
          }
          .uploader-wrapper {
            @apply mt-mb12 md:mt-40pxt lg:mt-vw40;
          }
          .line {
            @apply border-b border-b-[#b7b7b7] relative min-h-40pxm md:min-h-40px lg:min-h-40px flex-1;
          }
          .flex-line {
            @apply flex;
          }
          .bold {
            @apply font-avenirBold;
          }
          .checkLabel {
            @apply text-[#0e0d47] text-14pxm md:text-18pxt lg:text-14px font-avenirSlim mx-mb10 md:mx-10pxt lg:mx-vw10;
          }
          .sumbit-container {
            @apply flex justify-end my-5;
          }
          .errorText {
            @apply text-red-500 ml-mb12 md:ml-12pxt lg:ml-vw12 text-14pxm md:text-18pxt lg:text-14px absolute -bottom-full;
          }

           {
            /* Radio */
          }
          .radio-group {
            h6 {
              @apply text-[#0e0d47] text-22pxm md:text-26pxt lg:text-22px font-avenirBold mt-mb40 md:mt-40pxt lg:mt-vw40 mb-mb16 md:mb-16pxt lg:mb-vw16;
            }
          }
          .radio-wrapper {
            @apply flex gap-20 md:gap-20 lg:gap-20;
          }
          .radio {
            @apply flex items-center text-20pxm md:text-24pxt lg:text-20px text-[#0e0d47] align-middle relative;

            input {
              @apply hidden;
            }

            span {
              @apply w-20pxm md:w-20pxt lg:w-20px h-20pxm md:h-20pxt lg:h-20px mr-mb12 md:mr-12pxt lg:mr-vw12;
              border-radius: 50%;
              border: 2px solid #b7b7b7;
              display: block;
              position: relative;
            }

            span:after {
              content: "";
              @apply w-12pxm md:w-12pxt lg:w-12px h-12pxm md:h-12pxt lg:h-12px;
              background: #0e0d47;
              display: block;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%) scale(0);
              border-radius: 50%;
              transition: 300ms ease-in-out 0s;
            }

            input[type="radio"]:checked ~ span:after {
              transform: translate(-50%, -50%) scale(1);
            }
          }

          .upload-msg {
            @apply mt-mb40 md:mt-30pxt lg:mt-vw30 text-18pxm md:text-22pxt lg:text-18px;
            width: 80%;
          }

          .id-images {
            @apply flex flex-col lg:flex-row mt-mb40 md:mt-40pxt lg:mt-vw40 lg:gap-8;
            .col {
              @apply flex flex-col lg:items-center;
            }
            .id-image-wrapper {
              @apply flex flex-col lg:items-center mb-mb40 md:mb-40pxt lg:mb-vw60;
              width: 55%;
            }
            .passport-image-wrapper {
              @apply flex flex-col lg:items-center mb-mb40 md:mb-40pxt lg:mb-vw60;
              width: 80%;
            }
          }

          .label {
            @apply block text-gray-64 text-base font-medium;
          }

          :global(.rtl) {
            .errorText {
              @apply ml-0 md:ml-0 lg:ml-0 mr-mb12 md:mr-12pxt lg:mr-vw12;
            }

             {
              /* Radio */
            }
            .radio {
              span {
                @apply mr-0 md:mr-0 lg:mr-0 ml-mb12 md:ml-12pxt lg:ml-vw12;
              }
            }
          }
        `}
      </style>
    </div>
  )
}

PatientAccountContainer.propTypes = {}

export default PatientAccountContainer
