import { TranslateCallback } from '@onfido/active-video-capture'
import { h, FunctionComponent } from 'preact'
import { Button } from '../Button'
import { Footer } from '../Footer'
import styles from './style.module.scss'
import { Header } from '../Header'
import { Disclaimer } from '../Disclaimer'
import { Wrapper } from '../Wrapper'
import { BaseScreen } from '../BaseScreen'

interface Props {
  onReady: () => void
  translate: TranslateCallback
}

export const Intro: FunctionComponent<Props> = ({
  onReady,
  translate,
}: Props) => {
  const items = [
    translate('avc_intro.list_item_one'),
    translate('avc_intro.list_item_two'),
  ]

  return (
    <BaseScreen>
      <Wrapper>
        <div className={styles.introGif} />
        <Header
          title={translate('avc_intro.title')}
          subtitle={translate('avc_intro.subtitle')}
        />

        <ul className={styles.list}>
          {items.map((item, index) => (
            <li className={styles.listItem} key={index}>
              <span className={styles.text}>{item}</span>
            </li>
          ))}
        </ul>

        <Disclaimer text={translate('avc_intro.disclaimer')} />
      </Wrapper>

      <Footer>
        <Button onClick={() => onReady()}>
          {translate('avc_intro.button_primary_ready')}
        </Button>
      </Footer>
    </BaseScreen>
  )
}
