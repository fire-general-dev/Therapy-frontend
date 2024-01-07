import { createStrapiAxios } from "@/utils/axiosWrapper"

export default async function handler(req, res) {
  const requestMethod = req.method
  try {
    const user = await createStrapiAxios()
      .post(`/auth/local/register`, {
        ...req.body,
      })
      .then((res) => res.data)
    res.status(200).json(user)
  } catch (error) {
    const { response: fetchResponse } = error
    if (fetchResponse) {
      return res.status(fetchResponse?.status || 500).json(error.response?.data)
    }
    res.status(500).json(error)
  }
}
