import CategoryButton from "@/components/elements/categoryButtton"
import { extractArrayData } from "utils/extractData"

const CategoriesList = ({
  categories,
  title,
  // onloadMore,
  // pagination,
  // isLoading
}) => {
  const factoredCategories = [...extractArrayData(categories)]

  return (
    <div className={`section`}>
      <span className="title">{title}</span>
      {factoredCategories.map((item) => (
        <>
          <h1 className="main-category-title">{item.title}</h1>
          <div className="buttons_container">
            {item.categories.data.map((category) => (
              <CategoryButton
                key={`therpayList-${category.id}-${category.attributes.title}`}
                {...category.attributes}
                title={category.attributes.title}
              />
            ))}
          </div>
        </>
      ))}
      <style jsx>{`
        .section {
          @apply bg-white px-mb20 lg:px-vw360 my-vw100 xs:mt-vw510 lg:my-vw100;
        }
        .title {
          @apply inline-block mb-mb40 md:mb-40pxt lg:mb-vw40 text-22pxm md:text-26pxt lg:text-22px text-black-333 uppercase;
        }
        .main-category-title {
          @apply text-20pxm md:text-20pxt lg:text-20px mb-vw12 capitalize;
        }
        .buttons_container {
          @apply flex flex-wrap gap-mb20 md:gap-24pxt lg:gap-vw20 mb-vw40;
        }
        .sectionSpace {
          @apply my-mb60 lg:my-vw75;
        }
      `}</style>
    </div>
  )
}

export default CategoriesList
