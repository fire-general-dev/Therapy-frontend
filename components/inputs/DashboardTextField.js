import { useField } from "formik"
import { BsFillInfoCircleFill } from "react-icons/bs"

const DashboardTextField = ({
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
    <div className={`text-field-wrapper ${className ? className : ""}`}>
      <div className={`dashboard-text-field`}>
        <label className={labelClassName} htmlFor={id}>
          {label}
          {isRequired ? " *" : ""}
        </label>
        <input
          {...field}
          autoComplete=""
          disabled={isDisabled}
          id={id}
          placeholder={placeholder}
        />
      </div>
      {meta.touched && meta.error ? (
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
          @apply bg-[#F9F9F9] text-gray-64 font-medium;
          cursor: not-allowed !important;
        }
        .dashboard-text-field {
          label {
            @apply block text-gray-64 text-base font-medium mb-2;
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

export default DashboardTextField
