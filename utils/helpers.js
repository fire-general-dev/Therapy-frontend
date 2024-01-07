import moment from "moment"

export const isRTLLayout = (router) => {
  return router.locale === "ar"
}

export const isSameDay = (date1, date2) => {
  const date1Year = date1.get("year")
  const date1Month = date1.get("month")
  const date1Day = date1.get("date")

  const date2Year = date2.get("year")
  const date2Month = date2.get("month")
  const date2Day = date2.get("date")

  return (
    date1Year === date2Year &&
    date1Month === date2Month &&
    date1Day === date2Day
  )
}

export const isDoctorUser = (user) => user?.role?.type === "doctors"

export const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
    )

export const isPreviouseTime = (time) => {
  const hours = time.split(":")[0]
  const min = time.split(":")[1]

  const currentTime = new Date()
  const currentHour = currentTime.getHours()
  const currentMin = currentTime.getMinutes()

  return currentHour > hours || (currentHour == hours && currentMin > min)
}

export const isBefore24Hours = (endDate) => {
  var now = moment(new Date())
  var end = moment(endDate)

  var duration = moment.duration(end.diff(now))
  return duration.asHours() > 24
}

export const isAftereNow = (endDate) => {
  var now = moment(new Date())
  var end = moment(endDate)

  return end.isAfter(now)
}

export const getHoursDiff = (endDate) => {
  var now = moment(new Date())
  var end = moment(endDate)

  var duration = moment.duration(end.diff(now))
  return Number(duration.asHours().toFixed(0))
}

export const getMinsDiff = (endDate) => {
  var now = moment(new Date())
  var end = moment(endDate)

  var duration = moment.duration(end.diff(now))
  return Number(duration.asMinutes().toFixed(0))
}

export const checkLessTen = (number) => {
  return number < 10 ? `0${number}` : number
}

export function convert24to12(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ]

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1) // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM" // Set AM/PM
    time[0] = +time[0] % 12 || 12 // Adjust hours
  }
  return time.join("") // return adjusted time or original string
}

export const getDayName = (date) =>
  date.toLocaleDateString("en", { weekday: "long" })

export function isEmptyOpject(obj) {
  return Object.keys(obj).length === 0
}
