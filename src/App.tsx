import React, { useState } from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import { ControllerSelect } from './components/Controller/'
import { WorldSelect } from './components/World/'
import { ObservationToggle } from './components/Observation/'
import { images } from './images'
import controllersJson from './data/controllers.json'
import worldsJson from './data/worlds.json'
import observationsJson from './data/observations.json'

import {
  type IControllerGeneratorConfig,
  type Controller,
  type Observation,
  type World,
} from './types/types'

const App: React.FC = () => {
  const controllers: Controller[] = controllersJson as Controller[]
  const [controller, setController] = useState<Controller>(controllers[0])
  const worlds: World[] = worldsJson as World[]
  const [world, setWorld] = useState<World>(worlds[0])
  const [observations, setObservations] = useState<Observation[]>(observationsJson as Observation[])
  const [currentObservation, setCurrentObservation] = useState<Observation | null>(null)
  const [rewardFormula, setRewardFormula] = useState(`print('Coming soon')`)
  const [showError, setShowError] = useState(false)

  const handleCheckboxChange = (position: number, state: boolean): void => {
    const newObservations = [...observations]
    newObservations[position].selected = state
    setObservations(newObservations)
  }

  const displayToggleDescription = (observation: Observation): void => {
    setCurrentObservation(observation)
  }

  const hideToggleDescription = (): void => {
    setCurrentObservation(null)
  }

  const handleSubmit = (): void => {
    if (observations.filter((ob) => ob.selected).length === 0) {
      setShowError(true)
      return
    }
    const config: IControllerGeneratorConfig = {
      controller: controller.type,
      world: world.type,
      observations: observations.filter((ob) => ob.selected).map((ob) => ob.type),
      rewardFn: rewardFormula,
    }
    console.log(config)
    // TODO: fetch post to BE
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    setShowError(false)
  }

  return (
    <div className='m-10'>
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity='error'>
          Je potrebné vybrať aspoň jedno pozorovanie!
        </Alert>
      </Snackbar>
      <h1 className='text-8xl font-["Raleway"] text-white mb-10'>
        &#47;&#47; ŠTART <br />
        SIMULÁCIE
      </h1>
      <p className='text-2xl text-white text-justify'>
        Vitaj v našom futbalovom neurónovom zážitku! Tu si môžeš odskúšať aký je to pocit trénovať
        neurónky na futbalovom ihrisku v jednoduchom a zábavno-prehľadnom prostredí. Len si vyber
        typ ovládača, jeden z našich pripravených futbalových svetov, pozorovania a metriky. Ak by
        ti nejaký pojem ušiel, ako lopta pri zlej prihrávke, stačí prejsť myšou nad daný element a
        nápoveda ti ho vysvetlí ako dobrý tréner.
      </p>

      <h2 className='text-3xl text-white my-10 font-["Raleway"]'>VÝBER OVLÁDAČA</h2>
      <p className='text-2xl text-white text-justify my-5'>
        Tvoj vytvorený ovládač bude odoslaný na naše servery, kde sa začne trénovať, ako by mal hrať
        priamo na Camp Nou. Po natrénovaní budeš ohodnotený a zobrazíš sa v rebríčku, kde môžeš
        porovnať svoje taktické schopnosti s inými virtuálnymi trénermi futbalových géniov. Týmto
        spôsobom môžeš otestovať, či si tvoj ovládač zaslúžil zlatú loptu, alebo skôr výprask od
        kapitána.
      </p>
      <div className='flex flex-row gap-8 my-5'>
        {controllers.map((_controller) => (
          <ControllerSelect
            key={_controller.type}
            controller={_controller}
            handleSelect={() => {
              setController(_controller)
            }}
            selected={controller.type === _controller.type}
          />
        ))}
      </div>

      <h2 className='text-3xl text-white my-10 font-["Raleway"]'>VÝBER SVETA</h2>
      <p className='text-2xl text-white text-justify my-5'>
        Teraz prichádza zábavná časť - vyber si svet, v ktorom sa tvoji roboti pustia do divokého
        futbalového turnaja. Každý svet má svoj vlastný rebríček, takže sa môžeš pokúsiť o
        nastavenie simulácie viackrát a získať titul najväčšieho robotického futbalového majstra vo
        viacerých svetoch!
      </p>
      <div className='flex flex-row gap-8'>
        {worlds.map((_world) => (
          <WorldSelect
            key={_world.type}
            world={_world}
            handleSelect={() => {
              setWorld(_world)
            }}
            selected={world.type === _world.type}
          />
        ))}
      </div>

      {currentObservation !== null && (
        <span
          className='absolute left-0 right-0 h-56 p-2 w-full text-white bg-[#021727] 
          bg-opacity-90 flex justify-center items-center z-10'
        >
          <div className='flex justify-start gap-4'>
            <img
              alt={currentObservation.type}
              src={images[currentObservation.image]}
              className='h-48 w-48'
            />
            <div className='flex flex-col justify-center'>
              <b className='font-bold font-xl text-white'>{currentObservation.type}</b>
              <span className='text-white'>{currentObservation.description}</span>
            </div>
          </div>
        </span>
      )}

      <h2 className='text-3xl text-white mt-10 mb-4 font-["Raleway"]'>VÝBER POZOROVANÍ</h2>
      <p className='text-2xl text-white text-justify my-5'>
        Pozorovania sú ako robotov denník plný dobrodružstiev na ihrisku. Predstavte si, že váš
        robot vraví: &quot;Dnes som videl takú loptu! A ešte väčšiu bránku!&quot; Na základe týchto
        zážitkov sa PPO agent bude učiť ako školák a s nadšením vyberať svoje ďalšie kroky, takže si
        vyberajte múdro - predsa len, kto by nechcel mať robota s pútavým denníkom?
      </p>
      <div className='grid grid-cols-4 gap-8 content-center'>
        {observations.map((_observation, index) => (
          <ObservationToggle
            key={_observation.type}
            observation={_observation}
            index={index}
            handleDisplayToggleDescription={(observation: Observation) => {
              displayToggleDescription(observation)
            }}
            handleHideToggleDescription={() => {
              hideToggleDescription()
            }}
            check={(position: number, state: boolean) => {
              handleCheckboxChange(position, state)
            }}
            checked={_observation.selected}
          />
        ))}
      </div>

      <div className='opacity-50'>
        <h2 className='text-3xl text-white mt-10 mb-4 font-["Raleway"] opacity-50'>
          UŽ ČOSKORO ... <br />
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
            disabled
            padding={15}
            className='bg-transparent text-sm '
            style={{
              fontFamily:
                '"ui-monospace", "SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", "Menlo", "monospace"',
            }}
          />
        </div>
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
