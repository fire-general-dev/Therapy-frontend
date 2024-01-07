import { useField } from "formik"
import { BsFillInfoCircleFill } from "react-icons/bs"
import CalendarIcon from "@/images/icons/calendar-icon.svg"
import DatePicker from "react-datepicker"
import { forwardRef } from "react"
import Image from "next/image"

const CalandarInput = forwardRef(({ value, onClick }, ref) => (
  <>
    <div className="calendar-input" onClick={onClick} ref={ref}>
      <span>{value}</span>
      <Image src={CalendarIcon} alt="calendar" />
    </div>
    <style jsx>
      {`
        .calendar-input {
          @apply flex gap-mb20 md:gap-20pxt lg:gap-vw20 cursor-pointer text-[#0E0D47];
        }
      `}
    </style>
  </>
))

CalandarInput.displayName = "CalandarInput"

const DateField = ({
  label,
  id,
  className = "",
  labelClassName = "",
  setFieldValue,
  ...props
}) => {
  const [field, meta] = useField(props)

  return (
    <div className="date-field-wrapper">
      <div className={`date-field ${className}`}>
        <label className={labelClassName} htmlFor={id}>
          {label}
        </label>
        <DatePicker
          selected={meta.value || new Date()}
          minDate={new Date()}
          customInput={<CalandarInput />}
          dateFormat={"dd/MM/yyyy"}
          className="bg-transparent border-none outline-none w-32"
          {...field}
          onChange={(date) => {
            setFieldValue(props.name, date)
          }}
        />
      </div>
      {meta.error ? (
        <div className="error">
          <BsFillInfoCircleFill />{" "}
          <div className="error-message">{meta.error}</div>
        </div>
      ) : null}
      <style jsx>{`
        .date-field input[type="date"]::-webkit-calendar-picker-indicator {
          color: rgba(0, 0, 0, 0);
          opacity: 1;
          display: block;
          background: url("/images/icons/input_calender.svg") no-repeat;
          width: 20px;
          height: 20px;
          border-width: thin;
        }
        .date-field-wrapper {
          position: relative;
        }
        .date-field input:disabled {
          cursor: not-allowed !important;
        }
        .date-field {
          @apply flex items-center px-mb20 md:px-20pxt lg:px-vw24 relative;
          label {
            @apply capitalize min-w-125pxm md:min-w-125pxt lg:min-w-150px;
          }
          input {
            @apply font-avenirBold text-14pxm md:text-18pxt lg:text-14px outline-none w-full border-none p-0 appearance-none;
            &:focus {
              box-shadow: none;
            }
          }
        }

        .error {
          @apply absolute flex items-center justify-center gap-2 text-red-500 px-mb20 md:px-20pxt lg:px-vw24 -bottom-6;
        }
        .error-message {
          @apply h-14pxm md:h-18pxt lg:h-14px leading-tight;
        }
      `}</style>
    </div>
  )
}

export default DateField
