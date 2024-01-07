import axios from "axios"
import Cookies from "js-cookie"
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "../types"
// import AuthService from "services/auth.service"

export const register = (body) => (dispatch) => {
  // return AuthService.register(body).then(
  //   (response) => {
  //     dispatch({
  //       type: REGISTER_SUCCESS,
  //       payload: { user: response },
  //     })
  //     // dispatch({
  //     //   type: SET_MESSAGE,
  //     //   payload: response.data.message,
  //     // });
  //     return Promise.resolve()
  //   },
  //   (error) => {
  //     const message =
  //       (error.response &&
  //         error.response.data &&
  //         error.response.data.message) ||
  //       error.message ||
  //       error.toString()
  //     dispatch({
  //       type: REGISTER_FAIL,
  //     })
  //     dispatch({
  //       type: SET_MESSAGE,
  //       payload: message,
  //     })
  //     return Promise.reject()
  //   }
  // )
}

// export const login = (locale) => (dispatch) => {
//   return axios.get(`/api/user?locale=${locale}`).then((data) => {
//     const updatedUser = data.data.user
//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: { user: updatedUser },
//     })
//   })
// }

export const slinceLogin = (user) => (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: { user },
  })
}

export const logout = () => async (dispatch) => {
  Cookies.remove("next-session")
  const res = await axios.post("/api/logout")
  dispatch({
    type: LOGOUT,
  })
}
