

import { Network } from '~modules/Network'

export default new Network({
  middleware: [
    (data) => {
      console.log('new network request', data.endpoint)
    },
  ],
  onMiddlewareError: (data, e) => console.error('middleware error', e),
  onRequestErrorResponse: (data, e) => console.error('request error', e),
})
