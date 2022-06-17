import { BrowserClientOptions } from '@sentry/browser/types/client'
import { isOnfidoHostname } from '~utils/string'
import {
  BrowserClient,
  defaultStackParser,
  Hub,
  makeFetchTransport,
  SeverityLevel,
  Dedupe,
  InboundFilters,
  FunctionToString,
  wrap,
} from '@sentry/browser'
import { extendPreact } from './extendPreact'
export { ErrorBoundary } from './ErrorBoundary'
export type { EventHint } from '@sentry/browser'

let sentryClient: BrowserClient | undefined
let sentryHub: Hub | undefined

const sdk_version = process.env.SDK_VERSION

export const install = () => {
  if (sentryClient) {
    return
  }

  extendPreact()

  // TODO: Add enviroment variable to support this
  // const canUseGlobalListeners = false

  const integrations = [
    // TODO: Enable when we add support for globalListeners
    // canUseGlobalListeners && new GlobalHandlers(),
    // canUseGlobalListeners && new TryCatch(),
    // canUseGlobalListeners && new HttpContext(),
    new Dedupe(),
    new InboundFilters(),
    new FunctionToString(),
  ].filter(Boolean) as BrowserClientOptions['integrations']

  sentryClient = new BrowserClient({
    transport: makeFetchTransport,
    stackParser: defaultStackParser,
    integrations,

    dsn:
      'https://6e3dc0335efc49889187ec90288a84fd@o26033.ingest.sentry.io/109946',
    environment: process.env.NODE_ENV,
    release: sdk_version,

    // Attempts to print out useful debugging information if something goes wrong with sending the event.
    debug: process.env.NODE_ENV === 'development',

    // Attach stracktraces to messages. Exceptions are done by default
    attachStacktrace: true,
    autoSessionTracking: true,

    beforeBreadcrumb: (crumb) => {
      const isOnfidoXhr =
        crumb.category &&
        crumb.category === 'xhr' &&
        isOnfidoHostname(crumb.data?.url)

      const isOnfidoClick =
        crumb.category &&
        crumb.category === 'ui.click' &&
        crumb.message?.includes('.onfido-sdk-ui')

      if (isOnfidoXhr === false || isOnfidoClick === false) {
        return null
      }

      return crumb
    },

    beforeSend: (event, hint) => {
      const origin = hint.data?.exceptionOrigin
      if (origin && origin.file && origin.method) {
        event.fingerprint = [origin.file, origin.method]
      }

      // HintData isn't visible in Sentry UI.
      // We add it as a breadcumb to only this event to make it visible
      if (hint.data) {
        event.breadcrumbs?.push({
          timestamp: Date.now(),
          level: 'info',
          message: 'data',
          data: hint.data,
        })
      }

      return event
    },
  })

  sentryHub = new Hub(sentryClient)
  sentryHub.addBreadcrumb({ level: 'info' as SeverityLevel })
}

export const uninstall = () => {
  if (!sentryClient) {
    return
  }

  sentryClient.close(2000).then(() => {
    sentryClient = undefined
    sentryHub = undefined
  })
}

export const captureException = (
  error: Error,
  data?: Record<string, unknown>,

  // Injected in build process (not in hot-reload)
  file?: string,
  method?: string,
  lineNumber?: number
): void => {
  let exceptionOrigin

  if (file || method || lineNumber) {
    exceptionOrigin = { file, method, lineNumber }
    addBreadcrumb({
      level: 'info',
      message: 'Exception Origin',
      data: exceptionOrigin,
    })
  }

  sentryHub?.captureException(error, {
    data: {
      ...(data || {}),
      exceptionOrigin,
    },
  })
}

export const tryCatch = wrap

type IBreadcrumbProps = {
  level?: SeverityLevel
  message: string
  data?: Record<string, unknown>
}

export const addBreadcrumb = ({ level, message, data }: IBreadcrumbProps) => {
  sentryHub?.addBreadcrumb({
    level: level || ('info' as SeverityLevel),
    message,
    data,
  })
}
