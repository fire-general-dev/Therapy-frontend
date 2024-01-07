import Rater from "react-rater"
import "react-rater/lib/react-rater.css"
import { useField } from "formik"
import { FaStar } from "react-icons/fa"

const Star = ({ willBeActive, isActive }) => {
  // FF9A33
  // FFC200
  return (
    <FaStar
      className="text-40pxm md:text-40pxt lg:text-40px mx-vw06"
      color={isActive || willBeActive ? "#FF9A33" : "#646464"}
    />
  )
}

const RaterField = ({
  className = "",
  setFieldValue,
  name,
  value,
  ...props
}) => {
  return (
    <>
      <div className={`rater-field ${className}`}>
        <Rater
          onRate={({ rating }) => {
            setFieldValue(name, rating)
          }}
          rating={value}
        >
          <Star />
        </Rater>
      </div>
      <style jsx>{`
        .rater-field {
          @apply flex justify-center items-center bg-white rounded-full px-mb20 md:px-20pxt lg:px-vw20 py-mb10 md:py-10pxt lg:py-vw10 mb-mb40 md:mb-40pxt lg:mb-vw40 w-fit;
        }
      `}</style>
    </>
  )
}

export default RaterField
