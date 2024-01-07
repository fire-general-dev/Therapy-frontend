import React, { useState } from "react"

import TabTitle from "./TabTitle"
import { useEffect } from "react"

const MainTabs = ({ children, preSelectedTabIndex, isMobile }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(
    preSelectedTabIndex || 0
  )

  return (
    <div className={"main-tab"}>
      <ul className={"tabs"}>
        {children.map((item, index) => (
          <TabTitle
            key={item.props.title}
            title={item.props.title}
            index={index}
            isActive={index == selectedTabIndex}
            setSelectedTab={setSelectedTabIndex}
          />
        ))}
      </ul>

      {/* show selcted tab by index*/}
      {isMobile ? children : children[selectedTabIndex]}
      <style jsx>{`
        .main-tab .tabs {
          @apply hidden lg:flex list-none p-0;
          border-bottom: 1px solid #eeeff0;
        }
      `}</style>
    </div>
  )
}

export default MainTabs
