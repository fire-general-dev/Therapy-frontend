import PhoneCallIcon from "@/images/icons/common/phone-call-icon.svg"
import Image from "next/image"
import { useTranslation } from "next-i18next"

const CallNafsiCard = () => {
  const { t } = useTranslation("common")
  return (
    <div className={"call-nafsi-card"}>
      <Image className="mb-5" src={PhoneCallIcon} />
      <div className="call-title">
        {t("call")}: <span>800 nafsi</span>
      </div>
      <div className="call-desc">{t("ask_nafsi_for_booking")}</div>
      <style jsx>{`
        .call-nafsi-card {
          @apply bg-white rounded-2xl flex-1 flex flex-col items-center justify-center py-32;
        }
        .call-title {
          @apply text-[#2E3333] text-2xl font-normal mb-2 text-center;
          span {
            @apply font-semibold;
          }
        }
        .call-desc {
          @apply max-w-xs text-center;
        }
      `}</style>
    </div>
  )
}

export default CallNafsiCard
