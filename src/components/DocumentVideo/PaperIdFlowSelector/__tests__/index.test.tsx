import { h } from 'preact'
import { mount, shallow } from 'enzyme'

import MockedContainerDimensions from '~jest/MockedContainerDimensions'
import MockedLocalised from '~jest/MockedLocalised'
import PaperIdFlowSelector, {
  Props as PaperIdFlowSelectorProps,
} from '../index'

const defaultProps: PaperIdFlowSelectorProps = {
  documentType: 'driving_licence',
  onSelectFlow: jest.fn(),
}

describe('DocumentVideo', () => {
  describe('PaperIdFlowSelector', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<PaperIdFlowSelector {...defaultProps} />)
      expect(wrapper.exists()).toBeTruthy()
    })

    describe('when mounted', () => {
      it('renders nothing if documentType is not license or id', () => {
        const wrapper = mount(
          <MockedLocalised>
            <MockedContainerDimensions>
              <PaperIdFlowSelector {...defaultProps} documentType="passport" />
            </MockedContainerDimensions>
          </MockedLocalised>
        )

        expect(
          wrapper.find('PaperIdFlowSelector').children().exists()
        ).toBeFalsy()
      })

      it('renders correct items', () => {
        const wrapper = mount(
          <MockedLocalised>
            <MockedContainerDimensions>
              <PaperIdFlowSelector {...defaultProps} />
            </MockedContainerDimensions>
          </MockedLocalised>
        )

        expect(wrapper.exists()).toBeTruthy()

        const documentOverlay = wrapper.find('DocumentOverlay')
        expect(documentOverlay.exists()).toBeTruthy()
        expect(documentOverlay.props()).toMatchObject({ marginBottom: 0.5 })

        const footer = wrapper.find('.footer')
        expect(footer.find('.title').text()).toEqual(
          'doc_capture.prompt.title_license'
        )

        const cardButton = footer.find('button.cardId')
        expect(cardButton.text()).toEqual('doc_capture.prompt.button_card')
        cardButton.simulate('click')
        expect(defaultProps.onSelectFlow).toHaveBeenCalledWith('cardId')

        const paperButton = footer.find('button.paperId')
        expect(paperButton.text()).toEqual('doc_capture.prompt.button_paper')
        paperButton.simulate('click')
        expect(defaultProps.onSelectFlow).toHaveBeenCalledWith('paperId')
      })

      describe('with id card', () => {
        it('renders correct title', () => {
          const wrapper = mount(
            <MockedLocalised>
              <MockedContainerDimensions>
                <PaperIdFlowSelector
                  {...defaultProps}
                  documentType="national_identity_card"
                />
              </MockedContainerDimensions>
            </MockedLocalised>
          )

          expect(wrapper.find('.footer .title').text()).toEqual(
            'doc_capture.prompt.title_id'
          )
        })
      })
    })
  })
})
