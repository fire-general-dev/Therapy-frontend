import React, { useState } from "react"

const Question = ({ name, question, answers, setFieldValue, value }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  //   const options = [
  //     { id: "option1", label: "Option 1" },
  //     { id: "option2", label: "Option 2" },
  //     { id: "option3", label: "Option 3" },
  //   ];

  const handleOptionChange = (event) => {
    setFieldValue(name, event.target.value)
    // setSelectedOption(event.target.value)
  }

  return (
    <div>
      <h3 className="title">{question}</h3>
      {answers.map((option) => (
        <div key={option.id} className="custom-radio">
          <input
            id={`${option.id}-${name}}`}
            type="radio"
            name={name}
            value={option.id}
            checked={value === option.id}
            onChange={handleOptionChange}
          />
          <label htmlFor={`${option.id}-${name}}`} className="radio-label">
            <span className="flex-1">{option.label}</span>
          </label>
        </div>
      ))}

      <style jsx>{`
        .title {
          @apply text-[#2E3333] text-base font-medium mb-4;
        }
        .custom-radio {
          @apply mb-4;
          .radio-label {
            @apply flex text-gray-64 text-base lg:text-base cursor-pointer;
          }
          input[type="radio"] {
            position: absolute;
            opacity: 0;
            + .radio-label {
              &:before {
                content: "";
                background: white;
                border-radius: 100%;
                border: 2px solid #eeeff0;
                display: inline-block;
                width: 1.4em;
                height: 1.4em;
                position: relative;
                margin-right: 1em;
                vertical-align: top;
                cursor: pointer;
                text-align: center;
                transition: all 0.5 ease;
              }
            }
            &:checked {
              + .radio-label {
                @apply font-medium;
                &:before {
                  background-color: #1bbec3;
                  box-shadow: inset 0 0 0 4px #eeeff0;
                }
              }
            }
            &:focus {
              + .radio-label {
                &:before {
                  outline: none;
                  border-color: #1bbec3;
                }
              }
            }
            &:disabled {
              + .radio-label {
                &:before {
                  box-shadow: inset 0 0 0 4px #eeeff0;
                  border-color: #eeeff0;
                  background: #eeeff0;
                }
              }
            }
            + .radio-label {
              &:empty {
                &:before {
                  margin-right: 0;
                }
              }
            }
          }
        }
        :global(.rtl) {
          .custom-radio {
            input[type="radio"] {
              + .radio-label {
                &:before {
                  margin-right: 0;
                  margin-left: 1em;
                }
              }
              + .radio-label {
                &:empty {
                  &:before {
                    margin-right: 0;
                    margin-left: 0;
                  }
                }
              }
            }
          }
        }
      `}</style>
    </div>
  )
}

export default Question
