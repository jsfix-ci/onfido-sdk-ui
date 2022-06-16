/*
  Finger printing:

  Cases:
    - Bundled by us (dist) - sourcemap (common)
    - Bunlded by them (lib) - sourcemap (rare)
    - Bundled by them (lib) - no sourcemap (common)
    - Rebundled by them (dist) - no sourcemap (???)

  Issues/possible helpers:
    - Without sourcemap it's impossible to get a usable stacktrace
      - Use keys/names/filename to locate the origin
      - Use Sentry.addBreadcrumb to understand user journey
      - Use Sentry.setContext to provide (init) options
    - Fingerprinting based on stackstrace
      - Problem: stacktraces are different for all integrators due to url, (re)-bundle, missing sourcemaps
      - Solution: Use keys, names, filesnames to compose a consitent fingerprint across integrators (without influcence of (re)-bundle)
    - Solution: Hosted SDK (consistent stacktraces + sourcemaps)

    - User (expected) errors are logged in Sentry
      - Solution: Exclude from sentry logging
    
    - Customer errors, exceptions & errors are combined into 1 api
      - Solution: Provide api for exceptions & errors
      - Solution: Provide seperate api for customer facing (expected) errors

  Add:
    - Sentry.setLevel
    
  Maybe:
    - Sentry.setUser // company uuid? 
    - Sentry.withScope (for features, like orchrestaion?)
    - scope.addEventProcessor
*/

import { BrowserClient, Hub, Severity, EventHint } from '@sentry/browser'
import { isOnfidoHostname } from '~utils/string'

let sentryClient: BrowserClient | undefined
let sentryHub: Hub | undefined

const sdk_version = process.env.SDK_VERSION

export const install = () => {
  if (sentryClient) {
    return
  }

  sentryClient = new BrowserClient({
    dsn: 'https://6e3dc0335efc49889187ec90288a84fd@sentry.io/109946',
    environment: process.env.NODE_ENV,
    release: sdk_version,
    debug: true,
    // TODO: Make sure the whitelisting works as expected
    whitelistUrls: [/onfido[A-z.]*\.min.js/g],
    beforeBreadcrumb: (crumb) => {
      const isOnfidoXhr =
        crumb.category === 'xhr' && isOnfidoHostname(crumb.data?.url)

      const isOnfidoClick =
        crumb.category === 'ui.click' &&
        crumb.message?.includes('.onfido-sdk-ui')

      const shouldReturnCrumb = isOnfidoXhr || isOnfidoClick

      return shouldReturnCrumb ? crumb : null
    },
    // @TODO: verify these mismatched options
    // autoBreadcrumbs: { console: false },
    // shouldSendCallback: () => process.env.PRODUCTION_BUILD,
  })
  sentryHub = new Hub(sentryClient)
  sentryHub.addBreadcrumb({ level: Severity.Info })
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

export const trackException = (message: string, extra?: EventHint): void => {
  sentryHub?.captureException(new Error(message), extra)
}
