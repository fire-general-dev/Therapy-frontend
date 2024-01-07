import { createStrapiAxios } from "@/utils/axiosWrapper"

export default async function handler(req, res) {
  try {
    const response = await createStrapiAxios()
      .post(`/users/forget-password`, {
        ...req.body,
      })
      .then((res) => {})
    res.status(200).json(response)
  } catch (error) {
    const { response: fetchResponse } = error
    if (fetchResponse) {
      console.log("Forget Error: ", fetchResponse)
      return res.status(fetchResponse?.status || 500).json(error.response?.data)
    }
    res.status(500).json(error)
  }
}
