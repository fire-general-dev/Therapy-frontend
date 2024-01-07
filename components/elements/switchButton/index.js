import React from "react"

function SwitchButton({ value, onChange, label }) {
  return (
    <div className={`switch-btn`}>
      <input
        checked={value}
        onClick={(e) => onChange(e.target.checked)}
        type="checkbox"
        id="switch"
      />
      <label for="switch">Toggle</label>
      <span className={`label ${value ? "active" : ""}`} for="switch">
        {label}
      </span>
      <style jsx>{`
        .switch-btn {
          @apply flex items-center gap-2;
        }
        .switch-btn input[type="checkbox"] {
          @apply h-0 w-0 invisible;
        }

        .switch-btn label {
          @apply block cursor-pointer w-10 h-5 rounded-full relative bg-gray-999;
          text-indent: -9999px;
        }

        .switch-btn label:after {
          @apply absolute h-4 w-4 rounded-full;
          content: "";
          position: absolute;
          top: 2px;
          left: 2px;
          box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
          background-color: #fff;
          transition: 0.3s;
        }

        .switch-btn input:checked + label {
          background: #3a86ff;
        }

        .switch-btn input:checked + label:after {
          left: calc(100% - 5px);
          transform: translateX(-100%);
        }

        .switch-btn label:active:after {
          @apply w-8;
        }

        .switch-btn .label {
          @apply text-lg text-gray-999;
        }

        .switch-btn .label.active {
          @apply text-[#3a86ff];
        }
      `}</style>
    </div>
  )
}

export default SwitchButton
