import React from "react"
import DoctorIcon from "@/images/icons/doctor-icon.svg"
import CloseMenu from "@/images/icons/close-menu-icon.svg"
import Image from "next/image"
import { useRouter } from "next/router"
import { isRTLLayout } from "utils/helpers"
import { useTranslation } from "next-i18next"

const BookPsychiatristCard = ({ onClose }) => {
  const router = useRouter()
  const isRTL = isRTLLayout(router)
  const { t } = useTranslation("common")
  return (
    <div className="cardWrapper">
      {/* <div className="close-btn" onClick={() => onClose()}>
        <Image src={CloseMenu} alt="Close" />
      </div> */}
      <Image src={DoctorIcon} alt="Doctor" />
      <h6 className="card-title">{t("book_your_therapist")}</h6>
      <button
        onClick={() => {
          router.push({
            pathname: `/therapists`,
            query: { major: "psychiatrist" },
          })
        }}
        className="btn"
      >
        {t("book_appointment")}
      </button>
      <style jsx>{`
        .cardWrapper {
          @apply relative bg-[#25a9ad] flex flex-col items-center justify-center flex-1 rounded-lg p-mb20 md:p-24pxt lg:p-vw20 pb-mb8 md:pb-8pxt lg:pb-vw08;
        }
        .row {
          @apply flex items-start;
        }
        .card-title {
          @apply text-center font-avenirBold mt-mb16 md:mt-16pxt lg:mt-vw16 mb-mb40 md:mb-40pxt lg:mb-vw40 text-18pxm md:text-22pxt lg:text-20px text-white;
        }

        .btn {
          @apply py-mb12 md:py-16pxt lg:py-vw12 px-mb40 md:px-40pxt lg:px-vw40 rounded-md bg-white outline-none border-none text-[#25a9ad] font-avenirBold text-18pxm md:text-22pxt lg:text-18px;
        }

        .close-btn {
          @apply p-[6px] rounded-md bg-white absolute top-2 right-2 cursor-pointer hover:bg-[#f2f2f2];
          box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.08);
          border: solid 0.5px rgba(112, 112, 112, 0.22);
        }

        :global(.rtl) {
          .icon {
            @apply mr-0 ml-1;
          }
        }
      `}</style>
    </div>
  )
}

BookPsychiatristCard.propTypes = {}

export default BookPsychiatristCard
