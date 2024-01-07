import axios from "axios"

export function createStrapiAxios(user) {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL + "/api",
    headers: user
      ? {
          Authorization: `Bearer ${user?.strapiToken}`,
          "Content-Type": "application/json",
        }
      : { "Content-Type": "application/json" },
  })
}
