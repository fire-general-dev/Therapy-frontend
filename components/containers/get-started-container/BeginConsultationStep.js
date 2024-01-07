import { useTranslation } from "next-i18next"
import MainTabs from "@/components/elements/MainTabs/MainTabs"
import TabPane from "@/components/elements/MainTabs/TabPane"
import DoctorBookingCard from "../doctor-suggestions-container/DoctorBookingCard/DoctorBookingCard"
import DoctorInfo from "../doctor-suggestions-container/DoctorInfo"
import FocusArea from "../doctor-suggestions-container/FocusArea"
import { useRef } from "react"
import { useEffect } from "react"

const BeginConsultationStep = ({ isMobile, doctor, onChangeStep }) => {
  const { t } = useTranslation()
  const headerRef = useRef()

  const handleBackBtn = () => {
    onChangeStep(1)
  }

  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])
  return (
    <div className="header" ref={headerRef}>
      <div>
        <span className="subtitle">{t("you_selected")}</span>
        <span className="title">{t("appointment_with")}</span>
      </div>
      <DoctorBookingCard
        isMobile={isMobile}
        onBack={handleBackBtn}
        doctor={doctor}
      />

      <MainTabs isMobile={isMobile}>
        <TabPane
          key={"introduction"}
          title={t("introduction")}
          isMobile={isMobile}
          isOpenTab={true}
        >
          <DoctorInfo
            description={doctor?.longDescription}
            videoURL={doctor?.videoURL}
          />
        </TabPane>
        <TabPane
          key={"focus_areas-appointments"}
          title={t("focus_areas")}
          isOpenTab={isMobile}
        >
          <FocusArea categories={doctor?.categories} />
        </TabPane>
      </MainTabs>

      <style jsx>{`
        .subtitle {
          @apply block text-[#1BBEC3] text-center text-sm lg:text-base font-medium uppercase mb-1;
        }
        .title {
          @apply block text-[#2E3333] text-center text-2xl lg:text-3xl font-medium mb-14;
        }
      `}</style>
    </div>
  )
}

export default BeginConsultationStep
