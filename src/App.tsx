import React, { useState } from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor'

import deepbots from './images/ppoagent.png'
import ppoAgent from './images/deepbots.png'

const App: React.FC = () => {
  const controllerTypes = ['ppo-agent', 'deepbots'] as const
  type Controller = (typeof controllerTypes)[number]

  const worldTypes = ['world-n-1', 'world-n-2', 'world-n-3'] as const
  type World = (typeof worldTypes)[number]

  const observationTypes = [
    'camera-ball-distance',
    'camera-ball-orientation',
    'camera-op-goal-distance',
    'supervisor-op-player-distance',
    'input-data-5',
    'input-data-6',
    'input-data-7',
    'input-data-8',
    'input-data-9',
    'input-data-10',
    'input-data-11',
    'input-data-12',
  ] as const
  type Observation = (typeof observationTypes)[number]
  interface IControllerGeneratorConfig {
    controller: Controller
    world: World
    observations: Observation[]
    reward: string
  }

  const [checkedState, setCheckedState] = useState(
    new Array<boolean>(observationTypes.length).fill(false),
  )
  const [controllerType, setControllerType] = useState<Controller>('ppo-agent')
  const [worldType, setWorldType] = useState<World>('world-n-1')
  const [observations, setObservations] = useState<Observation[]>([])
  const [rewardFormula, setRewardFormula] = useState(`function add(a, b) {\n  return a + b;\n}`)

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
      world: worldType,
      observations,
      reward: rewardFormula,
    }
    console.log(config)
    // TODO: fetch post to BE
  }

  return (
    <div style={{ margin: 10 }}>
      <h1 style={{ fontFamily: 'Raleway', fontSize: '80px', color: '#ffffff' }}>
        &#47;&#47; ŠTART <br />
        SIMULÁCIE
      </h1>
      <h2
        style={{
          fontFamily: 'Raleway',
          fontSize: '32px',
          color: '#ffffff',
          marginTop: '40px',
          marginBottom: '10px',
        }}
      >
        VÝBER OVLÁDAČA
      </h2>
      <div className='flex gap-8'>
        <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
          <img
            src={ppoAgent as string}
            alt='ppo-agent'
            style={{ width: '300px', height: '400px' }}
          />
          <p
            style={{
              fontSize: '18px',
              color: 'white',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              height: 'fit-content',
              margin: 'auto',
            }}
          >
            <b>PPO Agent</b> <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum, nisl ut
            ultricies lacinia, nisl nisl aliquet nunc, sit
          </p>
        </div>
        <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
          <img
            src={deepbots as string}
            alt='deepbots'
            style={{ width: '300px', height: '400px' }}
          />
          <p
            style={{
              fontSize: '18px',
              color: 'white',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              height: 'fit-content',
              margin: 'auto',
            }}
          >
            <b>Deepbots</b> <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum, nisl ut
            ultricies lacinia, nisl nisl aliquet nunc, sit
          </p>
        </div>
      </div>
      <h2
        style={{
          fontFamily: 'Raleway',
          fontSize: '32px',
          color: '#ffffff',
          marginTop: '40px',
          marginBottom: '10px',
        }}
      >
        VÝBER SVETA
      </h2>
      <div className='flex gap-8'>
        <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
          <img src={ppoAgent as string} alt='world 1' style={{ width: '300px', height: '400px' }} />
          <p
            style={{
              fontSize: '18px',
              color: 'white',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              height: 'fit-content',
              margin: 'auto',
            }}
          >
            {' '}
            <b>World 1</b> <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum, nisl ut
            ultricies lacinia, nisl nisl aliquet nunc, sit
          </p>
        </div>
        <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
          <img src={deepbots as string} alt='world 2' style={{ width: '300px', height: '400px' }} />
          <p
            style={{
              fontSize: '18px',
              color: 'white',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              height: 'fit-content',
              margin: 'auto',
            }}
          >
            <b>World 2</b> <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum, nisl ut
            ultricies lacinia, nisl nisl aliquet nunc, sit
          </p>
        </div>
        <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
          <img src={deepbots as string} alt='world 3' style={{ width: '300px', height: '400px' }} />
          <p
            style={{
              fontSize: '18px',
              color: 'white',
              alignSelf: 'flex-end',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              height: 'fit-content',
              margin: 'auto',
            }}
          >
            {' '}
            <b>World 3</b> <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum, nisl ut
            ultricies lacinia, nisl nisl aliquet nunc, sit
          </p>
        </div>
      </div>
      <h2
        style={{
          fontFamily: 'Raleway',
          fontSize: '32px',
          color: '#ffffff',
          marginTop: '40px',
          marginBottom: '10px',
        }}
      >
        VÝBER OBSERVÁCIÍ
      </h2>
      <div className='grid grid-cols-4 gap-8 content-center'>
        {observationTypes.map((i, index) => (
          <div key={i} className='rounded-lg p-3 border border-solid bg-transparent'>
            <span className='mr-3 text-lg font-medium text-white dark:text-white w-100'>{i}</span>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input type='checkbox' value='' className='sr-only peer' />
              <div
                className="w-12 h-6 bg-transparent border border-solid rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 
                  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute 
                  after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
              ></div>
            </label>
          </div>
        ))}
      </div>
      <h2
        style={{
          fontFamily: 'Raleway',
          fontSize: '32px',
          color: '#ffffff',
          marginTop: '40px',
          marginBottom: '10px',
        }}
      >
        EDITOVANIE ODMEŇOVACIEHO VZORCA
      </h2>
      <div className='border rounded-md border-white'>
        <CodeEditor
          value={rewardFormula}
          language='js'
          placeholder='Please enter JS code.'
          onChange={(x) => {
            setRewardFormula(x.target.value)
          }}
          padding={15}
          className='bg-dark-blue text-xl'
          style={{
            fontSize: 12,
            backgroundColor: 'transparent',
            fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button
          style={{
            backgroundColor: '#02FC74',
            borderRadius: '100px',
            width: '300px',
            height: '50px',
            fontFamily: 'Raleway',
            fontSize: '20px',
            color: '#ffffff',
          }}
          onClick={handleSubmit}
        >
          ŠTART SIMULÁCIE
        </button>
      </div>
      <div
        style={{
          position: 'fixed',
          width: '40vw',
          height: '60vh',
          left: '-20vw',
          bottom: '-30vh',
          background: `radial-gradient(50% 50% at 50% 50%, rgba(66, 255, 255, 0.2) 0%, rgba(9, 47, 61, 0.2) 72.92%, rgba(2, 23, 39, 0.2) 100%)`,
          backgroundBlendMode: 'lighten',
          zIndex: -1,
        }}
      />
    </div>
  )
}

export default App
