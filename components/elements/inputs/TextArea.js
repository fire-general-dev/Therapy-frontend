import { useField } from "formik"

const TextArea = ({
  label,
  id,
  isRequired = false,
  type = "text",
  isDisabled = false,
  className = "",
  rows = 5,
  ...props
}) => {
  const [field] = useField(props)
  return (
    <>
      <div className={`text-area ${className}`}>
        {/* <label htmlFor={id}>{label}</label> */}
        <textarea
          type={type}
          {...field}
          autoComplete=""
          disabled={isDisabled}
          rows={rows}
          id={id}
        />
      </div>
      <style jsx>{`
        .text-area input:disabled {
          cursor: not-allowed !important;
        }
        .text-area {
          @apply bg-white p-mb20 md:p-20pxt lg:p-vw24 text-black-2e4765;
          textarea {
            @apply max-w-full w-full font-avenirMedium text-18pxm md:text-22pxt lg:text-18px border-0 outline-none border-b border-b-[#b7b7b7] min-h-135px leading-24pxm lg:leading-24px;
            resize: none;
            &:focus {
              box-shadow: none;
            }
          }
        }
      `}</style>
    </>
  )
}

export default TextArea
