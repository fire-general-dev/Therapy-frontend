import { t } from "i18next"
import React from "react"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { useTranslation } from "next-i18next"
import LoaderButton from "../loaderButton"

function QuizeView({
  onSubmitClick,
  showCorrectAns,
  description,
  quize,
  questionCounts,
  isRTL,
  notes,
}) {
  const { t } = useTranslation()

  return (
    <>
      <div>{description}</div>
      <div className="question">
        {quize.map((question, index) => (
          <div key={question.id + "question"} className="question-container">
            <div className="question_count">
              Question {index + 1} of {questionCounts}
            </div>
            <div className="question_title">{question.ques}</div>
            {question.answer?.map((answer) => (
              <div
                key={answer.id + "answer"}
                className={`answers ${
                  showCorrectAns && answer.isCorrect ? "correct" : ""
                }`}
              >
                <input
                  name={question.id}
                  value={answer}
                  type="radio"
                  disabled={showCorrectAns}
                  className={isRTL ? "rtl" : "ltr"}
                />
                <label>{answer.ans}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
      <LoaderButton
        classList="uppercase font-avenirMedium !mb-0 md:!mb-0 lg:!mb-0"
        classListContainer={`my-mb60 md:my-60pxt lg:my-vw60 ${
          isRTL ? "!text-right" : "!text-left"
        }`}
        onClick={onSubmitClick}
      >
        {t("submit")} &nbsp;
        {isRTL ? (
          <BsArrowLeft className="inline-block text-xl" />
        ) : (
          <BsArrowRight className="inline-block text-xl" />
        )}
      </LoaderButton>
      <div className="notes">{notes}</div>
      <style jsx>{`
        .question {
          @apply mt-mb10 md:mt-10pxt lg:mt-vw10;
        }
        .question-container {
          @apply my-mb20 md:my-20pxt lg:my-vw20;
        }
        .question_title {
          @apply my-mb20 md:my-20pxt lg:my-vw20;
        }
        .question_count {
          @apply font-avenirMedium mt-mb40 md:mt-50pxt lg:mt-vw50;
        }
        .answers {
          @apply flex items-center pl-mb20 md:pl-20pxt lg:pl-vw20;
          list-style: upper-alpha inside;
          clear: left;
          input {
            width: 0.9rem;
            height: 0.9rem;
            :disabled {
              color: #bec8d1;
            }
          }
          &.correct {
            @apply bg-[#f8f8f8];
          }
          .ltr {
            @apply float-left ml-0 md:ml-0 lg:ml-0 mr-mb20 md:mr-20pxt lg:mr-vw20;
          }
          .rtl {
            @apply float-right mr-0 md:mr-0 lg:mr-0 ml-mb20 md:ml-20pxt lg:ml-vw20;
          }
        }
        .sbmtButton {
          @apply flex items-center uppercase font-avenirMedium bg-gradient-to-r from-pink-300 to-blue-100 hover:bg-pink-400 rounded-full py-mb10 md:py-10pxt lg:py-vw10 px-mb20 md:px-20pxt lg:px-vw20 text-black-333 text-base lg:text-sm disabled:bg-gradient-to-r disabled:from-slate-400 disabled:to-slate-400 mt-mb70 md:mt-70pxt lg:mt-vw75 transition-all duration-500  hover:from-btnPrimary hover:to-btnPrimary hover:text-white hover:translate-x-0.5 hover:translate-y-0.5 mb-mb20 md:mb-20pxt lg:mb-vw20;
        }
        .notes {
          @apply mb-mb100 md:mb-100pxt lg:mb-vw120;
        }
      `}</style>
    </>
  )
}

export default QuizeView
