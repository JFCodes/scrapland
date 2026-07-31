export function isNonEmptyString(value: unknown, fallback?: string): null | string {
  if (typeof value !== 'string') return fallback ?? null
  if (!value || !value.trim()) return fallback ?? null
  return value
}