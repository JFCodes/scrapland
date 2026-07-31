type EnumLike = Record<string, string | number>

export function isArrayOfEnum<
  E extends EnumLike,
  V extends E[keyof E]
> (value: unknown, enumObj: E, allowEmpty = false): null | Array<V> {
  if (!Array.isArray(value)) return null

  if (value.length === 0 && !allowEmpty) return null

  const enumValueSet = new Set(Object.values(enumObj))
  const invalidValue = value.some(v => !enumValueSet.has(v))
  if (invalidValue) return null

  return value
}