import * as types from "../types"

const initialState = {
  categoriesList: [],
  pagination: { page: 0, pageSize: 10, pageCount: 0 },
  isLoading: false,
}

const categoriesListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_CATEGORIES_BY_PAGE:
      return {
        ...state,
        categoriesList: [...state.categoriesList, ...payload.categoriesList],
        pagination: payload.pagination,
        isLoading: false,
      }
    case types.IS_LOADING_CATEGORIES_BY_PAGE:
      return {
        ...state,
        isLoading: true,
      }
    default:
      return state
  }
}

export default categoriesListReducer
