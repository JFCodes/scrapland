type EnumLike = Record<string, string | number>

export function F_GetEnumCounters<TEnum extends EnumLike, V extends TEnum[keyof TEnum]>(
  enumObj: TEnum,
  map: Map<V, number>
): Record<V, number> {

  const enumValues = Object.values(enumObj)
  return enumValues.reduce<Record<V, number>>((acc, value) => {
    acc[value as V] = map.get(value as V) ?? 0
    return acc
  }, {} as Record<V, number>)
}
