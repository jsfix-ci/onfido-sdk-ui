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

import { BrowserClient } from "@sentry/browser"

let sentryClient: BrowserClient | undefined
let sentryHub: Hub | undefined

// export const install = () => {
//   // sentryClient = new BrowserClient({

//   // })
// }