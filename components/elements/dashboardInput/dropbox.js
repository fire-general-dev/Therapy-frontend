import React, { useEffect, useRef, useState } from "react"

function DashboardDropboxInput(props) {
  const {
    value,
    setValue,
    filedName,
    extraClasses,
    options = [],
    label,
  } = props
  const [isOpen, setIsOpen] = useState(false)

  const wrapperRef = useRef(null)

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        // console.log("event.target ===>", event.target)
        // debugger;
        setIsOpen(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [wrapperRef])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const onItemClick = (e) => {
    setIsOpen(false)
    setValue(e)
  }
  return (
    <div
      ref={wrapperRef}
      className={`flex justify-between ${extraClasses ?? ""}`}
    >
      <select
        id="dropdownDefault"
        className="font-avenirBold text-black-333 bg-white transition ease-in-out border-none p-0 px-mb20 md:px-20pxt lg:px-vw20 bg-none focus:ring-0 align-text-top text-18pxm md:text-22pxt lg:text-18px leading-24pxm md:leading-28pxt lg:leading-24px"
        onClick={toggleDropdown}
        value={value}
        onChange={onItemClick}
        name={filedName}
      >
        {options.map((time) => (
          <option key={`times-${time}`} value={time}>
            {time.split("m")[1]}
          </option>
        ))}
      </select>

      <label className="timeUnit">{label}</label>

      <style jsx>{`
        .bold {
          @apply font-avenirBold;
        }
        .timeUnit {
          @apply ml-mb10 md:ml-10pxt lg:ml-vw100 text-18pxm md:text-22pxt lg:text-18px;
        }

        :global(.rtl) {
          .timeUnit {
            @apply ml-0 md:ml-0 lg:ml-0 mr-mb10 md:mr-10pxt lg:mr-vw100 text-18pxm md:text-22pxt lg:text-18px;
          }
        }
      `}</style>
    </div>
  )
}

DashboardDropboxInput.propTypes = {}

export default DashboardDropboxInput
