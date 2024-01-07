import Image from "next/legacy/image"
import { useEffect, useState } from "react"
import Select, { components } from "react-select"

import ArrowDownButton from "@/components/elements/arrowDownButton"
import InsuranceIcon from "@/images/icons/insurance.svg"
import SearchIcon from "@/images/icons/home/search-icon.svg"
import SpecialityhIcon from "@/images/icons/home/speciality-icon.svg"

import AsyncSelect from "react-select/async"
import { searchCategories, searchDoctors } from "@/utils/api"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"

const EMOJIS = ["👍", "🤙", "👏", "👌", "🙌", "✌️", "🖖", "👐"]
const colourOptions = [
  { label: "red", value: "red" },
  { label: "blue", value: "blue" },
  { label: "orange", value: "orange" },
  { label: "green", value: "green" },
]

const menuHeaderStyle = {
  padding: "8px 12px",
  background: colourOptions[2].value,
  color: "white",
}

const controlStyles = {
  border: "1px solid black",
  padding: "5px",
  background: colourOptions[2].value,
  color: "white",
}

const ControlComponent = (props) => (
  <div style={controlStyles}>
    <p>Custom Control</p>
    <components.Control {...props} />
  </div>
)

const CustomSelectProps = (props) => {
  const { svgIcon, labelTitle } = props
  const [clickCount, setClickCount] = useState(0)
  const [body, setBody] = useState(null)

  const onClick = (e) => {
    setClickCount(clickCount + 1)
    e.preventDefault()
    e.stopPropagation()
  }

  const styles = {
    control: (css) => ({
      ...css,
      border: "none",
      // display: "block",
      boxShadow: "none",
      minHeight: "20px",
    }),
    valueContainer: (provided, state) => {
      return { ...provided, padding: "0px", minHeight: "20px" }
    },
    singleValue: (css) => ({ ...css, padding: "0px", color: "#319495" }),
    input: (css) => ({
      ...css,
      padding: "0px",
      color: "#319495",
      outline: "none",
      margin: "0px",
    }),
    indicatorsContainer: (css) => ({
      ...css,
      height: "20px",
    }),
    option: (css, { isFocused, isSelected }) => {
      return {
        ...css,
        backgroundColor: isSelected
          ? "#1bbec3"
          : isFocused
          ? "#B0EBED"
          : "#FFF",
        ":active": {
          backgroundColor: "#1bbec3",
        },
        color: isSelected || isFocused ? "#fff" : "#000",
      }
    },
    menuPortal: (css) => ({ ...css, zIndex: 9999 }),
  }

  useEffect(() => {
    if (document != undefined) {
      setBody(document.body)
    }
  })

  const IndicatorSeparator = () => {
    return null
  }

  return (
    <div className="select-wrapper">
      <div className="icon-wrapper">
        <Image
          layout="responsive"
          src={svgIcon}
          width={18}
          height={18}
          alt="Speciality"
        />
      </div>
      <div
        className={`input-wrapper ${props.showSeperator ? "seperator" : ""}`}
      >
        <label>{labelTitle}</label>
        <AsyncSelect
          {...props}
          title={labelTitle}
          onEmojiClick={onClick}
          components={{
            IndicatorSeparator,
          }}
          isSearchable
          placeholder={props.placeholder}
          styles={styles}
          menuPortalTarget={body}
          classNames={{
            control: (state) => "text-gray-64 text-sm",
            menu: (state) => "text-gray-64 text-sm",
            input: (state) => "text-gray-64 text-sm",
            placeholder: (state) => "text-gray-64 text-sm",
          }}
          cacheOptions
          defaultOptions
          value={props.value}
          getOptionLabel={props.getOptionLabel}
          getOptionValue={props.getOptionValue}
          loadOptions={(data) => {
            if (data.length <= 1) {
              return props.loadOptions("")
            } else {
              return props.loadOptions(data)
            }
          }}
          onInputChange={props.onInputChange}
          onChange={props.onChange}
          // defaultMenuIsOpen
        />
      </div>

      <style jsx>{`
        .select-wrapper {
          @apply flex grow w-80;
          label {
            @apply text-[#A9AFAF] text-xs mb-2;
            font-family: "Poppins", sans-serif;
          }
        }
        .input-wrapper {
          @apply flex flex-col ml-mb28 md:ml-28pxt lg:ml-0 mr-auto lg:px-vw10 w-full;
          input {
            @apply text-green-300 text-16pxm md:text-20pxt lg:text-16px;
            &::placeholder {
              @apply text-green-300 opacity-100;
            }
            &::-ms-input-placeholder {
              @apply text-green-300 opacity-100;
            }
          }
        }
        .seperator {
          @apply border-b border-gray-300 border-solid pb-mb20 mb-mb20 md:pb-24pxt md:mb-24pxt lg:pb-0 lg:mb-0 lg:border-none;
           {
            /* @apply h-px w-full mx-auto lg:mx-vw24 my-mb20 md:my-20pxt lg:my-0 lg:h-auto lg:w-px bg-gray-300; */
          }
        }
        .icon-wrapper {
          @apply h-mb20 w-mb20 md:h-24pxt md:w-24pxt lg:mb-auto lg:h-vw20 lg:w-vw20;
        }
        .item-wrapper {
          @apply flex items-start px-0 lg:px-vw20 lg:w-full;
        }

        :global(.rtl) {
          .input-wrapper {
            @apply ml-auto md:ml-auto mr-mb28 md:mr-28pxt;
          }
        }
      `}</style>
    </div>
  )
}

function SearchBar(props) {
  const { locale, centerComponent, hideInsurance, searchBtnClass = "" } = props
  const [specialityInputValue, setSpecialityValue] = useState("")
  const [specialitySelectedValue, setSpecialitySelectedValue] = useState(null)
  const [doctorInputValue, setDoctorValue] = useState("")
  const [doctorSelectedValue, setDoctorSelectedValue] = useState(null)
  const { t } = useTranslation("common")
  const router = useRouter()

  const handleSpecialityInputChange = (value) => {
    if (value.length > 1) {
      setSpecialityValue(value)
    }
  }

  const handleSpecialityChange = (value) => {
    setSpecialitySelectedValue(value)
  }

  const loadSpecialityOptions = async (inputValue) => {
    return searchCategories(inputValue, locale)
  }

  const handleDoctorInputChange = (value) => {
    if (value.length > 1) {
      setDoctorValue(value)
    }
  }

  const handleDoctorChange = (value) => {
    setDoctorSelectedValue(value)
  }

  const loadDoctorOptions = async (inputValue) => {
    return searchDoctors(inputValue, locale, specialitySelectedValue?.id)
  }
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ]

  const filterColors = (inputValue) => {
    return colourOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    )
  }

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue))
      }, 1000)
    })

  return (
    <div className={centerComponent ? "full-container" : "main-container"}>
      {!centerComponent && (
        <div className={"search-title"}>{t("book_in_person_appointment")}</div>
      )}
      <div className={centerComponent ? "wrapper no-trans" : "wrapper"}>
        <div className="item-wrapper">
          <CustomSelectProps
            labelTitle={t("therapist_search_label")}
            svgIcon={SearchIcon}
            className="grow"
            showSeperator={true}
            value={doctorSelectedValue}
            placeholder={`${t("select")}...`}
            getOptionLabel={(e) => e.attributes.title}
            getOptionValue={(e) => e.id}
            loadOptions={loadDoctorOptions}
            onInputChange={handleDoctorInputChange}
            onChange={handleDoctorChange}
          />
        </div>
        <div className="item-wrapper">
          <CustomSelectProps
            labelTitle={t("speciality")}
            svgIcon={SpecialityhIcon}
            className="grow"
            placeholder={`${t("select")}...`}
            showSeperator={!hideInsurance}
            value={specialitySelectedValue}
            getOptionLabel={(e) => e.attributes.title}
            getOptionValue={(e) => e.id}
            loadOptions={loadSpecialityOptions}
            onInputChange={handleSpecialityInputChange}
            onChange={handleSpecialityChange}
          />
        </div>
        <div
          className="button"
          onClick={() => {
            const query = {}
            if (specialitySelectedValue) {
              query.service = specialitySelectedValue.attributes.title
            }
            if (doctorSelectedValue) {
              query.doctorName = doctorSelectedValue.attributes.title
            }

            router.push({
              pathname: "/therapists",
              query: query,
            })
          }}
        >
          {t("search")}
        </div>
      </div>
      <div
        className={`button2 ${searchBtnClass}`}
        onClick={() => {
          const query = {}
          if (specialitySelectedValue) {
            query.service = specialitySelectedValue.attributes.title
          }
          if (doctorSelectedValue) {
            query.doctorName = doctorSelectedValue.attributes.title
          }

          router.push({
            pathname: "/therapists",
            query: query,
          })
        }}
      >
        {t("search")}
      </div>

      <style jsx>{`
        .full-container {
          @apply w-full mt-mb20 md:mt-24pxt lg:mt-vw40;
        }
        .main-container {
          @apply max-w-screen-xl w-full px-4 mx-auto absolute -bottom-36 lg:-bottom-12 lg:left-1/2 lg:-translate-x-1/2;
           {
            /* @apply px-mb20 absolute -bottom-vw1080 md:-bottom-55vw left-1/2 -translate-x-1/2 lg:-bottom-vw50 lg:px-vw360 w-full lg:w-fit; */
          }
        }
        .wrapper {
          @apply w-full bg-white rounded-xl flex flex-col lg:flex-row justify-between items-center py-6 px-9;
          box-shadow: 0px 20px 15px 0px rgba(0, 0, 0, 0.03);
          &.no-trans {
            @apply translate-y-0;
          }
        }
        .search-title {
          @apply hidden lg:block mb-6 text-[#2E3333] text-2xl font-medium;
          font-family: "Poppins", sans-serif;
        }
        .item-wrapper {
           {
            /* my-mb20 md:my-20pxt lg:my-0 */
          }
           {
            /* @apply flex items-start w-full px-0 lg:px-vw20 lg:w-full lg:min-w-75pxm; */
          }
        }
        .button {
          @apply py-3 px-8 text-sm hidden lg:block rounded-full uppercase text-white bg-[#1BBEC3] font-medium transition-all duration-500 cursor-pointer;
          font-family: "Poppins", sans-serif;
          &:hover {
            @apply bg-white text-[#1BBEC3];
            border: 1px solid #1bbec3;
          }
        }
        .button2 {
          @apply text-center md:hidden py-3 px-8 text-sm rounded-full uppercase text-white bg-[#1BBEC3] font-medium transition-all duration-500 cursor-pointer;
           {
            /* @apply block lg:hidden rounded-full uppercase text-14pxm md:text-20pxt mt-mb10 mb-mb80 text-center text-green-100 py-mb10 md:py-10pxt bg-gradient-to-r from-pink-300 to-blue-100; */
          }
        }
      `}</style>
    </div>
  )
}

export default SearchBar
