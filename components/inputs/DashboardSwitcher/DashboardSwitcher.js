import React, { useEffect } from "react"

const DashboardSwitcher = ({
  id,
  onText,
  offText,
  isOn,
  onChange,
  isRequired,
  isDisabledOn,
  label,
}) => {
  useEffect(() => {
    if (isDisabledOn) {
      onChange(false)
    }
  }, [isDisabledOn])
  return (
    <div className="switcher-wrapper">
      <label htmlFor={id}>
        {label}
        {isRequired ? " *" : ""}
      </label>
      <div className={`switcher`}>
        <div
          onClick={() => {
            if (!isDisabledOn) {
              onChange(true)
            }
          }}
          className={`btn ${isOn ? "active" : ""} ${
            isDisabledOn ? "opacity-30 !cursor-not-allowed" : ""
          }`}
        >
          {onText}
        </div>
        <div
          onClick={() => onChange(false)}
          className={`btn ${isOn ? "" : "active"}`}
        >
          {offText}
        </div>
      </div>

      <style jsx>{`
        .switcher-wrapper {
          label {
            @apply block text-gray-64 text-base font-medium mb-2;
          }
        }
        .switcher {
          @apply flex gap-2;
        }
        .btn {
          @apply text-center rounded-md border border-solid border-[#EDEDED] bg-white py-3 w-full max-w-[11rem] text-gray-64 text-sm transition-all duration-500 ease-linear cursor-pointer;
          &.active {
            @apply bg-dashboardPrimary text-white font-medium;
          }
        }
      `}</style>
    </div>
  )
}

export default DashboardSwitcher
