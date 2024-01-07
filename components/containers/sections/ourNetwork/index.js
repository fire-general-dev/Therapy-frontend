import React, { useRef } from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import DoctorCard from "./DoctorCard"
import { extractArrayData } from "utils/extractData"
import { useRouter } from "next/router"
import { getIsRTL } from "utils/localize"
import { useTranslation } from "next-i18next"
import ArrowNext from "@/components/icons/arrow-next"
import ArrowBack from "@/components/icons/arrow-back"
import LinkButton from "@/components/buttons/LinkButton"

const OurNetwork = (props) => {
  const { data = {} } = props
  const { title, subtitle, description, doctorsList, deviceType } = data
  const router = useRouter()
  const { t } = useTranslation()

  const isRTL = getIsRTL(router?.locale)

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
      partialVisibilityGutter: 0,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 0,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 0,
    },
  }

  const carouselRef = useRef(null)

  const extractedDoctors = extractArrayData(doctorsList?.data)

  return (
    <div className="wrapper">
      <div className="our-network">
        <div className="information">
          <div className="l-inf">
            <span className="mini_title">{subtitle}</span>
            <div>{title}</div>
          </div>
          <div className="r-inf">{description}</div>
        </div>
        <div className="carousel-section">
          <div>
            <button className="cat-button active">
              {t("all_specialists")}
            </button>
          </div>
          <div className={`carousel-controls ${isRTL ? "rtl" : ""}`}>
            <div
              className="carouselControl"
              style={{ position: "relative " }}
              onClick={() => {
                carouselRef.current.previous()
              }}
            >
              <ArrowBack />
              {/* <Image width={30} height={30} src={ArrowBack} alt="arrow" /> */}
            </div>
            <div
              className="carouselControl"
              onClick={() => {
                carouselRef.current.next()
              }}
            >
              <ArrowNext />
              {/* <Image width={30} height={30} src={ArrowNext} alt="arrow" /> */}
            </div>
          </div>
        </div>
        <div className="carousel-container">
          <Carousel
            ref={carouselRef}
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={false}
            autoPlay={false}
            rewind={true}
            rewindWithAnimation={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            transitionDuration={500}
            containerClass="carousel-setting"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={props.deviceType}
            renderArrowsWhenDisabled={true}
            partialVisible={true}
            arrows={false}
            rtl={isRTL}
          >
            {deviceType !== "mobile"
              ? extractedDoctors
                  .reduce((accumulator, currentValue, currentIndex, array) => {
                    if (currentIndex % 2 === 0) {
                      accumulator.push(
                        array.slice(currentIndex, currentIndex + 2)
                      )
                    }
                    return accumulator
                  }, [])
                  .map((doctors) => {
                    return (
                      <div key={`${doctors[0]?.id}`}>
                        {doctors[0] ? (
                          <DoctorCard key={doctors[0].id} item={doctors[0]} />
                        ) : null}
                        {doctors[1] ? (
                          <DoctorCard key={doctors[1].id} item={doctors[1]} />
                        ) : null}
                      </div>
                    )
                  })
              : extractedDoctors.map((doctor) => {
                  return <DoctorCard key={doctor.id} item={doctor} />
                })}
            {/* <CheckAllDoctors /> */}
            {/* <Image
              className="pr-vw20 w-full"
              src={dummyCarouselImageAll}
              alt="check all"
              layout="raw"
              unoptimized={true}
            /> */}
          </Carousel>
        </div>
        <div>
          <LinkButton href="/therapists" text={t("check_all_the_team")} />
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          @apply py-10 lg:py-20;
          background: linear-gradient(
            172deg,
            rgba(210, 223, 255, 0.2) 0%,
            rgba(255, 243, 225, 0.2) 100%
          );
          font-family: "Poppins", sans-serif;
        }
        .our-network {
          @apply max-w-screen-xl w-full mx-auto px-4;
        }
        .mini_title {
          @apply inline-block text-[#1BBEC3] text-base font-medium mb-1 capitalize;
        }
        .information {
          @apply text-center lg:text-left flex justify-between items-baseline flex-col lg:flex-row mb-14;
        }
        .l-inf {
          @apply text-[#2E3333] text-3xl font-medium lg:max-w-xs mb-5 lg:mb-0;
        }
        .r-inf {
          @apply text-[#636363] text-base max-w-md;
        }
        .carousel-section {
          @apply flex justify-between items-center mt-10;
        }
        .carousel-controls {
          @apply flex gap-5;
          &.rtl {
            @apply flex-row-reverse;
          }
        }
        .cat-button {
          @apply text-[#323232] text-base font-medium pb-2;
          &.active {
            border-bottom: 2px solid #1bbec3;
          }
        }
        .carousel-container {
          @apply mt-7;
        }
        .carouselControl {
           {
            /* @apply h-vw60 w-vw60 rounded-full bg-btnPrimary text-white flex justify-center items-center cursor-pointer transition-colors duration-500 hover:shadow-infoButton hover:bg-white hover:text-black-0; */
          }
          @apply p-4 rounded-full cursor-pointer  transition-all duration-500 ease-in;
          fill: #1bbec3;
          border: 2px solid #ccc;
          &:hover {
            fill: white;
            @apply bg-[#1bbec3] border-[#1bbec3];
          }
        }
        .all_doctors {
          @apply w-72 py-4 px-8 bg-[#1BBEC3] text-base text-white font-bold uppercase flex justify-center items-center gap-2 cursor-pointer rounded-full mx-auto transition-all duration-500 ease-in hover:bg-white hover:text-[#1BBEC3];
          border: 1px solid #1bbec3;
          svg {
            path {
              @apply fill-black-0;
            }
          }
        }

        :global(.rtl) {
          .information {
            @apply lg:text-right;
          }
        }
      `}</style>
    </div>
  )
}

export default OurNetwork
