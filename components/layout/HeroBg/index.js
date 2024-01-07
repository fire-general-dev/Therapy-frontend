import React from "react"

function HeroBg(props) {
  return (
    <div className={`hero`}>
      {props.children}
      <style jsx>{`
        .hero {
          @apply min-h-[12rem] pt-40;
          background: linear-gradient(
            90deg,
            rgba(255, 170, 163, 0.2) 0%,
            rgba(250, 232, 198, 0.2) 48%
          );
        }
      `}</style>
    </div>
  )
}

export default HeroBg
