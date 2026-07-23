export type RequestQueryValues = Record<string, string | number>

type RequestBaseOptions = {
  method: 'GET' | 'POST' | 'PATCH'
  baseUrl: string
  path: string
}

export type RequestOptions<Body = never, Query extends RequestQueryValues = never> =
  RequestBaseOptions
  & ([Body] extends [never] ? Record<never, never> : { body: Body })
  & ([Query] extends [never] ? Record<never, never> : { query: Query })
