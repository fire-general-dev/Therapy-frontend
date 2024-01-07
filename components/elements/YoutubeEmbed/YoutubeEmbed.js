import React from "react"
import PropTypes from "prop-types"

const YoutubeEmbed = ({ embedId, width = "210px", height = "362px" }) => (
  <div className="video-responsive">
    <iframe
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
      className="rounded-2xl m-auto"
    />
  </div>
)

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
}

export default YoutubeEmbed
