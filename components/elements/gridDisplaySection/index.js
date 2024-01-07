import React from "react"
import PropTypes from "prop-types"
import Grid from "../grid"
import { extractArrayData } from "utils/extractData"
import Link from "next/link"
import CTAButton from "../CTAButton"
import { useRouter } from "next/router"
import LoaderButton from "../loaderButton"
import { BsArrowDown } from "react-icons/bs"
import { useTranslation } from "next-i18next"

function GridSection(props) {
  const {
    title,
    items,
    ItemComponent,
    listView,
    extraClasses,
    onloadMore,
    isLoading = false,
    pagination,
    gridClassName,
  } = props
  const extractedItems = extractArrayData(items)
  const router = useRouter()
  const { t } = useTranslation("common")

  const LoadMoreButton = () => {
    const ArrowButton = (props) => {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30.002"
          height="30"
          viewBox="0 0 30.002 30"
          className={props.className}
        >
          <defs>
            <clipPath id="clip-path">
              <rect
                id="eva:arrow-back-fill_Background_Mask_"
                data-name="eva:arrow-back-fill (Background/Mask)"
                width="30.002"
                height="30"
                transform="translate(30.002 30) rotate(180)"
                fill="none"
                className={props.className}
              />
            </clipPath>
          </defs>
          <g id="eva:arrow-back-fill" clipPath="url(#clip-path)">
            <path
              id="Vector"
              d="M3.925-7.5l4.538,5.45a1.251,1.251,0,0,1,.284.915A1.252,1.252,0,0,1,8.3-.289a1.252,1.252,0,0,1-.915.284,1.252,1.252,0,0,1-.848-.446L.288-7.952a1.487,1.487,0,0,1-.113-.188A.158.158,0,0,0,.088-8.3,1.25,1.25,0,0,1,0-8.752,1.25,1.25,0,0,1,.088-9.2a.158.158,0,0,1,.088-.163,1.488,1.488,0,0,1,.113-.188l6.251-7.5a1.25,1.25,0,0,1,.431-.332A1.25,1.25,0,0,1,7.5-17.5a1.25,1.25,0,0,1,.8.288,1.25,1.25,0,0,1,.308.379,1.25,1.25,0,0,1,.139.468,1.25,1.25,0,0,1-.051.486,1.25,1.25,0,0,1-.233.429L3.925-10H18.752a1.25,1.25,0,0,1,.884.366A1.25,1.25,0,0,1,20-8.752a1.25,1.25,0,0,1-.366.884,1.25,1.25,0,0,1-.884.366Z"
              transform="translate(25.002 6.248) rotate(180)"
              fill="#fff"
              className={props.className}
            />
          </g>
        </svg>
      )
    }
    const handleClick = (event) => {
      const page = pagination.page + 1
      const pageSize = pagination.pageSize
      const locale = router.locale
      onloadMore({ locale, page, pageSize })
    }
    return (
      <>
        <div onClick={handleClick} className="all_doctors">
          <span>{t("load_more")}</span>
          <ArrowButton />
        </div>
        <style jsx>{`
          .all_doctors {
            @apply bg-gray-200 uppercase shadow-infoButton flex justify-center items-center rounded-full py-mb10 md:py-10pxt lg:py-vw10 font-avenirMedium text-14pxm md:text-18pxt lg:text-14px my-mb60 md:my-60pxt lg:my-vw60 lg:w-1/4 mx-auto;
            span {
              @apply mr-mb10 md:mr-10pxt lg:mr-vw10;
            }
            svg {
              @apply rotate-90;
              path {
                @apply fill-black-0;
              }
            }
          }
        `}</style>
      </>
    )
  }

  const handleClick = (event) => {
    const page = pagination.page + 1
    const pageSize = pagination.pageSize
    const locale = router.locale
    onloadMore({ locale, page, pageSize })
  }

  return (
    <div className={`wrapper ${extraClasses ? extraClasses : ""}`}>
      {title || listView ? (
        <div className="header">
          <div className="title">{title}</div>
          {/* {listView && <div>list View</div>} */}
        </div>
      ) : null}
      <Grid className={gridClassName ? gridClassName : ""}>
        {extractedItems.map((item) => (
          <ItemComponent item={item} key={item.id} />
        ))}
      </Grid>
      {pagination.page < pagination.pageCount ? (
        <LoaderButton
          isLoading={isLoading}
          type="button"
          isDisabled={false}
          variet="secondary"
          // TODO add tablet margin
          classList="mt-mb40 lg:mt-vw40"
          onClick={handleClick}
        >
          {t("load_more")}
          <BsArrowDown className="inline-block ml-mb8 rtl:ml-0 rtl:mr-mb8 lg:ml-vw08 lg:rtl:ml-0 lg:rtl:mr-vw08 text-24pxm md:text-28pxt lg:text-24px" />
        </LoaderButton>
      ) : (
        <div className="mb-mb80 md:mb-80pxt lg:mb-vw80"></div>
      )}
      <style jsx>{`
        .wrapper {
          @apply px-mb20 lg:px-vw360 mt-mb60 lg:mt-vw120;
        }
        .header {
          @apply flex justify-between mb-mb60 lg:mb-vw60;
        }
        .title {
          @apply font-avenirHeavy text-24pxm md:text-28pxt lg:text-24px text-gray-64;
        }
      `}</style>
    </div>
  )
}

GridSection.propTypes = {
  onloadMore: PropTypes.func,
  pagination: PropTypes.object,
}

export default GridSection
