import React, { useState } from "react"

import TabTitle from "./TabTitle"

const DashboardTabs = ({ children, preSelectedTabIndex }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(
    preSelectedTabIndex || 0
  )

  return (
    <div className={"main-tab"}>
      <ul className={"tabs"}>
        {children.length ? (
          children.map((item, index) => (
            <TabTitle
              key={item.props.title}
              title={item.props.title}
              index={index}
              isActive={index === selectedTabIndex}
              setSelectedTab={setSelectedTabIndex}
            />
          ))
        ) : (
          <TabTitle
            key={children.props.title}
            title={children.props.title}
            index={0}
            isActive={0 === selectedTabIndex}
            setSelectedTab={setSelectedTabIndex}
          />
        )}
      </ul>

      {/* show selcted tab by index*/}
      {children.length ? children[selectedTabIndex] : children}
      <style jsx>{`
        .main-tab .tabs {
          @apply flex list-none p-0;
          border-bottom: 1px solid #b7b7b7;
        }
      `}</style>
    </div>
  )
}

export default DashboardTabs

// :global(.rtl) .label {
//   @apply right-auto left-8;
// }

// :global(.rtl) .label.first {
//   @apply right-auto left-5;
// }
// :global(.rtl) .tab-bg {
//   @apply left-auto -right-72 xl:-right-56;
//   transform: rotate(180deg) scaleY(-1);
// }

// :global(.rtl) .tab-bg.first {
//   @apply -right-28 xl:-right-10 left-auto;
// }
