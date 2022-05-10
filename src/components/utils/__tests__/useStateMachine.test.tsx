import { h, FunctionComponent } from 'preact'
import { fireEvent, render, screen } from '@testing-library/preact'
import useStateMachine, { MachineSpec } from '../useStateMachine'

type LightStates = 'green' | 'yellow' | 'red' | 'off'
type LightActions = 'TIMED_OUT' | 'ERROR' | 'POWER_OUTAGE'

const testSpec: MachineSpec<LightStates, LightActions> = {
  initialState: 'green',
  states: {
    green: {
      TIMED_OUT: 'yellow',
      ERROR: 'red',
      POWER_OUTAGE: 'off',
    },
    yellow: {
      TIMED_OUT: 'red',
      ERROR: 'red',
      POWER_OUTAGE: 'off',
    },
    red: {
      TIMED_OUT: 'green',
      POWER_OUTAGE: 'off',
    },
  },
}

type DummyProps = {
  initialState: LightStates
}

const DummyComponent: FunctionComponent<DummyProps> = ({ initialState }) => {
  const [light, dispatchAction] = useStateMachine({ ...testSpec, initialState })

  return (
    <div>
      <span data-testid="light">{light}</span>
      <button
        data-testid="switchLight"
        onClick={() => dispatchAction('TIMED_OUT')}
      >
        Switch light
      </button>
      <button data-testid="error" onClick={() => dispatchAction('ERROR')}>
        Trigger error
      </button>
    </div>
  )
}

const simulateSwitchLight = (times: number) => {
  const switchLight = screen.getByTestId('switchLight')
  Array(times)
    .fill(null)
    .forEach(() => fireEvent.click(switchLight))
}

const assertLightState = (light: LightStates) => {
  expect(screen.getByTestId('light').textContent).toEqual(light)
}

describe('utils', () => {
  describe('useStateMachine with initialState=green', () => {
    beforeEach(() => {
      render(<DummyComponent initialState="green" />)
    })

    it('returns correct state initially', () => assertLightState('green'))

    it('returns correct state when switch light 1 times', () => {
      simulateSwitchLight(1)
      assertLightState('yellow')
    })

    it('returns correct state when switch light 2 times', () => {
      simulateSwitchLight(2)
      assertLightState('red')
    })

    it('returns correct state when error', () => {
      fireEvent.click(screen.getByTestId('error'))
      assertLightState('red')
    })

    it('returns correct state when error after switch light', () => {
      simulateSwitchLight(1) // should be yellow
      fireEvent.click(screen.getByTestId('error'))
      assertLightState('red')
    })

    it('does nothing when error on red light', () => {
      simulateSwitchLight(2) // should be red
      fireEvent.click(screen.getByTestId('error'))
      assertLightState('red')
    })
  })

  describe('useStateMachine with initialState=error', () => {
    beforeEach(() => {
      render(<DummyComponent initialState="off" />)
    })

    it('remains error in any cases', () => {
      assertLightState('off')

      simulateSwitchLight(1)
      assertLightState('off')

      simulateSwitchLight(2)
      assertLightState('off')
    })
  })
})
