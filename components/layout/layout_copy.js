import Header from "./Header"
import InsuranceSection from "../containers/sections/InsuranceSection"
import FAQSection from "./FAQ"
import Footer from "./Footer/Footer"

const Layout = ({
  children,
  global,
  pageContext,
  fullPage = false,
  showFAQ = false,
}) => {
  const { footerMiniCarousel, specailities } = global.attributes
  const { locale } = pageContext
  const isRTL = locale === "ar"
  if (typeof window !== "undefined") {
    document.getElementsByTagName("html")[0].dir = isRTL ? "rtl" : "ltr"
    document.getElementsByTagName("html")[0].className = isRTL ? "rtl" : ""
  }

  return (
    <div className={`layout`}>
      {/* Aligned to the top */}
      <div className="flex-1">
        <Header />
        <div>{children}</div>
      </div>
      {/* Aligned to the bottom */}
      {!fullPage && (
        <div>
          <InsuranceSection data={footerMiniCarousel} />
          {showFAQ ? <FAQSection /> : null}
          <Footer specailities={specailities} />
        </div>
      )}
      <style jsx>{`
        .layout {
          @apply flex flex-col justify-between min-h-screen overflow-hidden;
          font-family: "DM Sans", sans-serif;
        }
      `}</style>
    </div>
  )
}

export default Layout
