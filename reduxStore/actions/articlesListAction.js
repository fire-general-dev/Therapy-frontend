import { getStrapiURL } from "utils/api"
import { FETCH_ARTICLES_BY_PAGE, IS_LOADING_ARTICLES_BY_PAGE } from "../types"

export const fetchArticlesList =
  ({ locale, page, pageSize }) =>
  (dispatch) => {
    dispatch({
      type: IS_LOADING_ARTICLES_BY_PAGE,
    })
    const gqlEndpoint = getStrapiURL("/graphql")

    return fetch(gqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query getArticles ($locale: I18NLocaleCode!, $page: Int!, $pageSize: Int!) {
            articles( locale: $locale, pagination: {page: $page, pageSize: $pageSize} ) {
              data {
                id,
                attributes {
                  title,
                  articleImage {
                    data {
                      id,
                      attributes {
                        alternativeText,
                        width,
                        height,
                        mime,
                        url,
                        formats
                      }
                    }
                  },
                  slug
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
        const articlesListData = parsedResponse.data.articles?.data || []
        const paginationData = parsedResponse.data.articles?.meta || {}
        dispatch({
          type: FETCH_ARTICLES_BY_PAGE,
          payload: {
            articlesList: articlesListData,
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
