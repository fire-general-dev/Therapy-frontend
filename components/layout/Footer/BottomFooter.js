import FacebookIcon from "@/components/icons/facebook-icon"
import InstagramIcon from "@/components/icons/instagram-icon"
import TwitterIcon from "@/components/icons/twitter-icon"
import YoutubeIcon from "@/components/icons/youtube-icon"
import Link from "next/link"
import { useTranslation } from "react-i18next"

const BottomFooter = () => {
  const { t } = useTranslation()
  return (
    <div className="bottom-footer">
      <div className="bottom-footer-content">
        <div className="copyright">{t("copyright")}</div>
        <div className="social">
          <Link href="https://www.facebook.com/nafsihealth">
            <div className="icon-wrapper">
              <FacebookIcon />
            </div>
          </Link>
          <Link href="https://twitter.com/nafsihealth">
            <div className="icon-wrapper">
              <TwitterIcon />
            </div>
          </Link>
          <Link href="https://instagram.com/nafsihealth">
            <div className="icon-wrapper">
              <InstagramIcon />
            </div>
          </Link>
          <Link href="https://www.youtube.com/@NafsiHealth">
            <div className="icon-wrapper">
              <YoutubeIcon />
            </div>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .bottom-footer {
          @apply bg-white;
          backdrop-filter: blur(70px);
        }
        .bottom-footer-content {
          @apply max-w-screen-xl w-full mx-auto px-4 py-5 flex flex-col lg:flex-row items-center justify-between;
        }
        .copyright {
          @apply text-gray-64 text-sm mb-4 lg:mb-0;
        }
        .icon-wrapper {
          @apply w-11 h-11 flex items-center justify-center rounded-full fill-gray-64 transition-all ease-in-out duration-300 cursor-pointer;
          border: 1px solid #eeeff0;
          background: rgba(255, 255, 255, 0.5);
          &:hover {
            @apply fill-white bg-[#1BBEC3] border-[#1BBEC3];
          }
        }
        .social {
          @apply flex gap-2;
        }
      `}</style>
    </div>
  )
}

export default BottomFooter
