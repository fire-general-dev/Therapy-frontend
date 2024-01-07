import ArrowNext from "../icons/arrow-next"

const SubmitBtn = ({
  text,
  isDisabled,
  onClick,
  className,
  haveArrow = true,
}) => {
  return (
    <button
      className={`submit_button ${isDisabled ? "unactive " : ""} ${
        className ? className : ""
      }`}
      disabled={isDisabled}
      onClick={!isDisabled ? onClick : null}
    >
      <span>{text}</span>
      {haveArrow ? (
        <div className="arrow">
          <ArrowNext />
        </div>
      ) : null}
      <style jsx>{`
        .submit_button {
          @apply py-4 px-8 bg-[#1BBEC3] text-base text-white font-bold uppercase flex justify-center items-center gap-2 cursor-pointer rounded-full transition-all duration-500 ease-in fill-white w-full lg:w-fit hover:bg-[#15989c];
          border: 1px solid #1bbec3;
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

export default SubmitBtn
