import React, { useState } from 'react'

const App: React.FC = () => {
  const observationTypes = [
    'camera-ball-distance',
    'camera-ball-orientation',
    'camera-op-goal-distance',
    'supervisor-op-player-distance',
  ] as const
  type Observation = (typeof observationTypes)[number]

  const controllerTypes = ['ppo-agent', 'deepbots'] as const
  type Controller = (typeof controllerTypes)[number]
  interface IControllerGeneratorConfig {
    controller: Controller
    observations: Observation[]
    reward: string
  }

  const [checkedState, setCheckedState] = useState(
    new Array<boolean>(observationTypes.length).fill(false),
  )
  const [observations, setObservations] = useState<Observation[]>([])
  const [controllerType, setControllerType] = useState<Controller>('ppo-agent')
  const [rewardFormula, setRewardFormula] = useState('')

  const handleCheckboxChange = (position: number): void => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item,
    )
    setCheckedState(updatedCheckedState)

    const checkedObservations: Observation[] = []
    updatedCheckedState.forEach((item, index) => {
      if (item) {
        checkedObservations.push(observationTypes[index])
      }
    })
    setObservations(checkedObservations)
  }

  const handleSubmit = (): void => {
    const config: IControllerGeneratorConfig = {
      controller: controllerType,
      observations,
      reward: rewardFormula,
    }
    console.log(config)
    // TODO: fetch post to BE
  }

  return (
    <div style={{ margin: 10 }}>
      <div
        className='row'
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        <div
          className='column'
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 2,
          }}
        >
          <h2>Observations</h2>
          <div>
            {observationTypes.map((i, index) => (
              <div key={i}>
                <input
                  type='checkbox'
                  value={`obs${i}`}
                  checked={checkedState[index]}
                  onChange={() => {
                    handleCheckboxChange(index)
                  }}
                />
                <label htmlFor='checkbox'>{i}</label>
              </div>
            ))}
          </div>
        </div>
        <div
          className='column'
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            alignItems: 'flex-end',
          }}
        >
          <h2>Controller mode</h2>
          <select
            style={{ width: '30%' }}
            value={controllerType}
            onChange={(e) => {
              setControllerType(e.target.value as Controller)
            }}
          >
            {controllerTypes.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <h2>Reward formula</h2>
        <div>
          <textarea
            style={{
              width: '100%',
              resize: 'none',
              height: 500,
              boxSizing: 'border-box',
            }}
            placeholder={'Reward formula python code'}
            value={rewardFormula}
            onChange={(e) => {
              setRewardFormula(e.target.value)
            }}
          />
        </div>
        <button style={{ float: 'right' }} onClick={handleSubmit}>
          Create controller
        </button>
      </div>
    </div>
  )
}

export default App
