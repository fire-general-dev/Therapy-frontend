import { getStrapiURL } from "utils/api"
import { FETCH_QUIZZES_BY_PAGE, IS_LOADING_QUIZZES_BY_PAGE } from "../types"
export const fetchQuizzesList =
  ({ locale, page, pageSize }) =>
  (dispatch) => {
    dispatch({
      type: IS_LOADING_QUIZZES_BY_PAGE,
    })
    const gqlEndpoint = getStrapiURL("/graphql")
    return fetch(gqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          fragment FileParts on UploadFileEntityResponse {
            data {
              id
              attributes {
                alternativeText
                width
                height
                mime
                url
                formats
              }
            }
          }
          query getQuizzes ($locale: I18NLocaleCode!, $page: Int!, $pageSize: Int!) {
            quizzes( locale: $locale, pagination: {page: $page, pageSize: $pageSize} ) {
                data {
                    id,
                    attributes {
                        name
                        slug
                        time
                        questions {
                        id
                        }
                        
                        carouselBackground {
                          ...FileParts
                        }
                        image {
                        data {
                            id
                            attributes {
                            alternativeText
                            width
                            height
                            mime
                            url
                            formats
                            }
                        }
                        }
                    }
                },
              meta {
                pagination {
                  total,
                  page,
                  pageSize,
                  pageCount
                }
              }
            }
        }`,
        variables: {
          locale,
          page,
          pageSize,
        },
      }),
    }).then(
      async (result) => {
        const parsedResponse = await result.json()
        const quizzesListData = parsedResponse.data.quizzes?.data || []
        const paginationData = parsedResponse.data.quizzes?.meta || {}
        dispatch({
          type: FETCH_QUIZZES_BY_PAGE,
          payload: {
            quizzesList: quizzesListData,
            pagination: paginationData?.pagination || {},
          },
        })
      },
      (e) => {
        console.log("error on fetching doctors ==>", e)
        return Promise.reject()
      }
    )
  }
