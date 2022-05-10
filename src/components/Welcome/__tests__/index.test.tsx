import '@testing-library/jest-dom'
import { h } from 'preact'
import { render, screen } from '@testing-library/preact'
import { SdkOptionsProvider } from '~contexts/useSdkOptions'
import MockedLocalised from '~jest/MockedLocalised'
import MockedReduxProvider, {
  mockedReduxProps,
} from '~jest/MockedReduxProvider'
import Welcome from '../index'

import type { NarrowSdkOptions } from '~types/commons'
import type { StepComponentBaseProps } from '~types/routers'
import { createOptionsStepsHook } from '../../Router/createOptionsStepsHook'

const defaultOptions: NarrowSdkOptions = {
  steps: [{ type: 'welcome' }, { type: 'document' }],
}

const defaultProps: StepComponentBaseProps = {
  ...mockedReduxProps,
  ...defaultOptions,
  allowCrossDeviceFlow: true,
  back: jest.fn(),
  changeFlowTo: jest.fn(),
  componentsList: [
    { component: Welcome, step: { type: 'welcome' }, stepIndex: 0 },
  ],
  nextStep: jest.fn(),
  previousStep: jest.fn(),
  triggerOnError: jest.fn(),
  resetSdkFocus: jest.fn(),
  trackScreen: jest.fn(),
  step: 0,
  useSteps: createOptionsStepsHook(defaultOptions),
  completeStep: jest.fn(),
}

const findButton = () => screen.getByText(/welcome.next_button/i)

const renderWelcome = (sdkOptions: NarrowSdkOptions = defaultOptions) =>
  render(
    <MockedReduxProvider>
      <SdkOptionsProvider options={sdkOptions}>
        <MockedLocalised>
          <Welcome {...defaultProps} />
        </MockedLocalised>
      </SdkOptionsProvider>
    </MockedReduxProvider>
  )

describe('Welcome', () => {
  it('renders Welcome with correct elements', () => {
    renderWelcome()

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /welcome.title/i
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /welcome.subtitle/i
    )

    expect(screen.getByText(/welcome.list_header_webcam/i)).toBeInTheDocument()
    expect(screen.getByText(/welcome.list_item_doc/i)).toBeInTheDocument()

    expect(findButton()).toHaveTextContent(/welcome.next_button/i)
  })

  it('renders correct PageTitle with no welcome step', () => {
    renderWelcome({ steps: [] })

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /welcome.title/i
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /welcome.subtitle/i
    )
  })

  it('renders correct PageTitle with custom title', () => {
    renderWelcome({
      steps: [{ type: 'welcome', options: { title: 'Fake title' } }],
    })

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Fake title/i
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /welcome.subtitle/i
    )
  })

  describe('with document video step', () => {
    it('renders Welcome with correct elements', () => {
      renderWelcome({
        steps: [
          { type: 'welcome' },
          { type: 'document', options: { requestedVariant: 'video' } },
        ],
      })
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        /welcome.title/i
      )
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        /welcome.subtitle/i
      )

      expect(
        screen.getByText(/welcome.list_header_doc_video/i)
      ).toBeInTheDocument()

      expect(findButton()).toHaveTextContent(/welcome.next_button/i)
    })
  })
})
