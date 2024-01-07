import React, { useCallback } from "react"

const TabTitle = ({ title, setSelectedTab, index, isActive }) => {
  const handleOnClick = useCallback(() => {
    setSelectedTab(index)
  }, [setSelectedTab, index])

  return (
    <>
      <li
        className={`tab-title ${isActive ? "active" : ""}`}
        onClick={handleOnClick}
      >
        <span className={"label"}>{title}</span>
      </li>
      <style jsx>{`
        .tab-title {
          @apply flex relative cursor-pointer text-[#B0B0B0] text-xl;
        }

        .label {
          @apply relative inline-block transition-all ease-in duration-300 pb-5 px-10;
          border-bottom: 2px solid transparent;
        }
        .tab-title.active {
          @apply text-[#1BBEC3] font-medium;
        }

        .tab-title.active .label {
          border-color: #1bbec3;
        }
      `}</style>
    </>
  )
}

export default TabTitle
