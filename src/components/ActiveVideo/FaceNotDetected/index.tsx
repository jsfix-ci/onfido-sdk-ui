import { h, FunctionComponent } from 'preact'
import styles from './style.module.scss'
import { Button } from '../Button'
import { Footer } from '../Footer'
import { Header } from '../Header'
import { Error } from '../assets/ErrorIcon'
import { SunIcon } from '../assets/SunIcon'
import { EyeIcon } from '../assets/EyeIcon'
import { MaskIcon } from '../assets/MaskIcon'
import { PersonIcon } from '../assets/PersonIcon'
import { Wrapper } from '../Wrapper'
import { BaseScreen } from '../BaseScreen'

interface Props {
  restart: () => void
  localization: object
}

export const FaceNotDetected: FunctionComponent<Props> = ({
  restart,
  localization,
}: Props) => {
  const items = [
    {
      icon: <SunIcon />,
      label: getTranslation(
        'avc_no_face_detected.list_item_lighting',
        localization
      ),
    },
    {
      icon: <EyeIcon />,
      label: getTranslation(
        'avc_no_face_detected.list_item_eyes',
        localization
      ),
    },
    {
      icon: <MaskIcon />,
      label: getTranslation(
        'avc_no_face_detected.list_item_mask',
        localization
      ),
    },
    {
      icon: <PersonIcon />,
      label: getTranslation(
        'avc_no_face_detected.list_item_face',
        localization
      ),
    },
  ]

  return (
    <BaseScreen>
      <Wrapper>
        <Header
          title={getTranslation('avc_no_face_detected.title', localization)}
        >
          <Error />
        </Header>

        <ul className={styles.list}>
          {items.map((item, index) => (
            <li className={styles.listItem} key={index}>
              {item.icon} <span className={styles.text}>{item.label}</span>
            </li>
          ))}
        </ul>
      </Wrapper>

      <Footer>
        <Button onClick={() => restart()}>
          {getTranslation(
            'avc_no_face_detected.button_primary_restart',
            localization
          )}
        </Button>
      </Footer>
    </BaseScreen>
  )
}
