// Temporary Placeholder, Don't use!
// Note: file, method & lineNumber are injected in build process (not in hot-reload)
type Props = {
  label?: string
  printer: undefined
  logQueue: undefined
  acceptableLevels: string[]
}

export class Logger {
  private label?: string = undefined

  constructor(props: Props) {
    this.label = props.label
  }

  public debug(
    message: string,
    file?: string,
    method?: string,
    lineNumber?: number
  ) {
    console.log('debug', message, file, method, lineNumber)
  }

  public info(
    message: string,
    file?: string,
    method?: string,
    lineNumber?: number
  ) {
    console.log('info', message, file, method, lineNumber)
  }

  public warning(
    message: string,
    file?: string,
    method?: string,
    lineNumber?: number
  ) {
    console.log('warning', message, file, method, lineNumber)
  }

  public error(
    message: string,
    file?: string,
    method?: string,
    lineNumber?: number
  ) {
    console.log('error', message, file, method, lineNumber)
  }

  public fatal(
    message: string,
    file?: string,
    method?: string,
    lineNumber?: number
  ) {
    console.log('fatal', message, file, method, lineNumber)
  }

  static levels = {
    debug: 'debug',
    info: 'info',
    warning: 'warning',
    error: 'error',
    fatal: 'fatal',
  }
}

export const logger = new Logger({
  label: 'default',
  printer: undefined,
  logQueue: undefined,
  acceptableLevels: ['debug', 'info', 'warning', 'error', 'fatal'],
})
