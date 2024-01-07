import { useRouter } from "next/router"
// import Hero from "@/components/sections/hero/index"
import HeroSection from "./containers/sections/HeroSection/HeroSection"
import LargeVideo from "@/components/sections/large-video"
import FeatureColumnsGroup from "@/components/sections/feature-columns-group"
import FeatureRowsGroup from "@/components/sections/feature-rows-group"
import BottomActions from "@/components/sections/bottom-actions"
import TestimonialsGroup from "@/components/sections/testimonials-group"
import RichText from "./sections/rich-text"
import Pricing from "./sections/pricing"
import LeadForm from "./sections/lead-form"
import SpecialistsSection from "./containers/sections/SpecialistsSection"
// import TherapyList from "./sections/TherapyList"
// import OurNetwork from "./sections/ourNetwork"
import OurNetwork from "./containers/sections/ourNetwork"
import FullImage from "./sections/fullImage"
// import WhatWeOffer from "./sections/whatWeOffer"
import HowNafsiWorks from "./containers/sections/howNafsiWorks"
// import MinCarouselSection from "./sections/minCarouselSection"
// import RecentArticles from "./sections/recentArticles"
import RecentArticles from "./containers/sections/recentArticles"
import WellnessDetector from "./sections/wellnessDetector"
import MinCarouselSection from "./containers/sections/minCarouselSection"

// Map Strapi sections to section components
const sectionComponents = {
  ComponentSectionsHero: HeroSection,
  ComponentSectionsLargeVideo: LargeVideo,
  ComponentSectionsFeatureColumnsGroup: FeatureColumnsGroup,
  ComponentSectionsFeatureRowsGroup: FeatureRowsGroup,
  ComponentSectionsBottomActions: BottomActions,
  ComponentSectionsTestimonialsGroup: TestimonialsGroup,
  ComponentSectionsRichText: RichText,
  ComponentSectionsPricing: Pricing,
  ComponentSectionsLeadForm: LeadForm,
  ComponentSectionsTherapyList: SpecialistsSection,
  ComponentSectionsTherapyCarousel: OurNetwork,
  ComponentSectionsBanner: FullImage,
  ComponentSectionsOffersGroup: HowNafsiWorks,
  ComponentSectionsMiniCarousel: MinCarouselSection,
  ComponentSectionsRecentArticles: RecentArticles,
  // ComponentSectionsQuizzesList: WellnessDetector,
}

// Display a section individually
const Section = ({ sectionData, locale }) => {
  // Prepare the component
  const SectionComponent = sectionComponents[sectionData.__typename]
  if (!SectionComponent) {
    return null
  }

  // Display the section
  return <SectionComponent locale={locale} data={sectionData} />
}

const PreviewModeBanner = () => {
  const router = useRouter()
  const exitURL = `/api/exit-preview?redirect=${encodeURIComponent(
    router.asPath
  )}`

  return (
    <div className="py-4 bg-red-600 text-red-100 font-semibold uppercase tracking-wide">
      <div className="container">
        Preview mode is on.{" "}
        <a
          className="underline"
          href={`/api/exit-preview?redirect=${router.asPath}`}
        >
          Turn off
        </a>
      </div>
    </div>
  )
}

// Display the list of sections
const Sections = ({ sections, locale, preview }) => {
  return (
    <div className="flex flex-col">
      {/* Show a banner if preview mode is on */}
      {preview && <PreviewModeBanner />}
      {/* Show the actual sections */}
      {sections.map((section) => (
        <Section
          sectionData={section}
          locale={locale}
          key={`${section.__typename}${section.id}`}
        />
      ))}
    </div>
  )
}

export default Sections
