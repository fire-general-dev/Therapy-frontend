import moment from "moment"

export const getTimeStops = (start, end, duration) => {
  var startTime = moment(start, "HH:mm")
  var endTime = moment(end, "HH:mm")

  if (endTime.isBefore(startTime)) {
    endTime.add(1, "day")
  }

  var timeStops = []

  while (startTime <= endTime) {
    timeStops.push(new moment(startTime).format("HH:mm"))
    startTime.add(duration, "minutes")
  }
  return timeStops
}
