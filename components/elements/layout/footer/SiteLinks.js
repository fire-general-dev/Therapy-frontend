import React from "react"
import NafsiLogo from "@/components/nafsiLogo"
import Facebook from "@/components/elements/socialIcons/Facebook"
import Twitter from "@/components/elements/socialIcons/Twitter"
import Instagram from "@/components/elements/socialIcons/Instagram"
import LinkedIn from "@/components/elements/socialIcons/LinkedIn"
import Link from "next/link"
import { useTranslation } from "next-i18next"
import Youtube from "../../socialIcons/Youtube"

function SiteLinks(props) {
  const { t } = useTranslation()

  return (
    <div className="wrapper">
      <div className="column middle">
        <NafsiLogo />
      </div>
      <div className="row">
        <div className="column">
          <Link href="/">
            <span className="link tab">{t("home")}</span>
          </Link>
          <Link href="/therapists">
            <span className="link tab">{t("therapists")}</span>
          </Link>
          <Link href="/specialties">
            <span className="link tab">{t("specialties")}</span>
          </Link>
          <Link href="/quizzes">
            <span className="link tab">{t("am_ok")}</span>
          </Link>
        </div>
        <div className="column">
          <Link href="/#what-we-offer-section">
            <span className="link tab">{t("the_how")}</span>
          </Link>
          <span className="link tab">{t("the_who")}</span>
          <Link href="/articles">
            <span className="link tab">{t("blog")}</span>
          </Link>
          <Link href="/contact-us">
            <span className="link tab">{t("contact_us")}</span>
          </Link>
        </div>
        <div className="column">
          <Link href="https://www.facebook.com/nafsihealth">
            <span className="social-container">
              <div className="icon-container">
                <Facebook inline />
              </div>{" "}
              <span className="link social-text">{t("facebook")}</span>
            </span>
          </Link>

          <Link href="https://twitter.com/nafsihealth">
            <span className="social-container">
              <div className="icon-container">
                <Twitter inline />
              </div>{" "}
              <span className="link social-text">{t("twitter")}</span>
            </span>
          </Link>
          <Link href="https://instagram.com/nafsihealth">
            <span className="social-container">
              <div className="icon-container">
                <Instagram inline />
              </div>{" "}
              <span className="link social-text">{t("instagram")}</span>
            </span>
          </Link>
          <Link href="https://www.youtube.com/@NafsiHealth">
            <span className="social-container">
              <div className="icon-container">
                <Youtube inline />
              </div>{" "}
              <span className="link social-text">{t("youtube")}</span>
            </span>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          @apply py-mb28 px-mb20 lg:px-vw360 flex flex-col lg:flex-row lg:py-vw40 font-sans text-14pxm lg:text-14px text-black-0 border-t border-gray-f0 bg-white;
        }
        .row {
          @apply flex flex-[3];
        }
        .column {
          @apply flex flex-col flex-1;
          &.middle {
            @apply justify-center items-center lg:items-start mb-mb60 lg:my-0;
          }
          span {
            @apply cursor-pointer transition-all duration-500 inline-block relative w-fit fill-black-0;
            &:hover {
              @apply text-black-444 !fill-black-444;

              .link:after {
                transform: scaleX(1);
                transform-origin: bottom left;
              }
            }
          }
          .link {
            &:after {
              @apply lg:w-full lg:absolute;
              content: "";
              transform: scaleX(0);
              height: 0.5px;
              max-height: 0.5px;
              bottom: 0;
              left: 0;
              background-color: #444444;
              transform-origin: bottom left;
              transition: transform 0.5s ease-in-out;
            }
            &:hover:after {
              transform: scaleX(1);
              transform-origin: bottom left;
            }
          }

          .social-container {
            @apply mb-mb12 lg:mb-vw08;
          }
          .tab {
            @apply mb-mb12 lg:mb-vw08;
          }
          .icon-container {
            @apply inline-block;
            width: 20px;
          }

          .social-text {
            @apply mx-vw40 md:mx-40pxt lg:mx-vw08;
          }
        }
      `}</style>
    </div>
  )
}

SiteLinks.propTypes = {}

export default SiteLinks
