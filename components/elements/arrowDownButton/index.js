import React from "react"

function ArrowDownButton(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g
        id="Navigation_"
        data-name="Navigation / "
        transform="translate(-1066 -4318)"
      >
        <g
          id="Outlined_Navigation_expand_more"
          data-name="Outlined / Navigation / expand_more"
        >
          <rect
            id="Path"
            width="24"
            height="24"
            transform="translate(1066 4318)"
            fill="none"
            opacity="0.871"
          />
          <path
            id="_Icon_Color"
            data-name=" Icon Color"
            d="M1082.59,4326.59l-4.59,4.58-4.59-4.58L1072,4328l6,6,6-6Z"
            fill={props.fillColor || "#25a9ad"}
          />
        </g>
      </g>
    </svg>
  )
}

export default ArrowDownButton
