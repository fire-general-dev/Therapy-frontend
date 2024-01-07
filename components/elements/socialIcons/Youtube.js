import React from "react"

function Youtube(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="13"
      viewBox="0 0 18 13"
      className={props.inline ? "inline" : ""}
    >
      <g fillRule="evenodd" clipPath="url(#clip0_87_440)" clipRule="evenodd">
        <path
          className="outline-path"
          d="M3.607 12.786C5.358 12.929 7.424 13 9 13c1.576 0 3.607-.071 5.393-.214 2.066-.179 3.116-.536 3.397-2.643.14-.964.21-2.286.21-3.643 0-1.357-.07-2.715-.21-3.643C17.51.714 16.46.393 14.393.214 12.607.036 10.575 0 9 0 7.424 0 5.358.036 3.607.214 1.54.393.455.714.175 2.857.07 3.785 0 5.143 0 6.5c0 1.357.07 2.679.175 3.643.28 2.107 1.366 2.464 3.432 2.643z"
        ></path>
        <path fill="#fff" d="M7.179 9.25l4.693-2.75-4.693-2.786V9.25z"></path>
      </g>
      <defs>
        <clipPath id="clip0_87_440">
          <path
            fill="#fff"
            d="M0 0H18V13H0z"
            transform="matrix(1 0 0 -1 0 13)"
          ></path>
        </clipPath>
      </defs>

      <style jsx>{`
        .inline {
          @apply inline-block mr-mb16 lg:mr-vw16;
        }
        :global(.rtl) {
          .inline {
            @apply mr-0 md:mr-0 lg:mr-0 ml-mb16 md:ml-16pxt lg:ml-vw16;
          }
        }
      `}</style>
    </svg>
  )
}

export default Youtube
