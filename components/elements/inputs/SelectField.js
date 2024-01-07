import { useField } from "formik"
import { useTranslation } from "react-i18next"
import Select from "react-select"

const SelectField = ({
  options,
  label,
  isLoading = false,
  isRequired = false,
  isDisabled = false,
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
      border: "none",
      boxShadow: "none",
      minHeight: "unset",
      color: "#0e0d47",
      background: state.isDisabled ? "#f7f7f7" : "#fff",
    }),
    input: (provided, state) => ({
      ...provided,
      color: "#0e0d47",
    }),
    placeholder: (provided, state) => ({
      ...provided,
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
        state.isFocused || state.isSelected ? "#0a47ac" : "white",
      color: state.isFocused || state.isSelected ? "white" : "#0e0d47",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
    }),
  }

  return (
    <div className={"select-field"}>
      <label>{label}</label>
      <Select
        styles={customStyles}
        placeholder={`${t("select")}...`}
        classNames={{
          control: (state) =>
            "font-avenirBold text-14pxm md:text-18pxt lg:text-14px",
          menu: (state) => "text-14pxm md:text-18pxt lg:text-14px",
          input: (state) =>
            "font-avenirBold text-14pxm md:text-18pxt lg:text-14px",
          placeholder: (state) => "text-14pxm md:text-18pxt lg:text-14px",
          dropdownIndicator: (state) =>
            "w-20pxm md:w-20pxt lg:w-20px h-20pxm md:h-20pxt lg:h-20px",
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
        .select-field {
          @apply flex items-center px-mb20 md:px-20pxt lg:px-vw24;
          label {
            @apply capitalize min-w-125pxm md:min-w-125pxt lg:min-w-150px;
          }
        }
      `}</style>
    </div>
  )
}

export default SelectField
