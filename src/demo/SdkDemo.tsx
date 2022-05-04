import { h, FunctionComponent } from 'preact'
import { memo, useEffect, useState } from 'preact/compat'
import {
  UIConfigs,
  getInitSdkOptions,
  queryParamToValueString,
  getTokenFactoryUrl,
  getToken,
  createCheckIfNeeded,
} from './demoUtils'
import SdkMount from './SdkMount'
import ApplicantForm from './ApplicantForm'

import type {
  ServerRegions,
  SdkOptions,
  SdkResponse,
  SdkError,
  UserExitCode,
} from '~types/sdk'
import type { ApplicantData } from './types'

const DEFAULT_REGION: ServerRegions = 'EU'

type Props = {
  hasPreview?: boolean
  messagePort?: MessagePort
  sdkOptions?: SdkOptions
  viewOptions?: UIConfigs
}

const SdkDemo: FunctionComponent<Props> = ({
  hasPreview = false,
  messagePort,
  sdkOptions,
  viewOptions,
}) => {
  const [workflow, setWorkflow] = useState<any>(undefined)
  const [token, setToken] = useState<string | undefined>(undefined)
  const [tokenUrl, setTokenUrl] = useState<string | undefined>(undefined)
  const [regionCode, setRegionCode] = useState<ServerRegions | undefined>(
    undefined
  )
  const [applicantId, setApplicantId] = useState<string | undefined>(undefined)
  const [applicantData, setApplicantData] = useState<ApplicantData | undefined>(
    undefined
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const initSdkOptions = getInitSdkOptions()

  const { workflowRunId } = queryParamToValueString

  useEffect(() => {
    if (queryParamToValueString.createCheck && !applicantData) {
      return
    }

    if (queryParamToValueString.showUserAnalyticsEvents) {
      window.addEventListener('userAnalyticsEvent', (event) =>
        console.info('* DEMO APP Custom User Analytics event:', event)
      )
    }

    const { region } = sdkOptions || {}

    const builtRegionCode = (
      queryParamToValueString.region ||
      region ||
      DEFAULT_REGION
    ).toUpperCase() as ServerRegions
    setRegionCode(builtRegionCode)

    const url = getTokenFactoryUrl(builtRegionCode)
    setTokenUrl(url)

    if (queryParamToValueString.token) {
      setToken(queryParamToValueString.token)
    } else {
      getToken(
        hasPreview,
        url,
        applicantData,
        messagePort,
        (respondedToken, responedApplicantId) => {
          setToken(respondedToken)
          setApplicantId(responedApplicantId)
        }
      )
    }
  }, [hasPreview, applicantData, messagePort, sdkOptions])

  const onComplete = (data: SdkResponse) => {
    if (hasPreview) {
      messagePort?.postMessage({ type: 'SDK_COMPLETE', data })
      return
    }

    if (initSdkOptions.onComplete) initSdkOptions.onComplete(data)

    console.log('Complete with data!', data)
    createCheckIfNeeded(tokenUrl, applicantId, data)
  }

  const onError = (error: SdkError) => {
    if (initSdkOptions.onError) initSdkOptions.onError(error)
    console.error('onError callback:', error)
  }

  const onUserExit = (userExitCode: UserExitCode) => {
    if (initSdkOptions.onUserExit) initSdkOptions.onUserExit(userExitCode)
    console.log('onUserExit callback:', userExitCode)
  }

  const { tearDown } = viewOptions || {}

  if (tearDown) {
    return <span>SDK has been torn down</span>
  }

  const options: SdkOptions = {
    ...initSdkOptions,
    token,
    isModalOpen,
    onComplete,
    onError,
    onUserExit,
    onModalRequestClose: () => setIsModalOpen(false),
    workflowRunId: queryParamToValueString.workflowRunId,
    ...(sdkOptions || {}),
  }

  const applicantForm = applicantData ? (
    'Loading ...'
  ) : (
    <ApplicantForm onSubmit={setApplicantData} />
  )

  return (
    <div className="container">
      {options.useModal && (
        <button id="button" type="button" onClick={() => setIsModalOpen(true)}>
          Verify identity
        </button>
      )}
      {token && queryParamToValueString.createCheck && applicantForm}
      {token && regionCode && tokenUrl && (
        <SdkMount
          options={{
            ...options,
            onComplete: (data) => {
              console.log('data', data)
            },
            enterpriseFeatures: {
              useCustomizedApiRequests: true,
              onSubmitDocument: (documentData) => {
                console.log('onSubmitDocument', documentData)
                return {
                  onfidoSuccessResponse: {
                    applicant_id: '9e6bd2fd-7792-4d61-84b9-0baab1d3ae78',
                    created_at: '2022-05-04T14:01:51Z',
                    download_href:
                      '/v3.3/documents/2cb43185-3975-40aa-b053-7d56472c3489/download',
                    file_name: 'passport.jpg',
                    file_size: 327310,
                    file_type: 'jpg',
                    href:
                      '/v3.3/documents/2cb43185-3975-40aa-b053-7d56472c3489',
                    id: '2cb43185-3975-40aa-b053-7d56472c3489',
                    issuing_country: null,
                    sdk_warnings: {
                      image_quality: {
                        breakdown: {
                          blur: {
                            blur_model: 'deep_blur',
                            has_blur: false,
                            max: 1,
                            min: 0,
                            score: 0.999986827373505,
                            threshold: 0.221164236133333,
                          },
                          cutoff: {
                            has_cutoff: false,
                            max: 1,
                            min: 0,
                            score: 0.0448807854137447,
                            threshold: 0.015,
                          },
                          document: {
                            detection_score: 0.999889373779297,
                            has_document: true,
                            max: 1,
                            min: 0,
                            threshold: 0.0,
                          },
                          glare: {
                            bbox: [
                              699.651330471039,
                              127.869314074516,
                              892.391940951347,
                              372.318295955658,
                            ],
                            glare_model: 'deep_glare',
                            has_glare: false,
                            score: 0.997379839420319,
                            threshold: 0.0283260488510132,
                          },
                          has_document: true,
                        },
                        image_quality_uuid:
                          '3f2b1ed8-1876-4573-835c-3b2e78e329a5',
                        quality: 'good',
                      },
                    },
                    side: 'front',
                    type: 'passport',
                  },
                }
              },
              onSubmitSelfie: (selfieData) => {
                console.log('onSubmitSelfie', selfieData)
                return {
                  onfidoSuccessResponse: {
                    id: '046094c2-af51-4a4f-81d8-91fc6c36f6f0',
                    created_at: '2022-05-04T14:03:44Z',
                    file_name: 'applicant_selfie.png',
                    file_type: 'image/png',
                    file_size: 1545033,
                    href:
                      '/v3/live_photos/046094c2-af51-4a4f-81d8-91fc6c36f6f0',
                    download_href:
                      '/v3/live_photos/046094c2-af51-4a4f-81d8-91fc6c36f6f0/download',
                  },
                }
              },
            },
          }}
          regionCode={regionCode}
          url={tokenUrl}
          workflow={!!workflowRunId}
        />
      )}
    </div>
  )
}

export default memo(SdkDemo)
