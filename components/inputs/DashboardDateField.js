import { useField } from "formik"
import moment from "moment"
import { BsFillInfoCircleFill } from "react-icons/bs"

const DashboardDateField = ({
  label,
  id,
  isRequired = false,
  isDisabled = false,
  className = "",
  placeholder = "",
  labelClassName = "",
  ...props
}) => {
  const [field, meta] = useField(props)

  return (
    <div className="text-field-wrapper">
      <div className={`dashboard-text-field ${className}`}>
        <label className={labelClassName} htmlFor={id}>
          {label}
          {isRequired ? " *" : ""}
        </label>
        <input
          {...field}
          type="date"
          autoComplete=""
          disabled={isDisabled}
          min={moment().subtract(150, "years").toDate().toJSON().slice(0, 10)}
          max={moment().subtract(18, "years").toDate().toJSON().slice(0, 10)}
          id={id}
          placeholder={placeholder}
        />
      </div>
      {meta.error ? (
        <div className="error">
          <BsFillInfoCircleFill />{" "}
          <div className="error-message">{meta.error}</div>
        </div>
      ) : null}
      <style jsx>{`
        .text-field-wrapper {
          position: relative;
        }
        .dashboard-text-field input:disabled {
          cursor: not-allowed !important;
        }
        .dashboard-text-field {
          label {
            @apply block text-gray-64 text-base font-medium mb-2;
          }
          input[type="date"]::-webkit-calendar-picker-indicator {
            color: rgba(0, 0, 0, 0);
            opacity: 1;
            display: block;
            background: url(https://strapi-nafsi-s3-images.s3.me-central-1.amazonaws.com/calendar_icon_8e3792d872.png)
              no-repeat;
            width: 20px;
            height: 20px;
            border-width: thin;
          }
          input {
            @apply outline-none w-full appearance-none rounded-md bg-white py-3 px-4 text-sm font-medium;
            border: 1px solid #ededed;
            &::placeholder {
              @apply text-[#D8D8D8];
            }
            &:focus {
              box-shadow: none;
            }
          }
        }

        .error {
          @apply absolute flex items-center justify-center gap-2 text-[#F00] -bottom-6;
        }
        .error-message {
          @apply text-[13px];
        }
      `}</style>
    </div>
  )
}

export default DashboardDateField
