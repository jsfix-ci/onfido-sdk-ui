import '@testing-library/jest-dom'
import { h } from 'preact'
import { render, screen } from '@testing-library/preact'

import MockedLocalised, { mockedTranslate } from '~jest/MockedLocalised'
import { DefaultContent, DocVideoContent } from '../Content'

mockedTranslate.mockImplementation((str) => {
  if (str === 'welcome.list_item_doc_video_timeout') {
    return '<hidden>Invisible</hidden>timeout: <timeout></timeout>'
  }

  return str
})

const assertContent = (forDocVideo: boolean) => {
  expect(
    screen.getByText(
      forDocVideo
        ? 'welcome.list_header_doc_video'
        : 'welcome.list_header_webcam'
    )
  ).toBeInTheDocument()

  expect(screen.getByText('welcome.list_item_doc')).toBeInTheDocument()
  expect(screen.getByText('welcome.list_item_selfie')).toBeInTheDocument()
}

describe('Welcome', () => {
  describe('DefaultContent', () => {
    it('renders correct elements', () => {
      render(
        <MockedLocalised>
          <DefaultContent captureSteps={['document', 'face']} />
        </MockedLocalised>
      )
      assertContent(false)
    })

    it('renders correct elements with custom descriptions', () => {
      render(
        <MockedLocalised>
          <DefaultContent
            captureSteps={[]}
            descriptions={[
              'Fake description 1',
              'Fake description 2',
              'Fake description 3',
            ]}
          />
        </MockedLocalised>
      )

      expect(screen.getByText('Fake description 1')).toBeInTheDocument()
      expect(screen.getByText('Fake description 2')).toBeInTheDocument()
      expect(screen.getByText('Fake description 3')).toBeInTheDocument()
    })
  })

  describe('DocVideoContent', () => {
    it('renders correct elements', () => {
      render(
        <MockedLocalised>
          <DocVideoContent captureSteps={['welcome', 'document', 'face']} />
        </MockedLocalised>
      )

      assertContent(true)
      expect(screen.getByText('timeout: 30')).toBeInTheDocument()
    })
  })
})
