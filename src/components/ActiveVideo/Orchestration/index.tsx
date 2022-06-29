import { ActiveVideoCapture, LivenessError } from '@onfido/active-video-capture'
import { h, Fragment, FunctionComponent } from 'preact'
import { useState } from 'preact/hooks'
import { FaceNotDetected } from '../FaceNotDetected'
import { Intro } from '../Intro'
import { RecordingComplete } from '../RecordingComplete'
import { Uploading } from '../Uploading'

enum Screen {
  INTRO,
  VIDEO_CAPTURE,
  RECORDING_COMPLETED,
  UPLOAD,
  ERROR,
}

interface Props {
  locale: object
  debugMode?: boolean
  onVideoPayload: (video: Blob) => void
}

export const Orchestration: FunctionComponent<Props> = ({
  locale,
  debugMode,
  onVideoPayload,
}) => {
  const [videoPayload, setVideoPayload] = useState<any>(null)
  const [currentScreen, setCurrentScreen] = useState(Screen.INTRO)
  const [error, setError] = useState<LivenessError | null>()

  const printSuccess = (event: any) => {
    setVideoPayload(event?.videoPayload)
    onVideoPayload(event?.videoPayload)
    setCurrentScreen(Screen.RECORDING_COMPLETED)
  }

  const options: any = { language: locale }

  /**
   * Control the screen flow.
   * @returns The current screen.
   */
  const getCurrentScreen = () => {
    switch (currentScreen) {
      case Screen.INTRO:
        return (
          <Intro
            onReady={() => setCurrentScreen(Screen.VIDEO_CAPTURE)}
            localization={locale}
          />
        )

      case Screen.RECORDING_COMPLETED:
        return (
          <RecordingComplete
            upload={() => setCurrentScreen(Screen.UPLOAD)}
            localization={locale}
          />
        )

      case Screen.UPLOAD:
        return (
          <Uploading
            videoPayload={videoPayload}
            onUploadComplete={() => {
              console.log('Uploading completed!')
            }}
          />
        )

      case Screen.ERROR:
        if (error === LivenessError.FACE_DETECTION_TIMEOUT) {
          return (
            <FaceNotDetected
              restart={() => {
                setCurrentScreen(Screen.INTRO)
                setError(null)
              }}
              localization={locale}
            />
          )
        }

        return <div>Unhandled error</div>

      case Screen.VIDEO_CAPTURE:
        return (
          <ActiveVideoCapture
            debug={debugMode || false}
            options={options}
            onError={setError}
            onSuccess={printSuccess}
          />
        )
    }
  }

  return <Fragment>{getCurrentScreen()}</Fragment>
}
