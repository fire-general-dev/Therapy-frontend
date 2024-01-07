import { extractArrayData } from "@/utils/extractData"
import { useTranslation } from "next-i18next"
import Link from "next/link"

const BookAppointmentContainer = ({ doctor }) => {
  const categories = extractArrayData(doctor?.categories?.data)
  const { t } = useTranslation()
  return (
    <div className="book-appointment-container">
      <h6 className="about-doctor">
        {t("about")} {doctor?.title}
      </h6>
      <div
        className="mb-10"
        dangerouslySetInnerHTML={{ __html: doctor?.longDescription }}
      ></div>
      <h3 className="cat-title">{t("focus_areas")}</h3>
      <ul className="categories">
        {categories?.map((category) => {
          return (
            <Link key={category.alias} href={`/services/${category.alias}`}>
              <li className="cat">{category.title}</li>
            </Link>
          )
        })}
      </ul>
      <style jsx>{`
        .book-appointment-container {
          @apply max-w-screen-xl w-full mx-auto px-4 py-20;
        }
        .about-doctor {
          @apply text-[#2E3333] text-3xl font-medium capitalize mb-5;
        }
        .cat-title {
          @apply text-[#2E3333] text-2xl font-medium mb-5 capitalize;
        }
        .categories {
          @apply grid grid-cols-2;
        }
        .cat {
          @apply text-gray-64 text-xs lg:text-sm mb-2 pl-8 transition-all ease-in duration-300 hover:text-[#1BBEC3];
          background-image: url(https://strapi-nafsi-s3-images.s3.me-central-1.amazonaws.com/list_icon_f50d278ae5.png);
          background-position: left;
          background-repeat: no-repeat;
        }
        :global(.rtl) {
          .cat {
            @apply pl-0 pr-8;
            background-position: right;
          }
        }
      `}</style>
    </div>
  )
}

export default BookAppointmentContainer
