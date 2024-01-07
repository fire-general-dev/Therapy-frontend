import { isRTLLayout } from "@/utils/helpers"
import { useTranslation } from "next-i18next"
import Individual from "@/images/icons/home/individual.svg"
import Couples from "@/images/icons/home/couples.svg"
import Labtop from "@/images/icons/home/labtop.svg"
import Image from "next/image"
import UserIcon from "@/components/icons/user"
import UsersIcon from "@/components/icons/users"
import LabtopIcon from "@/components/icons/labtop"
import Link from "next/link"

const ButtonInfo = ({ Icon, displayName, shortDesc, url }) => {
  return (
    <div className="buttonWrapper">
      <Link href={url}>
        <div className="button">
          <Icon />
          {/* <Image src={props.icon} alt="icon" /> */}
          <span>{displayName}</span>
        </div>
      </Link>
      <div className="desc">{shortDesc}</div>
      <style jsx>{`
        .buttonWrapper {
          @apply flex flex-col justify-center;
        }
        .button {
          @apply flex flex-col lg:flex-row justify-center items-center gap-1 w-28 lg:w-44 py-4 rounded-2xl lg:rounded-full uppercase fill-[#1BBEC3] text-[#1BBEC3] text-sm font-medium transition-all duration-500 mb-2 hover:bg-[#1BBEC3] hover:text-white hover:fill-white cursor-pointer;
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(27, 190, 195, 0.2);
          font-family: "Poppins", sans-serif;
           {
            /* hover:bg-gradient-to-r hover:from-pink-300 hover:to-blue-100 hover:translate-x-0.5 hover:translate-y-0.5 */
          }
        }
        .desc {
          @apply text-center text-gray-64 text-xs;
          font-family: "Poppins", sans-serif;
        }
      `}</style>
    </div>
  )
}

function InfoButtons(props) {
  const { extraClass } = props
  const { t } = useTranslation()
  const buttonsArray = [
    {
      displayName: t("individual"),
      shortDesc: t("therapy_for_me"),
      Icon: UserIcon,
      url: "/adults-therapy",
    },
    {
      displayName: t("couples"),
      shortDesc: t("therapy_for_us"),
      Icon: UsersIcon,
      url: "/couples-therapy",
    },
    {
      displayName: t("psychiatry"),
      shortDesc: t("medication_mgmt"),
      Icon: LabtopIcon,
      url: "/psychiatry-therapy",
    },
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
          @apply flex justify-between lg:justify-start items-baseline gap-2 lg:gap-5 max-w-screen-xl w-full px-4 mx-auto mb-40;
        }
      `}</style>
    </div>
  )
}

export default InfoButtons
