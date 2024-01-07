const ArrowButton = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30.002"
      height="30"
      viewBox="0 0 30.002 30"
      className={`icon ${props.className ? props.className : ""}`}
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="eva:arrow-back-fill_Background_Mask_"
            data-name="eva:arrow-back-fill (Background/Mask)"
            width="30.002"
            height="30"
            transform="translate(30.002 30) rotate(180)"
            fill="none"
          />
        </clipPath>
      </defs>
      <g id="eva:arrow-back-fill" clipPath="url(#clip-path)">
        <path
          id="Vector"
          d="M3.925-7.5l4.538,5.45a1.251,1.251,0,0,1,.284.915A1.252,1.252,0,0,1,8.3-.289a1.252,1.252,0,0,1-.915.284,1.252,1.252,0,0,1-.848-.446L.288-7.952a1.487,1.487,0,0,1-.113-.188A.158.158,0,0,0,.088-8.3,1.25,1.25,0,0,1,0-8.752,1.25,1.25,0,0,1,.088-9.2a.158.158,0,0,1,.088-.163,1.488,1.488,0,0,1,.113-.188l6.251-7.5a1.25,1.25,0,0,1,.431-.332A1.25,1.25,0,0,1,7.5-17.5a1.25,1.25,0,0,1,.8.288,1.25,1.25,0,0,1,.308.379,1.25,1.25,0,0,1,.139.468,1.25,1.25,0,0,1-.051.486,1.25,1.25,0,0,1-.233.429L3.925-10H18.752a1.25,1.25,0,0,1,.884.366A1.25,1.25,0,0,1,20-8.752a1.25,1.25,0,0,1-.366.884,1.25,1.25,0,0,1-.884.366Z"
          transform="translate(25.002 6.248) rotate(180)"
          fill={props.fillColor || "#fff"}
        />
      </g>
      <style jsx>{`
        .icon {
          @apply w-5 lg:w-auto;
        }
      `}</style>
    </svg>
  )
}

export default ArrowButton
