import { wrapper } from "reduxStore"

export const withReduxStore = (handler) =>
  wrapper.getServerSideProps(async (store) => {
    const pageProps = await handler(context, store)
    return {
      ...pageProps,
    }
  })
