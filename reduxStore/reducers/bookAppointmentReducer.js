import * as types from "../types"

const initialState = {
  isEmpty: true,
  bookingData: null,
}

const bookAppointmentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_CART_ITEMS:
      return {
        ...state,
        isEmpty: false,
        bookingData: { ...payload },
      }
    default:
      return state
  }
}

export default bookAppointmentReducer
