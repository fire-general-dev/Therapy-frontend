import Link from "next/link"
import NextImage from "../elements/image"

const SpecialityCard = ({ image, title, alias }) => {
  return (
    <Link href={`/services/${alias}`}>
      <div className="speciality-card">
        <div className="image-wrapper">
          <NextImage
            media={image}
            className="!w-full xl:!w-96 !object-cover"
            fallbackSrc={{
              url: "@/images/placeholder.jpg",
              alternativeText: "",
              width: 262,
              height: 363,
            }}
          />
        </div>
        <div className="body">
          <h6>{title}</h6>
        </div>
        <style jsx>{`
          .speciality-card {
            @apply lg:w-[32rem] xl:w-96 ease-in-out transition-all duration-500 hover:translate-x-1 hover:translate-y-1;
          }
          .image-wrapper {
            width: calc(100vw - 2rem);
            @apply h-48 md:w-96 lg:w-[32rem] xl:w-96 xl:h-52 rounded-t-3xl overflow-hidden;
          }
          .body {
            @apply p-8 items-center bg-white rounded-b-3xl;
            border: 2px solid #eeeff0;
            border-top: none;
            backdrop-filter: blur(17px);
            h6 {
              @apply text-[#2E3333] text-lg lg:text-xl font-medium capitalize text-center;
            }
          }
        `}</style>
      </div>
    </Link>
  )
}

export default SpecialityCard
