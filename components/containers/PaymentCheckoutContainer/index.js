import { useState } from "react"
import Stepper from "./Stepper"
import LoginForm from "./LoginForm"
import CheckoutContainer from "./checkout-container/CheckoutContainer"
import {
  getUserAppointmentDetails,
  getUserCarts,
  verifyPaymentToken,
} from "@/utils/api"
import { useRouter } from "next/router"
import { createStrapiAxios } from "@/utils/axiosWrapper"
import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"
import { toast } from "react-toastify"

const PaymentCheckoutContainer = (props) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const [user, setUser] = useState()
  const [paymentData, setPaymentData] = useState()
  const [appointmentDetails, setAppointmentDetails] = useState(null)
  const router = useRouter()
  const { data: session } = useSession()

  const handleBooking = async (user) => {
    try {
      const paymentData = await verifyPaymentToken({
        token: user.strapiToken,
        paymentToken: router.query.token,
      })
      const verifyTokenLink = paymentData?.data?.verifyTokenLink
      if (!verifyTokenLink) {
        router.push(`/confirmation?token=${router.query.token}`)
      }

      setPaymentData(verifyTokenLink)

      const appointmentDetailsData = await getUserAppointmentDetails({
        appId: verifyTokenLink.appointmentId,
        user: user,
      })
      setUser(user)
      setAppointmentDetails(appointmentDetailsData)
      setCurrentStep(1)
    } catch (e) {
      router.push(`/confirmation?token=${router.query.token}`)
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
      <LoginForm onSubmit={onSubmitLogin} />
    </div>,
    <div key={"step-2"}>
      {appointmentDetails && paymentData ? (
        <CheckoutContainer
          {...props}
          appId={paymentData.appointmentId}
          appointmentDetails={appointmentDetails}
          type={paymentData.type}
          user={user}
        />
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

export default PaymentCheckoutContainer
