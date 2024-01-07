import MobileDetect from "mobile-detect"

export const extractDeviceType = (req) => {
  let userAgent
  let deviceType
  if (req) {
    userAgent = req.headers["user-agent"]
  } else if (typeof window !== "undefined") {
    userAgent = window.navigator.userAgent
  }
  const md = new MobileDetect(userAgent)
  if (md.tablet()) {
    deviceType = "tablet"
  } else if (md.mobile()) {
    deviceType = "mobile"
  } else {
    deviceType = "desktop"
  }
  return deviceType
}
