import type { Page } from 'playwright'

type FetchOptions = {
  method: 'GET' | 'POST'
  headers?: HeadersInit
  body?: object
  url: string
}

export async function PageEvaluateFetch <Response> (page: Page, options: FetchOptions): Promise<string | Response> {
  return page.evaluate(async (options: FetchOptions) => {
    const { method, headers, body, url } = options

    const init: RequestInit = {
      ...(body && { body: JSON.stringify(body) }),
      headers,
      method
    }

    const response = await fetch(url, init)
    const responseText = await response.text()
    const contentType = response.headers.get('content-type') ?? ''
    const expectedJson = contentType.includes('application/json') 

    try {
      return expectedJson
        ? JSON.parse(responseText) as Response
        : responseText
    } catch (error) {
      throw error
    }
  }, options)
}
