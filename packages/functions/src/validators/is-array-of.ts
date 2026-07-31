export function isArrayOf<const T extends readonly string[]>(
  value: unknown,
  allowedValues: T,
  allowEmpty = false
): null | T[number][] {

  if (!Array.isArray(value)) return null
  if (value.length === 0 && !allowEmpty) return null

  const allowedSet = new Set(allowedValues)

  const invalidValue = value.some(v => {
    if (typeof v !== 'string') return false
    if (!allowedSet.has(v)) return false
    return true
  })

  if (!invalidValue) return null
  return value
}
