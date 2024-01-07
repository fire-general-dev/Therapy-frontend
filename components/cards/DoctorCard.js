import NextImage from "@/components/elements/image"
import Image from "next/image"
import { useRouter } from "next/router"
import MenuIcon from "@/images/icons/home/menu-icon.svg"
import { extractArrayData } from "@/utils/extractData"
import { useTranslation } from "next-i18next"

const DoctorCard = ({ className, item, isSelected, onClick }) => {
  const { t } = useTranslation()

  const doctorSpeakingLanguage = item?.speakingLanguages
    ?.map((item) => item.title)
    ?.join(" | ")
  const router = useRouter()
  const location = item?.location?.data?.attributes?.name || null
  const categories = extractArrayData(item?.categories?.data)
  return (
    <div
      className={`doctor-card ${className ? className : ""} ${
        isSelected ? "selected" : ""
      }`}
      onClick={onClick}
    >
      <div className="image-wrapper">
        <NextImage
          media={item.doctorImage}
          alt={item.title}
          className="!w-44"
          fallbackSrc={{
            url: "@/images/placeholder.jpg",
            alternativeText: "",
            width: 262,
            height: 363,
          }}
        />
      </div>
      <div className="body">
        <h3 className="title">{item.title}</h3>
        <span className="specialist">{item.speciality}</span>
        {categories.length ? (
          <h6 className="specialists-in">{t("specialists_in")}</h6>
        ) : null}
        <div className="specialists">
          {categories.slice(0, 6).map((specialist) => {
            return (
              <div
                key={`${specialist.id}-${specialist.title}`}
                className="specialists-card-item"
              >
                <Image src={MenuIcon} alt="specialist" />
                <span>{specialist.title}</span>
              </div>
            )
          })}
        </div>
      </div>
      <style jsx>{`
        .doctor-card {
          @apply flex flex-col items-center lg:items-start lg:flex-row gap-5 py-7 px-5 rounded-2xl cursor-pointer ease-in transition-all duration-500 hover:translate-x-1 hover:translate-y-1;
          border: 1px solid #eeeff0;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(17px);
          &.selected {
            @apply hover:translate-x-0 hover:translate-y-0;
            border: 2px solid #1bbec3;
            box-shadow: 0px 12px 26px 0px rgba(27, 190, 195, 0.2);
          }

          .body {
            @apply max-w-xs;
          }

          .title {
            @apply text-center lg:text-left text-[#2E3333] text-xl font-bold uppercase mb-1;
          }

          .specialist {
            @apply block text-center lg:text-left text-xs text-gray-64 uppercase mb-4;
          }

          .specialists-in {
            @apply text-sm text-[#2E3333] font-semibold uppercase mb-3;
          }
        }

        .specialists {
          @apply grid grid-cols-2 gap-y-2 w-80;
        }
        .specialists-card-item {
          @apply flex items-center text-gray-64 text-xs font-medium gap-5;
        }
        .image-wrapper {
          @apply h-44 w-44 rounded-full overflow-hidden;
        }
        :global(.rtl) {
          .doctor-card {
            .title {
              @apply lg:text-right;
            }

            .specialist {
              @apply lg:text-right;
            }
          }
        }
      `}</style>
    </div>
  )
}

export default DoctorCard
