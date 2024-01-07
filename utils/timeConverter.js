const TimeConverter = (seconds) => {
  if (seconds < 3600) {
    return new Date(seconds * 1000).toISOString().slice(14, 19)
  }
  return new Date(seconds * 1000).toISOString().slice(11, 19)
}
export default TimeConverter
