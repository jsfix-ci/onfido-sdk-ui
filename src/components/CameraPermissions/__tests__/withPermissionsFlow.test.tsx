import { h } from 'preact'
import { render, screen } from '@testing-library/preact'

import MockedLocalised from '~jest/MockedLocalised'
import MockedReduxProvider from '~jest/MockedReduxProvider'
import { checkIfWebcamPermissionGranted } from '~utils'
import withPermissionsFlow from '../withPermissionsFlow'

import { ButtonType } from '~types/camera'

jest.mock('~utils')

const WrappedComponent = withPermissionsFlow(() => <span>Dummy component</span>)

const defaultProps = {
  renderFallback: jest.fn(),
  trackScreen: jest.fn(),
  buttonType: `none` as ButtonType,
}

const mockedCheckWebcamPermission = checkIfWebcamPermissionGranted as jest.MockedFunction<
  typeof checkIfWebcamPermissionGranted
>

const renderDummyComponent = () =>
  render(
    <MockedReduxProvider>
      <MockedLocalised>
        <WrappedComponent {...defaultProps} />
      </MockedLocalised>
    </MockedReduxProvider>
  )

describe('CameraPermissions', () => {
  describe('withPermissionsFlow', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    describe('when webcam permissions rejected', () => {
      beforeEach(() => {
        mockedCheckWebcamPermission.mockImplementation((callback) =>
          callback(false)
        )
      })

      it('renders PermissionsPrimer', () => {
        renderDummyComponent()
        expect(screen.getByText(/permission.title_cam/i))
      })
    })
    describe('when webcam permissions granted', () => {
      beforeEach(() => {
        mockedCheckWebcamPermission.mockImplementation((callback) =>
          callback(true)
        )
      })

      it('renders wrapped component', () => {
        renderDummyComponent()
        expect(screen.getByText(/Dummy Component/i))
      })
    })
  })
})
