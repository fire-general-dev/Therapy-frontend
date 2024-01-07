import ContentSections from "./contentSections"
import InfoButtons from "./infoButtons"
import SearchBar from "./searchBar"

function Hero(data) {
  return (
    <div className="hero">
      <div className="background">
        <div className="background2"></div>
        <div className="background3"></div>
        <div className="background4"></div>
        <div className="background5"></div>
      </div>
      <ContentSections data={data} />
      <InfoButtons data={data} />
      <SearchBar locale={data.locale} data={data} />
      <style jsx>{`
        .hero {
          @apply flex min-h-screen min-w-full mb-40 lg:mb-0 lg:min-h-0 lg:portrait:min-h-50vh lg:portrait:h-1/2 flex-col relative;
        }
        .background {
          background-image: linear-gradient(
              to right,
              theme("colors.pink.100") 100%,
              theme("colors.blue.100")
            ),
            linear-gradient(
              315deg,
              theme("colors.transparent"),
              theme("colors.pink.600")
            );
          @media (min-width: 1024px) {
            background-image: linear-gradient(
                to right,
                theme("colors.pink.100"),
                theme("colors.blue.100")
              ),
              linear-gradient(
                315deg,
                theme("colors.transparent"),
                theme("colors.pink.600")
              );
          }
          @apply h-full min-h-screen min-w-full lg:min-h-0 lg:portrait:h-full  absolute -z-10 left-0;
        }
        .background2 {
          @apply absolute h-full w-full left-0;
          background-image: linear-gradient(
            205deg,
            rgba(31, 37, 46, 0) 60%,
            rgba(31, 37, 46, 0) 0%,
            rgba(246, 227, 225, 1) 100%,
            #f6e3e1
          ) !important;
           {
            /* background-image: linear-gradient(
            194deg,
            rgba(31, 37, 46, 0),
            rgba(31, 37, 46, 0) 50%,
            rgba(246, 227, 225, 0.56) 70%,
            rgba(246, 227, 225, 0.85) 90%,
            rgba(246, 227, 225, 1) 90%,
            #f6e3e1
          ) !important; */
          }
        }
         {
          /* #F9F9ED */
        }
        .background3 {
          @apply absolute h-full w-full left-0;
          background-image: radial-gradient(
            ellipse at top,
            rgba(249, 249, 237, 0.7) 19%,
            rgba(249, 249, 237, 0.1) 56%
          ) !important;
           {
            /* background-image: radial-gradient(
            ellipse at top,
            rgba(249, 249, 237, 0.6) 20%,
            rgba(31, 37, 46, 0) 30%,
            rgba(31, 37, 46, 0) 90%
          ) !important; */
          }
        }
        .background4 {
          @apply absolute h-full w-full left-0;
          background-image: linear-gradient(
            30deg,
            rgba(31, 37, 46, 0),
            rgba(31, 37, 46, 0) 50%,
            rgba(232, 246, 245, 0.56) 70%,
            rgba(232, 246, 245, 0.76) 80%,
            rgba(232, 246, 245, 0.9) 90%,
            #e8f6f5
          ) !important;
        }
        .background5 {
          @apply absolute h-full w-1/2 left-1/2 opacity-100 blur-xl;
          background: transparent
            radial-gradient(
              closest-side at 50% 50%,
              #f2c4bd 0%,
              #ffffffac 55%,
              #ffffff00 100%
            )
            0% 0% no-repeat padding-box;
        }
        .content {
          @apply w-full h-full px-vw360 z-10;
        }
      `}</style>
    </div>
  )
}

export default Hero
