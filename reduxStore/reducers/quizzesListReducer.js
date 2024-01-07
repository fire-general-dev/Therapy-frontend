import * as types from "../types"
const initialState = {
  quizzesList: [],
  pagination: { page: 0, pageSize: 10, pageCount: 0 },
  isLoading: false,
}
const quizzesListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_QUIZZES_BY_PAGE:
      return {
        ...state,
        quizzesList: [...state.quizzesList, ...payload.quizzesList],
        pagination: payload.pagination,
        isLoading: false,
      }
    case types.IS_LOADING_QUIZZES_BY_PAGE:
      return {
        ...state,
        isLoading: true,
      }
    default:
      return state
  }
}
export default quizzesListReducer
