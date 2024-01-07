import DoctorCard from "@/components/cards/DoctorCard"
import { getDoctorsList } from "@/utils/api"
import { extractArrayData } from "@/utils/extractData"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useTranslation } from "next-i18next"
import BackBtn from "./BackBtn"
import SubmitBtn from "@/components/buttons/SubmitBtn"
import { useRef } from "react"

const DoctorSuggesionsContainer = ({
  currentStep,
  onChangeStep,
  onSelectDoctor,
  doctorSelected,
}) => {
  const [doctorsList, setDoctorsList] = useState([])
  const [isSelected, setIsSelected] = useState()
  const headerRef = useRef(null)

  const { t } = useTranslation()
  const router = useRouter()
  const getDoctorData = async () => {
    const doctorsData = await getDoctorsList(router.locale, "psychiatrist")
    setDoctorsList(extractArrayData(doctorsData))
  }

  const handleBackBtn = () => {
    onChangeStep(0)
  }

  const handleNext = () => {
    onChangeStep(2)
  }

  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    getDoctorData()
  }, [])

  return (
    <div>
      <div>
        <div className="header" ref={headerRef}>
          <div>
            <span className="subtitle">{t("available_doctors")}</span>
            <span className="title">{t("try_to_match")}</span>
          </div>
        </div>
        <div className="doctor-suggesions-container">
          {doctorsList.map((doctor) => {
            return (
              <DoctorCard
                key={doctor.slug}
                item={doctor}
                onClick={() => {
                  onSelectDoctor(doctor)
                }}
                isSelected={doctor.slug == doctorSelected?.slug}
              />
            )
          })}
        </div>
        <div className="actions">
          <BackBtn onClick={handleBackBtn} text={t("go_to_back")} />
          <SubmitBtn
            isDisabled={!doctorSelected}
            onClick={handleNext}
            text={t("proceed_to_next")}
          />
        </div>
      </div>
      <style jsx>{`
        .doctor-suggesions-container {
          @apply grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14;
        }
        .subtitle {
          @apply block text-[#1BBEC3] text-center text-sm lg:text-base font-medium uppercase mb-1;
        }
        .title {
          @apply block text-[#2E3333] text-center text-2xl lg:text-3xl font-medium mb-14;
        }
        .actions {
          @apply flex flex-col lg:flex-row justify-center items-center gap-5;
        }
      `}</style>
    </div>
  )
}

export default DoctorSuggesionsContainer
