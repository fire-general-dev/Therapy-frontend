import Image from "next/legacy/image"
import { useEffect, useState } from "react"
import Select, { components } from "react-select"

import ArrowDownButton from "@/components/elements/arrowDownButton"
import InsuranceIcon from "@/images/icons/insurance.svg"
import SearchIcon from "@/images/icons/search.svg"
import SpecialityhIcon from "@/images/icons/specaiality.svg"
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

const Control = ({ children, ...props }) => {
  const { svgIcon, labelTitle } = props.selectProps
  const style = { cursor: "pointer" }

  return (
    <>
      <div className="item-wrapper">
        <div className="icon-wrapper">
          <Image layout="responsive" src={svgIcon} alt="Specialityh" />
        </div>
        <div style={{ width: "100%" }} className="input-wrapper">
          <components.Control {...props}>
            <label>{labelTitle}</label>

            {/* <div className="icon-wrapper">
            <Image
              layout="responsive"
              src={SpecialityhIcon}
              alt="Specialityh"
            />
          </div> */}
            {/* <span onMouseDown={onEmojiClick} style={style}>
          {emoji}
        </span> */}
            {children}
          </components.Control>
        </div>
        <style jsx>{`
          .input-wrapper {
            @apply flex flex-col px-mb28 mr-auto lg:px-vw10 w-full;
            input {
              @apply text-green-300 text-16pxm lg:text-16px;
              &::placeholder {
                @apply text-green-300 opacity-100;
              }
              &::-ms-input-placeholder {
                @apply text-green-300 opacity-100;
              }
            }
            label {
              @apply text-14pxm lg:text-14px text-gray-300;
            }
          }
          .icon-wrapper {
            @apply h-mb20 w-mb20 lg:mb-auto lg:h-vw20 lg:w-vw20;
          }
          .item-wrapper {
            @apply flex items-center px-0 lg:px-vw20 lg:w-full;
          }
        `}</style>
      </div>
    </>
  )
}

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

  const emoji = EMOJIS[clickCount % EMOJIS.length]

  const IndicatorSeparator = () => {
    return null
  }

  const MenuList = (props) => {
    return (
      <components.MenuList {...props}>
        {/* <div style={menuHeaderStyle}>Custom Menu List</div> */}
        {props.children}
      </components.MenuList>
    )
  }

  const IndicatorsContainer = () => {
    return null
  }

  return (
    <div className="select-wrapper">
      <div className="icon-wrapper">
        <Image layout="responsive" src={svgIcon} alt="Specialityh" />
      </div>
      <div
        className={`input-wrapper ${props.showSeperator ? "seperator" : ""}`}
      >
        <label>{labelTitle}</label>
        <AsyncSelect
          {...props}
          // @ts-ignore
          // emoji={emoji}
          title={labelTitle}
          // svg={svgIcon}
          onEmojiClick={onClick}
          components={{
            // Control,
            IndicatorSeparator,
            // MenuList,
            // IndicatorsContainer,
          }}
          isSearchable
          placeholder={props.placeholder}
          styles={styles}
          menuPortalTarget={body}
          classNames={{
            control: (state) =>
              "text-green-300 text-16pxm md:text-20pxt lg:text-16px",
            menu: (state) =>
              "text-green-300 text-16pxm md:text-20pxt lg:text-16px",
            input: (state) =>
              "text-green-300 text-16pxm md:text-20pxt lg:text-16px",
            placeholder: (state) =>
              "text-green-300 text-16pxm md:text-20pxt lg:text-16px",
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
          @apply flex grow;
          label {
            @apply text-14pxm md:text-18pxt lg:text-14px text-gray-300;
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
          label {
            @apply text-14pxm md:text-20pxt lg:text-14px text-gray-300;
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
        {/* <div className="seperator" /> */}
        <div className="item-wrapper">
          {/* <div className="input-wrapper"> */}
          {/* <input
              placeholder="Select Speciality"
              name="Speciality"
              id="Speciality"
            /> */}
          {/* <Select options={options} /> */}
          {/* <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={promiseOptions}
            /> */}
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
          {/* </div> */}
          {/* <ArrowDownButton fillColor="#cccccc" /> */}
        </div>
        {/* {!hideInsurance && <div className="seperator" />} */}
        {/* {!hideInsurance && (
          <div className="item-wrapper">
            <div className="icon-wrapper">
              <Image layout="responsive" src={InsuranceIcon} alt="Insurance" />
            </div>
            <div className={`input-wrapper`}>
              <label htmlFor="Insurance">{t("insurance")}</label>
              <input
                className="outline-none text-16px"
                placeholder="Select Insurance"
                name="Insurance"
                id="Insurance"
              />
            </div>
          </div>
        )} */}
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
      <div className={`button2 ${searchBtnClass}`}>{t("search")}</div>

      <style jsx>{`
        .icon-wrapper {
          @apply h-mb20 w-mb20 md:h-24pxt md:w-24pxt lg:mb-auto lg:h-vw20 lg:w-vw20;
        }
        .full-container {
          @apply w-full mt-mb20 md:mt-24pxt lg:mt-vw40;
        }
        .main-container {
          @apply px-mb20 absolute -bottom-vw1080 md:-bottom-55vw left-1/2 -translate-x-1/2 lg:-bottom-vw50 lg:px-vw360 w-full lg:w-fit;
        }
        .wrapper {
          @apply w-full bg-white rounded-xl flex flex-col lg:flex-row justify-between items-center cursor-pointer px-mb20 py-mb16 md:px-20pxt md:py-16pxt lg:px-vw20 lg:py-vw16 shadow-searchMobile lg:shadow-search;
          &.no-trans {
            @apply translate-y-0;
          }
        }
        .search-title {
          @apply font-avenirMedium text-18pxm md:text-28pxt lg:text-24px mb-5 lg:mb-2;
        }
        .item-wrapper {
           {
            /* my-mb20 md:my-20pxt lg:my-0 */
          }
          @apply flex items-start w-full px-0 lg:px-vw20 lg:w-full lg:min-w-75pxm;
        }
        .seperator {
          @apply border-b border-gray-300 border-solid pb-mb20 mb-mb20 md:pb-24pxt md:mb-24pxt lg:pb-0 lg:mb-0 lg:border-none;
           {
            /* @apply h-px w-full mx-auto lg:mx-vw24 my-mb20 md:my-20pxt lg:my-0 lg:h-auto lg:w-px bg-gray-300; */
          }
        }
        .input-wrapper {
          @apply flex flex-col mx-mb28 lg:mx-0 mr-auto lg:px-vw10 w-full;
          input {
            @apply text-green-300 text-16pxm md:text-20pxt lg:text-16px;
            &::placeholder {
              @apply text-green-300 opacity-100;
            }
            &::-ms-input-placeholder {
              @apply text-green-300 opacity-100;
            }
          }
          label {
            @apply text-14pxm md:text-18pxt lg:text-14px text-gray-300;
          }
        }
        .button {
          @apply hidden lg:block min-h-32px rounded-full uppercase text-18pxm md:text-18pxt lg:text-18px text-green-100 py-mb10 lg:py-vw10 px-mb20 lg:px-vw24 transition-all duration-500 bg-gradient-to-r from-pink-300 to-blue-100 hover:from-btnPrimary hover:to-btnPrimary hover:text-white hover:translate-x-0.5 hover:translate-y-0.5;
          &:hover {
          }
        }
        .button2 {
          @apply block lg:hidden rounded-full uppercase text-14pxm md:text-20pxt mt-mb10 mb-mb80 text-center text-green-100 py-mb10 md:py-10pxt bg-gradient-to-r from-pink-300 to-blue-100;
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

export default SearchBar
