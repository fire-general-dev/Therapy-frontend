import { useField } from "formik"
import { BsFillInfoCircleFill } from "react-icons/bs"

const TextField = ({
  label,
  id,
  isRequired = false,
  isDisabled = false,
  className = "",
  placeholder = "",
  labelClassName = "",
  type = "text",
  ...props
}) => {
  const [field, meta] = useField(props)
  return (
    <div className={`text-field-wrapper ${className ? className : ""}`}>
      <div className={`text-field`}>
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
          type={type}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="error">
          <div className="w-4">
            <BsFillInfoCircleFill />
          </div>{" "}
          <div className="error-message">{meta.error}</div>
        </div>
      ) : null}
      <style jsx>{`
        .text-field-wrapper {
          position: relative;
        }
        .text-field input:disabled {
          @apply bg-[#F9F9F9] text-gray-64 font-medium;
          cursor: not-allowed !important;
        }
        .text-field {
          @apply text-[#2E3333];
          label {
            @apply block text-gray-64 text-sm lg:text-base font-medium mb-2;
          }
          input {
            @apply outline-none w-full appearance-none rounded-md bg-white py-3 px-4 text-sm lg:text-base font-medium;
            border: 1px solid #eeeff0;
            &::placeholder {
              @apply text-[#9CA1AA];
            }
            &:focus {
              box-shadow: none;
            }
          }
        }
        .error {
          @apply flex items-center gap-2 text-[#F00] mt-2;
        }
        .error-message {
          @apply text-xs lg:text-[13px];
        }
      `}</style>
    </div>
  )
}
export default TextField
