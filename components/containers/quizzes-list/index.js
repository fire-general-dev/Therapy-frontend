import GridSection from "@/components/elements/gridDisplaySection"
import QuizCard from "@/components/sections/wellnessDetector/QuizCard"
const QuizzesListContainer = ({
  quizzes,
  fetchQuizzesList,
  isLoading,
  pagination,
}) => {
  return (
    <div>
      <GridSection
        items={quizzes}
        ItemComponent={QuizCard}
        listView={false}
        onloadMore={fetchQuizzesList}
        isLoading={isLoading}
        pagination={pagination}
      />
    </div>
  )
}
export default QuizzesListContainer
