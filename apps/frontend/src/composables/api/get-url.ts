import type { RequestQueryValues } from '@/composables/api/types'

export  function getUrl (baseUrl: string, path: string, query?: RequestQueryValues): string {
  const url = new URL(`${baseUrl}/${path}`)

  if(query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, String(value))
    })
  }

  return url.href
}
