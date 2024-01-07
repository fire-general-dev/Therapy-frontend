import NextImage from "@/components/elements/image"
import heroImage from "@/images/aa@2x.png"
import howAreYouImage from "@/images/hryt@2x.png"
import Image from "next/image"
import { useRef } from "react"
// import { useTranslation } from "next-i18next";

function TextHeighlited(props) {
  const { data = {} } = props
  const { label, title, description, icons } = data?.data || {}
  const haryRef = useRef()
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
    <div className="relative">
      <div className="relative lg:w-60perc">
        <div
          className="text-12pxm md:text-16pxt lg:text-16px uppercase"
          dangerouslySetInnerHTML={{ __html: label }}
        ></div>
        <div className="title">{title}</div>
        <div className="flex items-baseline mt-mb28 md:mt-28pxt lg:mt-vw30 lg:mb-vw75 ">
          {icons.map((icon) => (
            <div
              key={`hero-icon-${icon.title}`}
              className="flex flex-col rtl:pr-0 rtl:pl-20 pr-20 justify-center"
            >
              <NextImage
                media={icon.image}
                className="!h-12pxm md:!h-14pxt lg:!h-14px !w-fit"
              />
              <div className="pt-2 text-12pxm md:text-12pxt lg:text-12px capitalize">
                {icon.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex justify-end lg:absolute right-0 h-full w-full -z-10 top-0 mt-vw100">
        <Image
          className="relative lg:absolute bottom-0 ltr:right-0 rtl:left-0 h-auto w-3/4 lg:w-1/2 ltr:translate-x-15perc rtl:-translate-x-15perc lg:translate-y-5perc z-10"
          onLoadingComplete={onLoad}
          src={heroImage.src}
          {...heroImage}
          // layout="raw"
          alt="hero"
          priority={true}
          placeholder="blur"
        />
        <img
          className="w-1/5 lg:w-vw130 absolute ltr:right-1/4 rtl:left-16perc lg:rtl:left-[5%] top-0 -translate-x-1/4 lg:translate-x-3 transition-[transform opacity] opacity-0 duration-700 delay-1000 lg:translate-y-full translate-y-175perc"
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
          className="absolute bottom-0 ltr:right-0 rtl:left-0 w-mb398 translate-y-1/3 ltr:translate-x-20perc rtl:-translate-x-20perc lg:ltr:translate-x-1/4 lg:rtl:-translate-x-1/4 lg:translate-y-40perc lg:w-3/4 h-auto z-10"
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
          @apply font-avenirBlack uppercase text-28pxm md:text-50pxt lg:text-50px leading-none mt-2 lg:min-h-135px;
        }
        .icons {
          @apply h-3 w-fit !important;
        }
        .heroImage {
          @apply w-vw705 translate-x-8perc;
        }
        .Group-15538 {
          width: 1080.8px;
          height: 435.2px;
          margin: 16.2px 57.7px 100.6px 118.5px;
          padding: 1.8px 1.3px 19.9px 58.5px;
          background-color: white;
        }
      `}</style>
    </div>
  )
}

export default TextHeighlited
