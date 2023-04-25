import React, { useState } from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor'

import deepbots from './images/ppoagent.png'
import ppoAgent from './images/deepbots.png'
import obstacles from './images/worlds/obstacles.jpg'
import randomBall from './images/worlds/random_ball.png'
import twoRobotsBarrier from './images/worlds/2_robots_barrier.jpg'
import twoRobotsWithoutBarrier from './images/worlds/2_robots_without_barrier.jpg'

import {
  type IControllerGeneratorConfig,
  type Controller,
  type Observation,
  type World,
} from './types'

const App: React.FC = () => {
  const [controllers] = useState<Controller[]>([
    {
      type: 'deepbots',
      title: 'Deepbots',
      description: 'Deepbots is blah blah',
      image: deepbots as string,
    },
    {
      type: 'ppo-agent',
      title: 'PPO agent',
      description: 'PPO agent is bla asfd aasf',
      image: ppoAgent as string,
    },
  ])

  const [worlds] = useState<World[]>([
    {
      type: 'obstacles',
      title: 'Multiple obstacles',
      description: 'Lorem ipsum',
      image: obstacles as string,
    },
    {
      type: 'random-ball',
      title: 'Random ball position',
      description: 'Lorem ipsum',
      image: randomBall as string,
    },
    {
      type: '2-robots-barrier',
      title: 'Two robots with barrier',
      description: 'Lorem ipsum',
      image: twoRobotsBarrier as string,
    },
    {
      type: '2-robots-without-barrier',
      title: 'Two robots without barrier',
      description: 'Lorem ipsum',
      image: twoRobotsWithoutBarrier as string,
    },
  ])

  const [observations, setObservations] = useState<Observation[]>([
    {
      type: 'camera-ball-distance',
      description: 'Camera ball distance',
      selected: false,
      image: ppoAgent as string,
    },
    {
      type: 'camera-ball-orientation',
      description: 'Camera ball distance',
      selected: false,
      image: ppoAgent as string,
    },
    {
      type: 'camera-op-goal-distance',
      description: 'Camera ball distance',
      selected: false,
      image: ppoAgent as string,
    },
    {
      type: 'supervisor-op-player-distance',
      description: 'Camera ball distance',
      selected: false,
      image: ppoAgent as string,
    },
    {
      type: 'input-data-5',
      description: 'Camera ball distance',
      selected: false,
      image: ppoAgent as string,
    },
    {
      type: 'input-data-6',
      description: 'Camera ball distance',
      selected: false,
      image: ppoAgent as string,
    },
    {
      type: 'input-data-7',
      description: 'Camera ball distance',
      selected: false,
      image: ppoAgent as string,
    },
    {
      type: 'input-data-8',
      description: 'Camera ball distance',
      selected: false,
      image: ppoAgent as string,
    },
    {
      type: 'input-data-9',
      description: 'Camera ball distance',
      selected: false,
      image: ppoAgent as string,
    },
    {
      type: 'input-data-10',
      description: 'Camera ball distance',
      selected: false,
      image: ppoAgent as string,
    },
    {
      type: 'input-data-11',
      description: 'Camera ball distance',
      selected: false,
      image: ppoAgent as string,
    },
    {
      type: 'input-data-12',
      description: 'Camera ball distance',
      selected: false,
      image: ppoAgent as string,
    },
  ])

  const [controller, setController] = useState<Controller>(controllers[0])
  const [world, setWorld] = useState<World>(worlds[0])
  const [rewardFormula, setRewardFormula] = useState(`function add(a, b) {\n  return a + b;\n}`)

  const handleCheckboxChange = (position: number, state: boolean): void => {
    const newObservations = [...observations]
    newObservations[position].selected = state
    setObservations(newObservations)
  }

  const [currentObservation, setCurrentObservation] = useState<Observation | null>(null)

  const display = (observation: Observation): void => {
    setCurrentObservation(observation)
  }

  const hide = (): void => {
    setCurrentObservation(null)
  }

  const handleSubmit = (): void => {
    const config: IControllerGeneratorConfig = {
      controller: controller.type,
      world: world.type,
      observations: observations.filter((ob) => ob.selected).map((ob) => ob.type),
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
        {controllers.map((_controller) => (
          <div
            key={_controller.type}
            className={
              'relative w-1/5 border rounded-xl ' +
              (_controller.type === controller.type
                ? " border-webotsGreen after:content-[''] after:rounded-xl after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-gradient-to-t after:from-webotsGreen after:to-transparent"
                : ' border-white')
            }
            onClick={() => {
              setController(_controller)
            }}
          >
            <img
              src={_controller.image as unknown as string}
              alt={_controller.type}
              draggable={false}
              className={'w-full h-full object-cover rounded-xl'}
            />
            {controller.type === _controller.type && (
              <span className='absolute flex items-center justify-center rounded-full w-8 h-8 -top-4 -right-4 bg-webotsGreen z-20 font-bold text-[#021727] text-lg'>
                ✓
              </span>
            )}
            <p
              className={
                'absolute bottom-10 left-5 right-5 m-auto  h-fit z-10 font text-sm ' +
                (_controller.type === controller.type ? 'text-[#021727]' : 'text-white')
              }
            >
              <span className='font-bold text-lg'>{_controller.title}</span> <br />
              {_controller.description}
            </p>
          </div>
        ))}
      </div>
      <h2 className='text-3xl text-white mt-10 mb-4 font-["Raleway"]'>VÝBER SVETA</h2>
      <div className='flex flex-row gap-8'>
        {worlds.map((_world) => (
          <div
            key={_world.type}
            className={
              'relative border rounded-xl ' +
              (world.type === _world.type
                ? " border-webotsGreen after:content-[''] after:rounded-xl after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-gradient-to-t after:from-webotsGreen after:to-transparent"
                : ' border-white')
            }
            onClick={() => {
              setWorld(_world)
            }}
          >
            <img
              src={_world.image}
              alt='world 1'
              draggable={false}
              className={'w-[400px] h-[300px] object-fit rounded-xl'}
            />
            {world.type === _world.type && (
              <span className='absolute flex items-center justify-center rounded-full w-8 h-8 -top-4 -right-4 bg-webotsGreen z-20 font-bold text-[#021727] text-lg'>
                ✓
              </span>
            )}
            <p
              className={
                'absolute bottom-10 left-5 right-5 m-auto  h-fit z-10 font text-sm ' +
                (world.type === _world.type ? 'text-[#021727]' : 'text-white')
              }
            >
              <span className='font-bold text-lg'>{_world.title}</span> <br />
              {_world.description}
            </p>
          </div>
        ))}
      </div>
      {currentObservation !== null && (
        <span
          className='absolute left-0 right-0 top-[100%] h-56 p-2 w-full text-white bg-[#021727] 
          bg-opacity-90 flex justify-center items-center z-10'
        >
          <div className='flex justify-start gap-4'>
            <img
              alt={currentObservation.type}
              src={currentObservation.image as unknown as string}
              className='h-48 w-48'
            />
            <div className='flex flex-col justify-center'>
              <b className='font-bold font-xl text-white'>{currentObservation.type}</b>
              <span className='text-white'>{currentObservation.description}</span>
            </div>
          </div>
        </span>
      )}
      <h2 className='text-3xl text-white mt-10 mb-4 font-["Raleway"]'>VÝBER OBSERVÁCIÍ</h2>
      <div className='grid grid-cols-4 gap-8 content-center'>
        {observations.map((_observation, index) => (
          <span
            key={_observation.type}
            onMouseEnter={() => {
              display(_observation)
            }}
            onMouseLeave={() => {
              hide()
            }}
            className={
              'rounded-lg p-3 border border-solid border-white flex justify-start items-center' +
              (_observation.selected ? ' bg-webotsGreen' : '')
            }
          >
            <span
              className={
                'mr-3 text-lg font-medium  w-2/3 ' +
                (_observation.selected ? 'text-[#021727]' : 'text-white')
              }
            >
              {_observation.type}
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
          className='rounded-full border w-1/4 h-[50px] bg-webotsGreen text-white font-["Raleway"] text-2xl'
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
