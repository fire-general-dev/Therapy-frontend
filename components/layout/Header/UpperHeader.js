import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import SigninIcon from "@/images/icons/home/signin-icon.svg"

const UpperHeader = () => {
  const router = useRouter()
  const { pathname, asPath, query, locale } = router
  const { t } = useTranslation()

  const { data: session } = useSession()

  const nextLanguage = locale === "ar" ? "English" : "العربية"

  const onSwitchLanguage = () => {
    const nextLocale = locale === "ar" ? "en" : "ar"
    router.push({ pathname, query }, asPath, { locale: nextLocale })
  }

  const onSignInClick = () => {
    router.push("/signin")
  }

  const goToDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <div className={`upper-header`}>
      <div className="link" onClick={onSwitchLanguage}>
        {nextLanguage}
      </div>
      {session ? (
        <div className="items-wrapper">
          <div className="link" onClick={goToDashboard}>
            {t("dashboard")}
          </div>
          <span className="separator">|</span>
          <div className="link" onClick={() => signOut()}>
            {t("logout")}
          </div>
        </div>
      ) : (
        <div className="link flex gap-2" onClick={onSignInClick}>
          <Image src={SigninIcon} alt="signin" />
          {t("signin_signup")}
        </div>
      )}

      <style jsx>{`
        .upper-header {
          @apply flex justify-between w-full bg-[#2E3333] text-gray-f0 py-2.5 px-7 lg:px-20 relative z-40 uppercase;
          & .link {
            @apply cursor-pointer transition-colors ease-in hover:text-[#1BBEC3];
          }
        }

        .items-wrapper {
          @apply flex gap-2;
        }
      `}</style>
    </div>
  )
}

export default UpperHeader
