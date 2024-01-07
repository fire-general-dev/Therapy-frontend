import React from "react"
import PropTypes from "prop-types"
import VideoPic from "./VideoPic"
import YoutubeEmbed from "../YoutubeEmbed/YoutubeEmbed"

function TherapistsAbout(props) {
  const { therapist, isMobile } = props
  return (
    <div
      className={`wrapper ${
        therapist.videoURL ? "lg:grid-cols-4" : "lg:grid-cols-3"
      }`}
    >
      <div className="about-section">
        <h3 className="title">About {therapist.title}</h3>
        <div
          className="long-description"
          dangerouslySetInnerHTML={{ __html: therapist.longDescription }}
        ></div>
      </div>
      {therapist.videoURL ? (
        <div className="video-wrapper">
          <YoutubeEmbed embedId={therapist.videoURL} />
        </div>
      ) : null}
      {/* <VideoPic item={therapist} isMobile={isMobile} /> */}
      <style jsx>{`
        .wrapper {
          @apply px-mb20 lg:px-vw360 mb-mb100 md:mb-100pxt lg:mb-vw100 mt-mb60 lg:mt-vw60 lg:grid bg-white lg:relative lg:justify-between;
        }
        .about-section {
          @apply text-black-333 col-span-3 lg:mr-vw40;
        }
        .video-wrapper {
          @apply mt-mb40 md:mt-40pxt lg:mt-vw50;
        }
        .title {
          @apply font-avenirMedium text-20pxm md:text-24pxt lg:text-20px mb-mb20 md:mb-20pxt lg:mb-vw20;
        }
        .long-description {
          @apply whitespace-pre-line;
        }

        :global(.rtl) {
          .about-section {
            @apply text-black-333 col-span-3 lg:ml-vw40;
          }
        }
      `}</style>
    </div>
  )
}

TherapistsAbout.propTypes = {}

export default TherapistsAbout
