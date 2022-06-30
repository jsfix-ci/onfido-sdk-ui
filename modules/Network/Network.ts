import {
  ApiRawError,
  HttpRequestData,
  IMiddleware,
  SuccessCallback,
} from './types'

type onMiddlewareError = (
  error: Error,
  httpRequestData: HttpRequestData
) => void

type onRequestErrorResponse = (
  request: XMLHttpRequest,
  HttpRequestData: HttpRequestData
) => void

export type NetworkProps = {
  middleware: IMiddleware[]
  onMiddlewareError?: onMiddlewareError
  onRequestErrorResponse?: onRequestErrorResponse
}

export class Network {
  middleware: NetworkProps['middleware'] = []
  onMiddlewareError?: onMiddlewareError
  onRequestErrorResponse?: onRequestErrorResponse

  constructor(props: NetworkProps) {
    this.middleware = props?.middleware ?? this.middleware
    this.onMiddlewareError = props?.onMiddlewareError ?? this.onMiddlewareError
    this.onRequestErrorResponse =
      props?.onRequestErrorResponse ?? this.onRequestErrorResponse
  }

  public performHttpRequest = <T>(
    httpRequestData: HttpRequestData,
    onSuccess: SuccessCallback<T>,
    onError: (error: ApiRawError) => void
  ) => {
    // TODO: Add exception handling (try/catch)
    this.executeHttpRequest(
      this.applyMiddleware(httpRequestData),
      onSuccess,
      onError
    )
  }

  private applyMiddleware = (
    httpRequestData: HttpRequestData
  ): HttpRequestData => {
    return this.middleware.reduce((reducedHttpRequestData, middleware) => {
      let result

      if (middleware && typeof middleware === 'function') {
        try {
          result = middleware(httpRequestData)
        } catch (e) {
          result = null

          if (this.onMiddlewareError) {
            this.onMiddlewareError(e as Error, httpRequestData)
          } else {
            throw e
          }
        }
      }

      return result || reducedHttpRequestData
    }, httpRequestData)
  }

  private executeHttpRequest = <T>(
    httpRequestData: HttpRequestData,
    onSuccess: SuccessCallback<T>,
    onError: (error: ApiRawError) => void
  ) => {
    const {
      method = 'POST',
      contentType,
      endpoint,
      headers,
      payload,
      token,
    } = httpRequestData

    const request = new XMLHttpRequest()
    request.open(method, endpoint)

    if (contentType) {
      request.setRequestHeader('Content-Type', contentType)
    }

    Object.entries(headers || {}).forEach(([key, value]) =>
      request.setRequestHeader(key, value)
    )

    if (token) {
      request.setRequestHeader('Authorization', token)
    }

    // @ts-ignore
    const sessionId = window.sessionId
    if (process.env.NODE_ENV !== 'production' && sessionId) {
      request.setRequestHeader('X-Session-Id', sessionId)
    }

    // TODO: Add error handling
    request.onload = () => {
      if (request.status === 200 || request.status === 201) {
        const contentType = request.getResponseHeader('content-type')
        if (contentType && contentType.startsWith('application/json')) {
          onSuccess(JSON.parse(request.response))
        } else {
          onSuccess(request.response)
        }
      } else if (request.status === 204) {
        onSuccess(request.response)
      } else {
        this.onRequestError(onError, httpRequestData, request)
      }
    }
    request.onerror = () =>
      this.onRequestError(onError, httpRequestData, request)

    request.send(payload)
  }

  private onRequestError = (
    onError: (error: ApiRawError) => void,
    httpRequestData: HttpRequestData,
    request: XMLHttpRequest
  ) => {
    onError(request)
    if (this.onRequestErrorResponse) {
      this.onRequestErrorResponse(request, httpRequestData)
    }
  }
}
