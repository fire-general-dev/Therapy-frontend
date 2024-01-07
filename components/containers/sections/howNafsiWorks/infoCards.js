import NextImage from "@/components/elements/image"
import Image from "next/image"
import Link from "next/link"
import React from "react"

function InfoCards(props) {
  const {
    title: mainTitle,
    lastItem,
    description: shortDesc,
    image,
    index,
    ctaButton,
    backgroundColor,
  } = props

  return (
    // <Link passHref href={ctaButton?.url || ""} legacyBehavior>
    <div>
      <div className="card-wrapper">
        <div className="image-weapper">
          <NextImage media={image} className="rounded-[1.25rem] !w-[25rem]" />
        </div>
        <div className="body-wrapper">
          <div className="body">
            <div className="step-number-container">
              <div className="step-number">{index}</div>
            </div>
            <h3 className="title">{mainTitle}</h3>
            <p className="desc">{shortDesc}</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .card-wrapper {
          @apply relative;
        }
        .body {
          @apply h-[21rem] flex flex-col items-center rounded-[1.25rem] py-8 px-5;
          border: 1px solid var(--Stroke, #eeeff0);
          border-radius: 20px;
          background: rgba(247, 255, 255, 0.8);
          backdrop-filter: blur(17px);
        }
        .body-wrapper {
          @apply absolute -bottom-32 px-2;
        }
        .image-weapper {
          @apply w-[25rem] h-[25rem] rounded-[1.25rem] overflow-hidden;
        }
        .step-number {
          @apply flex items-center justify-center w-11 h-11 text-white text-xl font-semibold capitalize bg-[#1BBEC3] rounded-full z-10;
        }
        .step-number-container {
          @apply flex items-center justify-center w-16 h-16 rounded-full mb-5;
          background: rgba(27, 190, 195, 0.3);
        }
        .title {
          @apply text-[#2E3333] text-center text-2xl font-medium capitalize mb-2 max-w-[14rem];
        }
        .desc {
          @apply text-gray-64 text-sm text-center;
        }
      `}</style>
    </div>
    // </Link>
  )
}

export default InfoCards
