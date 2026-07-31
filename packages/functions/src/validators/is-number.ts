type Options = {
  allowInfinite?: boolean
  allowNan?: boolean
  minValue?: number
  maxValue?: number
}

export function isNumber (value: unknown, options: Options = {}): null | number {
  if (typeof value !== 'number') return null

  const { minValue, maxValue, allowInfinite, allowNan } = options

  if (isNaN(value) && !allowNan) return null
  if (!isFinite(value) && !allowInfinite) return null

  if (minValue !== undefined && value < minValue) return null
  if (maxValue !== undefined && value > maxValue) return null

  return value
}