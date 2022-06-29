import { h, Fragment, FunctionComponent } from 'preact'
import { Logo } from '../assets/Logo'
import styles from './style.module.scss'

export const Footer: FunctionComponent = ({ children }) => {
  return (
    <footer className={styles.footer}>
      <Fragment>
        {children}
        <Logo />
      </Fragment>
    </footer>
  )
}
