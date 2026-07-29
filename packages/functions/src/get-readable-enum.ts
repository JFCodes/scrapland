export function F_ReadableEnum (value: string): string {
  return value
    .replaceAll('_', ' ')
    .replaceAll('-', ' ')
    .toLowerCase()
    .trim()
}
