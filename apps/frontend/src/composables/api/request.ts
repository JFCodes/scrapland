import type { RequestQueryValues, RequestOptions } from '@/composables/api/types'
import { getUrl } from '@/composables/api/get-url'
import { getHeaders } from '@/composables/api/get-headers'

export async function request <
  Response,
  Body = never,
  Query extends RequestQueryValues = never
> (
  options: RequestOptions<Body, Query>
): Promise<Response> {
  const { baseUrl, method, path } = options

  const body = 'body' in options ? JSON.stringify(options.body) : null
  const query = 'query' in options ? options.query : undefined
  const url = getUrl(baseUrl, path, query)

  const init: RequestInit = {
    headers: getHeaders(),
    method,
    body,
  }

  const response = await fetch(url, init)
  const responseText = await response.text()
  const contentType = response.headers.get('content-type') ?? ''
  const expectedJson = contentType.includes('application/json')


  if (!response.ok) {
    let errorJson: string
    try {
      errorJson = await response.json()
    } catch (error) {
      throw response.status
    }
    throw errorJson
  }

  try {
    return JSON.parse(responseText) as Response
  } catch (error) {
    if (expectedJson) throw error
    return responseText as Response
  }
}
