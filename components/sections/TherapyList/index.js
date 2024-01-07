// import { useRouter } from "next/router"
import CategoryButton from "@/components/elements/descriptionCategoryButtton"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useTranslation } from "next-i18next"
import { extractArrayData } from "utils/extractData"
import ReadMoreIcon from "@/images/icons/read-more-icon.svg"
import Image from "next/image"

const TherapyGroups = (props) => {
  // Find the Right Therapy for your case
  const [selectedCategory, setSelectedCategory] = useState()
  const { t } = useTranslation()

  const isRTL = props.locale === "ar"

  useEffect(() => {
    setSelectedCategory(extractArrayData(props.data?.categories?.data)[0])
  }, [])

  const { groups, sectionSpace = "", data = {}, title } = props
  if (!data || Object.keys(data)?.length === 0) return null
  const { id, categories, main_categories, title: dataTitle } = data

  const factoredCategories = extractArrayData(categories?.data)
  // const factoredCategories = [
  //   ...extractArrayData(main_categories?.data),
  //   ...extractArrayData(categories?.data),
  // ]

  return (
    <div className={`section ${sectionSpace ? "sectionSpace" : ""}`}>
      <span className="title">{dataTitle || title}</span>
      <div className="buttons_container">
        {factoredCategories.map((item) => (
          <CategoryButton
            key={`therpayList-${item.id}-${item.title}`}
            {...item}
            item={item}
            title={item.title}
            active={selectedCategory?.alias == item.alias}
            onClick={(item) => setSelectedCategory(item)}
          />
        ))}
      </div>
      <div className="desc-wrapper">
        {selectedCategory ? (
          <>
            {" "}
            <div
              dangerouslySetInnerHTML={{
                __html: selectedCategory?.shortDescription,
              }}
            ></div>
            <Link
              href={`/services/${selectedCategory?.alias}`}
              className={`cursor-pointer font-avenirMedium text-18pxm md:text-22pxt lg:text-18px text-btnPrimary mt-mb12 md:mt-16pxt lg:mt-vw12`}
            >
              <div className="read-more">
                {t("read_more")}
                <Image
                  className={isRTL ? "rotate-180" : ""}
                  src={ReadMoreIcon}
                  alt="read more"
                />
              </div>
            </Link>{" "}
          </>
        ) : null}
      </div>
      <style jsx>{`
        .section {
          @apply bg-white px-mb20 lg:px-vw360 mb-mb60 md:mb-80pxt mt-0 xs:mt-mb60 md:mt-240pxt lg:mb-vw40 lg:mt-vw100;
          @apply bg-white px-mb20 lg:px-vw360 mb-mb60 md:mb-80pxt mt-0 xs:mt-mb60 md:mt-240pxt lg:mb-vw40 lg:mt-vw100;
        }
        .title {
          @apply inline-block font-avenirMedium mb-mb20 md:mb-20pxt lg:mb-vw06 text-18pxm  md:text-24pxt lg:text-20px text-black-333;
          @apply inline-block font-avenirMedium mb-mb20 md:mb-20pxt lg:mb-vw06 text-18pxm  md:text-24pxt lg:text-20px text-black-333;
        }
        .buttons_container {
          @apply flex flex-wrap gap-mb20 md:gap-24pxt lg:gap-vw20 mt-vw24;
        }
        .sectionSpace {
          @apply my-mb60 lg:my-vw75;
        }
        .desc-wrapper {
          @apply mt-mb30 md:mt-30pxt lg:mt-vw30 text-16pxm md:text-22pxt lg:text-18px text-[#646464];
          font-family: "HelveticaNeue-Light", "Helvetica Neue Light",
            "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
        }
        .read-more {
          @apply flex items-center gap-mb12 md:gap-12pxt lg:gap-vw12 mt-mb6 md:mt-8pxt lg:mt-vw08;
        }
      `}</style>
    </div>
  )
}

export default TherapyGroups
