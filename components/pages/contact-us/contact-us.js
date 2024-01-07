import { Form, Formik } from "formik"
import ContactUsField from "./ContactUsField"
import ContactUsTextarea from "./ContactUsTextarea"
import ContactUsCheckbox from "./ContactUsCheckbox"
import LoaderButton from "@/components/elements/loaderButton"
import PhoneIcon from "@/images/icons/phone.svg"
import EmailIcon from "@/images/icons/envelope.svg"
import LocationIcon from "@/images/icons/map-pin.svg"
import * as Yup from "yup"
import { useTranslation } from "next-i18next"
import ReCAPTCHA from "react-google-recaptcha"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"

const formSchema = () =>
  Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string()
      .required("Please enter your email")
      .email("Please enter a valid email"),
    message: Yup.string().required("Please enter your message"),
    agreePrivacy: Yup.boolean().isTrue(""),
  })

const ContactUs = ({ onContact, user }) => {
  const { t } = useTranslation("common")
  const recaptchaRef = useRef()

  const onSubmit = async (values) => {
    const token = await recaptchaRef.current.executeAsync()
    if (token) {
      await onContact(values)
    }
  }
  return (
    <>
      <div className="contact-us">
        <div className="contact-us-info">
          <h3>{t("contact_us_title")}</h3>
          <p>{t("contact_us_message")}</p>
          <div className="info-piece">
            <h6 className="info-piece-title">{t("find_us")}</h6>
            <div className="info-piece-content">
              <Image src={LocationIcon} alt="location" />
              <span>{t("company_address")}</span>
            </div>
          </div>
          <div className="info-piece">
            <h6 className="info-piece-title">{t("reach_out")}</h6>
            <div className="flex gap-5">
              <div className="info-piece-content">
                <Image src={EmailIcon} alt="email" />
                <Link href="mailto:&#105;&#110;&#102;&#111;&#064;&#110;&#097;&#102;&#115;&#105;&#104;&#101;&#097;&#108;&#116;&#104;&#046;&#099;&#111;&#109;">
                  &#105;&#110;&#102;&#111;&#064;&#110;&#097;&#102;&#115;&#105;&#104;&#101;&#097;&#108;&#116;&#104;&#046;&#099;&#111;&#109;
                </Link>
              </div>
              <div className="info-piece-content">
                <Image src={PhoneIcon} alt="phone" />
                <span>800 nafsi</span>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-us-form">
          <Formik
            initialValues={{
              name:
                user && user.firstname
                  ? user.firstname + " " + (user.surname || "")
                  : "",
              email: user?.email || "",
              message: "",
              agreePrivacy: false,
            }}
            initialErrors={{
              initial: "initial error",
            }}
            validationSchema={formSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, isValid, isInitialValid }) => {
              return (
                <Form>
                  <h6 className="form-title">{t("contact_us")}</h6>
                  <div className="row">
                    <ContactUsField
                      id="name"
                      name="name"
                      placeholder={t("your_name")}
                    />
                    <ContactUsField
                      id="email"
                      name="email"
                      placeholder={t("your_email")}
                    />
                  </div>
                  <div className="row">
                    <ContactUsTextarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder={t("your_message")}
                    />
                  </div>
                  <ContactUsCheckbox
                    className="mb-mb60 md:mb-60pxt lg:mb-vw60"
                    id="privacy-policy"
                    name="agreePrivacy"
                    label={t("agree_privacy")}
                  />
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  />
                  <LoaderButton
                    isLoading={isSubmitting}
                    isDisabled={!isValid || isSubmitting}
                    classList="w-full"
                  >
                    {t("submit")}
                  </LoaderButton>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
      <style jsx>{`
        .contact-us {
          @apply w-full flex-col lg:flex-row flex justify-between gap-10 mb-mb40 md:mb-40pxt lg:mb-vw40;
        }

        .contact-us-info {
          @apply lg:w-500px;
          h3 {
            @apply font-avenirBold text-text-primary text-70pxm md:text-74pxt lg:text-70px mb-mb20 md:mb-24pxt lg:mb-vw24 leading-80pxm md:leading-80pxt lg:leading-80px;
          }

          p {
            @apply text-text-secondary text-20pxm md:text-24pxt lg:text-20px mb-mb24 md:mb-24pxt lg:mb-vw24 pb-mb24 md:pb-24pxt lg:pb-vw24;
            background-image: linear-gradient(
              to right,
              #e3e3e3 60%,
              rgba(255, 255, 255, 0) 0%
            );
            background-position: bottom;
            background-size: 10px 1px;
            background-repeat: repeat-x;
          }

          .info-piece {
            @apply mb-mb40 md:mb-40pxt lg:mb-vw40;
          }

          .info-piece-title {
            @apply text-22pxm md:text-26pxt lg:text-22px mb-mb16 md:mb-16pxt lg:mb-vw16;
          }

          .info-piece-content {
            @apply flex  gap-3 items-center text-text-secondary text-18pxm md:text-22pxt lg:text-18px;
          }
        }

        .contact-us-form {
          @apply bg-white p-mb40 md:p-40pxt lg:p-vw40;
          flex: 1;

          .form-title {
            @apply text-22pxm md:text-26pxt lg:text-22px mb-mb30 md:mb-30pxt lg:mb-vw30;
          }

          .row {
            @apply flex gap-6 mb-6;
          }
        }
      `}</style>
    </>
  )
}

export default ContactUs
