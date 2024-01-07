// import { withSession } from "middlewares/session"
// import { wrapper } from "reduxStore"
// import { slinceLogin } from "reduxStore/actions/authActions"

// export const withGetSSRProps = (handler) =>
//   wrapper.getServerSideProps((store) =>
//     withSession(async (context) => {
//       const pageProps = await handler(context, store)
//       const { req } = context
//       const user = req.session.user || null
//       if (pageProps.props) pageProps.props.user = user
//       const state = store.getState()
//       if (user && !state.auth?.user) {
//         await store.dispatch(slinceLogin(user))
//       }
//       return {
//         ...pageProps,
//       }
//     })
//   )
