import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"

const CountingCard = ({ title, icon, number, className }) => {
  const router = useRouter()

  return (
    <>
      <div className={`counting-card ${className}`}>
        <h6 className="title">{title}</h6>
        <div className="row">
          <Image
            layout="raw"
            src={icon}
            alt="appointment"
            className="w-31pxm md:w-40pxt"
          />
          <h3 className="number">{number}</h3>
          <div className="w-20pxm"></div>
        </div>
      </div>
      <style jsx>{`
        .counting-card {
          @apply w-full p-mb12 md:p-16pxt rounded-lg;
          .title {
            @apply font-avenirMedium text-14pxm md:text-20pxt text-white text-center mb-mb20 md:mb-24pxt;
          }
          .row {
            @apply flex justify-between;
          }
          .number {
            @apply font-avenirBlack text-34pxm md:text-40pxt text-white;
          }
        }
      `}</style>
    </>
  )
}

export default CountingCard
