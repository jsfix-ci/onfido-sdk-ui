import '@testing-library/jest-dom'
import { h } from 'preact'

import MockedReduxProvider from '~jest/MockedReduxProvider'
import MockedLocalised from '~jest/MockedLocalised'
import Content from '../Content'

import type { DocumentCapture } from '~types/redux'
import { render, screen } from '@testing-library/preact'

jest.mock('~utils/objectUrl')

const defaultProps = {
  trackScreen: jest.fn(),
}

const fakeCapture: DocumentCapture = {
  documentType: 'passport',
  id: 'fake-capture-id',
  blob: new Blob([]),
  sdkMetadata: {},
}

describe('DocumentVideo', () => {
  describe('Confirm', () => {
    describe('Content', () => {
      describe('when mounted', () => {
        it('renders nothing without capture', () => {
          const { container } = render(
            <MockedLocalised>
              <Content {...defaultProps} previewing />
            </MockedLocalised>
          )
          expect(container).toBeEmptyDOMElement()
        })
        it('render texts when not previewing', () => {
          render(
            <MockedLocalised>
              <Content
                {...defaultProps}
                capture={fakeCapture}
                previewing={false}
              />
            </MockedLocalised>
          )

          screen.debug()
          expect(screen.getByText(/outro.body/i)).toHaveClass('title')
          expect(screen.getByText(/video_confirmation.body/i)).toHaveClass(
            'body'
          )
        })

        it('render CaptureViewer when previewing', () => {
          render(
            <MockedReduxProvider>
              <MockedLocalised>
                <Content {...defaultProps} capture={fakeCapture} previewing />
              </MockedLocalised>
            </MockedReduxProvider>
          )

          expect(
            screen.getByText('doc_video_confirmation.title')
          ).toBeInTheDocument()

          /*
            expect(wrapper.find('.body').exists()).toBeFalsy()

            const captureViewer = wrapper.find('CaptureViewer')
            expect(captureViewer.exists()).toBeTruthy()
            expect(captureViewer.hasClass('videoWrapper')).toBeTruthy()
            expect(captureViewer.prop('capture')).toEqual(fakeCapture)
            expect(captureViewer.prop('method')).toEqual('document')
           */
        })
      })
    })
  })
})
