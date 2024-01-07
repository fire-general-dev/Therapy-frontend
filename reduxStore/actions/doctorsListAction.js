import { getStrapiURL } from "utils/api"
import { FETCH_DOCTORS_BY_PAGE, IS_LOADING_DOCTORS_BY_PAGE } from "../types"

export const fetchDoctorsList =
  ({ locale, page, pageSize, service, doctorName, major }) =>
  (dispatch) => {
    dispatch({
      type: IS_LOADING_DOCTORS_BY_PAGE,
    })
    const gqlEndpoint = getStrapiURL("/graphql")

    return fetch(gqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query GetTherpayList(
            $locale: I18NLocaleCode!
            $page: Int!
            $pageSize: Int!
            $service: String
            $doctorName: String
            $major: String
          ) {
            doctors(
              locale: $locale
              pagination: { page: $page, pageSize: $pageSize }
              filters: {
                categories: { alias: { contains: $service } }
                title: { contains: $doctorName }
                major: { eq: $major }
              }
            ) {
              data {
                ...CarouselDoctorPart
              }
              meta {
                pagination {
                  page
                  pageSize
                  pageCount
                }
              }
            }
          }
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
              title
              slug
              location {
                data {
                  id
                  attributes {
                    code
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

      `,
        variables: {
          locale,
          page,
          pageSize,
          service,
          doctorName,
          major,
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
