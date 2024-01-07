import { useField } from "formik"
import { BsInfoCircle } from "react-icons/bs"
import { Tooltip as ReactTooltip } from "react-tooltip"

const AuthField = ({
  label,
  id,
  isRequired = false,
  type = "text",
  isDisabled = false,
  style = null,
  className,
  inputmode = "text",
  placeholder,
  authFieldClassName,
  ...props
}) => {
  const [field, meta] = useField(props)
  return (
    <div className={className} style={style}>
      <div className={`auth-field ${authFieldClassName}`}>
        <input
          type={type}
          {...field}
          autoComplete="new-password"
          disabled={isDisabled}
          placeholder={placeholder}
          inputMode={type === "phone" ? "numeric" : "text"}
          id={id}
        />
        <label
          className={meta.value || type == "date" ? "active" : ""}
          htmlFor={id}
        >
          {label}
        </label>
        {meta.touched && meta.error ? (
          <span className="icon-error">
            <BsInfoCircle id={`icon-error-${id}`} />
          </span>
        ) : null}
        {meta.touched && meta.error ? (
          <ReactTooltip
            anchorId={`icon-error-${id}`}
            place="left"
            variant="error"
            delayShow={100}
            delayHide={500}
            className="z-[100] max-w-[60vw] lg:max-w-[30vw]"
            content={meta.error}
          />
        ) : null}
      </div>
      <style jsx>{`
        .auth-field input:disabled {
          cursor: not-allowed !important;
        }
        .auth-field {
          @apply relative mb-vw06;
          .active {
            @apply -top-1/4 left-0 text-12pxm md:text-16pxt lg:text-12px;
          }
          input {
            &:focus {
              ~ label {
                @apply -top-1/4 left-0 text-12pxm md:text-16pxt lg:text-12px;
              }
            }
            @apply relative w-full py-mb16 md:py-16pxt lg:py-vw16 text-14pxm md:text-18pxt lg:text-14px text-gray-888 border-solid outline-0 bg-gray-000b27 border-gray-3434 bg-opacity-5 rounded-lg shadow-blue-cce1fa;
          }
          label {
            @apply absolute left-mb6 md:left-6pxt lg:left-0 top-1/2 -translate-y-1/2 px-mb10 md:px-10pxt lg:px-vw10 uppercase text-gray-888 text-14pxm md:text-18pxt lg:text-14px pointer-events-none duration-500;
          }
        }

        .auth-field .icon-error {
          @apply absolute top-1/2 -translate-y-1/2 right-mb20 md:right-20pxt lg:right-vw20 text-red-500 cursor-pointer;
        }

        :global(.rtl) {
          .auth-field {
            .active {
              @apply left-auto right-0;
            }
            input {
              &:focus {
                ~ label {
                  @apply left-auto right-0;
                }
              }
            }
            label {
              @apply left-auto right-mb6 md:right-6pxt lg:left-auto lg:right-0;
            }
          }

          .auth-field .icon-error {
            @apply right-auto md:right-auto lg:right-auto left-mb20 md:left-20pxt lg:left-vw20 text-red-500 cursor-pointer;
          }
        }
      `}</style>
    </div>
  )
}

export default AuthField
