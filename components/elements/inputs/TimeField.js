import { useField } from "formik"
import { useState } from "react"
import DatePicker from "react-datepicker"

const TimeField = ({
  name,
  selected,
  setFieldValue,
  disabled = false,
  ...props
}) => {
  const [field] = useField(props)

  return (
    <div>
      <div className={`text-field`}>
        <DatePicker
          selected={selected}
          disabled={disabled}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
          {...field}
          onChange={(date) => {
            setFieldValue(name, date)
          }}
        />
      </div>
      <style jsx>{`
        :global(.react-datepicker__input-container input) {
          @apply py-mb10 md:py-12pxt lg:py-vw10 border border-[#b7b7b7] rounded-md w-125pxm md:w-125pxt lg:w-125px text-center outline-none;
          -webkit-appearance: none;
        }
      `}</style>
    </div>
  )
}

export default TimeField
