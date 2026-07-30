export function F_LeftPad (value: number, size: number): string {
  const numberString = String(value)
  if (numberString.length >= size) return numberString

  const leadingZeros = size - numberString.length
  const zeros = new Array(leadingZeros).fill('0')
  return `${zeros.join('')}${numberString}`
}
