import axios from "axios"
import { getStrapiURL } from "utils/api"
import { ADD_CART_ITEMS, FETCH_DOCTORS_BY_PAGE } from "../types"

export const fetchCartData =
  ({ locale, page, pageSize }) =>
  (dispatch) => {
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
        fragment CarouselDoctorPart on DoctorEntity {
          id
          attributes {
            title,
            location {
              data {
                id,
                attributes {
                  code,
                  name
                }
              }
            }
            speakingLanguages {
              title
            }
            doctorImage {
              ...FileParts
            }
          }
        }
        query GetTherpayList ( $locale: I18NLocaleCode!, $page: Int!, $pageSize: Int!) {
          doctors( locale: $locale, pagination: {page: $page, pageSize:  $pageSize} ) {
            data {
              ...CarouselDoctorPart
            }
            meta {
              pagination {
                page,
                pageSize,
                pageCount,
              }
            }
          }
        }
      `,
        variables: {
          locale,
          page,
          pageSize,
        },
      }),
    }).then(
      async (result) => {
        const parsedResponse = await result.json()
        const doctorListData = parsedResponse.data.doctors?.data || []
        const paginationData = parsedResponse.data.doctors?.meta || {}
        dispatch({
          type: FETCH_DOCTORS_BY_PAGE,
          payload: {
            doctorList: doctorListData,
            pagination: paginationData?.pagination,
          },
        })
      },
      (e) => {
        console.log("error on fetching doctors ==>", e)
        return Promise.reject()
      }
    )
  }

export const addDataToCart =
  ({ bookingData }) =>
  (dispatch) => {
    dispatch({
      type: ADD_CART_ITEMS,
      payload: bookingData,
    })
    // test
  }
