import React from "react"
import { extractArrayData } from "utils/extractData"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { useRouter } from "next/router"

import LargeArticleDetails from "./largeArticleDetails"
import { isRTLLayout } from "@/utils/helpers"
import { useTranslation } from "next-i18next"

function RecentArticles(props) {
  const { data = {} } = props
  const { title, subtitle, articles } = data
  const router = useRouter()
  const { t } = useTranslation()

  const articlesList = extractArrayData(articles)
  const useVerticalImages = articlesList.length > 2

  return (
    <div className="wrapper">
      <div className="section-details">
        <div className="left-details">
          <div className="section-title">{title}</div>
          <div className="section-subtitle">{subtitle}</div>
        </div>
        <div
          onClick={() => {
            router.push("/articles")
          }}
          className="see-all-button-desktop"
        >
          <span>{t("see_all")}</span>
          {isRTLLayout(router) ? (
            <BsArrowLeft className="text-2xl" />
          ) : (
            <BsArrowRight className="text-2xl" />
          )}
        </div>
      </div>
      <div className="articles-container">
        {articlesList.slice(0, 2).map((item, index) => {
          return (
            <LargeArticleDetails
              key={item.title}
              src={item.articleImage}
              title={item.title}
              index={index}
              slug={item.slug}
            />
          )
        })}
        <div className="vertical-articles">
          {useVerticalImages &&
            articlesList.slice(2, 5).map((item, index, array) => {
              return (
                <LargeArticleDetails
                  key={item.title}
                  src={item.articleImage}
                  title={item.title}
                  index={index + 2}
                  vertical={true}
                  lastIndex={array.length === index + 1}
                  slug={item.slug}
                />
              )
            })}
        </div>
        <div className="see-all-button-mobile">
          <span>{t("see_all")}</span>
          {isRTLLayout(router) ? (
            <BsArrowLeft className="text-2xl" />
          ) : (
            <BsArrowRight className="text-2xl" />
          )}
        </div>
      </div>
      <div className="tab-container">
        <div className="tab-articles-container">
          {articlesList.slice(0, 2).map((item, index) => {
            return (
              <LargeArticleDetails
                key={item.title}
                src={item.articleImage}
                title={item.title}
                index={index}
                slug={item.slug}
              />
            )
          })}
          {articlesList.slice(2).map((item, index, array) => {
            return (
              <LargeArticleDetails
                key={item.title}
                src={item.articleImage}
                title={item.title}
                index={index + 2}
                vertical={true}
                lastIndex={array.length === index + 1}
                slug={item.slug}
              />
            )
          })}
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          @apply px-mb20 lg:px-vw360 lg:mt-vw100 mt-mb100 md:mt-100pxt;
        }
        .section-details {
          @apply flex flex-col md:flex-row justify-between items-center text-center md:items-end md:text-left;
        }
        .left-details {
        }
        .section-title {
          @apply font-avenirSlim text-green-100 text-16pxm md:text-20pxt lg:text-16px uppercase;
        }
        .section-subtitle {
          @apply font-avenirMedium text-24pxm md:text-28pxt lg:text-24px text-black-3232;
        }
        .see-all-button-desktop {
          @apply hidden font-avenirMedium uppercase md:flex justify-center items-center text-16pxm md:text-20pxt lg:text-16px text-white py-mb12 md:py-12pxt lg:py-vw12 px-mb20 md:px-20pxt lg:px-vw20 bg-green-200 rounded-full cursor-pointer transition-all duration-500 hover:bg-white hover:text-black-0 hover:shadow-infoButton hover:translate-x-0.5 hover:translate-y-0.5;
          span {
            @apply mr-mb10 md:mr-10pxt lg:mr-vw10;
          }
        }
        .see-all-button-mobile {
          @apply font-avenirMedium mt-mb40 md:mt-40pxt uppercase flex lg:hidden justify-center items-center text-16pxm md:text-20pxt lg:text-16px text-white py-mb12 md:py-12pxt lg:py-vw12 px-mb20 md:px-20pxt lg:px-vw20 bg-green-200 rounded-full;
          span {
            @apply mr-mb10 md:mr-10pxt lg:mr-vw10;
          }
        }
        .articles-container {
          @apply flex flex-col lg:flex-row mt-mb40 md:mt-40pxt lg:mt-vw60 md:hidden lg:flex;
        }
        .vertical-articles {
          @apply flex flex-col mt-mb28 md:mt-28pxt lg:mt-0;
        }
        .tab-container {
          @apply hidden md:block lg:hidden mt-40pxt;
        }
        .tab-articles-container {
          @apply grid grid-cols-2 gap-20pxt;
        }

        :global(.rtl) {
          .section-title {
            @apply text-right;
          }
          .see-all-button-desktop {
            span {
              @apply mr-0 md:mr-0 lg:mr-0 ml-mb10 md:ml-10pxt lg:ml-vw10;
            }
          }
          .see-all-button-mobile {
            span {
              @apply mr-0 md:mr-0 lg:mr-0 ml-mb10 md:ml-10pxt lg:ml-vw10;
            }
          }
        }
      `}</style>
    </div>
  )
}

export default RecentArticles
