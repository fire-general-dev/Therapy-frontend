import { withSession } from "middlewares/session"
import { toast } from "react-toastify"
import { wrapper } from "reduxStore"
import { slinceLogin } from "reduxStore/actions/authActions"
import { isDoctorUser } from "./helpers"

// routes that users cannot access when they are not logged in
export const withUserProtected = (handler) =>
  wrapper.getServerSideProps((store) =>
    withSession(async (context) => {
      if (!context.req.session.user) {
        return {
          redirect: {
            permanent: false,
            destination: `/signin?callbackUrl=${context.resolvedUrl}`,
          },
        }
      }
      const pageProps = await handler(context)
      const { req } = context
      const user = req.session.user || null
      if (pageProps.props) pageProps.props.user = user
      const state = store.getState()
      if (user && !state.auth?.user) {
        await store.dispatch(slinceLogin(user))
      }
      return {
        ...pageProps,
      }
    })
  )

// Prevent the users from accessing these pages when they are logged in
export const withAuthProtected = (handler) =>
  wrapper.getServerSideProps((store) =>
    withSession(async (context) => {
      if (context.req.session.user) {
        return {
          redirect: {
            permanent: false,
            destination: `/`,
          },
        }
      }
      const pageProps = await handler(context)
      const { req } = context
      const user = req.session.user || null
      if (pageProps.props) pageProps.props.user = user
      const state = store.getState()
      if (user && !state.auth?.user) {
        await store.dispatch(slinceLogin(user))
      }
      return {
        ...pageProps,
      }
    })
  )

// Prevent the users from accessing doctor pages
export const withDoctorProtected = (handler) =>
  wrapper.getServerSideProps((store) =>
    withSession(async (context) => {
      if (!context.req.session.user) {
        return {
          redirect: {
            permanent: false,
            destination: `/signin?callbackUrl=${context.resolvedUrl}`,
          },
        }
      }
      if (context.req.session.user && !isDoctorUser(context.req.session.user)) {
        return {
          redirect: {
            permanent: false,
            destination: `/dashboard`,
          },
        }
      }
      const pageProps = await handler(context)
      const { req } = context
      const user = req.session.user || null
      if (pageProps.props) pageProps.props.user = user
      const state = store.getState()
      if (user && !state.auth?.user) {
        await store.dispatch(slinceLogin(user))
      }
      return {
        ...pageProps,
      }
    })
  )

// Prevent the doctors from accessing patients pages
export const withPatientProtected = (handler) =>
  wrapper.getServerSideProps((store) =>
    withSession(async (context) => {
      if (!context.req.session.user) {
        return {
          redirect: {
            permanent: false,
            destination: `/signin?callbackUrl=${context.resolvedUrl}`,
          },
        }
      }
      if (context.req.session.user && isDoctorUser(context.req.session.user)) {
        return {
          redirect: {
            permanent: false,
            destination: `/dashboard`,
          },
        }
      }
      const pageProps = await handler(context)
      const { req } = context
      const user = req.session.user || null
      if (pageProps.props) pageProps.props.user = user
      const state = store.getState()
      if (user && !state.auth?.user) {
        await store.dispatch(slinceLogin(user))
      }
      return {
        ...pageProps,
      }
    })
  )
