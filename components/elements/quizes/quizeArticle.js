import React from "react"
import ArrowButton from "../arrowButton"

function QuizeArticle({ onSubmitClick, article }) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: article }}></div>
      <style jsx>{`
        .question {
          @apply mt-vw10;
        }
        .question_title {
          @apply my-vw20;
        }
        .question_count {
          @apply font-avenirHeavy mt-vw50;
        }
        .answers {
          @apply list-item pl-vw20;
          list-style: upper-alpha inside;
          clear: left;
          input {
            :disabled {
              color: #bec8d1;
            }
          }
          &.correct {
            @apply bg-[#f8f8f8];
          }
          .ltr {
            @apply float-left mr-vw20;
          }
          .rtl {
            @apply float-right ml-vw20;
          }
        }
        .sbmtButton {
          @apply flex items-center uppercase font-avenirMedium bg-gradient-to-r from-pink-300 to-blue-100 hover:bg-pink-400 rounded-full py-vw16 px-vw20 text-black-333 text-16px disabled:bg-gradient-to-r disabled:from-slate-400 disabled:to-slate-400 mt-vw75;
        }
        .notes {
          @apply mt-vw60 mb-vw120;
        }
      `}</style>
    </>
  )
}

export default QuizeArticle
