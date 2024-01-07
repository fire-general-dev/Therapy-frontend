import { getDoctorDataById } from "@/utils/api"
import nc from "next-connect"
import { sessionMiddleware } from "../../middlewares/session"
import { createStrapiAxios } from "../../utils/axiosWrapper"

export default nc()
  .use(sessionMiddleware)
  .post(async (req, res) => {
    const { identifier, password, locale } = req.body

    try {
      const user = await createStrapiAxios()
        .post(`/auth/local`, {
          identifier,
          password,
        })
        .then((res) => res.data)
        .then((data) => {
          return { ...data.user, strapiToken: data.jwt }
        })

      if (!user.confirmed) {
        return res.status(401).json({
          statusCode: 401,
          message: "User not confirmed",
        })
      }

      const axiosInstance = createStrapiAxios(user)

      const updatedUser = await axiosInstance.get(
        "/users/me?populate=role,documents,doctor,identity"
      )

      const updatedUserData = {
        ...user,
        ...updatedUser.data,
        role: {
          id: updatedUser.data.role.id,
          name: updatedUser.data.role.name,
          type: updatedUser.data.role.type,
        },
      }
      if (updatedUserData.role?.type === "doctors") {
        const doctorData = await getDoctorDataById(
          updatedUserData,
          locale || "en"
        )
        updatedUserData.doctor = {
          id: updatedUser.data.doctor.id,
          title: updatedUser.data.doctor.title,
          price: updatedUser.data.doctor.price,
          speciality: updatedUser.data.doctor.speciality,
          personalImage: doctorData?.attributes.personal_image,
        }
      }
      req.session.user = updatedUserData

      // await req.session.save()

      // req.session.set("user", user)
      // req.session.user = user
      // req.session.user = user
      await req.session.save()
      res.json(user)
    } catch (error) {
      const { response: fetchResponse } = error
      if (fetchResponse) {
        return res
          .status(fetchResponse?.status || 500)
          .json(error.response?.data)
      }
      res.status(500).json(error)
    }
  })
