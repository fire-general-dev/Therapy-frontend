import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { connect, useDispatch } from "react-redux"
import { logout } from "reduxStore/actions/authActions"

export const Logout = (props) => {
  // const dispatch = useDispatch()
  const { dispatch, store } = props
  const router = useRouter()
  console.log("props ===>", props)
  useEffect(() => {
    const logoutFunc = async () => {
      // await dispatch(logout())
      // logoutHandler()
      await store.dispatch(logout())
      router.push("/signin")
    }
    logoutFunc()
  }, [dispatch, router])

  return <div>Logout</div>
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  logoutHandler: () => logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
