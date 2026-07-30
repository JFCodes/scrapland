import { F_LeftPad } from '../left-pad'

export function F_TimeToDuration (millis: number): string {
  let isNegative = millis < 0

  const absMillis = Math.abs(millis)
  const inSeconds = (absMillis - absMillis % 1000) / 1000
  const seconds = inSeconds % 60

  const inMinutes = (inSeconds - seconds) / 60
  const minutes = inMinutes % 60

  const hours = (inMinutes - minutes) / 60

  return `${isNegative ? '-' : ''}${F_LeftPad(hours, 2)}:${F_LeftPad(minutes, 2)}:${F_LeftPad(seconds, 2)}`
}

export function F_TimeToDurationNoHours (millis: number): string {
  const inSeconds = (millis - millis % 1000) / 1000
  const seconds = inSeconds % 60

  const minutes = (inSeconds - seconds) / 60

  return `${F_LeftPad(minutes, 2)}:${F_LeftPad(seconds, 2)}`
}