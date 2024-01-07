import { useRef, useState } from "react"
import Question from "./Question"
import { useTranslation } from "next-i18next"
import SubmitBtn from "@/components/buttons/SubmitBtn"
import BackBtn from "../doctor-suggestions-container/BackBtn"
import { useRouter } from "next/router"
import { Form, Formik } from "formik"

const QuestionsStep = ({ currentStep, onChangeStep }) => {
  const [step, setStep] = useState(0)
  const router = useRouter()
  const introRef = useRef(null)

  const getQuestions = (values, setFieldValue) => {
    console.log('values["question-1"] ', values["question-1"])
    switch (step) {
      case 0:
        return (
          <>
            <Question
              name="question-1"
              key={"Question 1"}
              value={values["question-1"]}
              setFieldValue={setFieldValue}
              question={t("get_started_question1")}
              answers={[
                { id: "male", label: t("male") },
                { id: "female", label: t("female") },
              ]}
            />
            <Question
              name="question-2"
              key={"Question 2"}
              value={values["question-2"]}
              setFieldValue={setFieldValue}
              question={t("what_age")}
              answers={[
                { id: "18-29", label: "18 - 29" },
                { id: "30-44", label: "30-44" },
                { id: "45-60", label: "45 - 60" },
                { id: "above60", label: t("above60") },
              ]}
            />
            <Question
              name="question-3"
              key={"Question 3"}
              value={values["question-3"]}
              setFieldValue={setFieldValue}
              question={t("what_relationship_status")}
              answers={[
                { id: "single", label: t("single") },
                { id: "married", label: t("married") },
                { id: "in_relationship", label: t("in_relationship") },
              ]}
            />
            <Question
              name="question-4"
              key={"Question 4"}
              value={values["question-4"]}
              setFieldValue={setFieldValue}
              question={t("have_you_ever_been_therapy_before")}
              answers={[
                {
                  id: "yes",
                  label: t("yes"),
                },
                {
                  id: "no",
                  label: t("no"),
                },
              ]}
            />
          </>
        )
      case 1:
        return (
          <>
            <Question
              name="question-5"
              key={"Question 5"}
              value={values["question-5"]}
              setFieldValue={setFieldValue}
              question={t("what_led_therapy_today")}
              answers={[
                {
                  id: "been_feeling_depressed",
                  label: t("been_feeling_depressed"),
                },
                {
                  id: "feel_anxious",
                  label: t("feel_anxious"),
                },
                {
                  id: "my_mood_is_interfering_with",
                  label: t("my_mood_is_interfering_with"),
                },
                {
                  id: "struggle_with_building",
                  label: t("struggle_with_building"),
                },
                {
                  id: "purpose_my_life",
                  label: t("purpose_my_life"),
                },
                {
                  id: "i_am_grieving",
                  label: t("i_am_grieving"),
                },
                {
                  id: "experienced_traumatic_experience",
                  label: t("experienced_traumatic_experience"),
                },
                {
                  id: "need_specific_challenge",
                  label: t("need_specific_challenge"),
                },
                {
                  id: "want_gain_self_confidence",
                  label: t("want_gain_self_confidence"),
                },
                {
                  id: "want_to_improve_myself",
                  label: t("want_to_improve_myself"),
                },
                {
                  id: "recommended_by_someone",
                  label: t("recommended_by_someone"),
                },
                {
                  id: "other",
                  label: t("other"),
                },
              ]}
            />
            <Question
              name="question-6"
              key={"Question 6"}
              value={values["question-6"]}
              setFieldValue={setFieldValue}
              question={t("what_your_expectations_therapist")}
              answers={[
                {
                  id: "tells_me_my_diagnosis",
                  label: t("tells_me_my_diagnosis"),
                },
                {
                  id: "helps_me_find_relief",
                  label: t("helps_me_find_relief"),
                },
                {
                  id: "assess_my_mental_wellness",
                  label: t("assess_my_mental_wellness"),
                },
              ]}
            />
          </>
        )

      case 2:
        return (
          <>
            <Question
              name="question-7"
              key={"Question 7"}
              value={values["question-7"]}
              setFieldValue={setFieldValue}
              question={t("how_rate_physical_health")}
              answers={[
                {
                  id: "good",
                  label: t("good"),
                },
                {
                  id: "fair",
                  label: t("fair"),
                },
                {
                  id: "poor",
                  label: t("poor"),
                },
              ]}
            />

            <Question
              name="question-8"
              key={"Question 8"}
              value={values["question-8"]}
              setFieldValue={setFieldValue}
              question={t("how_rate_eating_habits")}
              answers={[
                {
                  id: "good",
                  label: t("good"),
                },
                {
                  id: "fair",
                  label: t("fair"),
                },
                {
                  id: "poor",
                  label: t("poor"),
                },
              ]}
            />
            <Question
              name="question-9"
              key={"Question 9"}
              value={values["question-9"]}
              setFieldValue={setFieldValue}
              question={t("areyou_bothered_following_problems")}
              answers={[
                {
                  id: "interest_doing_things",
                  label: t("interest_doing_things"),
                },
                {
                  id: "feeling_hopeless",
                  label: t("feeling_hopeless"),
                },
                {
                  id: "trouble_falling_asleep",
                  label: t("trouble_falling_asleep"),
                },
                {
                  id: "feeling_tired",
                  label: t("feeling_tired"),
                },
                {
                  id: "excessive_worry",
                  label: t("excessive_worry"),
                },
                {
                  id: "poor_appetite",
                  label: t("poor_appetite"),
                },
                {
                  id: "feeling_bad_about_yourself",
                  label: t("feeling_bad_about_yourself"),
                },
                {
                  id: "trouble_concentrating",
                  label: t("trouble_concentrating"),
                },
                {
                  id: "feeling_angry",
                  label: t("feeling_angry"),
                },
                {
                  id: "worries_about_intimacy",
                  label: t("worries_about_intimacy"),
                },
                {
                  id: "social_withdrawal",
                  label: t("social_withdrawal"),
                },
              ]}
            />
          </>
        )
      case 3:
        return (
          <>
            <Question
              name="question-10"
              key={"Question 10"}
              value={values["question-10"]}
              setFieldValue={setFieldValue}
              question={t("have_you_ever_been_diagnosed")}
              answers={[
                {
                  id: "depression",
                  label: t("depression"),
                },
                {
                  id: "anxiety_disorders",
                  label: t("anxiety_disorders"),
                },
                {
                  id: "obsessive_compulsive_disorder",
                  label: t("obsessive_compulsive_disorder"),
                },
                {
                  id: "post_traumatic_stress_disorder",
                  label: t("post_traumatic_stress_disorder"),
                },
                {
                  id: "schizophrenia",
                  label: t("schizophrenia"),
                },
                {
                  id: "bipolar_disorder",
                  label: t("bipolar_disorder"),
                },
                {
                  id: "other",
                  label: t("other"),
                },
              ]}
            />

            <Question
              name="question-11"
              key={"Question 11"}
              value={values["question-11"]}
              setFieldValue={setFieldValue}
              question={t("do_you_have_family_history")}
              answers={[
                {
                  id: "no",
                  label: t("no"),
                },
                {
                  id: "yes",
                  label: t("yes"),
                },
              ]}
            />
          </>
        )
      default:
        return (
          <>
            <Question
              name="question-12"
              key={"Question 12"}
              value={values["question-12"]}
              setFieldValue={setFieldValue}
              question={t("have_you_experienced_life_changes")}
              answers={[
                {
                  id: "no",
                  label: t("no"),
                },
                {
                  id: "yes",
                  label: t("yes"),
                },
              ]}
            />

            <Question
              name="question-13"
              key={"Question 13"}
              value={values["question-13"]}
              setFieldValue={setFieldValue}
              question={t("how_communicate_with_your_therapist")}
              answers={[
                {
                  id: "video",
                  label: t("video"),
                },
                {
                  id: "audio",
                  label: t("audio"),
                },
                {
                  id: "chat",
                  label: t("chat"),
                },
              ]}
            />
          </>
        )
    }
  }

  const { t } = useTranslation()

  const handleBackBtn = () => {
    if (step == 0) {
      router.push("/")
    } else {
      setStep(step - 1)
    }
  }

  const handleNext = () => {
    introRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    if (step == 4) {
      introRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
      onChangeStep(1)
    } else {
      setStep(step + 1)
    }
  }

  return (
    <div>
      <div className="header">
        <div>
          <span className="subtitle">{t("complete_assessment")}</span>
          <span className="title">{t("let_know_about_you")}</span>
        </div>
      </div>
      <div ref={introRef} className="intro">
        <p className="intro-title">{t("get_started_questions_title")}</p>
        <p className="intro-desc">{t("get_started_questions_desc")}</p>
      </div>
      <Formik initialValues={{ test: "test" }}>
        {({ setFieldValue, values, isSubmitting, isValid, errors }) => {
          return (
            <Form>
              <div className="questoins">
                {getQuestions(values, setFieldValue)}
              </div>
            </Form>
          )
        }}
      </Formik>
      <div className="actions">
        <BackBtn
          onClick={handleBackBtn}
          text={step == 0 ? t("go_to_home") : t("go_to_back")}
        />
        <SubmitBtn onClick={handleNext} text={t("proceed_to_next")} />
      </div>
      <style jsx>{`
        .subtitle {
          @apply block text-[#1BBEC3] text-center text-sm lg:text-base font-medium uppercase mb-1;
        }
        .title {
          @apply block text-[#2E3333] text-center text-2xl lg:text-3xl font-medium mb-14;
        }
        .questoins {
          @apply flex flex-col gap-7 mb-14;
        }
        .actions {
          @apply flex flex-col lg:flex-row justify-center items-center gap-5;
        }
        .intro {
          @apply mb-7;
          .intro-title {
            @apply text-[#2E3333] text-base lg:text-xl font-medium mb-3;
          }
          .intro-desc {
            @apply text-[#717784] text-sm lg:text-base;
          }
        }
      `}</style>
    </div>
  )
}

export default QuestionsStep
