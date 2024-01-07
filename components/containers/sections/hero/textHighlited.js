import NextImage from "@/components/elements/image"
import heroImage from "@/images/aa@2x.png"
import howAreYouImage from "@/images/hryt@2x.png"
import Image from "next/image"
import { useRef } from "react"
import { useTranslation } from "next-i18next"

function TextHeighlited(props) {
  const { data = {} } = props
  const { label, title, description, icons } = data?.data || {}
  const haryRef = useRef()
  const { t } = useTranslation()
  function onLoad() {
    if (window.innerWidth < 1024) {
      haryRef.current.classList.remove("translate-y-175perc")
      haryRef.current.classList.toggle("translate-y-1/4")
    } else {
      haryRef.current.classList.remove("lg:translate-y-full")
      haryRef.current.classList.remove("translate-y-175perc")
      haryRef.current.classList.toggle("-translate-y-1/2")
    }

    haryRef.current.classList.remove("opacity-0")
    haryRef.current.classList.toggle("opacity-1")
  }
  // const { t } = useTranslation("common");

  return (
    <div className="relative w-full">
      <div className="relative lg:w-[33rem] mb-8 lg:mb-0">
        <div
          className="sub-title"
          dangerouslySetInnerHTML={{ __html: label }}
        ></div>
        <div className="title">
          {t("professional")}
          <span className="heavy-title">{t("mental_health")}</span>
          <span className="light-title">{t("for_unique_mental")}</span>
        </div>
        <div className="flex justify-center lg:justify-start items-baseline gap-10">
          {icons.map((icon) => (
            <div
              key={`hero-icon-${icon.title}`}
              className="flex flex-col items-center justify-center"
            >
              <NextImage media={icon.image} className="!w-7 !h-7" />
              <div className="icon-title">{icon.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-image relative flex justify-center lg:justify-end lg:absolute lg:right-[12rem] h-full w-full -z-10 top-0">
        <Image
          className="relative lg:absolute bottom-0 ltr:right-0 rtl:left-0 h-auto w-3/4 lg:w-[32rem] lg:translate-x-15perc lg:rtl:-translate-x-15perc lg:translate-y-5perc z-10"
          onLoadingComplete={onLoad}
          src={heroImage.src}
          {...heroImage}
          // layout="raw"
          alt="hero"
          priority={true}
          placeholder="blur"
        />
        <img
          className="emogy-icon w-1/5 lg:w-28 absolute right-1/2 lg:top-32 lg:right-64 lg:translate-x-3 lg:transition-[transform opacity] opacity-0 duration-700 delay-1000 lg:translate-y-full"
          // {...howAreYouImage}
          ref={haryRef}
          src={howAreYouImage.src}
          alt="how are you today"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // width="100vh"
          // height="435"
          viewBox="0 0 1080.809 435.198"
          className="absolute bottom-0 ltr:right-0 rtl:left-0 w-mb398 translate-y-1/3 lg:ltr:translate-x-1/4 lg:rtl:-translate-x-1/4 lg:translate-y-40perc lg:w-[45rem] h-auto z-10"
        >
          <path
            id="Path_2403"
            data-name="Path 2403"
            d="M606.347,513.081c-208.849,0-400.67-111.575-526.432-306.2A82.651,82.651,0,0,1,105.158,92.222c38.88-24.7,90.585-13.514,115.494,25.061C315.01,263.354,455.6,347.118,606.347,347.118h.143c151.317-.047,292.364-84.262,387.01-231,24.908-38.6,76.589-49.836,115.494-25.132a82.671,82.671,0,0,1,25.315,114.634C1008.33,400.937,815.96,513.01,606.562,513.081Z"
            transform="translate(-66.686 -77.883)"
            fill="#fff"
          />
        </svg>
      </div>

      <style jsx>{`
        .title {
          @apply flex flex-col text-center lg:text-left text-4xl lg:text-6xl font-medium text-[#2E3333] uppercase mb-10;
          font-family: "Poppins", sans-serif;
          .heavy-title {
            @apply block font-bold mb-2;
          }
          .light-title {
            @apply text-[#646464] text-xl font-medium;
            font-family: "Poppins", sans-serif;
          }
        }
        .sub-title {
          @apply text-center lg:text-left text-[11px] font-medium text-[#2E3333] uppercase mb-5;
          font-family: "Poppins", sans-serif;
        }
        .icons {
          @apply h-3 w-fit !important;
        }
        .icons-title {
          @apply capitalize text-[#2E3333] text-sm;
          font-family: "Poppins", sans-serif;
        }
        .heroImage {
          @apply w-vw705 translate-x-8perc;
        }

        :global(.rtl) {
          .sub-title {
            @apply lg:text-right;
          }
          .title {
            @apply lg:text-right;
          }
          .hero-image {
            @apply lg:right-auto lg:left-[12rem];
          }
          .emogy-icon {
            @apply lg:right-[68rem];
          }
        }
      `}</style>
    </div>
  )
}

export default TextHeighlited
