import { useState } from "react"
import RegistrationForm from "./RegistrationForm"
import Stepper from "./Stepper"
import LoginForm from "./LoginForm"
import CheckoutContainer from "./checkout-container/CheckoutContainer"
import { getUserCarts } from "@/utils/api"
import { useRouter } from "next/router"
import { createStrapiAxios } from "@/utils/axiosWrapper"
import axios from "axios"
import { signIn, useSession } from "next-auth/react"
import { useRef } from "react"
import { toast } from "react-toastify"
import { useEffect } from "react"

const RegisterCheckoutContainer = (props) => {
  const [isLogin, setIsLogin] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const [user, setUser] = useState()
  const [cart, setCart] = useState(null)
  const router = useRouter()
  const recaptchaRef = useRef()
  const { data: session } = useSession()

  const handleChangeForm = (value) => {
    setIsLogin(value)
  }

  const handleBooking = async (user) => {
    const cartData = {
      doctor: router.query.doctorId,
      sessionCount: 1,
      categories: [],
      doctor_appointment: router.query.appointmentId,
    }

    const addCartItem = await createStrapiAxios({
      strapiToken: user.strapiToken,
    }).post(`/carts`, {
      data: cartData,
    })
    setUser(user)
    const getCart = await getUserCarts(user)
    setCart(getCart)
    setCurrentStep(1)
  }

  const onSubmit = async (data) => {
    const token = await recaptchaRef.current.executeAsync()
    if (token) {
      const body = { ...data, username: data.email, agreedToNabidh: true }
      await axios
        .post("/api/register", body)
        .then(async (res) => {
          await signIn("credentials", {
            username: data.email,
            password: data.password,
            locale: router.locale || "en",
            redirect: false,
          })
          const user = {
            strapiToken: res?.data?.jwt,
            email: res?.data?.user?.email,
            id: res?.data?.user?.id,
          }
          await handleBooking(user)
          // handleLastStep({
          //   step: 1,
          //   user: {
          //     strapiToken: res?.data?.jwt,
          //     email: res?.data?.user?.email,
          //     id: res?.data?.user?.id,
          //   },
          // })
        })
        .catch((err) => {
          toast.error(
            err.response?.data.error?.message ||
              "An error occurred during the login process, please try againّ!",
            {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          )
        })
    }
  }

  const onSubmitLogin = async (data) => {
    await signIn("credentials", {
      username: data.email,
      password: data.password,
      locale: router.locale || "en",
      redirect: false,
    })
      .then(({ ok, error }) => {
        if (ok) {
          setIsDone(true)
        } else {
          toast.error(
            error.response?.data.error?.message || "Credentials do not match!",
            {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          )
        }
      })
      .catch((error) => {
        toast.error(
          err.response?.data.error?.message || "Credentials do not match!",
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        )
      })
  }

  const steps = [
    <div key={"step-1"}>
      {isLogin ? (
        <LoginForm onSubmit={onSubmitLogin} onChangeForm={handleChangeForm} />
      ) : (
        <RegistrationForm
          onSubmit={onSubmit}
          onChangeForm={handleChangeForm}
          recaptchaRef={recaptchaRef}
        />
      )}
    </div>,
    <div key={"step-2"}>
      {cart ? (
        <CheckoutContainer {...props} cart={cart[0]} user={user} />
      ) : null}
    </div>,
  ]

  useEffect(() => {
    if (isDone && session) {
      handleBooking(session)
    }
  }, [isDone])

  return (
    <div>
      <Stepper
        currentStep={currentStep}
        onChangeStep={(value) => setCurrentStep(value)}
        steps={steps}
      />
    </div>
  )
}

export default RegisterCheckoutContainer
