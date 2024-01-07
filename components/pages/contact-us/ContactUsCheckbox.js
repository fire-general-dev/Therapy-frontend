import { useField } from "formik"

const ContactUsCheckbox = ({
  label,
  id,
  isRequired = false,
  type = "text",
  isDisabled = false,
  className = "",
  ...props
}) => {
  const [field, meta] = useField(props)

  return (
    <>
      <div
        className={`checkbox-field ${className} ${meta.value ? "active" : ""}`}
      >
        <input
          type="checkbox"
          className="checkbox"
          {...field}
          disabled={isDisabled}
          checked={meta.value}
          id={id}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      <style jsx>{`
        .checkbox-field {
          @apply flex items-center;
          & label {
            @apply cursor-pointer relative flex items-center text-[#8c959f];
          }
          & input {
            @apply absolute cursor-pointer opacity-0;
          }
          & label::before {
            content: "";
            -webkit-appearance: none;
            background-color: transparent;
            border: 1.5px solid #8c959f;
            padding: 7px;
            width: 15px;
            height: 15px;
            display: inline-block;
            position: relative;
            vertical-align: middle;
            cursor: pointer;
            margin-right: 8px;
          }
          & label:hover::before,
          & input:hover + label::before {
            background-color: #d0f6f8;
          }
          & input:checked + label::after {
            content: "";
            display: block;
            position: absolute;
            top: 5.5px;
            left: 5.5px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
          }

          & input:checked + label::before {
            background-color: #1bbec3;
          }
        }

        :global(.rtl) {
          .checkbox-field {
            & label::before {
              margin-right: 0;
              margin-left: 8px;
            }
            & input:checked + label::after {
              left: auto;
              right: 5.5px;
            }
          }
        }
      `}</style>
    </>
  )
}

export default ContactUsCheckbox
