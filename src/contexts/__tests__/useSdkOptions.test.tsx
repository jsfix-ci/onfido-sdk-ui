import { FunctionComponent, h } from 'preact'
import { useSdkOptions, SdkOptionsProvider } from '../useSdkOptions'
import type { NarrowSdkOptions } from '~types/commons'
import { renderHook } from '@testing-library/preact-hooks'
import * as assert from 'assert'

const defaultOptions: NarrowSdkOptions = {
  steps: [
    { type: 'welcome' },
    { type: 'document', options: { forceCrossDevice: true } },
    { type: 'face' },
    { type: 'complete' },
  ],
}

const wrapper: FunctionComponent = ({ children }) => (
  <SdkOptionsProvider options={defaultOptions}>{children}</SdkOptionsProvider>
)

const renderOptionsHook = () => {
  const { result } = renderHook(() => useSdkOptions(), { wrapper })
  assert(result.current)
  return result.current
}

describe('useSdkOptions', () => {
  it('throws error when no Providers wrapped', async () => {
    const { result } = renderHook(() => useSdkOptions())
    expect(result.error.message).toEqual("SDK options wasn't initialized!")
  })

  it('gets correct options data', () => {
    const [options] = renderOptionsHook()
    expect(options).toMatchObject(defaultOptions)
  })

  it('gets correct step config', () => {
    const [, { findStep }] = renderOptionsHook()
    expect(findStep('document')).toMatchObject({
      type: 'document',
      options: { forceCrossDevice: true },
    })
  })

  it(`gets no step when options doesn't include passed type`, () => {
    const [, { findStep }] = renderOptionsHook()
    expect(findStep('userConsent')).toBeUndefined()
  })
})
