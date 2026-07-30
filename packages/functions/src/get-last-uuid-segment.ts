export function F_GetLastUuidSegment (uuid: string): string {
  const segments = uuid.split('-')
  return segments.length > 0
    ? segments[segments.length - 1]
    : ''
}