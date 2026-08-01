export function F_GetTaskPriceRange (
  minValue: number,
  maxValue: number
): { min: null | number, max: null | number} {

  // For 0 and negative number, minValue is null
  // or the value otherwise
  let min = minValue > 0 ? minValue : null

  // For infinite, max is null
  // Other wise, its has to be greater then min
  let max = isFinite(maxValue)
    ? Math.max((min ?? 0) + 1, maxValue)
    : null

  return { min, max }
}