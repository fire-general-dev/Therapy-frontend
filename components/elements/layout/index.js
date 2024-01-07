import Footer from "./footer"
import Header from "./header/header"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <style jsx>{`
        main {
          @apply overflow-hidden;
        }
      `}</style>
    </>
  )
}

export default Layout
