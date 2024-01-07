import ChalkboardIcon from "@/components/icons/chalkboard"
import Stethoscope from "@/components/icons/stethoscope"
import TaskListIcon from "@/components/icons/task-list"
import { useTranslation } from "next-i18next"
import React, { useState } from "react"

const Stepper = ({ steps, currentStep, onChangeStep }) => {
  const { t } = useTranslation()

  const getStepClassName = (stepNumber) => {
    if (currentStep == stepNumber) {
      return "active"
    }

    if (currentStep > stepNumber) {
      return "done"
    }
  }
  return (
    <div className="stepper-container">
      <div className="stepper-header">
        <div className={`step-icon ${getStepClassName(0)}`}>
          <div className="step-icon-container active">
            <TaskListIcon />
          </div>
          <span>{t("lets_know_about_you")}</span>
        </div>
        <div className={`separator ${currentStep > 0 ? "done" : ""}`}></div>
        <div className={`step-icon ${getStepClassName(1)}`}>
          <div className="step-icon-container">
            <Stethoscope />
          </div>
          <span className="header-label">{t("choose_your_therapist")}</span>
        </div>
        <div className={`separator ${currentStep > 1 ? "done" : ""}`}></div>
        <div className={`step-icon ${getStepClassName(2)}`}>
          <div className="step-icon-container">
            <ChalkboardIcon />
          </div>
          <span>{t("begin_your_online_consultation")}</span>
        </div>
      </div>
      <div className="step-content">{steps[currentStep]}</div>
      <style jsx>{`
        .stepper-container {
        }
        .stepper-header {
          @apply max-w-4xl m-auto mb-16;
        }
        .step-icon {
          @apply w-20 lg:w-40 flex flex-col items-center text-center lg:mx-5 transition-all duration-500 ease-linear;
          .step-icon-container {
            @apply rounded-full w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center mb-4 fill-[#1BBEC3];
            border: 2px solid #eeeff0;
          }
          span {
            @apply inline-block text-[#9CA1AA] text-xs lg:text-lg font-medium capitalize;
          }

          &.active {
            .step-icon-container {
              border: 2px solid #1bbec3;
            }
            span {
              @apply text-[#2E3333];
            }
          }

          &.done {
            .step-icon-container {
              @apply bg-[#1BBEC3] fill-white;
              border: 10px solid #8ddee1;
            }
            span {
              @apply text-[#2E3333];
            }
          }
        }
        .stepper {
          @apply mb-1;
        }
        .stepper-header {
          @apply flex justify-between items-center gap-3 lg:gap-8;
        }
        .separator {
          @apply hidden lg:block h-px w-full bg-[#EEEFF0] flex-1;
          &.done {
            @apply bg-[#1BBEC3];
          }
        }
      `}</style>
    </div>
  )
}

export default Stepper
