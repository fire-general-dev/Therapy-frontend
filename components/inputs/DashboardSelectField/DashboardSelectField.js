import { useField } from "formik"
import { useTranslation } from "react-i18next"
import Select from "react-select"

const DashboardSelectField = ({
  options,
  label,
  isLoading = false,
  isRequired = false,
  isDisabled = false,
  isPublic = false,
  className,
  placeholder = "Select",
  ...props
}) => {
  const [field, meta, helpers] = useField(props)
  const { t } = useTranslation("common")

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      flex: 1,
    }),
    menu: (provided, state) => ({
      ...provided,
      zIndex: 4,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#0e0d47",
    }),
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #EDEDED",
      boxShadow: "none",
      minHeight: "unset",
      color: "#0e0d47",
      padding: "6px",
      background: state.isDisabled ? "#F9F9F9" : "#fff",
    }),
    input: (provided, state) => ({
      ...provided,
      color: "#0e0d47",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: isPublic ? "#9CA1AA" : "#D8D8D8",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "20px",
      margin: "auto",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      padding: 0,
      color: "#0e0d47",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 0,
      color: "#0e0d47",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: 0,
      color: "#0e0d47",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        state.isFocused || state.isSelected ? "#1A4FBA" : "white",
      color: state.isFocused || state.isSelected ? "white" : "#0e0d47",
    }),
  }

  return (
    <div className={`dashboard-select-field ${className ? className : ""}`}>
      <label>
        {label}
        {isRequired ? "*" : ""}
      </label>
      <Select
        styles={customStyles}
        placeholder={placeholder}
        classNames={{
          control: (state) =>
            isPublic
              ? "text-sm lg:text-base font-medium"
              : "text-sm font-medium",
          menu: (state) =>
            isPublic
              ? "text-sm lg:text-base font-medium"
              : "text-sm font-medium",
          input: (state) =>
            isPublic
              ? "text-sm lg:text-base font-medium"
              : "text-sm font-medium",
          placeholder: (state) =>
            isPublic
              ? "text-sm lg:text-base font-medium"
              : "text-sm font-medium",
          // dropdownIndicator: (state) =>
          //   "w-5 h-5",
        }}
        isDisabled={isDisabled}
        isLoading={isLoading}
        components={{
          IndicatorSeparator: () => null,
        }}
        {...field}
        value={
          options ? options.find((option) => option.value === field.value) : ""
        }
        onChange={(option) => helpers.setValue(option.value)}
        options={options}
      />
      {meta.touched && meta.error && (
        <div className={"error"}>{meta.error}</div>
      )}

      <style jsx>{`
        .dashboard-select-field {
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

export default DashboardSelectField
