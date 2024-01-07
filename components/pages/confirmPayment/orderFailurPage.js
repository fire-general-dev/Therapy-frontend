import OrderFailurSVG from "@/components/icons/order-failur"
import React from "react"
import { useTranslation } from "next-i18next"

function OrderFailurPage({ errorMessage }) {
  const { t } = useTranslation()
  return (
    <div className="order-status">
      <OrderFailurSVG />
      <div className="title">{t("error")}</div>
      <div className="statment">
        {t("error_while_transaction")}
        {"\n"}
        {errorMessage}
      </div>
      <div className="details-title">{t("order_Number")}:</div>
      <div className="details">123123</div>
      <div className="details-title">{t("amount")}:</div>
      <div className="details">AED 1851</div>
      <style jsx>{`
        .order-status {
          @apply w-full flex flex-col justify-center items-center;
        }
        .title {
          @apply text-red-700 font-avenirMedium text-40pxm md:text-40pxt lg:text-40px mt-mb16 md:mt-16pxt lg:mt-vw16;
        }
        .statment {
          @apply font-avenirSlim text-red-700 text-16pxm md:text-20pxt lg:text-16px whitespace-pre-line text-center;
        }
        .details-title {
          @apply font-avenirMedium text-[#999999] text-24pxm md:text-28pxt lg:text-24px mt-mb24 md:mt-24pxt lg:mt-vw24;
        }
        .details {
          @apply font-avenirMedium text-black-333 text-24pxm md:text-24pxt lg:text-24px;
        }
      `}</style>
    </div>
  )
}

export default OrderFailurPage
