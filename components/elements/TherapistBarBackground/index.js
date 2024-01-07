import React, { useState, useEffect } from "react"

function TherapistBarBackground(props) {
  const [stickyClass, setStickyClass] = useState("relative")

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar)

    return () => {
      window.removeEventListener("scroll", stickNavbar)
    }
  }, [])

  const stickNavbar = () => {
    if (typeof window !== undefined) {
      let windowHeight = window.scrollY
      windowHeight > 500
        ? setStickyClass("fixed fixed bottom-0 z-10")
        : setStickyClass("relative")
    }
  }

  return (
    <div className={`wrapper ${stickyClass}`}>
      <div className="bar">
        <div className="background">
          <div className="background2"></div>
          <div className="background3"></div>
          <div className="background4"></div>
        </div>
        {props.children}
      </div>
      <style jsx>{`
        .wrapper {
          @apply h-mb240 lg:h-vw170 w-full;
        }
        .bar {
          @apply flex h-mb240 min-w-full lg:h-vw170 flex-col px-mb20 lg:px-vw360 items-center justify-end relative overflow-hidden;
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
          @apply min-w-full h-full absolute -z-10 left-0;
        }
        .background2 {
          @apply absolute h-full w-full left-0;
          background-image: linear-gradient(
            205deg,
            rgba(31, 37, 46, 0) 60%,
            rgba(31, 37, 46, 0) 0%,
            rgba(246, 227, 225, 1) 100%,
            #f6e3e1
          ) !important;
        }

        .background3 {
          @apply absolute h-full w-full left-0;
          background-image: radial-gradient(
            ellipse at top,
            rgba(249, 249, 237, 0.7) 19%,
            rgba(249, 249, 237, 0.1) 56%
          ) !important;
        }
        .background4 {
          @apply absolute h-full w-full left-0;
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
        .content {
          @apply w-full h-full px-vw360 z-10;
        }
      `}</style>
    </div>
  )
}

export default TherapistBarBackground
