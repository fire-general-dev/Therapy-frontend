import ArrowBack from "@/components/icons/arrow-back"
import ArrowNext from "../icons/arrow-next"

const BackBtn = ({
  text,
  isDisabled,
  onClick,
  className,
  haveArrow = true,
}) => {
  return (
    <button
      className={`back_button ${isDisabled ? "unactive " : ""} ${
        className ? className : ""
      }`}
      disabled={isDisabled}
      onClick={!isDisabled ? onClick : null}
    >
      {haveArrow ? (
        <div className="arrow">
          <ArrowBack />
        </div>
      ) : null}
      <span>{text}</span>
      <style jsx>{`
        .back_button {
          @apply py-4 px-8 bg-white text-base text-[#1BBEC3] font-bold uppercase flex justify-center items-center gap-2 cursor-pointer rounded-full transition-all duration-500 ease-in fill-[#1BBEC3] w-fit hover:fill-white hover:text-white hover:bg-[#1BBEC3];
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

export default BackBtn
