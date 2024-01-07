import React from "react"
import { useTranslation } from "next-i18next"
import PhoneCall from "@/images/icons/phone-call.svg"
import Image from "next/image"

function InsuranceForm({ deviceType, insuranceDetails }) {
  const { t } = useTranslation()
  return (
    <>
      <div className="title">{t("do_you_have_insurance")}</div>
      <div className="call-us">
        <div className="flex flex-col items-center">
          <Image className="mb-5" src={PhoneCall} alt="call" />
          <span className="ask-nafsi">{t("ask_nafsi")}</span>
          <span className="phone">800 nafsi</span>
        </div>
      </div>
      <div></div>
      <style jsx>{`
        .title {
          @apply mt-4 text-[#2E3333] text-lg font-medium mb-5;
        }
        .call-us {
          @apply py-24 rounded-xl;
          border: 1px solid #eeeff0;
        }
        .ask-nafsi {
          @apply block text-[#9CA1AA] text-xs mb-1;
        }
        .phone {
          @apply block text-[#2E3333] text-lg;
        }
      `}</style>
    </>
  )
}

export default InsuranceForm
