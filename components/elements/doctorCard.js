import Image from "next/image"
import React from "react"
import locationIcon from "@/images/icon-location.svg"
import storesIcon from "@/images/stories.svg"
import { useRouter } from "next/router"
import { extractArrayData } from "utils/extractData"
import NextImage from "./image"

function DoctorCard({ item }) {
  const doctorSpeakingLanguage = item?.speakingLanguages
    ?.map((item) => item.title)
    ?.join(" | ")
  const router = useRouter()
  const location = item?.location?.data?.attributes?.name || null
  // const doctorImage = extractArrayData(doctorImage?.data);

  return (
    <>
      <div
        onClick={() => {
          if (item.slug) {
            router.push(`/cart/book-appointment?therapist=${item.slug}`)
          }
        }}
        key={item.id}
        className={`carousel-doctor ${item.slug ? "clickable" : ""}`}
      >
        <div className="graident">
          <div className="top">
            {location && (
              <div className="location glass">
                <Image layout="raw" src={locationIcon} alt={location} />
                <div>{location}</div>
              </div>
            )}
            {item.haveStores && (
              <div className="watch glass">
                <Image layout="raw" src={storesIcon} alt="stores" />
              </div>
            )}
          </div>
          <div className="doctor_name">{item.title}</div>
          <div className="languages">{doctorSpeakingLanguage}</div>
        </div>
        <NextImage
          media={item.doctorImage}
          alt={item.title}
          className="rounded-md"
          fallbackSrc={{
            url: "@/images/placeholder.jpg",
            alternativeText: "",
            width: 262,
            height: 363,
          }}
        />
        {/* <Image
          layout="raw"
          quality={100}
          className="w-full"
          src={doctorImage.url}
          alt={item.name}
        /> */}
      </div>
      <style jsx>{`
        .carousel-doctor {
          @apply relative mr-mb20 md:mr-20pxt lg:mr-vw20;
          &.clickable {
            @apply transition-all duration-300 ease-in-out cursor-pointer;
          }
          &.clickable:hover {
            @apply lg:scale-110;
            & .doctor_name:after {
              transform: scaleX(1);
              transform-origin: bottom left;
            }
          }
        }
        .graident {
          @apply rounded-md bg-gradient-to-t from-black-0 via-transparent absolute w-full h-full flex flex-col px-mb10 pt-mb10 pb-mb20 md:px-10pxt md:pt-10pxt md:pb-20pxt lg:px-vw10 lg:pt-vw10 lg:pb-vw20;
        }
        .top {
          @apply flex justify-between mb-auto;
        }
        .glass {
          background-color: rgba(255, 255, 255, 0.24);
          backdrop-filter: blur(15px);
        }
        .watch {
          @apply p-1 rounded-lg;
        }
        .location {
          @apply lg:text-14px text-14pxm md:text-18pxt rounded-lg min-w-1/2 flex justify-center items-start;
          padding: 4px;
        }
        .doctor_name {
          @apply font-avenirBlack text-18pxm md:text-22pxt lg:text-18px text-white mb-mb6 lg:mb-vw06 duration-300 ease-in-out w-fit relative;
          &:after {
            @apply lg:w-full lg:absolute;
            content: "";
            transform: scaleX(0);
            height: 0.5px;
            max-height: 0.5px;
            bottom: 0;
            left: 0;
            background-color: #fff;
            transform-origin: bottom left;
            transition: transform 0.5s ease-in-out;
          }
        }
        .languages {
          @apply font-avenirMedium text-16pxm md:text-20pxt lg:text-16px text-white;
        }

        :global(.rtl) {
          .carousel-doctor {
            @apply mr-0 md:mr-0 lg:mr-0 ml-mb20 md:ml-20pxt lg:ml-vw20;
          }
        }
      `}</style>
    </>
  )
}

export default DoctorCard
