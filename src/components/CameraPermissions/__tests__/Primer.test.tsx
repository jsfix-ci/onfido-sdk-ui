import '@testing-library/jest-dom'
import { h } from 'preact'
import { fireEvent, render, screen } from '@testing-library/preact'

import MockedLocalised from '~jest/MockedLocalised'
import MockedReduxProvider from '~jest/MockedReduxProvider'
import Primer from '../Primer'

const defaultProps = {
  onNext: jest.fn(),
  trackScreen: jest.fn(),
}

const renderPrimer = (audio?: boolean) =>
  render(
    <MockedReduxProvider>
      <MockedLocalised>
        <Primer {...defaultProps} audio={audio} />
      </MockedLocalised>
    </MockedReduxProvider>
  )

describe('CameraPermissions', () => {
  describe('Primer', () => {
    it('asks permissions for camera only', () => {
      renderPrimer()
      expect(screen.getByText(/permission.title_cam/i))
    })

    it('asks permissions for camera and audio', () => {
      renderPrimer(true)
      expect(screen.getByText(/permission.title_both/i))
    })

    it('allows user to accept permissions', () => {
      renderPrimer()
      fireEvent.click(screen.getByText(/permission.button_primary_cam/))
      expect(defaultProps.onNext).toHaveBeenCalled()
    })
  })
})
