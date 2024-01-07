const DashboardLoaderButton = ({
  isLoading,
  type = "submit",
  children = "Submit",
  isDisabled = false,
  variet = "primary",
  classList = "",
  classListContainer = "",
  ...props
}) => {
  // TODO add tablet sizes
  return (
    <div className={`button-container ${classListContainer}`}>
      <button
        type={type}
        className={`loader-btn ${variet} ${classList} ${
          isLoading ? "spinning-loader" : ""
        }`}
        disabled={isDisabled}
        {...props}
      >
        {children}
      </button>
      <style jsx>
        {`
          .button-container {
            @apply text-center;
          }
          .loader-btn {
            @apply px-mb60 md:px-60pxt lg:px-vw60 transition-all duration-200  hover:translate-x-0.5 hover:translate-y-0.5 py-mb8 md:py-12pxt lg:py-vw12 text-18pxm md:text-22pxt lg:text-18px;
            &.primary {
              @apply text-white bg-dashboardBtnPrimary hover:bg-dashboardBtnPrimaryHover disabled:bg-gradient-to-r disabled:from-gray-888 disabled:to-gray-888 disabled:text-white disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:text-white;
            }

            &:disabled.spinning-loader {
              background: transparent;
            }

            &.spinning-loader {
              @apply w-mb40 h-mb40 lg:w-vw50 lg:h-vw50 border-l-btnPrimary;
              border-color: rgba(0, 0, 0, 0.25);
              vertical-align: middle;
              border-radius: 50% !important;
              border: 2px solid rgba(0, 0, 0, 0.25);
              padding: 0;
              border-left-color: #0a47ac;
              color: transparent;
              background: transparent;
              transform: rotate(0deg);
              color: #fff !important;
              animation: spinning 1s 0.25s linear infinite;
              &::after {
                content: "";
                opacity: 0;
              }
              &:hover {
                background-color: transparent !important;
              }
            }
          }

          @keyframes spinning {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  )
}

export default DashboardLoaderButton
