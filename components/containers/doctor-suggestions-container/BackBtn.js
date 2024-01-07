import ArrowBack from "@/components/icons/arrow-back"

const BackBtn = ({ text, isDisabled, onClick, className }) => {
  return (
    <button
      className={`submit_button ${isDisabled ? "unactive " : ""} ${
        className ? className : ""
      }`}
      onClick={!isDisabled ? onClick : null}
      type={"button"}
    >
      <div className="arrow">
        <ArrowBack />
      </div>
      <span>{text}</span>
      <style jsx>{`
        .submit_button {
          @apply py-4 px-8 bg-white text-base text-[#1bbec3] font-bold uppercase flex justify-center items-center gap-2 cursor-pointer rounded-full transition-all duration-500 ease-in fill-[#1bbec3] w-full lg:w-fit hover:text-white hover:fill-white hover:bg-[#1bbec3];
          border: 2px solid #1bbec3;
          &.unactive {
            @apply opacity-30 cursor-auto;
          }
        }
        :global(.rtl) {
          .arrow {
            @apply rotate-180;
          }
        }
      `}</style>
    </button>
  )
}

export default BackBtn
