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

  const handleCheckboxChange = (position: number, state: boolean): void => {
    const updatedCheckedState = [...checkedState]
    updatedCheckedState[position] = state
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
    <div className='m-10'>
      <h1 className='text-8xl font-["Raleway"] text-white'>
        &#47;&#47; ŠTART <br />
        SIMULÁCIE
      </h1>
      <h2 className='text-3xl text-white mt-10 mb-4 font-["Raleway"]'>VÝBER OVLÁDAČA</h2>
      <div className='flex flex-row gap-8'>
        <div
          className='h-full relative w-1/5 border rounded-xl border-white'
          onClick={() => {
            setControllerType('ppo-agent')
          }}
        >
          <img
            src={ppoAgent as string}
            alt='ppo-agent'
            draggable={false}
            className={
              'w-full h-full object-cover' +
              (controllerType === 'ppo-agent' ? ' hue-rotate-60' : '')
            }
          />
          {controllerType === 'ppo-agent' && (
            <span className='absolute rounded-full w-8 h-8 -top-4 -right-4 bg-webotsGreen z-20 text-white text-lg text-center'>
              ✓
            </span>
          )}
          <p className='absolute bottom-10 left-5 right-5 m-auto text-white h-fit font text-sm'>
            <span className='font-bold text-lg'>PPO Agent</span> <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum, nisl ut
            ultricies lacinia, nisl nisl aliquet nunc, sit
          </p>
        </div>

        <div
          className='h-full relative w-1/5 border rounded-xl border-white'
          onClick={() => {
            setControllerType('deepbots')
          }}
        >
          <img
            src={deepbots as string}
            alt='deepbots'
            draggable={false}
            className={
              'w-full h-full object-cover' + (controllerType === 'deepbots' ? ' hue-rotate-60' : '')
            }
          />
          {controllerType === 'deepbots' && (
            <span className='absolute rounded-full w-8 h-8 -top-4 -right-4 bg-webotsGreen z-20 text-white text-lg text-center'>
              ✓
            </span>
          )}
          <p className='absolute bottom-10 left-5 right-5 m-auto text-white h-fit font text-sm'>
            <span className='font-bold text-lg'>Deepbots</span> <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum, nisl ut
            ultricies lacinia, nisl nisl aliquet nunc, sit
          </p>
        </div>
      </div>
      <h2 className='text-3xl text-white mt-10 mb-4 font-["Raleway"]'>VÝBER SVETA</h2>
      <div className='flex flex-row gap-8'>
        <div
          className='h-full relative w-1/5 border rounded-xl border-white'
          onClick={() => {
            setWorldType('world-n-1')
          }}
        >
          <img
            src={ppoAgent as string}
            alt='world 1'
            draggable={false}
            className={
              'w-full h-full object-cover' + (worldType === 'world-n-1' ? ' hue-rotate-60' : '')
            }
          />
          {worldType === 'world-n-1' && (
            <span className='absolute rounded-full w-8 h-8 -top-4 -right-4 bg-webotsGreen z-20 text-white text-lg text-center'>
              ✓
            </span>
          )}
          <p className='absolute bottom-10 left-5 right-5 m-auto text-white h-fit font text-sm'>
            <span className='font-bold text-lg'>World 1</span> <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum, nisl ut
            ultricies lacinia, nisl nisl aliquet nunc, sit
          </p>
        </div>
        <div
          className='h-full relative w-1/5 border rounded-xl border-white'
          onClick={() => {
            setWorldType('world-n-2')
          }}
        >
          <img
            src={ppoAgent as string}
            alt='world 2'
            draggable={false}
            className={
              'w-full h-full object-cover' + (worldType === 'world-n-2' ? ' hue-rotate-60' : '')
            }
          />
          {worldType === 'world-n-2' && (
            <span className='absolute rounded-full w-8 h-8 -top-4 -right-4 bg-webotsGreen z-20 text-white text-lg text-center'>
              ✓
            </span>
          )}
          <p className='absolute bottom-10 left-5 right-5 m-auto text-white h-fit font text-sm'>
            <span className='font-bold text-lg'>World 2</span> <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum, nisl ut
            ultricies lacinia, nisl nisl aliquet nunc, sit
          </p>
        </div>
        <div
          className='h-full relative w-1/5 border rounded-xl border-white'
          onClick={() => {
            setWorldType('world-n-3')
          }}
        >
          <img
            src={ppoAgent as string}
            alt='world 3'
            draggable={false}
            className={
              'w-full h-full object-cover' + (worldType === 'world-n-3' ? ' hue-rotate-60' : '')
            }
          />
          {worldType === 'world-n-3' && (
            <span className='absolute rounded-full w-8 h-8 -top-4 -right-4 bg-[#02FC74] z-20 text-white text-lg text-center'>
              ✓
            </span>
          )}
          <p className='absolute bottom-10 left-5 right-5 m-auto text-white h-fit font text-sm'>
            <span className='font-bold text-lg'>World 3</span> <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum, nisl ut
            ultricies lacinia, nisl nisl aliquet nunc, sit
          </p>
        </div>
      </div>
      <h2 className='text-3xl text-white mt-10 mb-4 font-["Raleway"]'>VÝBER OBSERVÁCIÍ</h2>
      <div className='grid grid-cols-4 gap-8 content-center'>
        {observationTypes.map((i, index) => (
          <span
            key={i}
            className={
              'rounded-lg p-3 border border-solid border-white flex justify-start items-center' +
              (checkedState[index] ? ' bg-webotsGreen' : '')
            }
          >
            <span
              className={
                'mr-3 text-lg font-medium  w-2/3 ' +
                (checkedState[index] ? 'text-[#021727]' : 'text-white')
              }
            >
              {i}
            </span>
            <label className='inline-flex items-center cursor-pointer w-1/3'>
              <input
                type='checkbox'
                value=''
                className='sr-only peer'
                onChange={(e) => {
                  handleCheckboxChange(index, (e.target as HTMLInputElement).checked)
                }}
              />
              <div
                className="w-12 h-6 relative bg-[#021727] border border-solid border-white rounded-full peer 
                  peer-checked:after:translate-x-[106%] peer-checked:after:border-white after:content-[''] after:absolute 
                  after:top-[1px] after:left-[2px] after:bg-white after:border peer-checked:after:bg-webotsGreen  after:rounded-full 
                  after:h-5 after:w-5 after:transition-all "
              ></div>
            </label>
          </span>
        ))}
      </div>
      <h2 className='text-3xl text-white mt-10 mb-4 font-["Raleway"]'>
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
          className='bg-transparent text-sm '
          style={{
            fontFamily:
              '"ui-monospace", "SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", "Menlo", "monospace"',
          }}
        />
      </div>
      <div className='flex justify-center mt-10'>
        <button
          className='rounded-full border w-1/2 h-[50px] bg-webotsGreen text-white font-["Raleway"] text-2xl'
          onClick={handleSubmit}
        >
          ŠTART SIMULÁCIE
        </button>
      </div>
      <div
        // className='-z-1 bg-blend-lighten fixed w-[40vw] h-[60vh] left-[-20vw] bottom-[-30vh] bg-gradient-to-tr from-[rgba(66,255,255,0.2)] from-30% via-[rgba(9,47,61,0.1)] via-60% to-transparent to-100%'
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
