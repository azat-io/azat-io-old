export let timeConvert = (totalMinutes: number): string => {
  let hours = totalMinutes / 60
  let rhours = Math.floor(hours)
  let minutes = (hours - rhours) * 60
  let rminutes = Math.round(minutes)
  return (
    (rhours > 0 ? `${rhours} h. ` : '') +
    (rminutes > 0 ? `${rminutes} min.` : '')
  )
}
