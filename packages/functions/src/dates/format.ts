import { DateTime } from 'luxon'

const toLocal = (millis: number) => DateTime.fromMillis(millis).toLocal()

export const F_DateFormats = {
  dateAndHour: (millis: number) => toLocal(millis).toFormat('yyyy/MM/dd HH:mm')
}
