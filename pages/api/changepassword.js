import { createStrapiAxios } from "@/utils/axiosWrapper"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      res.status(401).json({ message: "You must be logged in." })
      return
    }

    await createStrapiAxios(session).post(`/auth/change-password`, {
      ...req.body,
    })
    res.status(200).json({})
  } catch (error) {
    console.error("Change password error: ", error.message)
    const { response: fetchResponse } = error
    if (fetchResponse) {
      return res.status(fetchResponse?.status || 500).json(error.response?.data)
    }
    res.status(500).json(error)
  }
}
