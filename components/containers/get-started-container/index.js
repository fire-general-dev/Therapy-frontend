import { useState } from "react"
import DoctorSuggesionsContainer from "../doctor-suggestions-container"
import QuestionsStep from "./QuestionsStep"
import Stepper from "./Stepper"
import BeginConsultationStep from "./BeginConsultationStep"

const GetStartedContainer = ({ isMobile }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [doctorSelected, setDoctorSelected] = useState()
  const handleChangeStep = (value) => {
    setCurrentStep(value)
  }
  const steps = [
    <div key={"step-1"}>
      <QuestionsStep
        currentStep={currentStep}
        onChangeStep={handleChangeStep}
      />
    </div>,
    <DoctorSuggesionsContainer
      currentStep={currentStep}
      onChangeStep={handleChangeStep}
      onSelectDoctor={(value) => setDoctorSelected(value)}
      doctorSelected={doctorSelected}
      key={"step-2"}
    />,
    <div key={"step-3"}>
      <BeginConsultationStep
        onChangeStep={handleChangeStep}
        isMobile={isMobile}
        doctor={doctorSelected}
      />
    </div>,
  ]
  return (
    <div className="get-started-container">
      <Stepper
        onChangeStep={handleChangeStep}
        currentStep={currentStep}
        steps={steps}
      />
      <style jsx>{`
        .get-started-container {
          @apply max-w-screen-xl w-full mx-auto px-4 py-20;
          font-family: "Poppins", sans-serif;
        }
      `}</style>
    </div>
  )
}

export default GetStartedContainer
