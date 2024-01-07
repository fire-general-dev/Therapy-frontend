import React from "react"
import TextField from "../inputs/TextField"
import CheckboxField from "../inputs/CheckboxField"
import { useTranslation } from "next-i18next"

function DoctorDetails(props) {
  const { t } = useTranslation()
  return (
    <div className="wrapper">
      <div className="column">
        <div className="line">
          <TextField name="title" label={t("name")} />
        </div>
        <div className="line">
          <TextField type="date" name="birthday" label={t("date_of_birth")} />
        </div>
        <div className="line flex-line">
          <TextField className="flex-1" name="email" label={t("email")} />
          <CheckboxField
            id="email-id"
            name="isEmailPublic"
            label={t("public")}
          />
        </div>
      </div>
      <div className="column">
        <div className="line">
          <TextField name="speciality" label={t("speciality")} />
        </div>
        <div className="line">
          <TextField name="gender" label={t("gender")} />
        </div>
        <div className="line flex-line">
          <TextField
            className="flex-1"
            name="phone_number"
            label={t("phone_number")}
          />
          <CheckboxField
            id="phone-number-id"
            name="isPhoneNumberPublic"
            label={t("public")}
          />
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          @apply bg-white px-mb20 md:px-20pxt lg:px-vw20 pb-mb20 md:pb-20pxt lg:pb-vw24 flex flex-col lg:flex-row rounded-lg text-[#0e0d47] text-14pxm md:text-18pxt lg:text-14px;
        }
        .column {
          @apply flex-1 flex flex-col lg:px-vw08;
        }
        .line {
          @apply border-b border-b-[#b7b7b7] mt-mb12 md:mt-40pxt lg:mt-vw40;
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
      `}</style>
    </div>
  )
}

DoctorDetails.propTypes = {}

export default DoctorDetails
