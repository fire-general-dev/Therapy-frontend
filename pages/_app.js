/* eslint-disable prettier/prettier */
import { appWithTranslation } from "next-i18next"
import { ToastContainer } from "react-toastify"
import Layout from "../components/layout"
import { wrapper } from "../reduxStore"
import { Provider } from 'react-redux';
import 'react-circular-progressbar/dist/styles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/index.css';


function MyApp({ Component, ...rest }) {
  const { store, props, pageProps } = wrapper.useWrappedStore(rest)
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Layout>
      </Provider>
    </>
  )
}

export default appWithTranslation(MyApp)
