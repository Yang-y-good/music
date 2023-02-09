import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
// HH:mm:ss
const DATE_TIME_FORMAT = 'YYYY-MM-DD '

export function DateTimeFormat(utcDate, format = DATE_TIME_FORMAT) {
  return dayjs.utc(utcDate).format(format)
}

