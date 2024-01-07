import { useTranslation } from "react-i18next"

const WalletBalanceCard = ({ balance }) => {
  const { t } = useTranslation()
  return (
    <div className="wrapper">
      <span className="title">{t("wallet_balance")}</span>
      <span className="balance">AED {balance}</span>
      <style jsx>{`
        .wrapper {
          @apply bg-white rounded-lg lg:w-600px mx-auto text-center pt-mb70 md:pt-70pxt lg:pt-vw75 pb-mb40 md:pb-40pxt lg:pb-vw46;
        }
        .title {
          @apply block font-avenirSlim text-24pxm md:text-26pxt lg:text-26px mb-vw20;
        }
        .balance {
          @apply font-avenirMedium text-40pxm md:text-40pxt lg:text-40px;
        }
      `}</style>
    </div>
  )
}

export default WalletBalanceCard
