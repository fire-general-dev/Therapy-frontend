import * as types from "../types"

const initialState = {
  articlesList: [],
  pagination: { page: 0, pageSize: 10, pageCount: 0 },
  isLoading: false,
}

const articlesListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_ARTICLES_BY_PAGE:
      return {
        ...state,
        articlesList: [...state.articlesList, ...payload.articlesList],
        pagination: payload.pagination,
        isLoading: false,
      }
    case types.IS_LOADING_ARTICLES_BY_PAGE:
      return {
        ...state,
        isLoading: true,
      }
    default:
      return state
  }
}

export default articlesListReducer
