import NextImage from "@/components/elements/image"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useTranslation } from "next-i18next"
import timeConverter from "utils/timeConverter"

function QuizCard({ item, className }) {
  const { t } = useTranslation("common")
  const { url } = item.carouselBackground?.data?.attributes

  return (
    <>
      <Link href={`/quizzes/${item.slug}`}>
        <div className={`quize-carousel-item ${className ? className : ""}`}>
          <div
            className="graident"
            style={{ backgroundImage: `url('${url}')` }}
          >
            <div className="after"></div>
            <div className="logo-wrapper">
              <NextImage
                layout="raw"
                media={item.image}
                alt={item.name}
                // placeholder="blur"
                className="!h-100pxm md:!h-100pxt lg:!h-100px !w-auto"
              />
            </div>
            <div className="quiz_name">{item.name}</div>
            <div className="details">
              <span>
                {item.questions.length} {t("questions")}
              </span>
              <span>{timeConverter(item.time)}</span>
            </div>
          </div>
        </div>
      </Link>
      <style jsx>{`
        .quize-carousel-item {
          @apply relative !w-300pxm md:!w-300pxt lg:!w-300px;
          &:hover .after {
            @apply visible bg-black-0;
          }
        }
        .graident {
          @apply rounded-md	w-full h-full flex flex-col px-mb20 py-mb10 md:px-20pxt md:py-10pxt lg:px-vw20 lg:py-vw10;
        }
        .quiz_name {
          @apply font-avenirBlack text-14pxm md:text-18pxt lg:text-18px text-black-333 mb-mb12 md:mb-16pxt lg:mb-vw16 mt-mb16 md:mt-20pxt lg:mt-vw20;
        }
        .details {
          @apply flex justify-between font-avenirSlim text-green-100;
        }
        .logo-wrapper {
          @apply relative;
        }
        .after {
          @apply rounded-md absolute top-0 left-0 w-full h-full invisible text-white opacity-10;
          transition: all 0.5s ease;
        }

        :global(.rtl) {
          .quize-carousel-item {
            @apply mr-0 md:mr-0 lg:mr-0 ml-vw40 md:ml-40pxt lg:ml-vw20;
          }
        }
      `}</style>
    </>
  )
}

export default QuizCard
