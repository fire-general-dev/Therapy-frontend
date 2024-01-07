import Image from "next/image"
import ExpireImage from "@/images/expire/expire-image.svg"
import { useTranslation } from "next-i18next"
import LinkButton from "@/components/buttons/LinkButton"
import PhoneCallIcon from "@/images/expire/phone-call.svg"
import ArrowNext from "@/components/icons/arrow-next"
import Link from "next/link"

const ExpireContainer = () => {
  const { t } = useTranslation()
  return (
    <div className="expire-page">
      <Image src={ExpireImage} alt="expire" />
      <h6 className="title">{t("payment_link_expired")}</h6>
      <div className="call">
        <Image src={PhoneCallIcon} alt="call" />
        {t("call")}: <span>800 nafsi</span>
      </div>
      <div className="hint">{t("payment_link_expired_hint")}</div>
      <Link passHref href={"/"}>
        <div className="link_button">
          <div className="arrow">
            <ArrowNext />
          </div>
          <span>{t("back_to_home")}</span>
        </div>
      </Link>
      <style jsx>{`
        .expire-page {
          @apply flex flex-col items-center pb-20;
        }
        .title {
          @apply mt-10 mb-7 text-[#2E3333] text-center text-4xl font-semibold;
        }
        .call {
          @apply flex items-center gap-4 mb-5 text-[#2E3333] text-2xl;
          span {
            @apply font-semibold;
          }
        }
        .hint {
          @apply mb-10 text-[#646464] text-xl max-w-sm text-center;
        }
        .arrow {
          @apply rotate-180;
        }
        .link_button {
          @apply py-4 px-8 bg-white text-base text-[#1BBDC3] font-bold uppercase flex justify-center items-center gap-2 cursor-pointer rounded-full mx-auto transition-all duration-500 ease-in fill-[#1BBDC3] hover:bg-[#1BBDC3] hover:fill-white hover:text-white w-fit;
          border: 2px solid var(--primary, #1bbdc3);
        }

        :global(.rtl) {
          .arrow {
            @apply rotate-0;
          }
        }
      `}</style>
    </div>
  )
}

export default ExpireContainer
