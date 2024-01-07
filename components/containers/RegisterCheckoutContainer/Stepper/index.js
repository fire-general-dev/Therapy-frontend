import CreditCardHandIcon from "@/components/icons/credit-card-hand-icon"
import UserPlusIcon from "@/components/icons/user-plus-icon"
import { useTranslation } from "next-i18next"
import React, { useState } from "react"

const Stepper = ({ steps, onChangeStep, currentStep }) => {
  const { t } = useTranslation()

  // const handleNext = () => {
  //   if (currentStep < steps.length - 1) {
  //     onChangeStep(currentStep + 1)
  //   }
  // }

  // const handlePrev = () => {
  //   if (currentStep > 0) {
  //     onChangeStep(currentStep - 1)
  //   }
  // }

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
            <UserPlusIcon />
          </div>
          <span>{t("connect_your_account")}</span>
        </div>
        <div className={`separator ${currentStep > 0 ? "done" : ""}`}></div>
        <div className={`step-icon ${getStepClassName(1)}`}>
          <div className="step-icon-container">
            <CreditCardHandIcon />
          </div>
          <span className="header-label">{t("checkout_for_booking")}</span>
        </div>
      </div>
      <div className="step-content">{steps[currentStep]}</div>
      <style jsx>{`
        .stepper-container {
          @apply pb-20;
        }
        .stepper-header {
          @apply max-w-lg m-auto mb-14;
        }
        .step-icon {
          @apply w-20 lg:w-36 text-center mx-5 transition-all duration-500 ease-linear;
          .step-icon-container {
            @apply rounded-full mx-auto w-20 lg:w-24 h-20 lg:h-24 flex items-center justify-center mb-4 fill-[#1BBEC3];
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
          @apply flex justify-around lg:justify-start items-center gap-8;
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
