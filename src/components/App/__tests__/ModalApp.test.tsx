import '@testing-library/jest-dom'
import { h } from 'preact'
import { render, screen } from '@testing-library/preact'

import MockedReduxProvider from '~jest/MockedReduxProvider'
import ModalApp from '../ModalApp'

import type { SDKOptionsWithRenderData } from '~types/commons'

jest.mock('Tracker/safeWoopra')

const defaultOptions: SDKOptionsWithRenderData = {
  steps: [
    { type: 'welcome' },
    { type: 'document' },
    { type: 'face' },
    { type: 'data' },
    { type: 'complete' },
  ],
  containerId: 'onfido-mount',
  containerEl: document.createElement('div'),
}

describe('ModalApp', () => {
  it('renders without crashing', async () => {
    render(
      <MockedReduxProvider>
        <ModalApp options={defaultOptions} />
      </MockedReduxProvider>
    )
    expect(await screen.findByRole('progressbar')).toBeInTheDocument()
  })
})
