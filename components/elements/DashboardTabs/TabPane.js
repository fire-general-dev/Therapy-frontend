const TabPane = ({ title, children }) => (
  <div className={"tab-pane"} title={title}>
    {children}
    <style jsx>{`
      .tab-pane {
        @apply pt-mb40 md:pt-40pxt lg:pt-vw40;
      }
    `}</style>
  </div>
)

export default TabPane
