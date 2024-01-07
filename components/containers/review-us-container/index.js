import { Form, Formik } from "formik"
import LoaderButton from "@/components/elements/loaderButton"
import { useRouter } from "next/router"
import axios from "axios"
import * as Yup from "yup"
import RaterField from "./RaterField"
import ReviewUsTextarea from "./ReviewUsTextarea"

const formSchema = () =>
  Yup.object().shape({
    rate: Yup.number().required("Please enter your rate"),
  })

const ReviewUsContainer = (props) => {
  const router = useRouter()
  const onSubmit = async (values) => {
    // const apiLink = process.env.NEXT_PUBLIC_STRAPI_API_URL + "/api/review-uses"
    // await axios
    //   .post(apiLink, values)
    //   .then((res) => {
    //     toast.success(
    //       "Thank you for your review!",
    //       {
    //         position: "bottom-center",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       }
    //     )
    //     router.push("/")
    //   })
    //   .catch((err) => {
    //     toast.error(
    //       err.response?.data.error?.message ||
    //         "An error occurred during the review process, please try againّ!",
    //       {
    //         position: "bottom-center",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       }
    //     )
    //   })
  }

  return (
    <>
      <div className="review-us-container">
        <h6 className="title">ADD YOUR REVIEW</h6>
        <Formik
          initialValues={{
            rate: 0,
            message: "",
          }}
          initialErrors={{
            initial: "initial error",
          }}
          validationSchema={formSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, isValid, values, setFieldValue }) => {
            return (
              <Form>
                <RaterField
                  setFieldValue={setFieldValue}
                  value={values.rate}
                  name="rate"
                  className="mx-auto"
                />
                <div className="message-box">
                  <p className="message-info">
                    Share your thoughts with us by submitting a review. You can
                    submit feedback by selecting a star rating. You can always
                    add your complaints, compliments and suggestions.
                  </p>
                  <ReviewUsTextarea
                    id="message-id"
                    name="message"
                    className="mb-vw20"
                    placeholder="Add your review here"
                  />
                  <LoaderButton
                    isLoading={isSubmitting}
                    isDisabled={!isValid || isSubmitting}
                    classList="w-full"
                  >
                    Submit
                  </LoaderButton>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
      <style jsx>{`
        .review-us-container {
           {
            /* @apply bg-white rounded-lg p-mb20 md:p-60pxt lg:p-vw60; */
          }
          @apply w-fit text-center mb-mb100 md:mb-100pxt lg:mb-vw100;

          .title {
            @apply font-avenirBlack text-text-primary text-40pxm md:text-40pxt lg:text-40px mb-mb20 md:mb-24pxt lg:mb-vw24 leading-80pxm md:leading-80pxt lg:leading-80px;
          }
          .message-box {
            @apply bg-white rounded-lg p-mb40 md:p-40pxt lg:p-vw40 pb-0 md:pb-0 lg:pb-0;
            .message-info {
              @apply md:max-w-500pxt lg:max-w-500px mb-mb20 md:mb-20pxt lg:mb-vw20 font-avenirBold;
            }
          }
        }
      `}</style>
    </>
  )
}

export default ReviewUsContainer
