import React, { useState, useRef } from "react"
import ArrowButton from "../arrowButton"
import { BsArrowRight } from "react-icons/bs"

import ArrowDownButton from "../arrowDownButton"
import { useTranslation } from "react-i18next"

const FAQItem = (props) => {
  const panelRef = useRef(null)
  const iconRef = useRef(null)

  const onClick = (e) => {
    const panel = panelRef.current
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null
      iconRef.current.classList.toggle("rotate-180")
    } else {
      let acc = document.getElementsByClassName("accordion")
      for (let x = 0; x < acc.length; x++) {
        acc[x].nextElementSibling.style.maxHeight = null
        acc[x].getElementsByClassName("icon")[0].classList.toggle('rotate-180"')
      }
      panel.style.maxHeight = panel.scrollHeight + "px"
      iconRef.current.classList.toggle("rotate-180")
    }
  }
  return (
    <div className="item-wrapper">
      <div className="accordion" onClick={onClick}>
        <div className="title">{props.question}</div>
        <div className="after"></div>
        <div ref={iconRef} className="icon">
          <ArrowDownButton />
        </div>
      </div>
      <div ref={panelRef} className="panel">
        <p>{props.answer}</p>
      </div>
      <style jsx>{`
        .item-wrapper {
          @apply bg-light-100 mb-mb20 lg:mb-vw20;
        }
        .title {
          @apply font-sans text-18pxm md:text-22pxt lg:text-18px text-black-333;
        }
        .accordion {
          @apply px-mb10 md:px-10pxt lg:px-vw40 py-mb28 md:py-24pxt lg:py-vw24 flex justify-between cursor-pointer transition-all duration-300 relative;
          & .after {
            @apply rounded-t-lg absolute top-0 left-0 w-full h-full invisible text-white opacity-10;
            transition: all 0.5s ease;
          }
          &:hover .after {
            @apply visible bg-black-0;
          }
        }

        .panel {
          @apply px-mb10 md:px-10pxt lg:px-vw40 text-16pxm md:text-20pxt lg:text-18px overflow-hidden transition-all duration-1000 text-green-200;
          max-height: 0px;
          p {
            @apply mb-mb10 md:mb-10pxt ml-3 lg:mt-vw10 whitespace-pre-line text-black-444;
            line-height: 1.6;
          }
        }
        .icon {
          @apply transition-all h-fit duration-500;
        }
      `}</style>
    </div>
  )
}

function FAQSection() {
  const { t } = useTranslation("common")

  const questions = [
    {
      id: 1,
      question: t("faq_how_nafsi_work"),
      answer: t("faq_how_nafsi_work_ans"),
    },
    {
      id: 2,
      question: t("faq_how_will_communicate"),
      answer: t("faq_how_will_communicate_ans"),
    },
    {
      id: 3,
      question: t("faq_why_choose_nafsi"),
      answer: t("faq_why_choose_nafsi_ans"),
    },
    {
      id: 4,
      question: t("faq_what_conditions_does_nafsi_treat"),
      answer: t("faq_what_conditions_does_nafsi_treat_ans"),
    },
    {
      id: 5,
      question: t("faq_does_nafsi_for_children"),
      answer: t("faq_does_nafsi_for_children_ans"),
    },
    ,
    {
      id: 6,
      question: t("faq_how_long_can_i_use_nafsi"),
      answer: t("faq_how_long_can_i_use_nafsi_ans"),
    },
  ]
  return (
    <div className="section-wrapper">
      <div className="title">{t("faq_title")}</div>
      <div className="subtitle">{t("faq_subtitle")}</div>
      <section className="faq">
        {/* {questions.map((item) => (
          <Question
            key={`question-${item.id}`}
            question={item.question}
            answer={item.answer}
          />
        ))} */}
        {questions.map((item, index) => (
          <FAQItem
            key={`question-${item.id}`}
            index={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </section>
      <div className="see-all-button">
        <span>{t("help_center")}</span>
        <BsArrowRight className="text-3xl" />
      </div>
      <style jsx>{`
        .section-wrapper {
          @apply py-mb100 md:py-100pxt lg:pt-vw130 lg:pb-vw100 bg-gray-fb px-mb20 lg:px-vw360;
        }
        .title {
          @apply font-avenirSlim text-16pxm md:text-20pxt lg:text-16px uppercase text-center w-full mb-mb10 lg:mb-vw10 text-green-100;
        }
        .subtitle {
          @apply font-avenirMedium text-24pxm md:text-28pxt lg:text-24px text-center w-full;
        }
        .faq {
          margin: 3rem 0;
        }
        .see-all-button {
          @apply font-avenirMedium uppercase flex justify-center items-center text-16pxm md:text-20pxt lg:text-16px text-white py-mb12 md:py-12pxt lg:py-vw12 px-mb20 lg:px-vw20 bg-green-200 rounded-full md:w-1/3 mx-auto cursor-pointer transition-all duration-500 hover:bg-white hover:text-black-0 hover:shadow-infoButton hover:translate-x-0.5 hover:translate-y-0.5;
           {
            /* Hidden for now until we add help center page */
          }
          @apply hidden;
          span {
            @apply mr-mb10 lg:mr-vw10;
          }
        }
      `}</style>
    </div>
  )
}

const Question = (props) => {
  const [isActive, setActive] = React.useState(false)
  const handleClick = (id) => {
    setActive(!isActive)
  }
  return (
    <div className="question-wrapper">
      <div className="question" id={props.id}>
        <h3>{props.question}</h3>
        <button onClick={() => handleClick(props.id)}>
          <svg
            className={isActive ? "active" : ""}
            viewBox="0 0 320 512"
            width="100"
            title="angle-down"
          >
            <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
          </svg>
        </button>
      </div>
      <div className={isActive ? "answer active" : "answer"}>
        {props.answer}
      </div>
      <style jsx>{`
        .faq {
          margin: 3rem 0;
        }
        .question-wrapper {
          width: 35rem;
          border-bottom: 1px solid $details;
          margin: 0 auto;
          padding: 1rem;
          transition: 1s;
        }

        .question {
          display: flex;
          font-size: 1rem;
          font-weight: 500;
          color: $primary-text-color;
          display: flex;
          justify-content: space-between;

          svg {
            width: 1rem;
            height: 1.5rem;
            fill: $secondary-text-color;
          }

          svg.active {
            transform: rotate(180deg);
          }

          svg:hover {
            opacity: 0.8;
          }
        }

        button {
          background-color: transparent;
          border: none;
          cursor: pointer;
        }

        button:focus {
          outline: none;
        }

        .answer {
          display: none;
        }

        .answer.active {
          display: block;
          text-align: left;
          padding-top: 1.5rem;
          font-weight: light;
          font-size: 0.8rem;
          line-height: 1.5;
          color: $secondary-text-color;
          height: 0%;
          animation: slidein 0.4s;
          animation-fill-mode: forwards;
        }

        @keyframes slidein {
          from {
            opacity: 0.3;
            transform: translateY(-20%);
          }
          to {
            opacity: 1;
            transform: translateY(0%);
          }
        }
      `}</style>
    </div>
  )
}

export default FAQSection
