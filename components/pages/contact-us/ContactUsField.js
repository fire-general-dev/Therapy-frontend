import { useField } from "formik"
import { BsInfoCircle } from "react-icons/bs"
import { Tooltip as ReactTooltip } from "react-tooltip"

const ContactUsField = ({
  label,
  id,
  isRequired = false,
  type = "text",
  isDisabled = false,
  className = "",
  placeholder = "",
  ...props
}) => {
  const [field, meta] = useField(props)
  return (
    <>
      <div className={`contact-us-field ${className}`}>
        <input
          type={type}
          {...field}
          autoComplete=""
          placeholder={placeholder}
          disabled={isDisabled}
          id={id}
        />

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
            delayShow={500}
            delayHide={500}
            content={meta.error}
          />
        ) : null}
      </div>
      <style jsx>{`
        .contact-us-field input:disabled {
          cursor: not-allowed !important;
        }
        .contact-us-field {
          @apply relative w-full;
          input {
            @apply p-mb18 md:p-18pxt lg:p-vw18 text-18pxm md:text-22pxt lg:text-18px outline-none w-full border-none appearance-none transition-colors ease-in duration-200;
            border: 1px solid #e3e3e3;
            &:focus {
              box-shadow: none;
              border-color: #1bbec3;
            }
          }

          .icon-error {
            @apply absolute top-1/2 -translate-y-1/2 right-vw20 text-red-500 cursor-pointer;
          }
        }
      `}</style>
    </>
  )
}

export default ContactUsField
