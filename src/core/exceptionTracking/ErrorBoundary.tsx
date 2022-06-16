/*
  Doesn't catch:
  - errors in event handlers (when you click a button for instance)
  - errors in asynchronous callbacks (setTimeout for instance)
  - errors that happen in the error boundary component itself
*/

import { h, Component } from 'preact'
import Logger from '../logging/Logger'

class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError', error)
    return { error: error.message }
  }

  componentDidCatch(error) {
    // Logger.fatal(error)
    this.setState({ error: error.message })
  }

  render() {
    // if (this.state.error) {
    //   return <p>Oh no! We ran into an error: {this.state.error}</p>
    // }
    return this.props.children
  }
}

export default ErrorBoundary
