import Image from "next/image"
import { useTranslation } from "react-i18next"
import Modal from "react-modal"
import CloseIcon from "@/images/icons/services/close-icon.svg"
import RecomendationsStepsIcon from "@/images/icons/recomendations-steps/speedometer-icons.svg"
import ConferenceRoom from "@/images/icons/recomendations-steps/conference-room-icon.svg"
import UserTieIcon from "@/images/icons/recomendations-steps/user-tie-icon.svg"
import PhoneCallingIcon from "@/images/icons/recomendations-steps/phone-calling-icon.svg"
import LaptopIcon from "@/images/icons/recomendations-steps/laptop-icon.svg"
import MobileIcon from "@/images/icons/recomendations-steps/mobile-icon.svg"
import EdgeIcon from "@/images/icons/recomendations-steps/edge-icon.svg"
import ChromeIcon from "@/images/icons/recomendations-steps/chrome-icon.svg"
import FirefoxIcon from "@/images/icons/recomendations-steps/firefox-icon.svg"
import SafariIcon from "@/images/icons/recomendations-steps/safari-icon.svg"

import TipsCard from "./TipsCard"
import BrowserCard from "./BrowserCard"

const RecomendationTipsModal = ({
  isOpen,
  onOpen,
  onClose,
  isMobile = false,
}) => {
  const { t } = useTranslation()

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: isMobile ? "90vw" : "730px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "15px",
      border: "none",
      padding: "1.5rem 2rem 0.25rem 2rem",
      overflow: "hidden",
    },
    overlay: {
      background: "rgba(26, 36, 55, 0.50)",
      zIndex: 100,
    },
  }

  const handleOpen = () => {
    onOpen(true)
  }

  const handleClose = () => {
    onClose(false)
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} style={customStyles}>
      <div className="header">
        <h3 className="modal-title">
          {t("recommendations_before_joining_meeting")}
        </h3>
        <Image
          className="cursor-pointer"
          onClick={handleClose}
          src={CloseIcon}
          alt="Close"
        />
      </div>
      <div className="body">
        <TipsCard icon={RecomendationsStepsIcon} title={t("internet_speed")}>
          {t("internet_speed_desc")}
        </TipsCard>
        <TipsCard icon={ConferenceRoom} title={t("appropriate_setting")}>
          {t("appropriate_setting_desc")}
        </TipsCard>
        <TipsCard icon={UserTieIcon} title={t("dress_code")}>
          {t("dress_code_desc")}
        </TipsCard>
        <TipsCard icon={PhoneCallingIcon} title={t("immediate_support")}>
          {t("immediate_support_desc1")}
          <span className="text-[#1A4FBA] text-sm font-medium">
            {" "}
            800 NAFSI{" "}
          </span>
          {t("immediate_support_desc2")}
        </TipsCard>
        <TipsCard
          icon={LaptopIcon}
          title={t("laptopd_desktop_device_instructions")}
        >
          {t("laptopd_desktop_device_instructions_desc")}
          <div className="browser-cards">
            <BrowserCard
              icon={EdgeIcon}
              title={t("microsoft_edge")}
              href={{
                pathname: "/browser-tips",
                query: { browserType: 0 },
              }}
            />
            <BrowserCard
              icon={ChromeIcon}
              title={t("google_chrome")}
              href={{
                pathname: "/browser-tips",
                query: { browserType: 1 },
              }}
            />
            <BrowserCard
              icon={FirefoxIcon}
              title={t("mozilla_firefox")}
              href={{
                pathname: "/browser-tips",
                query: { browserType: 2 },
              }}
            />
            <BrowserCard
              icon={SafariIcon}
              title={t("safari")}
              href={{
                pathname: "/browser-tips",
                query: { browserType: 3 },
              }}
            />
          </div>
        </TipsCard>
        <TipsCard icon={MobileIcon} title={t("mobile_device_instructions")}>
          {t("mobile_device_instructions_desc")}
          <div className="browser-cards">
            <BrowserCard
              icon={ChromeIcon}
              title={t("google_chrome")}
              href={{
                pathname: "/browser-tips",
                query: { browserType: 0, deviceType: "mobile" },
              }}
            />
            <BrowserCard
              icon={SafariIcon}
              title={t("safari")}
              href={{
                pathname: "/browser-tips",
                query: { browserType: 1, deviceType: "mobile" },
              }}
            />
          </div>
        </TipsCard>
      </div>

      <style jsx>{`
        .booking-btn {
          @apply flex items-center gap-2 text-black-3232 text-base cursor-pointer transition-all ease-in duration-300 hover:text-[#1BBEC3];
        }
        .header {
          @apply flex items-center justify-between pb-5 mb-5;
          border-bottom: 1px solid #eeeff0;
        }
        .body {
          @apply overflow-y-scroll xl:overflow-y-auto h-[70vh] xl:h-[38.2rem];
        }

        .modal-title {
          @apply text-black-3232 text-xl font-medium;
        }

        .browser-cards {
          @apply flex flex-wrap gap-3 lg:gap-7 mt-4;
        }
      `}</style>
    </Modal>
  )
}

export default RecomendationTipsModal
