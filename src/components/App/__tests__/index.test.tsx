import '@testing-library/jest-dom'
import { h } from 'preact'
import { render, screen } from '@testing-library/preact'

import App from '../index'
import type { SDKOptionsWithRenderData } from '~types/commons'

jest.mock('Tracker/safeWoopra')
jest.mock('~utils')

const defaultOptions: SDKOptionsWithRenderData = {
  steps: [
    { type: 'welcome' },
    { type: 'document' },
    { type: 'face' },
    { type: 'data' },
    { type: 'complete' },
    { type: 'pass' },
    { type: 'reject' },
  ],
  containerId: 'onfido-mount',
  containerEl: document.createElement('div'),
}

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App options={defaultOptions} />)
    expect(await screen.findByRole('progressbar')).toBeInTheDocument()
  })
})
