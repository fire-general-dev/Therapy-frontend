import React from "react"

function TimePicker({ refItem, id, name, placeholder = "" }) {
  return (
    <>
      <div
        className="relative"
        id={id}
        data-mdb-with-icon="false"
        ref={refItem}
      >
        <input
          type="text"
          name={name}
          className="transition ease-in-out border-none p-0 focus:ring-0 timepicker-input"
          placeholder={placeholder}
          data-mdb-toggle={id}
          // onChange={onChange}
          onChange={(e) => {
            console.log(e)
          }}
          // data-default-time="12:23 pm"
        />
      </div>
      <style jsx>{`
        input {
          @apply w-full text-14pxm md:text-18pxt lg:text-14px text-center;
        }
      `}</style>
    </>
  )
}

export default TimePicker
