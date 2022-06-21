import { IntegratorErrorKeys, IntegratorErrorKeysType } from './Errors'

export const triggerIntegratorError = (key: IntegratorErrorKeysType) => {
  console.log('Intergrator error', key, IntegratorErrorKeys[key])
}

// ParsedError -> api.ts
// buildError

export type ParsedError = {
  response: {
    error?:
      | AuthorizationError
      | ExpiredTokenError
      | ValidationError
      | AccessDeniedError
      | UnknownError
    type?: string
    message?: string
  }
  status?: number
}

// TODO: remove postToBackend
const formatApiError = ({ response, status }: ParsedError) => {
  const errorResponse = response.error || response || {}

  const errorResponse = response.error || response || {}

  const isExpiredTokenError =
    status === 401 && errorResponse.type === 'expired_token'
  const type = isExpiredTokenError ? 'expired_token' : 'exception'

  // `/validate_document` returns a string only. Example: "Token has expired."
  // Ticket in backlog to update all APIs to use signature similar to main Onfido API
  const message = errorResponse.message || response.message || 'Unknown error'
  return { type, message }
}
