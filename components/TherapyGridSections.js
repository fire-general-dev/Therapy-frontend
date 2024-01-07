import { useRouter } from "next/router"
import Hero from "@/components/sections/hero/index"
import LargeVideo from "@/components/sections/large-video"
import FeatureColumnsGroup from "@/components/sections/feature-columns-group"
import FeatureRowsGroup from "@/components/sections/feature-rows-group"
import BottomActions from "@/components/sections/bottom-actions"
import TestimonialsGroup from "@/components/sections/testimonials-group"
import RichText from "./sections/rich-text"
import Pricing from "./sections/pricing"
import LeadForm from "./sections/lead-form"
import TherapyList from "./sections/TherapyList"
import OurNetwork from "./sections/ourNetwork"
import GridSection from "@/components/elements/gridDisplaySection"
import { extractArrayData } from "utils/extractData"
import DoctorCard from "./elements/doctorCard"

const extractCategoryDoctors = (data) => {
  const maximumResult = data.maximum || null
  const categoryData = data?.category?.data?.attributes
  const refactoredCategories = categoryData?.doctors?.data
  if (maximumResult) return refactoredCategories.slice(0, maximumResult)
  return refactoredCategories
}

const extractMainCategories = (data) => {
  const maximumResult = data.maximum || null
  const CategoriesList =
    data?.main_categories?.data?.[0]?.attributes?.categories
  const refactoredCategories = extractArrayData(CategoriesList?.data)
  const doctorsList = refactoredCategories.map((cat) => cat.doctors?.data)
  const result = [].concat.apply([], doctorsList)
  if (maximumResult) return result.slice(0, maximumResult)
  return result
}

const extractedDoctors = (data) => {
  const maximumResult = data.maximum || null
  if (maximumResult) return data.doctors?.data.slice(0, maximumResult)
  return data.doctors?.data
}

// Map Strapi sections to section components
const sectionComponents = {
  ComponentSectionsTherapyGrid: extractMainCategories,
  ComponentSectionsDoctorsGrid: extractedDoctors,
  ComponentSectionsTherapyGridByCategory: extractCategoryDoctors,
}

// Display a section individually
const GridSectionComponent = ({ sectionData }) => {
  // Prepare the data requested
  const SectionData = sectionComponents[sectionData.__typename](sectionData)
  if (!SectionData) {
    return null
  }

  // Display the section
  return (
    <GridSection
      items={SectionData}
      ItemComponent={DoctorCard}
      title={sectionData.title}
      listView={true}
    />
  )
}

// Display the list of sections
const GridSections = ({ sections }) => {
  return (
    <div className="flex flex-col">
      {/* Show the actual sections */}
      {sections.map((section) => (
        <GridSectionComponent
          sectionData={section}
          key={`${section.__typename}${section.id}`}
        />
      ))}
    </div>
  )
}

export default GridSections
