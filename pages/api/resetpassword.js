import { createStrapiAxios } from "@/utils/axiosWrapper"

export default async function handler(req, res) {
  try {
    const data = await createStrapiAxios()
      .post(`/users/reset-password`, {
        ...req.body,
      })
      .then((res) => res.data)

    res.status(200).json(data)
  } catch (error) {
    const { response: fetchResponse } = error
    if (fetchResponse) {
      return res.status(fetchResponse?.status || 500).json(error.response?.data)
    }
    res.status(500).json(error)
  }
}
