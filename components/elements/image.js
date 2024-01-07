import { getStrapiMedia } from "utils/media"
import Image from "next/image"

import PropTypes from "prop-types"
import { mediaPropTypes } from "utils/types"
import { useState } from "react"

const NextImage = ({
  media,
  fallbackSrc = {},
  useStaticWitdth,
  customCss,
  ...props
}) => {
  // if (!media?.data?.attributes) return null
  const { url, alternativeText, width, height } =
    media?.data?.attributes || fallbackSrc
  const [imgSrc, setImgSrc] = useState(url)

  const loader = ({ src, width }) => {
    return getStrapiMedia(src)
  }

  // The image has a fixed width and height
  if (props.width && props.height && useStaticWitdth) {
    return (
      <Image
        loader={loader}
        src={imgSrc}
        alt={alternativeText || ""}
        onError={() => {
          setImgSrc(fallbackSrc.url)
        }}
        {...props}
      />
    )
  }

  // The image is responsive
  const css = customCss || {
    width: "100%",
    height: "auto",
    objectFit: "contain",
  }
  if (props.width || props.height) {
    css.width = props.width || "auto"
    css.height = props.height || "auto"
  }

  return (
    <Image
      loader={loader}
      sizes="100vw"
      style={css}
      width={width || "100%"}
      height={height || "100%"}
      src={imgSrc}
      alt={alternativeText || ""}
      className={props.className || ""}
      priority={props.priority}
      onError={() => {
        setImgSrc(fallbackSrc.url)
      }}
    />
  )
}

Image.propTypes = {
  media: mediaPropTypes,
  className: PropTypes.string,
}

export default NextImage
