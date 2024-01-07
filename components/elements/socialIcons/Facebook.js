import React from "react"

function Facebook(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="20"
      viewBox="0 0 11 20"
      className={props.inline ? "inline" : ""}
    >
      <path
        id="Facebook"
        d="M7.314,20H2.437V10H0V6.553H2.437V4.484C2.437,1.674,3.814,0,7.721,0h3.255V3.447H8.942c-1.521,0-1.623.482-1.623,1.381L7.314,6.553H11L10.568,10H7.314V20"
      />
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

export default Facebook
