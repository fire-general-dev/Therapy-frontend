import React from "react"

function HeroBackground(props) {
  const { useCustomMobileHeight, noCircle, customClasses } = props
  return (
    <div
      className={`hero ${useCustomMobileHeight ? "mobile" : ""} ${
        customClasses ? customClasses : ""
      }`}
    >
      <div className={`background ${useCustomMobileHeight ? "mobile" : ""}`}>
        <div className="background2"></div>
        <div className="background3"></div>
        <div className="background4"></div>
        {!noCircle && <div className="background5"></div>}
      </div>
      {props.children}
      <style jsx>{`
        .hero {
          @apply flex min-w-full flex-col px-mb20 lg:px-vw360 items-center justify-end relative overflow-hidden pt-mb100 md:pt-100pxt lg:pt-vw250;
          &.mobile {
            @apply overflow-visible;
          }
        }
        .background {
          background-image: linear-gradient(
              to right,
              theme("colors.pink.100") 100%,
              theme("colors.blue.100")
            ),
            linear-gradient(
              315deg,
              theme("colors.transparent"),
              theme("colors.pink.600")
            );
          @media (min-width: 1024px) {
            background-image: linear-gradient(
                to right,
                theme("colors.pink.100"),
                theme("colors.blue.100")
              ),
              linear-gradient(
                315deg,
                theme("colors.transparent"),
                theme("colors.pink.600")
              );
          }
          @apply min-w-full lg:min-h-0 h-full lg:portrait:h-full absolute -z-10 left-0 top-0;
        }
        .background2 {
          @apply absolute h-full w-full left-0 top-0;
          background-image: linear-gradient(
            205deg,
            rgba(31, 37, 46, 0) 60%,
            rgba(31, 37, 46, 0) 0%,
            rgba(246, 227, 225, 1) 100%,
            #f6e3e1
          ) !important;
        }

        .background3 {
          @apply absolute h-full w-full left-0 top-0;
          background-image: radial-gradient(
            ellipse at top,
            rgba(249, 249, 237, 0.7) 19%,
            rgba(249, 249, 237, 0.1) 56%
          ) !important;
        }
        .background4 {
          @apply absolute h-full w-full left-0 top-0;
          background-image: linear-gradient(
            30deg,
            rgba(31, 37, 46, 0),
            rgba(31, 37, 46, 0) 50%,
            rgba(232, 246, 245, 0.56) 70%,
            rgba(232, 246, 245, 0.76) 80%,
            rgba(232, 246, 245, 0.9) 90%,
            #e8f6f5
          ) !important;
        }
        .background5 {
          @apply absolute h-full w-1/2 left-1/2 opacity-100 blur-xl;
          background: transparent
            radial-gradient(
              closest-side at 50% 50%,
              #f2c4bd 0%,
              #ffffffac 55%,
              #ffffff00 100%
            )
            0% 0% no-repeat padding-box;
        }
        .content {
          @apply w-full h-full px-vw360 z-10;
        }
      `}</style>
    </div>
  )
}

export default HeroBackground
