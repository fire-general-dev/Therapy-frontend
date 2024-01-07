import Link from "next/link"
import { useTranslation } from "next-i18next"

const HomePath = ({ title }) => {
  const { t } = useTranslation()

  return (
    <div className="home-path">
      <Link href={"/"}>
        <span className="active">{t("home")}</span>
      </Link>
      {"  "}-{"  "}
      <span>{title}</span>
      <style jsx>{`
        .home-path {
          span {
            @apply text-gray-64 text-sm lg:text-base;
            &.active {
              @apply text-[#9CA1AA];
            }
          }
        }
      `}</style>
    </div>
  )
}

export default HomePath
