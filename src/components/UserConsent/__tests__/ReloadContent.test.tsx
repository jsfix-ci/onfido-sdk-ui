import { h } from 'preact'
import { mount, shallow } from 'enzyme'

import ReloadContent from '../ReloadContent'
import MockedLocalised from '~jest/MockedLocalised'
import MockedReduxProvider from '~jest/MockedReduxProvider'

describe('ReloadContent', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <MockedLocalised>
        <ReloadContent onPrimaryButtonClick={mockedOnClickFunction} />
      </MockedLocalised>
    )
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('when mounted', () => {
    it('renders without crashing', () => {
      const mockedOnClickFunction = jest.fn()
      const wrapper = mount(
        <MockedReduxProvider>
          <MockedLocalised>
            <ReloadContent onPrimaryButtonClick={mockedOnClickFunction} />
          </MockedLocalised>
        </MockedReduxProvider>
      )
      const primaryBtn = wrapper.find({
        'data-onfido-qa': 'userConsentReloadScreenBtn',
      })
      expect(wrapper.exists()).toBeTruthy()
      expect(primaryBtn.exists()).toBeTruthy()

      primaryBtn.simulate('click')
      expect(mockedOnClickFunction).toHaveBeenCalled()

      wrapper.unmount()
    })
  })
})
