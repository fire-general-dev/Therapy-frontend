import { getStrapiURL } from "utils/api"
import {
  FETCH_CATEGORIES_BY_PAGE,
  IS_LOADING_CATEGORIES_BY_PAGE,
} from "../types"

export const fetchCategoriesList =
  ({ locale, page, pageSize }) =>
  (dispatch) => {
    // dispatch({
    //     type: IS_LOADING_CATEGORIES_BY_PAGE,
    //   })
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

        query GetCategoriesList ( $locale: I18NLocaleCode!) {
            mainCategories( locale: $locale ) {
            data {
                id
                attributes {
                  article,
                  slug,
                  isMain,
                  locale,
                  title
                  categories {
                    data {
                      id,
                      attributes {
                        alias,
                        enabled,
                        title,
                        article,
                        article_image {
                          ...FileParts
                        },
                      }
                    }
                  }
                }
              }
          }
        }
      `,
        variables: {
          locale,
        },
      }),
    }).then(
      async (result) => {
        const parsedResponse = await result.json()
        const categoriesListData =
          parsedResponse.data.mainCategories?.data || []
        const paginationData = parsedResponse.data.mainCategories?.meta || {}
        dispatch({
          type: FETCH_CATEGORIES_BY_PAGE,
          payload: {
            categoriesList: categoriesListData,
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
