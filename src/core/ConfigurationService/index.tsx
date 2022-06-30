import create from 'zustand'
import { ComponentChildren, h, Fragment } from 'preact'
import { SdkConfiguration } from '~types/api'
import { getSdkConfiguration } from '~utils/onfidoApi'
import deepmerge from 'deepmerge'
import { useEffect } from 'preact/compat'

type SdkConfigurationServiceProviderProps = {
  children: ComponentChildren
  url?: string
  token?: string
  fallback?: ComponentChildren
  overrideConfiguration?: Partial<SdkConfiguration>
}

const defaultConfiguration: SdkConfiguration = {
  loading: true,
  experimental_features: {
    enable_multi_frame_capture: false,
    motion_experiment: {
      enabled: false,
    },
  },
  sdk_features: {
    enable_require_applicant_consents: true,
  },
  document_capture: {
    max_total_retries: 1,
  },
}

const useSdkConfigurationService = create(() => defaultConfiguration)
export default useSdkConfigurationService

const {
  getState: getSdkConfigurationState,
  setState: setSdkConfigurationState,
} = useSdkConfigurationService

export const SdkConfigurationServiceProvider = ({
  children,
  url,
  token,
  fallback,
  overrideConfiguration = {},
}: SdkConfigurationServiceProviderProps) => {
  const state = useSdkConfigurationService()

  useEffect(() => {
    if (!url || !token) {
      return
    }

    getSdkConfiguration(url, token)
      .then((apiConfiguration) => {
        const config = deepmerge(
          deepmerge(defaultConfiguration, apiConfiguration),
          // TODO: Cleanup the overrideConfigurationState and add it to the mock server
          process.env.NODE_ENV === 'production' ? {} : overrideConfiguration
        )
        setSdkConfigurationState({ ...config, loading: false })
      })
      .catch((e) => {
        // TODO: Add error tracking
        setSdkConfigurationState(defaultConfiguration)
      })
  }, [])

  if (state.loading) {
    return <Fragment>{fallback}</Fragment>
  }

  return <Fragment>{children}</Fragment>
}

export { getSdkConfigurationState }
