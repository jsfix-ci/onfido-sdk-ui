import { h, FunctionComponent } from 'preact'
import { TranslateCallback } from '@onfido/active-video-capture'
import { Button } from '../Button'
import { Footer } from '../Footer'
import { Header } from '../Header'
import { Wrapper } from '../Wrapper'
import { CameraIcon } from '../assets/CameraIcon'
import { BaseScreen } from '../BaseScreen'

interface Props {
  upload: () => void
  translate: TranslateCallback
}

export const RecordingComplete: FunctionComponent<Props> = ({
  upload,
  translate,
}: Props) => {
  return (
    <BaseScreen>
      <Wrapper>
        <Header
          title={translate('avc_confirmation.title')}
          subtitle={translate('avc_confirmation.subtitle')}
        >
          <CameraIcon />
        </Header>
      </Wrapper>

      <Footer>
        <Button onClick={() => upload()}>
          {translate('avc_confirmation.button_primary_upload')}
        </Button>
      </Footer>
    </BaseScreen>
  )
}
