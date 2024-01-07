import OrdersRefundedToBankAccount from "./OrdersRefundedToBankAccount"
import OrdersRefundedToWallet from "./OrdersRefundedToWallet"
import WalletBalanceCard from "./WalletBalanceCard"
import { useTranslation } from "next-i18next"

const WalletContainer = () => {
  const { t } = useTranslation()
  return (
    <div className="wrapper">
      <WalletBalanceCard balance={124} />
      <div className="actions">
        <button>{t("reschedule_meeting")}</button>
        <button>{t("transfer_to_bank_account")}</button>
      </div>
      <div className="refunded-order-wrapper">
        <OrdersRefundedToWallet />
        <OrdersRefundedToBankAccount />
      </div>
      <style jsx>{`
        .wrapper {
        }
        .actions {
          @apply lg:w-600px mx-auto flex gap-2 mt-mb30 md:mt-40pxt lg:mt-vw40;
          button {
            @apply text-14pxm md:text-20pxt lg:text-16px bg-white hover:bg-dashboardBtnPrimary hover:text-white transition-colors duration-300 rounded-full shadow-infoButton py-mb6 md:py-8pxt lg:py-vw08 uppercase;
            flex: 1;
          }
        }
        .refunded-order-wrapper {
          @apply flex flex-col lg:flex-row gap-4 mt-mb70 md:mt-70pxt lg:mt-vw75;
        }
      `}</style>
    </div>
  )
}

export default WalletContainer
