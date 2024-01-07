import * as types from "../types"

const initialState = {
  doctorList: [],
  pagination: { page: 0, pageSize: 24, pageCount: 0 },
  isLoading: false,
}

const doctorsListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_DOCTORS_BY_PAGE:
      return {
        ...state,
        doctorList: [...state.doctorList, ...payload.doctorList],
        pagination: payload.pagination,
        isLoading: false,
      }
    case types.IS_LOADING_DOCTORS_BY_PAGE:
      return {
        ...state,
        isLoading: true,
      }
    default:
      return state
  }
}

export default doctorsListReducer
