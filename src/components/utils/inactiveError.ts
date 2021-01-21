import type { ErrorProp } from '~types/commons'

export const getInactiveError = (
  isUploadFallbackDisabled: boolean
): ErrorProp => ({
  name: isUploadFallbackDisabled
    ? 'CAMERA_INACTIVE_NO_FALLBACK'
    : 'CAMERA_INACTIVE',
  type: 'warning',
})
