export function isValueOfArray<const T extends readonly string[]>(
  value: unknown,
  allowedValues: T,
  allowEmpty = false
): null | T[number] {

  if (typeof value !== 'string') return null
  const isEmpty = value.trim() === ''
  if (isEmpty && !allowEmpty) return null

  const allowedSet = new Set(allowedValues)

  return allowedSet.has(value) ? value : null
}
