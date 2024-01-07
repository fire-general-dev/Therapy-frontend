import ClockIcon from "@/images/icons/services/clock-icon.svg"
import Image from "next/image"
import { useTranslation } from "react-i18next"

const TimeField = ({
  onChange,
  selectedAppointment,
  timeRef,
  availableTimes,
}) => {
  const { t } = useTranslation()
  return (
    <div className="time-field-wrapper">
      <div className="label">
        <span>{t("time")}</span>
        <span className="text-[#9CA1AA]"> {t("gst_time")}</span>
      </div>
      <div className="time-field">
        <select
          onChange={(e) => {
            var index = e.target.selectedIndex
            onChange(e.target.value, e.target[index].text)
          }}
          className="select-time"
          value={selectedAppointment}
        >
          {availableTimes.map((item) => {
            return (
              <option
                key={item.value}
                value={item.value}
                disabled={item.isDiabled}
              >
                {item.label}
              </option>
            )
          })}
        </select>
        <Image src={ClockIcon} alt="calender" layout="raw" />
      </div>

      <style jsx>{`
        .time-field-wrapper {
          @apply flex flex-col w-full;
        }
        .label {
          @apply block text-gray-64 text-base font-medium mb-1;
        }

        .time-field {
          @apply flex items-center justify-between rounded-xl py-3 px-5 flex-1;
          border: 1px solid #eeeff0;
        }

        .select-time {
          @apply text-gray-64 text-sm transition ease-in-out border-none p-0 bg-none focus:ring-0 align-text-top;
        }
      `}</style>
    </div>
  )
}

export default TimeField
