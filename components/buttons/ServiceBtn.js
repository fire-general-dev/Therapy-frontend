const ServiceBtn = ({ text, isActive, onClick }) => {
  return (
    <div
      className={`service-btn ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {text}
      <style jsx>{`
        .service-btn {
          @apply px-5 py-2 rounded-[30px] bg-[#F5F5F5] transition-all ease-in duration-500 text-[#414546] text-sm text-center cursor-pointer hover:bg-[#1BBEC3] hover:text-white;
          &.active {
            @apply bg-[#1BBEC3] text-white;
          }
        }
      `}</style>
    </div>
  )
}

export default ServiceBtn
