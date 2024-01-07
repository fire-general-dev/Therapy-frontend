import React, { useRef } from "react"
import Carousel from "react-multi-carousel"
// import "react-multi-carousel/lib/styles.css"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import Image from "next/image"
import checkAll from "@/images/wellnessDetector/check_all@2x.png"
import QuizCard from "./QuizCard"
import { extractArrayData } from "utils/extractData"
import { isRTLLayout } from "@/utils/helpers"
import { useRouter } from "next/router"

const WellnessDetector = (props) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 25,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2.2,
      // slidesToSlide: 1, // optional, default to 1.
      // partialVisibilityGutter: 0,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 125,
    },
  }

  const carouselRef = useRef(null)
  const router = useRouter()

  // const ArrowButton = (props) => {
  //   return (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="30.002"
  //       height="30"
  //       viewBox="0 0 30.002 30"
  //       className={props.className}
  //     >
  //       <defs>
  //         <clipPath id="clip-path">
  //           <rect
  //             id="eva:arrow-back-fill_Background_Mask_"
  //             data-name="eva:arrow-back-fill (Background/Mask)"
  //             width="30.002"
  //             height="30"
  //             transform="translate(30.002 30) rotate(180)"
  //             fill="none"
  //             className={props.className}
  //           />
  //         </clipPath>
  //       </defs>
  //       <g id="eva:arrow-back-fill" clipPath="url(#clip-path)">
  //         <path
  //           id="Vector"
  //           d="M3.925-7.5l4.538,5.45a1.251,1.251,0,0,1,.284.915A1.252,1.252,0,0,1,8.3-.289a1.252,1.252,0,0,1-.915.284,1.252,1.252,0,0,1-.848-.446L.288-7.952a1.487,1.487,0,0,1-.113-.188A.158.158,0,0,0,.088-8.3,1.25,1.25,0,0,1,0-8.752,1.25,1.25,0,0,1,.088-9.2a.158.158,0,0,1,.088-.163,1.488,1.488,0,0,1,.113-.188l6.251-7.5a1.25,1.25,0,0,1,.431-.332A1.25,1.25,0,0,1,7.5-17.5a1.25,1.25,0,0,1,.8.288,1.25,1.25,0,0,1,.308.379,1.25,1.25,0,0,1,.139.468,1.25,1.25,0,0,1-.051.486,1.25,1.25,0,0,1-.233.429L3.925-10H18.752a1.25,1.25,0,0,1,.884.366A1.25,1.25,0,0,1,20-8.752a1.25,1.25,0,0,1-.366.884,1.25,1.25,0,0,1-.884.366Z"
  //           transform="translate(25.002 6.248) rotate(180)"
  //           fill="#fff"
  //           className={props.className}
  //         />
  //       </g>
  //     </svg>
  //   )
  // }

  const { data = {} } = props
  const { title, subtitle, quizzes } = data

  const quizzesList = extractArrayData(quizzes)

  return (
    <div className="wrapper">
      <span className="mini_title">{title}</span>
      <div className="information">
        <div className="l-inf">
          <div>{subtitle}</div>
        </div>
        <div className="carousel-controls">
          <div
            className={`carouselControl  ${
              isRTLLayout(router) ? "ml-vw20" : "mr-vw20"
            }`}
            onClick={() => carouselRef.current.previous()}
          >
            {isRTLLayout(router) ? (
              <BsArrowRight className="text-3xl" />
            ) : (
              <BsArrowLeft className="text-3xl" />
            )}
          </div>
          <div
            className="carouselControl"
            onClick={() => carouselRef.current.next()}
          >
            {isRTLLayout(router) ? (
              <BsArrowLeft className="text-3xl" />
            ) : (
              <BsArrowRight className="text-3xl" />
            )}
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
          // customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-setting"
          // itemClass="!w-80"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={props.deviceType}
          partialVisible={true}
          arrows={false}
          itemClass="!w-320pxm md:!w-320pxt lg:!w-320px"
          rtl={isRTLLayout(router)}
        >
          {quizzesList.map((quiz) => (
            <QuizCard
              key={`${quiz.id}-${quiz.title}`}
              item={quiz}
              className="mr-vw40 md:mr-40pxt lg:mr-vw20"
            />
          ))}
          <div className="mr-0 md:mr-60pxt lg:mr-0">
            <Image
              className={`${
                isRTLLayout(router) ? "lg:pl-vw20" : "lg:pr-vw20"
              } !w-auto !h-full`}
              onClick={() => {
                router.puth("/quizzes")
              }}
              src={checkAll}
              alt="check all Quiz"
              layout="raw"
              unoptimized={true}
              placeholder="blur"
              loading="eager"
            />
          </div>
        </Carousel>
      </div>
      <style jsx>{`
        .wrapper {
          @apply max-w-screen-xl w-full mx-auto px-4 py-20;
        }
        .mini_title {
          @apply font-avenirSlim text-16pxm md:text-20pxt lg:text-16px text-green-100 uppercase;
        }
        .information {
          @apply flex justify-between items-baseline flex-col lg:flex-row;
        }
        .l-inf {
          @apply font-avenirMedium text-20pxm md:text-28pxt lg:text-24px text-black-3232 mt-mb10 md:mt-10pxt lg:mt-vw10;
        }
        .r-inf {
          @apply font-avenirSlim text-16pxm md:text-20pxt lg:text-16px text-black-444 mt-mb40 lg:mt-0 lg:w-2/5;
        }
        .carousel-section {
          @apply flex justify-between items-center mt-mb70 md:mt-70pxt lg:mt-vw46;
        }
        .carousel-controls {
          @apply hidden lg:flex;
        }
        .cat-button {
          @apply font-avenirMedium text-16pxm md:text-20pxt lg:text-16px text-black-3232 lg:mr-vw50;
          &.active {
            @apply border-b-2 border-b-green-200;
          }
        }
        .carousel-container {
          @apply mt-mb28 md:mt-28pxt lg:mt-vw40;
        }
        .carouselControl {
          @apply h-vw60 w-vw60 rounded-full bg-btnPrimary text-white flex justify-center items-center cursor-pointer transition-colors duration-500 hover:shadow-infoButton hover:bg-white hover:text-black-0;
        }
        .all_doctors {
          @apply bg-white uppercase shadow-infoButton flex justify-center items-center rounded-full py-mb10 lg:py-vw10 font-avenirMedium text-14pxm lg:text-14px mt-mb60 lg:mt-vw60 lg:w-1/4 mx-auto;
          span {
            @apply mr-mb10 lg:mr-vw10;
          }
          svg {
            path {
              @apply fill-black-0;
            }
          }
        }
        :global(.rtl) {
        }
      `}</style>
    </div>
  )
}

export default WellnessDetector
