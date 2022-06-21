/* eslint max-len: 0 */
export const IntegratorErrorKeys = {
  CROSS_DEVICE_WITHOUT_CAMERA: 'Already on cross device flow but no camera detected',
  UNABLE_TO_COMPLETE_FLOW_FALLBACK_NOT_ALLOWED: 'Unable to complete the flow: upload fallback not allowed',
}

export type IntegratorErrorKeysType = keyof typeof IntegratorErrorKeys
