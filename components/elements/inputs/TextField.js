import { useField } from "formik"
import { BsFillInfoCircleFill } from "react-icons/bs"
import { BiShow, BiHide } from "react-icons/bi"
import { useState } from "react"

const TextField = ({
  label,
  id,
  isRequired = false,
  type = "text",
  isDisabled = false,
  className = "",
  placeholder = "",
  labelClassName = "",
  ...props
}) => {
  const [field, meta] = useField(props)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="text-field-wrapper">
      <div className={`text-field ${className}`}>
        <label className={labelClassName} htmlFor={id}>
          {label}
        </label>
        <input
          type={type == "password" && showPassword ? "text" : type}
          {...field}
          autoComplete=""
          disabled={isDisabled}
          id={id}
          placeholder={placeholder}
        />
        {type == "password" ? (
          showPassword ? (
            <BiHide
              onClick={() => setShowPassword(false)}
              className="cursor-pointer text-20pxm md:text-24px lg:text-20px"
            />
          ) : (
            <BiShow
              onClick={() => setShowPassword(true)}
              className="cursor-pointer text-20pxm md:text-24px lg:text-20px"
            />
          )
        ) : null}
      </div>
      {meta.error ? (
        <div className="error">
          <BsFillInfoCircleFill />{" "}
          <div className="error-message">{meta.error}</div>
        </div>
      ) : null}
      <style jsx>{`
        .text-field input[type="date"]::-webkit-calendar-picker-indicator {
          color: rgba(0, 0, 0, 0);
          opacity: 1;
          display: block;
          background: url("/images/icons/input_calender.svg") no-repeat;
          width: 20px;
          height: 20px;
          border-width: thin;
        }
        .text-field-wrapper {
          position: relative;
        }
        .text-field input:disabled {
          cursor: not-allowed !important;
        }
        .text-field {
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

export default TextField
