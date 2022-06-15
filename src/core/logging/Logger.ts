import StackTracey from 'stacktracey'

type Props = {
  label?: string
  printer: undefined,
  logQueue: undefined,
  acceptableLevels: string[]
}

export class Logger {
  private label?: string = undefined

  constructor(props: Props) {
    this.label = props.label
  }

  public debug(message: string, file?: string, method?: string, line?: number) {
    console.log('info', message, file, method, line)
  }

  public info(message: string, file?: string, method?: string, line?: number) {
    console.log('info', message, file, method, line)
  }

  public warning(message: string, file?: string, method?: string, line?: number) {
    console.log('info', message, file, method, line)
  }

  public error(message: string, file?: string, method?: string, line?: number) {
    console.log('info', message, file, method, line)
  }

  public fatal(message: string, file?: string, method?: string, line?: number) {

    // if(process.env.NODE_ENV === 'development'){
    //   const s = new StackTracey(new Error(message)).items
      
    //   file = s[1].fileRelative
    //   method = s[1].callee
    //   line = s[1].line
    // }

    console.log('info', message, file, method, line)
    // console.log(new Error(message).stack)
    // console.log(new Error(message).)
    // console.log(new StackTracey(new Error(message)))
  }

  static levels = {
    debug: 'debug',
    info: 'info',
    warning: 'warning',
    error: 'error',
    fatal: 'fatal',
  }
}

console.log('hiii')

export const logger = new Logger({
  label: 'default',
  printer: undefined,
  logQueue: undefined,
  acceptableLevels: ['debug', 'info', 'warning', 'error', 'fatal'],
})

// let logger = DefaultLogger(
//   label: "tests",
//   printer: mockPrinter ,
//   logQueue: DispatchQueue.main,
//   acceptableLevels: [.debug, .info, .warning, .error, .fatal]
// )

// // When
// let expectation = expectation(description: "Log expectation")

// mockPrinter.onCurrentLog = { log in
//   let logFatal = log!
//   XCTAssertEqual(logFatal.emoji, "🔥")
//   XCTAssertEqual(logFatal.level, "FATAL")
//   XCTAssertEqual(logFatal.label, "tests")
//   XCTAssertEqual(logFatal.message, "fatal")
//   expectation.fulfill()
// }

// // Then
// logger.fatal("fatal")
