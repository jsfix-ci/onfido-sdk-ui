export type HttpRequestData = {
  method?: 'GET' | 'POST' | 'PATCH'
  contentType?: string
  endpoint: string
  headers?: Record<string, string>
  payload?: string | FormData
  token?: string
}

export type IMiddleware = (
  httpRequestData: HttpRequestData
) => void | HttpRequestData

export type SuccessCallback<T> = (response: T) => void
export type ErrorCallback = (error: ApiRawError) => void
export type ApiRawError = {
  response: string
  status: number
}
