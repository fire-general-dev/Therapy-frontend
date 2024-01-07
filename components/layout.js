/* eslint-disable prettier/prettier */
import Header from "./layout/Header"
import Footer from "./layout/Footer/Footer"
import { useTranslation } from 'next-i18next';

const Layout = ({ children }) => {
  const { i18n } = useTranslation();

  return (
    <div className={`layout`}>
      <Header />
      {children}
      <Footer />
      <style jsx>{`
        .layout {
          text-align: ${i18n.language === 'ar' ? 'right' : 'left'};
        }
      `}</style>
    </div>
  )
}

export default Layout
