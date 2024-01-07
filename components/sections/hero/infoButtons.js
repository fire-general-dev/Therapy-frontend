import { isRTLLayout } from "@/utils/helpers"
import { useTranslation } from "next-i18next"

const ButtonInfo = (props) => {
  isRTLLayout
  return (
    <div className="buttonWrapper">
      <div className="button">{props.displayName}</div>
      <div className="desc">{props.shortDesc}</div>
      <style jsx>{`
        .buttonWrapper {
          @apply lg:min-w-140pxTovw flex flex-col justify-center mr-vw50 md:mr-50pxt lg:mr-vw16;
        }
        .button {
          @apply flex justify-center py-mb8 px-mb20 md:py-8pxt md:px-20pxt lg:py-vw12 lg:px-vw24 bg-white rounded-full font-avenirMedium text-14pxm md:text-16pxt lg:text-16px uppercase text-black-333 shadow-infoButton mb-1 transition-all duration-500 cursor-auto;
           {
            /* hover:bg-gradient-to-r hover:from-pink-300 hover:to-blue-100 hover:translate-x-0.5 hover:translate-y-0.5 */
          }
        }
        .desc {
          @apply text-center text-green-100 text-12pxm md:text-14pxt lg:text-14px font-avenirSlim;
        }
        :global(.rtl) {
          .buttonWrapper {
            @apply mr-0 md:mr-0 lg:mr-0 ml-vw50 md:ml-50pxt lg:ml-vw16;
          }
        }
      `}</style>
    </div>
  )
}

function InfoButtons(props) {
  const { extraClass } = props
  const { t } = useTranslation()
  const buttonsArray = [
    { displayName: t("individual"), shortDesc: t("therapy_for_me") },
    { displayName: t("couples"), shortDesc: t("therapy_for_us") },
    { displayName: t("therapy"), shortDesc: t("therapy_for_everyone") },
    { displayName: t("psychiatry"), shortDesc: t("medication_mgmt") },
  ]
  return (
    <div className={`buttonsContainer ${extraClass ? extraClass : ""}`}>
      {buttonsArray.map((item) => (
        <ButtonInfo key={item.displayName} {...item} />
      ))}
      <style jsx>{`
        .buttonsContainer {
          &&::-webkit-scrollbar {
            /* Hide scrollbar for Chrome, Safari and Opera */
            display: none;
          }
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
          @apply flex justify-start items-baseline mb-mb240 md:mb-150pxt lg:mb-vw200 overflow-x-scroll mx-mb20 lg:mx-0 lg:px-vw360;
        }
      `}</style>
    </div>
  )
}

export default InfoButtons
