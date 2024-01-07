import { useField } from "formik"

const CheckboxField = ({
  label,
  id,
  isRequired = false,
  type = "text",
  isDisabled = false,
  ...props
}) => {
  const [field, meta] = useField(props)

  return (
    <>
      <div className={`checkbox-field ${meta.value ? "active" : ""}`}>
        <label htmlFor={id}>{label}</label>

        <input
          type="checkbox"
          className={"checkbox"}
          {...field}
          disabled={isDisabled}
          checked={meta.value}
          id={id}
        />
      </div>
      <style jsx>{`
        .checkbox-field {
          @apply flex items-center;
          & label {
            @apply cursor-pointer relative flex items-center;
          }
          & input {
            @apply absolute cursor-pointer opacity-0;
          }
          & label::before {
            @apply p-mb8 md:p-8pxt lg:p-vw08 w-mb16 md:w-16pxt lg:w-vw16 h-mb16 md:h-16pxt lg:h-vw16 mr-mb8 md:mr-8pxt lg:mr-vw08;
            content: "";
            -webkit-appearance: none;
            background-color: transparent;
            border: 1px solid #1bbec3;
            border-radius: 4px;
            display: inline-block;
            position: relative;
            vertical-align: middle;
            cursor: pointer;
          }
          &:hover label::before {
            background-color: #d0f6f8;
          }
          &.active:hover label::before {
            background-color: #0152ff;
          }
          &.active label::after {
            @apply top-mb3 lg:top-vw03 left-mb6 md:left-6pxt lg:left-vw06 w-mb6 md:w-6pxt lg:w-vw06 h-mb12 md:h-12pxt lg:h-vw12;
            content: "";
            display: block;
            position: absolute;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
          }

          &.active label::before {
            background-color: #0152ff;
          }
        }

        :global(.rtl) {
          .checkbox-field {
            & label::before {
              @apply mr-0 md:mr-0 lg:mr-0 ml-mb8 md:ml-8pxt lg:ml-vw08;
            }
            &.active label::after {
              @apply left-auto md:left-auto lg:left-auto right-mb6 md:right-6pxt lg:right-vw06;
            }
          }
        }
      `}</style>
    </>
  )
}

export default CheckboxField
