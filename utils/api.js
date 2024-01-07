import qs from "qs"

import gql from "graphql-tag"
import { ApolloClient } from "apollo-client"
import { createUploadLink } from "apollo-upload-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { rest } from "lodash"
import axios from "axios"

export function getStrapiURL(path) {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {RequestInit} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  }

  // Build request URL
  const queryString = qs.stringify(urlParamsObject)
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions)

  // Handle response
  if (!response.ok) {
    console.error(response.statusText)
    throw new Error(`An error occured please try again`)
  }
  const data = await response.json()
  return data
}

/**
 *
 * @param {Object} options
 * @param {string} options.slug The page's slug
 * @param {string} options.locale The current locale specified in router.locale
 * @param {boolean} options.preview router isPreview value
 */
export async function getPageData({ slug, locale, preview }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql")
  const pagesRes = await fetch(gqlEndpoint, {
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
        query GetPages(
          $slug: String!
          $publicationState: PublicationState!
          $locale: I18NLocaleCode!
        ) {        
          pages(
            filters: { slug: { eq: $slug } }
            publicationState: $publicationState
            locale: $locale
          ) {
            data {
              id
              attributes {
                locale
                localizations {
                  data {
                    id
                    attributes {
                      locale
                    }
                  }
                }
                slug
                metadata {
                  metaTitle
                  metaDescription
                  shareImage {
                    ...FileParts
                  }
                  twitterCardType
                  twitterUsername
                }
                contentSections {
                  __typename
                  ... on ComponentSectionsBottomActions {
                    id
                    title
                    buttons {
                      id
                      newTab
                      text
                      type
                      url
                    }
                  }
                  ... on ComponentSectionsHero {
                    id
                    buttons {
                      id
                      newTab
                      text
                      type
                      url
                    }
                    title
                    description
                    label
                    smallTextWithLink
                    picture {
                      ...FileParts
                    }
                    icons {
                      title
                      image {
                        ...FileParts
                      }
                    }
                  }
                  ... on ComponentSectionsFeatureColumnsGroup {
                    id
                    features {
                      id
                      description
                      icon {
                        ...FileParts
                      }
                      title
                    }
                  }
                  ... on ComponentSectionsFeatureRowsGroup {
                    id
                    features {
                      id
                      description
                      link {
                        id
                        newTab
                        text
                        url
                      }
                      media {
                        ...FileParts
                      }
                      title
                    }
                  }
                  ... on ComponentSectionsTestimonialsGroup {
                    id
                    description
                    link {
                      id
                      newTab
                      text
                      url
                    }
                    logos {
                      id
                      title
                      logo {
                        ...FileParts
                      }
                    }
                    testimonials {
                      id
                      logo {
                        ...FileParts
                      }
                      picture {
                        ...FileParts
                      }
                      text
                      authorName
                      authorTitle
                      link
                    }
                    title
                  }
                  ... on ComponentSectionsLargeVideo {
                    id
                    description
                    title
                    poster {
                      ...FileParts
                    }
                    video {
                      ...FileParts
                    }
                  }
                  ... on ComponentSectionsRichText {
                    id
                    content
                  }
                  ... on ComponentSectionsPricing {
                    id
                    title
                    plans {
                      description
                      features {
                        id
                        name
                      }
                      id
                      isRecommended
                      name
                      price
                      pricePeriod
                    }
                  }
                  ... on ComponentSectionsLeadForm {
                    id
                    emailPlaceholder
                    location
                    submitButton {
                      id
                      text
                      type
                    }
                    title
                  }
                  ... on ComponentSectionsTherapyList {
                    id,
                    title,
                    categories {
                      data {
                        id,
                        attributes {
                          alias,
                          title,
                          article,
                          shortDescription,
                          localizations {
                            data {
                              id
                              attributes {
                                locale
                              }
                            }
                          },
                          article_image {
                            ...FileParts
                          }
                        }
                      }
                    },
                    main_categories {
                      data {
                        id,
                        attributes {
                          slug,
                          title,
                          article,
                          isMain,
                          localizations {
                            data {
                              id
                              attributes {
                                locale
                              }
                            }
                          },
                          article_image {
                            ...FileParts
                          }
                          categories {
                            data {
                              attributes {
                                alias,
                                enabled,
                                title,
                                article,
                                article_image {
                                  ...FileParts
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  ... on ComponentSectionsTherapyCarousel {
                    id,
                    title,
                    subtitle,
                    description,
                    doctorsList {
                      data {
                        id,
                        attributes {
                          title,
                          slug,
                          speciality,
                          categories {
                            data {
                              id
                              attributes {
                                title,
                                alias,
                              }
                            }
                          }
                          location {
                            data {
                              id,
                              attributes {
                                code,
                                name
                              }
                            }
                          }
                          doctorImage {
                            ...FileParts
                          }
                          speakingLanguages {
                            title,
                          }
                        }
                      }
                    }
                  }
                  ... on ComponentSectionsBanner {
                    id
                    title
                    ctaButton {
                      text
                      type
                      newTab
                      url
                    }
                    backgroundImageDesktop {
                      ...FileParts
                    }
                    backgroundImageMobile {
                      ...FileParts
                    }
                    smallLogo {
                      ...FileParts
                    }
                  }
                  ... on ComponentSectionsOffersGroup {
                    title
                    subTitle
                    offerCards {
                      id
                      title
                      description
                      backgroundColor
                      image {
                        ...FileParts
                      }
                      ctaButton {
                        text
                        type
                        newTab
                        url
                      }
                    }
                  }
                  ... on ComponentSectionsMiniCarousel {
                    title
                    color
                    id
                    images {
                      title
                      image {
                      ...FileParts 
                      }
                    }
                  }
                  ... on ComponentSectionsRecentArticles {
                    title
                    subtitle
                  }
                  ... on ComponentSectionsQuizzesList {
                    id
                    title
                    subtitle
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        slug,
        publicationState: preview ? "PREVIEW" : "LIVE",
        locale,
      },
    }),
  })
  const pagesData = await pagesRes.json()
  // Make sure we found something, otherwise return null
  if (pagesData.data?.pages == null || pagesData.data.pages.length === 0) {
    return null
  }
  // Return the first item since there should only be one result per slug
  return pagesData.data.pages.data[0]
}

export async function getDoctorData(slug, locale) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql")
  const doctorRes = await fetch(gqlEndpoint, {
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
        query GetDoctors (
            $slug: String!,
            $locale: I18NLocaleCode!
          ) {        
            doctors(
              filters: { slug: { eq: $slug } }
              locale: $locale
            ) {
              data {
                id
                attributes {
                  shortDescription
                  longDescription
                  videoURL
                  doctorImage {
                    ...FileParts
                  }
                  personal_image {
                    ...FileParts
                  }
                  locale
                  localizations {
                    data {
                      id
                      attributes {
                        locale
                      }
                    }
                  }
                  title
                  speakingLanguages {
                    title
                  }
                  doctorExcperinces {
                    id,
                    position,
                    startDate,
                    endDate,
                    place,
                  }
                  totalYearOfExp
                  slug
                  speciality
                  metadata {
                    metaTitle
                    metaDescription
                    shareImage {
                      ...FileParts
                    }
                    twitterCardType
                    twitterUsername
                  }
                  categories {
                    data {
                      id
                      attributes {
                        title,
                        alias,
                        shortDescription,
                      }
                    }
                  }
                  location {
                    data {
                      attributes {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
    `,
      variables: {
        slug,
        locale,
      },
    }),
  })

  const doctorData = await doctorRes.json()
  // Make sure we found something, otherwise return null
  if (
    doctorData.data?.doctors == null ||
    !doctorData.data.doctors?.data ||
    doctorData.data.doctors?.data?.length === 0
  ) {
    return null
  }

  // Return the first item since there should only be one result per slug
  return doctorData.data.doctors.data[0]
}

/**
 *
 * @param {Object} options
 * @param {string} options.slug The page's slug
 * @param {string} options.locale The current locale specified in router.locale
 */
export async function getCategoryArticleData({ slug, locale }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql")
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetCategoryArticle(
          $slug: String!,
          $locale: I18NLocaleCode!
        ) {
          categories(
            filters: { alias: { eq: $slug }},
            locale: $locale
          ) {
            data {
              id,
              attributes {
                alias,
                title
                article,
                article_image {
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
                locale
                localizations {
                  data {
                    id
                    attributes {
                      locale
                    }
                  }
                }
                metadata {
                  metaTitle
                  metaDescription
                    shareImage {
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
                  twitterCardType
                  twitterUsername
                }
              }
            }
          }
        }
      `,
      variables: {
        slug,
        locale,
      },
    }),
  })
  const pagesData = await pagesRes.json()

  // Return the first item since there should only be one result per slug
  return pagesData.data.categories.data[0]
}

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData(locale) {
  const gqlEndpoint = getStrapiURL("/graphql")
  console.log(gqlEndpoint)
  const globalRes = await fetch(gqlEndpoint, {
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
        query GetGlobal($locale: I18NLocaleCode!) {
          global(locale: $locale) {
            data {
              id
              attributes {
                favicon {
                  ...FileParts
                }
                metadata {
                  metaTitle
                  metaDescription
                  shareImage {
                    ...FileParts
                  }
                  twitterCardType
                  twitterUsername
                }
                metaTitleSuffix
                notificationBanner {
                  type
                  text
                }
                navbar {
                  logo {
                    ...FileParts
                  }
                  links {
                    id
                    url
                    newTab
                    text
                  }
                  button {
                    id
                    url
                    newTab
                    text
                    type
                  }
                }
                specailities {
                  data {
                      id
                      attributes {
                          alias
                          title
                      }
                  }
                }
                footer {
                  logo {
                    ...FileParts
                  }
                  smallText
                  columns {
                    id
                    title
                    links {
                      id
                      url
                      newTab
                      text
                    }
                  }
                }
                footerMiniCarousel {
                  title
                  color
                  id
                  images {
                    title
                    image {
                      ...FileParts
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
  })

  const global = await globalRes.json()
  return global.data.global
}

/**
 *
 * @param {String} local The current locale specified in router.locale
 */
export async function getMainCategoryDoctors(locale) {
  const gqlEndpoint = getStrapiURL("/graphql")
  const mainCategoryDoctorsRes = await fetch(gqlEndpoint, {
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
        query GetMainCategoriesDoctors (
          # $slug: String!,
          $locale: I18NLocaleCode!
        ) {        
          mainCategories(
            filters: { enabled: { eq: true} }
            locale: $locale
          ) {
            data {
              id
              attributes {
                article,
                enabled,
                locale,
                localizations {
                  data {
                    id
                    attributes {
                      locale
                    }
                  }
                }
                title
                categories {
                  data {
                    id,
                    attributes {
                      doctors {
                        data {
                          id,
                          attributes {
                            title,
                            speakingLanguages {
                              title
                            }
                            slug
                            doctorImage {
                              ...FileParts
                            },
                            location {
                              data {
                                attributes {
                                  name
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }`,
      variables: {
        locale,
      },
    }),
  })
  const result = await mainCategoryDoctorsRes.json()
  return result.data.mainCategories?.data || []
}

export async function getTherapiestPageData(locale) {
  const gqlEndpoint = getStrapiURL("/graphql")
  const sortedDoctorsRes = await fetch(gqlEndpoint, {
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
            slug,
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
        
        fragment DoctorsDetailsPart on DoctorRelationResponseCollection {
          data {
            id
            ...CarouselDoctorPart
          }
        }
        
        fragment SingleCategoryPart on CategoryEntity {
          id
          attributes {
            alias
            title
            doctors {
              data {
                ...CarouselDoctorPart
              }
            }
          }
        }
        fragment CategoriesParts on CategoryRelationResponseCollection {
          data {
          ...SingleCategoryPart
          }
        }
        fragment CategoryParts on CategoryEntityResponse {
          data {
          ...SingleCategoryPart
          }
        }
        query GetTherpayList ( $locale: I18NLocaleCode!) {        
          therapistPage( locale: $locale ) {
            data {
              attributes {
                locale,
                localizations {
                  data {
                    id
                    attributes {
                      locale
                    }
                  }
                }
                title
                allDoctorsTitle
                metadata {
                  metaTitle
                  metaDescription
                  shareImage {
                    ...FileParts
                  }
                  twitterCardType
                  twitterUsername
                }
                gridList {
                  __typename
                  ... on ComponentSectionsTherapyGrid {
                    id,
                    title
                    maximum
                    main_categories {
                      data {
                        id
                        attributes {
                          categories {
                          ...CategoriesParts
                          }
                        }
                      }
                    }
                  }
                  ... on ComponentSectionsTherapyGridByCategory {
                    id
                    title
                    maximum
                    category {
                      ...CategoryParts
                    }
                  }
                  ... on ComponentSectionsDoctorsGrid {
                    id
                    title
                    maximum
                    doctors {
                      ...DoctorsDetailsPart
                    }
                  }
                }
              }
            }
          }
        }`,
      variables: {
        locale,
      },
    }),
  })
  const result = await sortedDoctorsRes.json()
  return result.data.therapistPage?.data || []
}

export async function getAllDoctorsPaginated(locale, page, pageSize) {
  const gqlEndpoint = getStrapiURL("/graphql")
  const sortedDoctorsRes = await fetch(gqlEndpoint, {
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
          }
        }
      `,
      variables: {
        locale,
        page,
        pageSize,
      },
    }),
  })
  const result = await sortedDoctorsRes.json()
  return result.data.doctors?.data || []
}

export const getRecentArticles = async ({ locale }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const articlesData = await fetch(gqlEndpoint, {
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
        query getArticles ($locale: I18NLocaleCode!) {
          articles(locale: $locale) {
            data {
              id
              attributes {
                title
                publishedAt
                articleImage {
                  ...FileParts
                }
                slug
                metadata {
                  metaTitle
                  metaDescription
                  shareImage {
                    ...FileParts
                  }
                  twitterCardType
                  twitterUsername
                }
                body
              }
            }
          }
      }`,
      variables: {
        locale,
      },
    }),
  })
  const result = await articlesData.json()
  return result.data.articles?.data || []
}

export const getArticleData = async ({ slug, locale }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const articleData = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetArticle(
          $slug: String!,
          $locale: I18NLocaleCode!
        ) {
          articles(
            filters: { slug: { eq: $slug }},
            locale: $locale
          ) {
            data {
              id,
              attributes {
                title
                slug
                body,
                articleImage {
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
                locale
                localizations {
                  data {
                    id
                    attributes {
                      locale
                    }
                  }
                }
                metadata {
                  metaTitle
                  metaDescription
                    shareImage {
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
                  twitterCardType
                  twitterUsername
                }
              }
            }
          }
        }
      `,
      variables: {
        slug,
        locale,
      },
    }),
  })
  const result = await articleData.json()
  return result.data.articles?.data || []
}

export const getQuizeData = async ({ slug, locale }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const quizeData = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetQuize(
          $slug: String!,
          $locale: I18NLocaleCode!
        ) {
          quizzes(
            filters: { slug: { eq: $slug }},
            locale: $locale
          ) {
            data {
              id,
              attributes {
                name
                slug
                description
                notes
                time
                article
                questions {
                  id
                  ques
                  answer {
                    id
                    ans
                    isCorrect
                  }
                }
                category {
                  data {
                    id,
                    attributes {
                      alias
                    }
                  }
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
                locale
                localizations {
                  data {
                    id
                    attributes {
                      locale
                    }
                  }
                }
                metadata {
                  metaTitle
                  metaDescription
                    shareImage {
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
                  twitterCardType
                  twitterUsername
                }
                showCorrectAnswer
              }
            }
          }
        }
      `,
      variables: {
        slug,
        locale,
      },
    }),
  })
  const result = await quizeData.json()
  return result.data.quizzes?.data || []
}

export const getQuizzes = async ({ locale }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const quizzesData = await fetch(gqlEndpoint, {
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
        query getQuizes ($locale: I18NLocaleCode!) {
          quizzes(locale: $locale) {
            data {
              id
              attributes {
                time
                slug
                name
                image {
                  ...FileParts
                }
                carouselBackground {
                  ...FileParts
                }
                questions {
                  id
                }
              }
            }
          }
        }`,
      variables: {
        locale,
      },
    }),
  })
  const result = await quizzesData.json()
  return result.data.quizzes?.data || []
}

export const getDoctorSettings = async ({ slug }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const doctorSettings = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query getDoctorSetting($slug: String!) {
          doctorSettings(filters: { doctor: { slug: { eq: $slug } } }, sort: ["createdAt:desc"]) {
            data {
              id
              attributes {
                sessionPrice
                session_duration
                availableHourTo
                availableHourFrom
                weekDays {
                  id
                  Sunday {
                    enabled
                    startTime
                    endTime
                  }
                  Monday {
                    enabled
                    startTime
                    endTime
                  }
                  Tuesday {
                    enabled
                    startTime
                    endTime
                  }
                  Wednesday {
                    enabled
                    startTime
                    endTime
                  }
                  Thursday {
                    enabled
                    startTime
                    endTime
                  }
                  Friday {
                    enabled
                    startTime
                    endTime
                  }
                  Saturday {
                    enabled
                    startTime
                    endTime
                  }
                }
              }
            }
          }
        }      
      `,
      variables: {
        slug,
      },
    }),
  })
  const result = await doctorSettings.json()
  return result.data.doctorSettings?.data || []
}

export const getDoctorSettingsByEmail = async ({ email }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const doctorSettings = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query getDoctorSettingByEmail ($email: String!) {
          doctorSettings(filters: { doctor: {user: { email: {eq: $email} }}}, sort: ["createdAt:desc"]) {
            data {
              id
              attributes {
                sessionPrice
                session_duration
                availableHourTo
                availableHourFrom
                weekDays {
                  id
                  Sunday {
                    enabled
                    startTime
                    endTime
                  }
                  Monday {
                    enabled
                    startTime
                    endTime
                  }
                  Tuesday {
                    enabled
                    startTime
                    endTime
                  }
                  Wednesday {
                    enabled
                    startTime
                    endTime
                  }
                  Thursday {
                    enabled
                    startTime
                    endTime
                  }
                  Friday {
                    enabled
                    startTime
                    endTime
                  }
                  Saturday {
                    enabled
                    startTime
                    endTime
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        email,
      },
    }),
  })
  const result = await doctorSettings.json()
  return result.data.doctorSettings?.data || []
}

export const getUserCarts = async (user) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const userCart = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.strapiToken}`,
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
        query getCartByUser ($user: ID!) {
          carts(filters: { user: {id: { eq: $user}}}) {
            data {
              id
              attributes {
                appointment_date
                doctor_appointment {
                  data {
                    id
                    attributes {
                      appointment_date
                      appointment_end_time
                      price
                      appointment_duration
                    }
                  }
                }
                completed_payment
                sessionCount
                price
                appointment_duration
                categories {
                  data {
                    id
                    attributes {
                      alias
                      title
                    }
                  }
                }
                doctor {
                  data {
                    id
                    attributes {
                      doctorImage {
                        ...FileParts
                      }
                      personal_image {
                        ...FileParts
                      }
                      title
                      speakingLanguages {
                        title
                      }
                      speciality
                      company_name
                      categories {
                        data {
                          id
                          attributes {
                            title,
                            alias,
                          }
                        }
                      }
                      location {
                        data {
                          attributes {
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        user: user.id,
      },
    }),
  })
  const result = await userCart.json()
  return result.data.carts?.data || []
}

export const getDoctorAppointments = async ({ slug }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const doctorAppointments = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query getDoctorAppointments ($slug: String!) {
          doctorApps(filters: { doctor: {slug: { eq: $slug }}}) {
            data {
              id
              attributes {
                appointment_date
              }
            }
          }
        }
      `,
      variables: {
        slug,
      },
    }),
  })
  const result = await doctorAppointments.json()
  return result.data.doctorApps?.data || []
}

export const getUserUpcomingAppointments = async ({ token }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const upcomingAppointments = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
        query getUserAppointments {
          upcomingAppointments {
            data {
              id
              attributes {
                session_place
                appointment_date
                appointment_duration
                price
                appointment_request {
                  data {
                    id
                    attributes {
                      status
                      type
                    }
                  }
                }
                status
                doctor {
                  data {
                    id
                    attributes {
                      doctorImage {
                        ...FileParts
                      }
                      personal_image {
                        ...FileParts
                      }
                      title
                      company_name
                      slug
                      speciality
                    }
                  }
                }
                user {
                  data {
                    id
                    attributes {
                      firstname
                      surname
                    }
                  }
                }
                categories {
                  data {
                    id
                    attributes {
                      alias
                      title
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {},
    }),
  })
  const result = await upcomingAppointments.json()
  return result.data?.upcomingAppointments?.data || []
}

export const getDoctorPatientList = async ({ user }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const doctorPatientsList = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.strapiToken}`,
    },
    body: JSON.stringify({
      query: `
        query getPatientsHistory {
          allAppHistory {
            patentName
            patientEmail
            PatentPhone
            PreviousVists
            UpcomingVists
            id
            completedPayment
            doctorName
            doctorId
            userId
          }
        }    
      `,
      variables: {},
    }),
  })
  const result = await doctorPatientsList.json()
  return result.data?.allAppHistory || []
}

export const getUserReportsForDoctor = async ({ user, patientId }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const userHistoryForDoctor = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.strapiToken}`,
    },
    body: JSON.stringify({
      query: `
      query getPatientsHistory($user: ID!) {
        UserHistoryForDoctor(filters: {user: {id: {eq: $user}}}) {
          UpcomingVists
          patentName
          PatentPhone
          patientEmail
          id
          PreviousVists
          # completedPayment
          doctorName
          doctorId
          userId
          userGender
          userBirthday
          sessions {
            id
            sessionDate
            sessionAttachments {
              name
              caption
              width
              height
              formats
              url
            }
            notes
            pending
          }
        }
      }
      `,
      variables: {
        user: patientId,
      },
    }),
  })
  const result = await userHistoryForDoctor.json()
  return result.data.UserHistoryForDoctor || []
}

export const getSessionDetailsForDoctor = async ({ user, sessionId }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const UserSessionForDoctor = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.strapiToken}`,
    },
    body: JSON.stringify({
      query: `
        query getSessionDetails($session: ID!) {
          UserSessionForDoctor(session: $session) {
            UpcomingVists
            patentName
            PatentPhone
            patientEmail
            id
            PreviousVists
            doctorName
            doctorId
            userId
            userGender
            userBirthday
            sessionData {
              id
              sessionDate
              sessionAttachments {
                name
                caption
                width
                height
                formats
                url
                ext
                size
                mime
                createdAt
              }
              notes
              report
              pending
            }
          }
        }
      `,
      variables: {
        session: sessionId,
      },
    }),
  })
  const result = await UserSessionForDoctor.json()
  return result.data.UserSessionForDoctor
}

export const getUserReports = async ({ user }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const userReports = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.strapiToken}`,
    },
    body: JSON.stringify({
      query: `
        query getUserReports {
          userReports {
            id
            doctorName
            report {
              name
            }
            sessionDate
            completedPayment
          }
        }    
      `,
    }),
  })
  const result = await userReports.json()
  return result.data.userReports || []
}

export const submitUserSession = async ({ user, values, files }) => {
  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    cache,
    link: createUploadLink({
      uri: getStrapiURL("/graphql"),
      headers: {
        Authorization: `Bearer ${user.strapiToken}`,
      },
    }),
  })

  const UPLOAD = gql`
    mutation getUserReports(
      $note: String
      $report: String
      $media: [Upload]
      $appId: ID
      $patientId: ID
      $doctorId: ID
    ) {
      updateSession(
        note: $note
        report: $report
        media: $media
        appId: $appId
        patientId: $patientId
        doctorId: $doctorId
      ) {
        notes
        report
      }
    }
  `
  const submission = await apolloClient.mutate({
    mutation: UPLOAD,
    variables: {
      note: values.notes,
      report: values.report,
      appId: values.id,
      patientId: values.userId,
      doctorId: values.doctor,
      media: files,
    },
  })

  return submission
}

export async function getDoctorDataById(user, locale) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql")
  const doctorRes = await fetch(gqlEndpoint, {
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
        query GetDoctors($id: ID!, $locale: I18NLocaleCode!) {
          doctors(filters: { user: { id: { eq: $id } } }, locale: $locale) {
            data {
              id
              attributes {
                shortDescription
                longDescription
                doctorImage {
                  ...FileParts
                }
                personal_image {
                  ...FileParts
                }
                locale
                localizations {
                  data {
                    id
                    attributes {
                      locale
                    }
                  }
                }
                title
                speakingLanguages {
                  title
                }
                doctorExcperinces {
                  id
                  position
                  startDate
                  endDate
                  place
                }
                totalYearOfExp
                slug
                speciality
                metadata {
                  metaTitle
                  metaDescription
                  shareImage {
                    ...FileParts
                  }
                  twitterCardType
                  twitterUsername
                }
                categories {
                  data {
                    id
                    attributes {
                      title
                      alias
                    }
                  }
                }
                location {
                  data {
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
    `,
      variables: {
        id: user.id,
        locale,
      },
    }),
  })

  const doctorData = await doctorRes.json()
  // Make sure we found something, otherwise return null
  if (
    doctorData.data?.doctors == null ||
    !doctorData.data.doctors?.data ||
    doctorData.data.doctors?.data?.length === 0
  ) {
    return null
  }

  // Return the first item since there should only be one result per slug
  return doctorData.data.doctors.data[0]
}

export async function searchCategories(searchValue = "", locale = "en") {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql")
  const categoriesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetCategories (
            $searchValue: String!,
            $locale: I18NLocaleCode!
          ) {
            categories(filters: {title: {contains: $searchValue}}, locale: $locale) {
              data {
                id
                attributes {
                  title
                }
              }
              meta {
                pagination {
                  page
                  pageSize
                  total
                  pageCount
                }
              }
            }
          }
    `,
      variables: {
        searchValue,
        locale,
      },
    }),
  })

  const categoriesData = await categoriesRes.json()
  // Make sure we found something, otherwise return null
  if (
    categoriesData.data?.categories == null ||
    !categoriesData.data.categories?.data ||
    categoriesData.data.categories?.data?.length === 0
  ) {
    return null
  }

  return categoriesData.data.categories.data
}

export async function searchDoctors(
  searchValue = "",
  locale = "en",
  categoryId
) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql")
  const doctorsRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query GetDoctors (
        $searchValue: String!,
        $locale: I18NLocaleCode!,
        ${categoryId ? "$categoryId: ID!" : ""}
      ) {
        doctors(filters: {title: {contains: $searchValue}${
          categoryId ? ", categories: {id: {eq: $categoryId}}" : ""
        }}, locale: $locale) {
          data {
            id
            attributes {
              title
            }
          }
          meta {
            pagination {
              page
              pageSize
              total
              pageCount
            }
          }
        }
      }
    `,
      variables: {
        searchValue,
        locale,
        categoryId,
      },
    }),
  })

  const doctorsData = await doctorsRes.json()
  // Make sure we found something, otherwise return null
  if (
    doctorsData.data?.doctors == null ||
    !doctorsData.data.doctors?.data ||
    doctorsData.data.doctors?.data?.length === 0
  ) {
    return null
  }

  return doctorsData.data.doctors.data
}

export async function submitDoctorData({ user, data }) {
  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    cache,
    link: createUploadLink({
      uri: getStrapiURL("/graphql"),
      headers: {
        Authorization: `Bearer ${user.strapiToken}`,
      },
    }),
  })

  const UPLOAD = gql`
    mutation submitDoctorData(
      $title: String
      $shortDescription: String
      $longDescription: String
      $documents: [Upload]
      $personal_image: Upload
    ) {
      submitDoctorData(
        title: $title
        shortDescription: $shortDescription
        longDescription: $longDescription
        documents: $documents
        personal_image: $personal_image
      ) {
        id
      }
    }
  `
  const submission = await apolloClient.mutate({
    mutation: UPLOAD,
    variables: {
      ...data,
    },
  })

  return submission
}

// export async function submitDoctorSetting({ user, data }) {
//   const cache = new InMemoryCache()

//   const apolloClient = new ApolloClient({
//     cache,
//     link: createUploadLink({
//       uri: getStrapiURL("/graphql"),
//       headers: {
//         Authorization: `Bearer ${user.strapiToken}`,
//       },
//     }),
//   })

//   const UPLOAD = gql`
//     mutation SubmitDoctorSetting(
//       $sessionPrice: Int
//       $session_duration: ENUM_DOCTORSETTING_SESSION_DURATION
//       $availableHourFrom: Time
//       $availableHourTo: Time
//       $weekDays: ComponentDoctorsWeekDaysInput
//     ) {
//       submitDoctorSetting(
//         sessionPrice: $sessionPrice
//         session_duration: $session_duration
//         availableHourFrom: $availableHourFrom
//         availableHourTo: $availableHourTo
//         weekDays: $weekDays
//       ) {
//         id
//       }
//     }
//   `
//   const submission = await apolloClient.mutate({
//     mutation: UPLOAD,
//     variables: {
//       ...data,
//     },
//   })

//   return submission
// }

export async function UpdateUserAccount({ user, data }) {
  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    cache,
    link: createUploadLink({
      uri: getStrapiURL("/graphql"),
      headers: {
        Authorization: `Bearer ${user.strapiToken}`,
      },
    }),
  })

  const UPLOAD = gql`
    mutation UpdateUserAccount(
      $salutation: String
      $firstname: String
      $middlename: String
      $surname: String
      $gender: String
      $birthday: Date
      $material_status: String
      $religion: String
      $nationality: String
      $comunication_lang: String
      $mobile_cc: String
      $mobile_c: String
      $mobile: String
      $email: String
      $country: String
      $city: String
      $zone: String
      $district: String
      $emrg_name: String
      $emrg_relation: String
      $emrg_mobile_c: String
      $emrg_mobile_cc: String
      $emrg_mobile: String
      $emrg_country: String
      $emrg_address: String
      $address: String
      $visa_status: String
      $identity: Upload
      $passport: Upload
      $em_front: Upload
      $em_back: Upload
      $profile_img: Upload
      $identityNumber: String
      $phone_number: String
    ) {
      updateUserAccount(
        salutation: $salutation
        firstname: $firstname
        middlename: $middlename
        surname: $surname
        gender: $gender
        birthday: $birthday
        material_status: $material_status
        religion: $religion
        nationality: $nationality
        comunication_lang: $comunication_lang
        mobile_cc: $mobile_cc
        mobile_c: $mobile_c
        mobile: $mobile
        email: $email
        country: $country
        city: $city
        zone: $zone
        district: $district
        emrg_name: $emrg_name
        emrg_relation: $emrg_relation
        emrg_mobile: $emrg_mobile
        emrg_mobile_cc: $emrg_mobile_cc
        emrg_mobile_c: $emrg_mobile_c
        emrg_country: $emrg_country
        emrg_address: $emrg_address
        address: $address
        visa_status: $visa_status
        identity: $identity
        passport: $passport
        em_front: $em_front
        em_back: $em_back
        profile_img: $profile_img
        identityNumber: $identityNumber
        phone_number: $phone_number
      ) {
        firstname
      }
    }
  `
  const submission = await apolloClient.mutate({
    mutation: UPLOAD,
    variables: {
      ...data,
    },
  })

  return submission
}

export const getMeetingData = async ({ user, meetingId }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const meetingDetails = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.strapiToken}`,
    },
    body: JSON.stringify({
      query: `
        query getMeetingSession($meetingId: ID!) {
          getMeetingSession(meeting: $meetingId) {
            signature
            meetingId
            meetingPass
            meeting {
              attributes {payment_status
              type}
            }
          }
        }
      `,
      variables: {
        meetingId,
      },
    }),
  })
  const result = await meetingDetails.json()
  return result.data.getMeetingSession
}

export const getDoctorsRigistrationSteps = async ({ locale }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const docRegSteps = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.strapiToken}`,
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
        query GetDoctorRegistrationSteps($locale: I18NLocaleCode!) {
          doctorReg(locale: $locale) {
            data {
              attributes {
                locale
                localizations {
                  data {
                    id
                    attributes {
                      locale
                    }
                  }
                }
                metadata {
                  metaTitle
                  metaDescription
                  shareImage {
                    ...FileParts
                  }
                  twitterCardType
                  twitterUsername
                }
                steps {
                  id
                  question
                  options {
                    option
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
  })
  const result = await docRegSteps.json()
  return result.data.doctorReg || []
}

export const getAppointmentData = async ({ appId, user }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const appointmentData = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.strapiToken}`,
    },
    body: JSON.stringify({
      query: `
        query appointmentDetails($appId: ID, $userId: ID) {
          appointmentDetails(appId: $appId, userId: $userId) {
            data {
              id
              attributes {
                session_place
                appointment_date
                appointment_duration
                price
                type
                doctor {
                  data {
                    id
                    attributes {
                      title
                    }
                  }
                }
                user {
                  data {
                    id
                    attributes {
                      firstname
                      surname
                    }
                  }
                }
                order {
                  data {
                    attributes {
                      payment_history {
                        data {
                          attributes {
                            amount
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }             
      `,
      variables: {
        appId,
        userId: user.id,
      },
    }),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.error({ error }))

  return appointmentData.data.appointmentDetails || []
}

export async function cancelPatientAppointment({ user, appId }) {
  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    cache,
    link: createUploadLink({
      uri: getStrapiURL("/graphql"),
      headers: {
        Authorization: `Bearer ${user.strapiToken}`,
      },
    }),
  })

  const UPLOAD = gql`
    mutation patientCancelAppointment($appId: ID) {
      patientCancelSession(appId: $appId) {
        data {
          id
          attributes {
            status
            appointment_date
          }
        }
      }
    }
  `
  const submission = await apolloClient.mutate({
    mutation: UPLOAD,
    variables: {
      appId,
    },
  })

  return submission
}

export async function reschedulePatientAppointment({ user, appId, newApp }) {
  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    cache,
    link: createUploadLink({
      uri: getStrapiURL("/graphql"),
      headers: {
        Authorization: `Bearer ${user.strapiToken}`,
      },
    }),
  })

  const UPLOAD = gql`
    mutation patientRescheduleSession($appId: ID!, $newApp: ID!) {
      patientRescheduleSession(appId: $appId, newApp: $newApp) {
        data {
          id
          attributes {
            status
            appointment_date
          }
        }
      }
    }
  `
  const submission = await apolloClient.mutate({
    mutation: UPLOAD,
    variables: {
      appId,
      newApp,
    },
  })

  return submission
}

export const getUserAppointmentDetails = async ({ appId, user }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const appointmentData = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.strapiToken}`,
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
        query userAppointmentDetails($appId: ID) {
          userAppointmentDetails(appId: $appId) {
            data {
              id
              attributes {
                session_place
                appointment_date
                appointment_end_time
                appointment_duration
                price
                payment_status
                additional_amount
                categories {
                  data {
                    id
                    attributes {
                      alias
                      title
                    }
                  }
                }
                doctor {
                  data {
                    id
                    attributes {
                      doctorImage {
                        ...FileParts
                      }
                      personal_image {
                        ...FileParts
                      }
                      title
                      speakingLanguages {
                        title
                      }
                      speciality
                      categories {
                        data {
                          id
                          attributes {
                            title,
                            alias,
                          }
                        }
                      }
                      location {
                        data {
                          attributes {
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        appId,
      },
    }),
  })
  const result = await appointmentData.json()
  return result.data?.userAppointmentDetails?.data || null
}

export const getUserAppointmentStatus = async ({ appId, user }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const appointmentData = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.strapiToken}`,
    },
    body: JSON.stringify({
      query: `
        query userAppointmentDetails($appId: ID) {
          userAppointmentDetails(appId: $appId) {
            data {
              id
              attributes {
                appointment_date
                status
                user_created {
                  data {
                    id
                  }
                }
                appointment_request {
                  data {
                    id
                    attributes {
                      status
                      type
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        appId,
      },
    }),
  })
  const result = await appointmentData.json()
  return result.data.userAppointmentDetails.data || null
}

export async function doctorAppointmentRequest({ user, requestList }) {
  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    cache,
    link: createUploadLink({
      uri: getStrapiURL("/graphql"),
      headers: {
        Authorization: `Bearer ${user.strapiToken}`,
      },
    }),
  })

  const UPLOAD = gql`
    mutation doctorAppointmentRequest($appointmentsList: [doctorRequestList]) {
      doctorAppointmentRequest(appointmentsList: $appointmentsList) {
        data {
          id
          attributes {
            status
            doctor_appointment {
              data {
                id
                attributes {
                  appointment_date
                }
              }
            }
          }
        }
      }
    }
  `
  const submission = await apolloClient.mutate({
    mutation: UPLOAD,
    variables: {
      appointmentsList: requestList,
    },
  })

  return submission
}

export async function undoDoctorRequest({ user, appId }) {
  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    cache,
    link: createUploadLink({
      uri: getStrapiURL("/graphql"),
      headers: {
        Authorization: `Bearer ${user.strapiToken}`,
      },
    }),
  })

  const UPLOAD = gql`
    mutation undoDoctorRequest($appId: ID) {
      undoDoctorRequest(appId: $appId) {
        data {
          id
          attributes {
            status
            doctor_appointment {
              data {
                id
                attributes {
                  appointment_date
                }
              }
            }
          }
        }
      }
    }
  `
  const submission = await apolloClient.mutate({
    mutation: UPLOAD,
    variables: {
      appId: appId,
    },
  })

  return submission
}

export async function patientAcceptReshReq({ user, reqId, newApp }) {
  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    cache,
    link: createUploadLink({
      uri: getStrapiURL("/graphql"),
      headers: {
        Authorization: `Bearer ${user.strapiToken}`,
      },
    }),
  })

  const UPLOAD = gql`
    mutation patientAcceptReshReq($reqId: ID, $newApp: ID) {
      patientAcceptReshReq(reqId: $reqId, newApp: $newApp) {
        data {
          attributes {
            status
          }
        }
      }
    }
  `
  const submission = await apolloClient.mutate({
    mutation: UPLOAD,
    variables: {
      reqId,
      newApp,
    },
  })

  return submission
}

export async function sendPationtJoinEmail(token, appointmentId) {
  const cache = new InMemoryCache()
  const apolloClient = new ApolloClient({
    cache,
    link: createUploadLink({
      uri: getStrapiURL("/graphql"),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  })

  const UPLOAD = gql`
    mutation sendJoinPationtMeeting($appointmentId: ID) {
      sendJoinPationtMeeting(appointmentId: $appointmentId) {
        data {
          attributes {
            status
          }
        }
      }
    }
  `

  const submission = await apolloClient.mutate({
    mutation: UPLOAD,
    variables: {
      appointmentId: appointmentId,
    },
  })

  return submission
}

export async function captureAppointmentAmount(token, appointmentId) {
  const cache = new InMemoryCache()
  const apolloClient = new ApolloClient({
    cache,
    link: createUploadLink({
      uri: getStrapiURL("/graphql"),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  })
  const UPLOAD = gql`
    mutation captureAppointmentAmount($appointment_id: ID) {
      captureAppointmentAmount(appointment_id: $appointment_id) {
        data {
          attributes {
            status
          }
        }
      }
    }
  `

  const submission = await apolloClient.mutate({
    mutation: UPLOAD,
    variables: {
      appointment_id: appointmentId,
    },
  })

  return submission
}
export async function patientRejectReshReq({ user, reqId }) {
  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    cache,
    link: createUploadLink({
      uri: getStrapiURL("/graphql"),
      headers: {
        Authorization: `Bearer ${user.strapiToken}`,
      },
    }),
  })

  const UPLOAD = gql`
    mutation patientRejectReshReq($reqId: ID) {
      patientRejectReshReq(reqId: $reqId) {
        data {
          attributes {
            status
          }
        }
      }
    }
  `
  const submission = await apolloClient.mutate({
    mutation: UPLOAD,
    variables: {
      reqId,
    },
  })

  return submission
}

export async function requestHideAppointment({ user, appId }) {
  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    cache,
    link: createUploadLink({
      uri: getStrapiURL("/graphql"),
      headers: {
        Authorization: `Bearer ${user.strapiToken}`,
      },
    }),
  })

  const UPLOAD = gql`
    mutation requestHideAppointment($appId: ID) {
      requestHideAppointment(appId: $appId) {
        data {
          attributes {
            status
          }
        }
      }
    }
  `
  const submission = await apolloClient.mutate({
    mutation: UPLOAD,
    variables: {
      appId,
    },
  })

  return submission
}

export const getAvailableDaysForDoctor = async ({ doctorId }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const availableDays = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query getAvailableDaysForDoctor($doctorId: ID!) {
          getAvailableDaysForDoctor(doctorId: $doctorId)
        }
      `,
      variables: {
        doctorId,
      },
    }),
  })
  const result = await availableDays.json()
  return result?.data?.getAvailableDaysForDoctor || []
}

export const getAvailableAppointmentInDay = async ({
  doctorId,
  requestDate,
}) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const availableDays = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query getAvailableAppointmentInDay($doctorId: ID!, $requestDate: String) {
        getAvailableAppointmentInDay(doctorId: $doctorId, requestDate: $requestDate)  {
          data {
            id
            attributes {
              appointment_date
              appointment_end_time
            }
          }
        }
      }
      
      `,
      variables: {
        doctorId,
        requestDate,
      },
    }),
  })
  const result = await availableDays.json()
  return result?.data?.getAvailableAppointmentInDay?.data || []
}

export async function submitLeaveDays({ user, startDate, endDate }) {
  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    cache,
    link: createUploadLink({
      uri: getStrapiURL("/graphql"),
      headers: {
        Authorization: `Bearer ${user.strapiToken}`,
      },
    }),
  })

  const UPLOAD = gql`
    mutation doctorSubmitLeaveDays($startDate: DateTime, $endDate: DateTime) {
      doctorSubmitLeaveDays(
        doctorRequest: { startDate: $startDate, endDate: $endDate }
      ) {
        success
      }
    }
  `

  const submission = await apolloClient
    .mutate({
      mutation: UPLOAD,
      variables: {
        startDate,
        endDate,
      },
    })
    .then((res) => {
      if (!res.errors) {
        // success
        return { success: true, message: "" }
      } else {
        // handle errors with status code 200
        return { success: false, message: "There is an error!" }
      }
    })
    .catch((e) => {
      if (e.graphQLErrors) {
        console.log("Error: ", e.graphQLErrors[0]?.extensions?.error?.name)
        return {
          success: false,
          message: e.graphQLErrors[0]?.extensions?.error?.message?.message,
          name: e.graphQLErrors[0]?.extensions?.error?.name,
        }
        // reduce to get message
        // _.reduce(
        //    e.graphQLErrors,
        //    (res, err) => {
        //     console.log("message: ", err.extensions);
        //     return [...res, err.message]
        //    },
        //    []
        // );
      }
      return { success: false, message: "There is an error!" }
    })

  return submission
}

export async function submitLeaveHours({
  user,
  requestDate,
  startTime,
  endTime,
}) {
  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    cache,
    link: createUploadLink({
      uri: getStrapiURL("/graphql"),
      headers: {
        Authorization: `Bearer ${user.strapiToken}`,
      },
    }),
  })

  const UPLOAD = gql`
    mutation doctorSubmitLeaveHours(
      $requestDate: DateTime
      $startTime: Time
      $endTime: Time
    ) {
      doctorSubmitLeaveHours(
        doctorRequest: {
          requestDate: $requestDate
          startTime: $startTime
          endTime: $endTime
        }
      ) {
        success
      }
    }
  `

  const submission = await apolloClient
    .mutate({
      mutation: UPLOAD,
      variables: {
        requestDate,
        startTime,
        endTime,
      },
    })
    .then((res) => {
      if (!res.errors) {
        // success
        return { success: true, message: "" }
      } else {
        // handle errors with status code 200
        return { success: false, message: "There is an error!" }
      }
    })
    .catch((e) => {
      if (e.graphQLErrors) {
        console.log("Error: ", e.graphQLErrors[0]?.extensions?.error?.name)
        return {
          success: false,
          message: e.graphQLErrors[0]?.extensions?.error?.message?.message,
          name: e.graphQLErrors[0]?.extensions?.error?.name,
        }
        // reduce to get message
        // _.reduce(
        //    e.graphQLErrors,
        //    (res, err) => {
        //     console.log("message: ", err.extensions);
        //     return [...res, err.message]
        //    },
        //    []
        // );
      }
      return { success: false, message: "There is an error!" }
    })

  return submission
}

export async function submitDoctorSetting({ user, data }) {
  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    cache,
    link: createUploadLink({
      uri: getStrapiURL("/graphql"),
      headers: {
        Authorization: `Bearer ${user.strapiToken}`,
      },
    }),
  })

  const UPLOAD = gql`
    mutation submitDoctorSetting(
      $startDate: DateTime
      $endDate: DateTime
      $duration: String
      $price: Int
      $weekDays: ComponentDoctorsWeekDaysInput
    ) {
      doctorSubmitSetting(
        doctorRequest: {
          startDate: $startDate
          endDate: $endDate
          appointmentDuration: $duration
          sessionPrice: $price
          weekDays: $weekDays
        }
      ) {
        data {
          id
          attributes {
            startDate
          }
        }
      }
    }
  `
  const submission = await apolloClient.mutate({
    mutation: UPLOAD,
    variables: {
      ...data,
    },
  })

  return submission
}

export const getServiceDoctorList = async ({ locale, service }) => {
  const gqlEndpoint = getStrapiURL("/graphql")
  const result = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query GetTherpayList(
        $locale: I18NLocaleCode!
        $service: String
      ) {
        doctors(
          locale: $locale
          filters: {
            categories: { alias: { contains: $service } }
          }
        ) {
          data {
            ...CarouselDoctorPart
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
          shortDescription
          locale
          localizations {
            data {
              id
              attributes {
                locale
              }
            }
          }
          slug
          speciality
          location {
            data {
              id
              attributes {
                code
                name
              }
            }
          }
          categories {
            data {
              id
              attributes {
                title,
                alias,
                shortDescription,
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
        service,
      },
    }),
  })
  const parsedResponse = await result.json()
  const doctorListData = parsedResponse.data?.doctors?.data || []
  return doctorListData || []
}

export async function getDoctorsList(locale, major) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql")
  const doctorRes = await fetch(gqlEndpoint, {
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
        query GetDoctors (
          $major: String!
          $locale: I18NLocaleCode!
          ) {        
            doctors(
              filters: { major: { eq: $major} }
              locale: $locale
            ) {
              data {
                id
                attributes {
                  shortDescription
                  longDescription
                  videoURL
                  doctorImage {
                    ...FileParts
                  }
                  personal_image {
                    ...FileParts
                  }
                  locale
                  localizations {
                    data {
                      id
                      attributes {
                        locale
                      }
                    }
                  }
                  title
                  speakingLanguages {
                    title
                  }
                  doctorExcperinces {
                    id,
                    position,
                    startDate,
                    endDate,
                    place,
                  }
                  totalYearOfExp
                  slug
                  speciality
                  metadata {
                    metaTitle
                    metaDescription
                    shareImage {
                      ...FileParts
                    }
                    twitterCardType
                    twitterUsername
                  }
                  categories {
                    data {
                      id
                      attributes {
                        title,
                        alias,
                        shortDescription,
                      }
                    }
                  }
                  location {
                    data {
                      attributes {
                        name
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
        major,
      },
    }),
  })

  const doctorData = await doctorRes.json()
  // Make sure we found something, otherwise return null
  if (
    doctorData.data?.doctors == null ||
    !doctorData.data.doctors?.data ||
    doctorData.data.doctors?.data?.length === 0
  ) {
    return null
  }

  // Return the first item since there should only be one result per slug
  return doctorData.data.doctors.data
}

export async function getMeData({ token }) {
  try {
    const userData = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL + "/api/users/me"}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return userData
  } catch (e) {
    return null
  }
}

export async function verifyPaymentToken({ token, paymentToken }) {
  console.log("strapiToken: ", token)
  console.log("paymentToken: ", paymentToken)
  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    cache,
    link: createUploadLink({
      uri: getStrapiURL("/graphql"),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  })

  const UPLOAD = gql`
    mutation verifyTokenLink($token: String) {
      verifyTokenLink(token: $token) {
        appointmentId
        patientId
        additional_amount
        type
      }
    }
  `
  const submission = await apolloClient.mutate({
    mutation: UPLOAD,
    variables: {
      token: paymentToken,
    },
  })

  return submission
}
