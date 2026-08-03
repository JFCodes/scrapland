type Comparison = 'equal' | 'not-equal'
type Condition <T extends object, K extends keyof T> = {
  comparison: Comparison,
  value: T[K],
  key: K,
}

const passesCondition = <T extends object, K extends keyof T>(item: T, condition: Condition<T, K>) => {
  const { comparison, value, key } = condition
  return comparison === 'equal'
    ? item[key] === value
    : item[key] !== value
}

export function F_GetFiltered<
  T extends object,
  K extends keyof T
>(data: Array<T>, condition: Condition<T, K>): Array<T> {

  return data.filter(d => passesCondition(d, condition))

}

export function G_GetFilteredMulti<T extends object, K extends keyof T> (
  data: Array<T>,
  conditions: Array<Condition<T, K>>
) {

  return data.filter(d => conditions.every(condition => passesCondition(d, condition)))

}