type EnumLike = Record<string, string | number>

export function isEnumValue<
  E extends EnumLike,
  V extends E[keyof E]
>(value: unknown, enumObj: E): null | V {
  const isString = typeof value === 'string'
  const isNumber = typeof value === 'number'

  if (!isString && !isNumber) return null

  const enumValueSet = new Set(Object.values(enumObj))
  if (!enumValueSet.has(value)) return null

  return value as V
}