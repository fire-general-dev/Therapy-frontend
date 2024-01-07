import axios from "axios"
import { fetchAPI } from "utils/api"

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL

export async function signIn({ email, password }) {
  const res = await fetchAPI(
    "/auth/local",
    {},
    {
      method: "POST",
      body: JSON.stringify({
        identifier: email,
        password,
      }),
    }
  )
  console.log("response ===>", res)
  // const res = await axios.post(`${strapiUrl}/api/auth/local`)
  return res
}
