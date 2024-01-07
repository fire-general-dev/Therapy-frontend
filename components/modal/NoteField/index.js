import React from "react"

function NoteField({ maxLength, value, onChange, placeholder }) {
  const handleChange = (e) => {
    const { value } = e.target

    if (value.length <= maxLength) {
      onChange(value)
    }
  }
  return (
    <div className={`note-field`}>
      <input
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder={placeholder}
        type="text"
      />
      <style jsx>{`
        .note-field input {
          @apply w-full px-4 py-3 border-none bg-transparent my-3;
          background-color: rgba(224, 224, 224, 0.5);
          box-shadow: none;
        }

        .note-field input::placeholder {
          @apply text-gray-999;
        }
      `}</style>
    </div>
  )
}

export default NoteField
