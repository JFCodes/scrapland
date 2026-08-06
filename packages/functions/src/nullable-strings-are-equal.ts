export function F_NullableStringsAreEqual (left: null | string, right: null | string, trim = false): boolean {
  if (left === null && right === null) return true

  if (left === null && right !== null) return false
  if (left !== null && right === null) return false

  return trim
    ? left!.trim() === right!.trim()
    : left === right
}