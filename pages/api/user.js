import { getDoctorDataById } from "@/utils/api"
import { createStrapiAxios } from "@/utils/axiosWrapper"
import { withSessionRoute } from "middlewares/session"
import { getServerSession } from "next-auth"

export default withSessionRoute(userRoute)

async function userRoute(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      res.status(401).json({ message: "You must be logged in." })
      return
    }

    const userData = session
    const axiosInstance = createStrapiAxios(userData)

    const updatedUser = await axiosInstance.get(
      "/users/me?populate=role,documents,doctor,identity"
    )

    const updatedUserData = {
      ...userData,
      ...updatedUser.data,
      role: {
        id: updatedUser.data.role.id,
        name: updatedUser.data.role.name,
        type: updatedUser.data.role.type,
      },
    }
    if (updatedUserData.role?.type === "doctors") {
      const doctorData = await getDoctorDataById(
        userData,
        req.query.locale || "en"
      )
      updatedUserData.doctor = {
        id: updatedUser.data.doctor.id,
        title: updatedUser.data.doctor.title,
        price: updatedUser.data.doctor.price,
        speciality: updatedUser.data.doctor.speciality,
        personalImage: doctorData?.attributes.personal_image,
      }
    }

    res.send({ user: updatedUserData })
  } catch (e) {
    console.log("error on user ===>", e)
    res.send(e)
  }
}
