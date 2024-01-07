import React from "react"
import { useTranslation } from "next-i18next"

var stringToColour = function (str) {
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  var colour = "#"
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff
    colour += ("00" + value.toString(16)).substr(-2)
  }
  return colour
}

const PatientCard = ({ name, email, phone, previous, upcoming, onClick }) => {
  const { t } = useTranslation()
  const shortName = name
    ? name
        .split(" ")
        .splice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("")
    : "UN"

  const getRandomColor = stringToColour(name ? name : "UN")

  return (
    <div className="patient-card">
      <div className="header">
        <div
          className="short-name"
          style={{
            backgroundColor: getRandomColor,
            color: `color-contrast(${getRandomColor} vs white, black`,
          }}
        >
          {shortName}
        </div>
        <div className="name">{name}</div>
        <div className="w-40pxm"></div>
      </div>
      <div className="content-row">
        <div className="content-row-title">{t("email")}</div>
        <div>{email}</div>
      </div>
      <div className="content-row">
        <div className="content-row-title">{t("phone")}</div>
        <div>{phone}</div>
      </div>
      <div className="content-row">
        <div className="content-row-title underline">{t("previous")}</div>
        <div>{previous}</div>
      </div>
      <div className="content-row">
        <div className="content-row-title underline">{t("upcoming")}</div>
        <div>{upcoming}</div>
      </div>
      <div onClick={onClick} className="card-btn">
        {t("check_patient")}
      </div>
      <style jsx>{`
        .patient-card {
          @apply flex flex-col rounded-lg shadow-appointmentCard bg-white overflow-hidden;
        }
        .header {
          @apply flex items-center justify-between py-mb12 md:my-12pxt mb-mb20 md:mb-20pxt border-b-[1px] border-b-[#d5d5d5];
        }
        .content-row {
          @apply flex items-center justify-between px-mb20 md:px-20pxt lg:px-vw20 text-14pxm md:text-18pxt lg:text-14px text-black-333 font-avenirSlim mb-mb12 md:mb-12pxt lg:mb-vw12;
        }
        .short-name {
          @apply flex items-center justify-center rounded-full text-16pxm md:text-20pxt lg:text-16px font-avenirSlim p-mb16 md:p-20pxt lg:p-vw08 ml-mb20 md:ml-20pxt lg:ml-vw20 text-white w-20pxm h-20pxm md:w-20pxt md:h-20pxt lg:w-vw40 lg:h-vw40 text-center;
        }
        .name {
          @apply text-black-333 font-avenirMedium uppercase text-16pxm md:text-20pxt lg:text-16px;
        }
        .card-btn {
          @apply py-mb16 md:py-16pxt lg:py-vw16 text-white text-12pxm md:text-16pxt lg:text-12px font-avenirMedium flex-1 bg-[#3a86ff] text-center cursor-pointer;
        }

        :global(.rtl) {
          .short-name {
            @apply ml-0 md:ml-0 lg:ml-0 mr-mb20 md:mr-20pxt lg:mr-vw20;
          }
        }
      `}</style>
    </div>
  )
}

export default PatientCard
