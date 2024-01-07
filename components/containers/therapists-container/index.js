import ServiceBtn from "@/components/buttons/ServiceBtn"
import DoctorCard from "@/components/cards/DoctorCard"
import { getServiceDoctorList } from "@/utils/api"
import { extractArrayData, extractSingleData } from "@/utils/extractData"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import "react-multi-carousel/lib/styles.css"

const TherapistsContainer = ({ categoriesList, deviceType }) => {
  const factoredCategories = extractArrayData(categoriesList)
  const router = useRouter()
  const { t } = useTranslation()
  const [selectedCat, setSelectedCat] = useState("all")
  const [doctorsList, setDoctorsList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getDoctorData = async (service) => {
    setIsLoading(true)
    const doctorData = await getServiceDoctorList({
      locale: router.locale || "en",
      service: service,
    })
    setDoctorsList(extractArrayData(doctorData))
    setIsLoading(false)
  }

  useEffect(() => {
    setSelectedCat("all")
    getDoctorData("")
  }, [categoriesList])
  return (
    <div className="therapists-container">
      <div className="bg-wrapper">
        <div className="container-wrapper">
          <div className="header">
            <span className="subtitle">{t("available_doctors")}</span>
            <h3 className="title">{t("try_match_right_doctor")}</h3>
          </div>
          <span className="filter-by">{t("filter_by")}</span>
          <div className="cats-wrapper">
            <ServiceBtn
              key={`cat-all`}
              text={t("all")}
              isActive={selectedCat == "all"}
              onClick={() => {
                setSelectedCat("all")
                getDoctorData("")
              }}
            />
            {factoredCategories.map((category) => {
              return category?.categories?.data?.map((subcategory) => {
                const extractedSubCategorey = extractSingleData(subcategory)
                return (
                  <ServiceBtn
                    key={`cat-${extractedSubCategorey.id}-${extractedSubCategorey.title}`}
                    text={extractedSubCategorey?.title}
                    isActive={selectedCat == extractedSubCategorey?.id}
                    onClick={() => {
                      setSelectedCat(extractedSubCategorey?.id)
                      getDoctorData(extractedSubCategorey?.alias)
                    }}
                  />
                )
              })
            })}
          </div>

          <div className="doctors-list">
            {doctorsList.map((doctor) => {
              return (
                <DoctorCard
                  key={`${doctor.id}-${doctor.slug}`}
                  item={doctor}
                  onClick={() => {
                    router.push(
                      `/cart/book-appointment?therapist=${doctor.slug}`
                    )
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        .therapists-container {
          font-family: "Poppins", sans-serif;
        }

        .bg-wrapper {
          background: white;
        }

        .container-wrapper {
          @apply max-w-screen-xl w-full mx-auto px-4 py-10 lg:py-20;
        }
        .header {
          @apply max-w-sm mx-auto mb-5 lg:mb-10;
        }
        .subtitle {
          @apply block text-[#1BBEC3] text-sm lg:text-base font-medium mb-1 capitalize text-center;
        }
        .title {
          @apply text-center text-[#2E3333] text-2xl lg:text-3xl font-medium;
        }
        .filter-by {
          @apply block text-center lg:text-left text-[#2E3333] text-lg font-medium mb-3;
        }
        .cats-wrapper {
          @apply flex justify-center lg:justify-start gap-5 flex-wrap mb-7 lg:mb-14;
        }
        .doctors-list {
          @apply grid grid-cols-1 lg:grid-cols-2 gap-7;
        }
        :global(.rtl) {
          .filter-by {
            @apply lg:text-right;
          }
        }
      `}</style>
    </div>
  )
}

export default TherapistsContainer
