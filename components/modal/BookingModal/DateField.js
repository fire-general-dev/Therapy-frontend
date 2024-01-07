import CalendarIcon from "@/images/icons/services/calendar-icon.svg"
import { useTranslation } from "react-i18next"
import DatePicker from "react-datepicker"
import Image from "next/image"
import moment from "moment"

const DateField = ({ selectedDate, onChangeDate, availableDays }) => {
  const { t } = useTranslation()
  return (
    <div className="w-full">
      <span className="label">{t("date")}</span>
      <div className="date-field">
        <DatePicker
          portalId="root-portal"
          selected={selectedDate}
          onChange={(date) => onChangeDate(date)}
          minDate={new Date()}
          dateFormat={"dd/MM/yyyy"}
          className="bg-transparent border-none outline-none w-32 text-gray-64 text-sm"
          filterDate={(date) => {
            if (!availableDays) return true
            return availableDays.indexOf(moment(date).format("YYYY/MM/DD")) >= 0
          }}
        />

        <Image src={CalendarIcon} alt="calender" layout="raw" />
      </div>
      <style jsx>{`
        .label {
          @apply block text-gray-64 text-base font-medium mb-1;
        }

        .date-field {
          @apply flex items-center justify-between rounded-xl py-3 px-5;
          border: 1px solid #eeeff0;
        }
      `}</style>
    </div>
  )
}

export default DateField

{
  /* <div className="date-time-wrapper">
    <div className="card-wrapper seperator">
      <Image
        src={alarmIcon}
        alt="alarm"
        layout="raw"
        className="mx-mb10 md:mx-10pxt lg:mx-vw10 !w-18pxm md:!w-20pxt lg:!w-20px"
      />
      <div
        className="datepicker relative form-floating"
        data-mdb-toggle-button="false"
      >
        <select
          onChange={(e) => setSelectedAppointment(e.target.value)}
          className="select-time transition ease-in-out border-none p-0 bg-none focus:ring-0 align-text-top"
          value={selectedAppointment}
          ref={timeRef}
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
      </div>
    </div>
  </div> */
}
