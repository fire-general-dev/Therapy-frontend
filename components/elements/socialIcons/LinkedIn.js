import React from "react"

function LinkedIn(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18.002"
      height="18"
      viewBox="0 0 18.002 18"
      className={props.inline ? "inline" : ""}
    >
      <g id="iconmonstr-linkedin-3" transform="translate(0.001 0)">
        <path
          id="Shape"
          d="M14.25,18H3.75A3.754,3.754,0,0,1,0,14.25V3.75A3.755,3.755,0,0,1,3.75,0h10.5A3.755,3.755,0,0,1,18,3.75v10.5A3.754,3.754,0,0,1,14.25,18ZM11.294,8.225c.725,0,1.456.564,1.456,1.824v4.2H15V9.182C15,7.714,14.275,6,12.23,6A2.831,2.831,0,0,0,9.75,7.324V6H7.5V14.25H9.75v-4.2A1.638,1.638,0,0,1,11.294,8.225ZM3.75,6V14.25H6V6ZM4.876,2.4A1.323,1.323,0,1,0,6.188,3.726,1.319,1.319,0,0,0,4.876,2.4Z"
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

export default LinkedIn
