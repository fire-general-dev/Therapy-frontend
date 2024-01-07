import { useState, useEffect } from "react"
import { useTranslation } from "next-i18next"
import { extractArrayData } from "utils/extractData"
import SpecialistsImage from "@/images/home/specialists.png"
import Image from "next/image"
import MenuIcon from "@/images/icons/home/menu-icon.svg"

const SpecialistsSection = (props) => {
  // Find the Right Therapy for your case
  const [selectedCategory, setSelectedCategory] = useState()
  const { t } = useTranslation()

  const isRTL = props.locale === "ar"

  useEffect(() => {
    setSelectedCategory(extractArrayData(props.data?.categories?.data)[0])
  }, [])

  const { data = {} } = props
  if (!data || Object.keys(data)?.length === 0) return null
  const { id, categories } = data

  const factoredCategories = extractArrayData(categories?.data)

  return (
    <div className="specialists">
      <div className="specialists-card-mobile">
        <h3 className="specialists-card-title">{t("we_specialists_in")}</h3>
        <div className="items-container">
          {factoredCategories.map((item) => {
            return (
              <div
                key={`therpayList-${item.id}-${item.title}`}
                className="specialists-card-item"
              >
                <Image src={MenuIcon} alt="menu" />
                <span>{item.title}</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="image-wrapper">
        <Image
          className="rounded-3xl lg:!w-[29rem]"
          src={SpecialistsImage}
          alt="specialists"
        />
      </div>
      <div className="wrapper">
        <span className="subtitle">{t("about_us")}</span>
        <h3 className="title">{t("specialists_section_title")}</h3>
        <p className="desc">{t("specialists_section_desc")}</p>
        <div className="specialists-card">
          <h3 className="specialists-card-title">{t("we_specialists_in")}</h3>
          <div className="items-container">
            {factoredCategories.map((item) => {
              return (
                <div
                  key={`therpayList-${item.id}-${item.title}`}
                  className="specialists-card-item"
                >
                  <Image src={MenuIcon} alt="menu" />
                  <span>{item.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .specialists {
          @apply flex flex-col-reverse lg:flex-row gap-8 lg:gap-20 max-w-screen-xl w-full px-4 mx-auto pb-10 lg:pb-36 pt-10 lg:pt-32;
          font-family: "Poppins", sans-serif;
          .wrapper {
            @apply relative !max-w-[35rem];
          }
          .subtitle {
            @apply block text-center lg:text-left text-sm lg:text-base font-medium text-[#1BBEC3] uppercase mb-1;
          }
          .title {
            @apply text-center lg:text-left text-[#2E3333] font-medium text-2xl lg:text-3xl capitalize mb-5;
          }
          .desc {
            @apply text-center lg:text-left text-gray-64 text-sm lg:text-base;
          }
          .specialists-card {
            @apply hidden lg:block w-[123%] lg:absolute right-0 -bottom-6 py-8 px-14 rounded-[1.25rem];
            border: 1px solid #eeeff0;
            background: rgba(247, 255, 255, 0.9);
            box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.07);
            backdrop-filter: blur(17px);
          }
          .specialists-card-mobile {
            @apply block lg:hidden py-8 px-9 rounded-[1.25rem];
            border: 1px solid #eeeff0;
            background: rgba(247, 255, 255, 0.9);
            box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.07);
            backdrop-filter: blur(17px);
          }
          .specialists-card-title {
            @apply text-[#2E3333] text-lg lg:text-xl font-semibold uppercase mb-4;
          }
          .items-container {
            @apply grid grid-cols-2 gap-y-2;
          }
          .specialists-card-item {
            @apply flex items-center text-gray-64 text-xs lg:text-base font-medium gap-5;
          }
        }

        .image-wrapper {
          @apply lg:w-[29rem] lg:h-[29rem] overflow-hidden;
        }

        :global(.rtl) {
          .specialists {
            .subtitle {
              @apply lg:text-right;
            }
            .title {
              @apply lg:text-right;
            }
            .desc {
              @apply lg:text-right;
            }
            .specialists-card {
              @apply right-auto left-0;
            }
          }
        }
      `}</style>
    </div>
  )
}

export default SpecialistsSection
