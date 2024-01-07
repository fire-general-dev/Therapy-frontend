import React from "react"

function Instagram(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17.9"
      height="17.9"
      viewBox="0 0 17.9 17.9"
      className={props.inline ? "inline" : ""}
    >
      <g id="instagram-logo" transform="translate(0 -0.001)">
        <path
          id="Combined-Shape"
          d="M4.94,17.9A4.947,4.947,0,0,1,0,13.2l0-.239V4.941A4.934,4.934,0,0,1,4.7.005L4.94,0h8.02A4.933,4.933,0,0,1,17.9,4.7l0,.238V12.96a4.93,4.93,0,0,1-4.7,4.934l-.239.007Zm-.6-8.951A4.613,4.613,0,1,0,8.951,4.337,4.618,4.618,0,0,0,4.337,8.951Zm8.6-5.618a1.16,1.16,0,1,0,.824-.343A1.171,1.171,0,0,0,12.933,3.333ZM5.926,8.951a3.024,3.024,0,1,1,3.025,3.024A3.028,3.028,0,0,1,5.926,8.951Z"
          transform="translate(0 0)"
        />
      </g>
      <style jsx>{`
        .inline {
          @apply inline-block mr-mb16 lg:mr-vw16;
        }
        path {
          @appl fill-black-0;
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

export default Instagram
