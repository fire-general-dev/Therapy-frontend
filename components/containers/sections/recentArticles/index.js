import React from "react"
import { extractArrayData } from "utils/extractData"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import LargeArticleCard from "@/components/cards/LargeArticleCard"
import SmallArticleCard from "@/components/cards/SmallArticleCard"
import LinkButton from "@/components/buttons/LinkButton"

function RecentArticles(props) {
  const { data = {} } = props
  const { title, subtitle, articles } = data
  const router = useRouter()
  const { t } = useTranslation()

  const articlesList = extractArrayData(articles)

  return (
    <div className="wrapper">
      <div className="container-wrapper">
        <div className="header">
          <div>
            <span className="subtitle">{subtitle}</span>
            <h3 className="title">{title}</h3>
          </div>
          <LinkButton
            className={"hidden lg:block"}
            text={t("see_all_articles")}
            href={"/articles"}
          />
        </div>

        <div className="articles-container">
          <div>
            {articlesList.slice(0, 1).map((item, index) => {
              return (
                <LargeArticleCard
                  key={item.title}
                  image={item.articleImage}
                  title={item.title}
                  // description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown"}
                  slug={item.slug}
                />
              )
            })}
          </div>
          <div className="flex flex-col gap-8">
            {articlesList.slice(2, 5).map((item, index, array) => {
              return (
                <SmallArticleCard
                  key={item.title}
                  image={item.articleImage}
                  title={item.title}
                  slug={item.slug}
                />
              )
            })}
          </div>

          <div></div>
        </div>

        <LinkButton
          className={"w-full block mt-7 lg:hidden"}
          text={t("see_all_articles")}
          href={"/articles"}
        />
      </div>
      <style jsx>{`
        .wrapper {
          background: linear-gradient(
            172deg,
            rgba(210, 223, 255, 0.2) 0%,
            rgba(255, 243, 225, 0.2) 100%
          );
        }
        .header {
          @apply flex justify-center lg:justify-between items-center mb-7 lg:mb-14;
        }
        .subtitle {
          @apply text-center lg:text-left text-[#1BBEC3] text-sm lg:text-base block font-medium uppercase;
        }
        .title {
          @apply text-center lg:text-left text-[#2E3333] font-medium text-2xl lg:text-3xl;
        }
        .articles-container {
          @apply flex flex-col lg:flex-row gap-8;
        }
        .container-wrapper {
          @apply max-w-screen-xl w-full mx-auto px-4 py-10 lg:py-20;
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
          .title {
            @apply lg:text-right;
          }
          .subtitle {
            @apply lg:text-right;
          }
        }
      `}</style>
    </div>
  )
}

export default RecentArticles
