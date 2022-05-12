import { configure } from '@testing-library/preact'
import { configure as configureEnzyme } from 'enzyme'
import Adapter from 'enzyme-adapter-preact-pure'
import fetch from 'jest-fetch-mock'

fetch.enableMocks()

configure({ testIdAttribute: 'data-onfido-qa' })
configureEnzyme({ adapter: new Adapter() })
