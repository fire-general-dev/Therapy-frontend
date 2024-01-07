import MainTabs from "@/components/elements/MainTabs/MainTabs"
import TabPane from "@/components/elements/MainTabs/TabPane"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import MicrosoftEdgeTips from "./MicrosoftEdgeTips"
import GoogleChromeTips from "./GoogleChromeTips"
import MozillaFirfoxTips from "./MozillaFirfoxTips"
import SafariTips from "./SafariTips"
import GoogleChromeTipsMobile from "./GoogleChromeTipsMobile"

const BrowserTipsContainer = ({ isMobile }) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className="browser-tips-container">
      {router.query.deviceType == "mobile" ? (
        <MainTabs
          preSelectedTabIndex={router.query.browserType || 0}
          isMobile={isMobile}
        >
          <TabPane
            key={"googleChrome"}
            title={t("google_chrome")}
            isMobile={isMobile}
            isOpenTab={router.query.browserType == 0}
          >
            <GoogleChromeTipsMobile />
          </TabPane>
          <TabPane
            key={"safari"}
            title={t("safari")}
            isMobile={isMobile}
            isOpenTab={router.query.browserType == 1}
          >
            <GoogleChromeTipsMobile />
          </TabPane>
        </MainTabs>
      ) : (
        <MainTabs
          preSelectedTabIndex={router.query.browserType || 0}
          isMobile={isMobile}
        >
          <TabPane
            key={"microsoftEdge"}
            title={t("microsoft_edge")}
            isMobile={isMobile}
            isOpenTab={router.query.browserType == 0}
          >
            <MicrosoftEdgeTips />
          </TabPane>
          <TabPane
            key={"googleChrome"}
            title={t("google_chrome")}
            isMobile={isMobile}
            isOpenTab={router.query.browserType == 1}
          >
            <GoogleChromeTips />
          </TabPane>
          <TabPane
            key={"mozillaFirefox"}
            title={t("mozilla_firefox")}
            isMobile={isMobile}
            isOpenTab={router.query.browserType == 2}
          >
            <MozillaFirfoxTips />
          </TabPane>
          <TabPane
            key={"safari"}
            title={t("safari")}
            isMobile={isMobile}
            isOpenTab={router.query.browserType == 3}
          >
            <SafariTips />
          </TabPane>
        </MainTabs>
      )}
      <style jsx>{`
        .browser-tips-container {
          @apply max-w-screen-xl w-full mx-auto px-4 py-10 lg:py-20;
        }
      `}</style>
    </div>
  )
}

export default BrowserTipsContainer
