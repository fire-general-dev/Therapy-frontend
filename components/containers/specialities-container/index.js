import SpecialityCard from "@/components/cards/SpecialityCard"
import CategoryButton from "@/components/elements/categoryButtton"
import { useTranslation } from "next-i18next"
import { extractArrayData } from "utils/extractData"

const SpecialitiesContainer = ({ categories }) => {
  const { t } = useTranslation()
  const factoredCategories = [...extractArrayData(categories)]

  return (
    <div className="specialities-container">
      <div className="container-wrapper">
        <div className="header">
          <span className="subtitle">{t("available_services")}</span>
          <h3 className="title">{t("try_match_right_issue")}</h3>
        </div>
        <div className="specialities-body">
          {factoredCategories.map((item) => (
            <>
              <h1 className="speciality-title">{item.title}</h1>
              <div className="section_container">
                {item.categories.data.map((category) => (
                  <SpecialityCard
                    key={`specialityList-${category.id}-${category.attributes?.title}`}
                    image={category.attributes?.article_image}
                    // {...category.attributes}
                    alias={category.attributes?.alias}
                    title={category.attributes?.title}
                  />
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
      <style jsx>{`
        .specialities-container {
          font-family: "Poppins", sans-serif;
          background: white;
        }
        .container-wrapper {
          @apply max-w-screen-xl w-full mx-auto px-4 py-10 lg:py-20;
        }
        .header {
          @apply max-w-sm mx-auto mb-7 lg:mb-14;
        }
        .subtitle {
          @apply block text-[#1BBEC3] text-sm lg:text-base font-medium mb-1 capitalize text-center;
        }
        .title {
          @apply text-center text-[#2E3333] text-2xl lg:text-3xl font-medium;
        }
        .speciality-title {
          @apply text-[#2E3333] text-xl lg:text-2xl font-medium capitalize mb-5;
        }
        .section_container {
          @apply grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7 mb-8 lg:mb-12;
        }
      `}</style>
    </div>
  )
}

export default SpecialitiesContainer
