export type RequestQueryValues = Record<string,
  | Array<string>
  | string
  | number
  | null
>

type RequestBaseOptions = {
  method: 'GET' | 'POST' | 'PATCH'
  path: string
}

export type RequestOptions<Body = never, Query extends RequestQueryValues = never> =
  RequestBaseOptions
  & ([Body] extends [never] ? Record<never, never> : { body: Body })
  & ([Query] extends [never] ? Record<never, never> : { query: Query })
