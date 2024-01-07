import OrderSuccessSVG from "@/components/icons/order-success"
import React from "react"
import { useTranslation } from "next-i18next"

function OrderSuccessPage({ paymentIntent }) {
  const { t } = useTranslation()
  return (
    <div className="order-status">
      <OrderSuccessSVG />
      <div className="title">{t("completed")}</div>
      <div className="statment">
        {t("transaction_successfully_processed")}!{"\n"}
        {t("receipt_submitted_to_email")}.
      </div>
      <div className="details-title">{t("order_Number")}:</div>
      <div className="details">{paymentIntent.id?.slice(-6)}</div>
      <div className="details-title">{t("amount")}:</div>
      <div className="details">
        <span>{paymentIntent.currency}</span>{" "}
        {(paymentIntent.amount / 100).toFixed(2)}
      </div>
      <style jsx>{`
        .order-status {
          @apply w-full flex flex-col justify-center items-center;
        }
        .title {
          @apply text-[#00ceb5] font-avenirMedium text-40pxm md:text-40pxt lg:text-40px mt-mb16 md:mt-16pxt lg:mt-vw16;
        }
        .statment {
          @apply font-avenirSlim text-[#999999] text-16pxm md:text-20pxt lg:text-16px whitespace-pre-line text-center;
        }
        .details-title {
          @apply font-avenirMedium text-[#999999] text-24pxm md:text-28pxt lg:text-24px mt-mb24 md:mt-24pxt lg:mt-vw24;
        }
        .details {
          @apply font-avenirMedium text-black-333 text-24pxm md:text-24pxt lg:text-24px;
          span {
            @apply uppercase;
          }
        }
      `}</style>
    </div>
  )
}

export default OrderSuccessPage
