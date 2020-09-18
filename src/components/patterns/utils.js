export const uuidv4 = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
export const formatTwoDigits = digit => `${digit < 10 ? "0" : ""}${digit}`

export const formatTime = (seconds, asFreeText) => {
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  const remainingSeconds = seconds % 60
  if (asFreeText && hours) {
    return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`
  }
  if (asFreeText && minutes) {
    return `${minutes}m ${remainingSeconds}s`
  }
  if (asFreeText) {
    return `${seconds}s`
  }
  if (hours) {
    return `${formatTwoDigits(hours)}:${formatTwoDigits(
      remainingMinutes
    )}:${formatTwoDigits(remainingSeconds)}`
  }
  return `${formatTwoDigits(minutes)}:${formatTwoDigits(remainingSeconds)}`
}
