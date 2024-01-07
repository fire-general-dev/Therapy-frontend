import React, { useRef } from "react"
import NafsiLogo from "../../nafsiLogo"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import Image from "next/legacy/image"
// import dummyCarouselImage1 from "@/images/carousel-our-network/carousel-item-1@2x.png";
// import dummyCarouselImage2 from "@/images/carousel-our-network/carousel-item-2@2x.png";
// import dummyCarouselImage3 from "@/images/carousel-our-network/carousel-item-3@2x.png";
// import dummyCarouselImage4 from "@/images/carousel-our-network/carousel-item-4@2x.png";
// import dummyCarouselImage5 from "@/images/carousel-our-network/carousel-item-5@2x.png";
// import dummyCarouselImage6 from "@/images/carousel-our-network/carousel-item-6@2x.png";
// import dummyCarouselImage7 from "@/images/carousel-our-network/carousel-item-7@2x.png";
// import dummyCarouselImage8 from "@/images/carousel-our-network/carousel-item-8@2x.png";
// import dummyCarouselImageAll from "@/images/carousel-our-network/carousel-doctors-check-all@2x.png";
import DoctorCard from "../../elements/doctorCard"
import { extractArrayData } from "utils/extractData"
import { useRouter } from "next/router"
import { getIsRTL } from "utils/localize"
import Link from "next/link"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { isRTLLayout } from "@/utils/helpers"
import { useTranslation } from "next-i18next"

const OurNetwork = (props) => {
  const { data = {} } = props
  const { title, subtitle, description, doctorsList } = data
  const router = useRouter()
  const { t } = useTranslation()

  const isRTL = getIsRTL(router?.locale)

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 0,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2.2,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 125,
    },
  }

  const carouselRef = useRef(null)

  // const ArrowButton = (props) => {
  //   return (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="30.002"
  //       height="30"
  //       viewBox="0 0 30.002 30"
  //       className={`cursor-pointer ${props.className}`}
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

  const extractedDoctors = extractArrayData(doctorsList?.data)

  return (
    <div className="wrapper">
      <span className="mini_title">{subtitle}</span>
      <div className="information">
        <div className="l-inf">
          <div>{t("meet_our_network")}</div>
          <div>
            {title} <NafsiLogo inlineStyle />
          </div>
        </div>
        <div className="r-inf">{description}</div>
      </div>
      <div className="carousel-section">
        <div>
          <button className="cat-button active">All Specialists</button>
          {/* <button className="cat-button">Individual Specialists</button>
          <button className="cat-button">Couples Specialists</button>
          <button className="cat-button">Teens Specialists</button>
          <button className="cat-button">Psychiatrist</button> */}
        </div>
        <div className={`carousel-controls ${isRTL ? "rtl" : ""}`}>
          <div
            className="carouselControl mr-vw20"
            style={{ position: "relative " }}
            onClick={() => {
              carouselRef.current.previous()
            }}
          >
            <BsArrowLeft className="text-3xl" />
          </div>
          <div
            className="carouselControl"
            onClick={() => {
              carouselRef.current.next()
            }}
          >
            <BsArrowRight className="text-3xl" />
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
          {extractedDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} item={doctor} />
          ))}
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
      <Link passHref href="/therapists" legacyBehavior>
        <div className="all_doctors">
          <span>{t("check_all_the_team")}</span>
          {isRTLLayout(router) ? (
            <BsArrowLeft className="text-3xl" />
          ) : (
            <BsArrowRight className="text-3xl" />
          )}
        </div>
      </Link>
      <style jsx>{`
        .wrapper {
          @apply bg-gradient-to-t from-green-2000 to-pink-200 bg-opacity-10 py-mb60 px-mb20 md:py-60pxt lg:py-vw60 lg:px-vw360;
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
          @apply font-avenirSlim text-16pxm md:text-20pxt lg:text-16px text-black-444 mt-mb28 md:mt-28pxt lg:mt-0 lg:w-2/5;
        }
        .carousel-section {
          @apply flex justify-between items-center mt-mb40 md:mt-40pxt lg:mt-vw46;
        }
        .carousel-controls {
          @apply hidden lg:flex;
          &.rtl {
            @apply flex-row-reverse;
          }
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
          @apply bg-white uppercase shadow-infoButton flex justify-center items-center cursor-pointer rounded-full py-mb10 md:py-10pxt lg:py-vw10 font-avenirMedium text-14pxm md:text-18pxt lg:text-base mt-mb60 md:mt-60pxt lg:mt-vw60 lg:w-1/4 min-w-fit md:w-fit px-mb12 mx-auto transition-all duration-500 hover:translate-x-0.5 hover:translate-y-0.5;
          &:hover {
            @apply bg-btnPrimary text-white;
          }
          span {
            @apply mr-mb10 md:mr-10pxt lg:mr-vw10;
          }
          svg {
            path {
              @apply fill-black-0;
            }
          }
        }
        :global(.rtl) {
          .cat-button {
            @apply lg:mr-0 lg:ml-vw50;
          }
          .all_doctors {
            span {
              @apply mr-0 md:mr-0 lg:mr-0 ml-mb10 md:ml-10pxt lg:ml-vw10;
            }
          }
        }
      `}</style>
    </div>
  )
}

export default OurNetwork
