const DashboardButton = ({
  isLoading,
  type = "submit",
  children = "Submit",
  isDisabled = false,
  variet = "primary",
}) => {
  return (
    <button type={type} disabled={isDisabled} className="dashboard-btn">
      {children}
      <style jsx>{`
        .dashboard-btn {
          @apply w-full lg:w-auto rounded-md bg-dashboardPrimary px-9 py-4 text-white text-base font-medium uppercase transition-all ease-in-out duration-300 hover:bg-[#143f94];
          &:disabled {
            @apply opacity-30;
          }
        }
      `}</style>
    </button>
  )
}

export default DashboardButton
