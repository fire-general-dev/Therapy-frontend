import GeneralInfoSection from "./GeneralInfoSection"
import IntroductionSection from "./IntroductionSection"
import OurDashboardSection from "./OurDashboardSection"
import OurFeaturesSection from "./OurFeaturesSection"
import RecommendationsSection from "./RecommendationsSection"
import ServicesSection from "./ServicesSection"
import UserJournySection from "./UserJournySection"

const AboutUsContainer = () => {
  return (
    <div className="about-us">
      <GeneralInfoSection />
      <IntroductionSection />
      <UserJournySection />
      <OurFeaturesSection />
      <OurDashboardSection />
      <ServicesSection />
      <RecommendationsSection />
      <style jsx>{`
        .about-us {
          font-family: "Poppins", sans-serif;
        }
      `}</style>
    </div>
  )
}

export default AboutUsContainer
