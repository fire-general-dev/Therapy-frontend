import Image from "next/image"
import React from "react"

function UserJourneyCard({ image, index, title, desc }) {
  return (
    <div>
      <div className="card-wrapper">
        <div className="image-weapper">
          <Image src={image} className="rounded-[1.25rem] !w-[25rem]" />
        </div>
        <div className="body-wrapper">
          <div className="body">
            <div className="step-number-container">
              <div className="step-number">{index}</div>
            </div>
            <h3 className="title">{title}</h3>
            <p className="desc">{desc}</p>
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
          @apply absolute min-w-full -bottom-32 px-2;
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

export default UserJourneyCard
