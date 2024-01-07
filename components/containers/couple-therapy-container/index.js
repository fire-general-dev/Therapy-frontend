import ServiceBtn from "@/components/buttons/ServiceBtn"
import DoctorBookingCard from "@/components/cards/DoctorBookingCard/DoctorBookingCard"
import MainServiceCard from "@/components/cards/MainServiceCard/MainServiceCard"
import ArrowBack from "@/components/icons/arrow-back"
import ArrowNext from "@/components/icons/arrow-next"
import CoupleImage from "@/images/services/couple.png"
import { getServiceDoctorList } from "@/utils/api"
import { extractArrayData } from "@/utils/extractData"
import { isRTLLayout } from "@/utils/helpers"
import { getIsRTL } from "@/utils/localize"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useRef } from "react"
import { useEffect, useState } from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

const CoupleTherapyContainer = ({ categoriesList, deviceType }) => {
  const factoredCategories = extractArrayData(categoriesList)
  const router = useRouter()
  const carouselRef = useRef(null)
  const couple = factoredCategories.find((cat) => {
    if (isRTLLayout(router)) {
      return cat?.id == "4"
    }
    return cat?.id == "3"
  })
  const cats = extractArrayData(couple?.categories?.data)
  const { t } = useTranslation()
  const [selectedCat, setSelectedCat] = useState("")
  const [doctorsList, setDoctorsList] = useState([])
  const contentData = [
    t("strengthen_relationship_first"),
    t("strengthen_relationship_second"),
  ]
  const [isLoading, setIsLoading] = useState(false)
  const isRTL = getIsRTL(router?.locale)

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 0,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 0,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 0,
    },
  }

  const getDoctorData = async (service) => {
    setIsLoading(true)
    const doctorData = await getServiceDoctorList({
      locale: router.locale || "en",
      service: service,
    })
    setDoctorsList(extractArrayData(doctorData))
    setIsLoading(false)
  }

  useEffect(() => {
    // setSelectedCat(cats[0]?.id)
    getDoctorData("")
  }, [categoriesList])
  return (
    <div className="couple-therapy-container">
      <MainServiceCard
        cardImage={CoupleImage}
        title={t("strengthen_relationship")}
        contents={contentData}
      />
      <div className="bg-wrapper">
        <div className="container-wrapper">
          {/* <span className="filter-by">{t("filter_by")}</span>
          <div className="cats-wrapper">
            {cats.map((category) => {
              return (
                <ServiceBtn
                  key={`couple-${category.id}-${category.title}`}
                  text={category?.title}
                  isActive={selectedCat == category?.id}
                  onClick={() => {
                    setSelectedCat(category?.id)
                    getDoctorData(category?.alias)
                  }}
                />
              )
            })}
          </div> */}

          <div className="information">
            <div className="l-inf">
              <span className="mini_title">{t("available_doctors")}</span>
              <div>{t("match_right_doctor")}</div>
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
              </div>
              <div
                className="carouselControl"
                onClick={() => {
                  carouselRef.current.next()
                }}
              >
                <ArrowNext />
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
              deviceType={deviceType}
              renderArrowsWhenDisabled={true}
              partialVisible={true}
              arrows={false}
              rtl={isRTL}
            >
              {deviceType !== "mobile"
                ? doctorsList
                    .reduce(
                      (accumulator, currentValue, currentIndex, array) => {
                        if (currentIndex % 2 === 0) {
                          accumulator.push(
                            array.slice(currentIndex, currentIndex + 2)
                          )
                        }
                        return accumulator
                      },
                      []
                    )
                    .map((doctors) => {
                      return (
                        <div key={`${doctors[0]?.id}`}>
                          {doctors[0] ? (
                            <DoctorBookingCard
                              key={doctors[0].id}
                              doctor={doctors[0]}
                              isMobile={deviceType == "mobile"}
                            />
                          ) : null}
                          {doctors[1] ? (
                            <DoctorBookingCard
                              key={doctors[1].id}
                              doctor={doctors[1]}
                              isMobile={deviceType == "mobile"}
                            />
                          ) : null}
                          {doctors[2] ? (
                            <DoctorBookingCard
                              key={doctors[2].id}
                              doctor={doctors[2]}
                              isMobile={deviceType == "mobile"}
                            />
                          ) : null}
                        </div>
                      )
                    })
                : doctorsList.map((doctor) => {
                    return (
                      <DoctorBookingCard
                        isMobile={deviceType == "mobile"}
                        key={doctor.id}
                        doctor={doctor}
                      />
                    )
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
        </div>
      </div>
      <style jsx>{`
        .couple-therapy-container {
          font-family: "Poppins", sans-serif;
        }

        .bg-wrapper {
          background: linear-gradient(
            172deg,
            rgba(210, 223, 255, 0.3) 0%,
            rgba(255, 243, 225, 0.3) 100%
          );
        }

        .container-wrapper {
          @apply max-w-screen-xl w-full mx-auto px-4 py-10 lg:py-20;
        }
        .mini_title {
          @apply hidden lg:inline-block text-[#1BBEC3] text-base font-medium mb-1 capitalize text-center;
        }
        .information {
          @apply flex justify-between items-start flex-col lg:flex-row mb-14;
        }
        .l-inf {
          @apply text-[#2E3333] text-3xl font-medium max-w-xs mb-7 lg:mb-0;
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
           {
            /* @apply mt-mb28 lg:mt-28pxt lg:mt-vw40; */
          }
        }
        .carouselControl {
           {
            /* @apply h-vw60 w-vw60 rounded-full bg-btnPrimary text-white flex justify-center items-center cursor-pointer transition-colors duration-500 hover:shadow-infoButton hover:bg-white hover:text-black-0; */
          }
          @apply p-4 rounded-full cursor-pointer  transition-all duration-500 ease-in;
          fill: #ccc;
          border: 2px solid #ccc;
          &:hover {
            fill: white;
            border-color: #1bbec3;
            @apply bg-[#1BBEC3];
          }
        }
        .filter-by {
          @apply block lg:hidden text-center text-[#2E3333] text-lg font-medium mb-3;
        }
        .cats-wrapper {
          @apply flex justify-center lg:justify-start gap-5 flex-wrap mb-7 lg:mb-0;
        }
      `}</style>
    </div>
  )
}

export default CoupleTherapyContainer
