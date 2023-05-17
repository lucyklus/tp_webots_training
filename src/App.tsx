import React, { useEffect, useState } from 'react'
import { DataContextProvider, type IDataContext } from './contexts/DataContext'
import { BuildContextProvider, DEFAULT_BUILD_CONTEXT, type IBuildContext } from './contexts/BuildContext'
import { SnackArea } from './components/SnackArea';
import { Link } from 'react-router-dom'
import { BlockDescriptor } from './components/BlockDescriptor';
import { ControllerSelect } from './components/Controller';
import { WorldSelect } from './components/World';
import { ObservationSelector } from './components/Observation';
import { RewardEditor } from './components/RewardEditor';
import { StartSimulation } from './components/StartSimulation/StartSimulation';


const App: React.FC = () => {
  const [data, setData] = useState<IDataContext>({ worlds: [], controllers: []});
  const [build, setBuild] = useState(DEFAULT_BUILD_CONTEXT);
  const newContextUpdate = (newContext: Partial<Omit<IBuildContext, 'updateContext'>>): IBuildContext => {
    const newValue = { ...build, ...newContext };
    setBuild(newValue);
    return newValue;
  };

  useEffect(() => {
    fetch('http://localhost:3010/baseInfo', { method: 'GET' })
    .then(async (response) => await response.json() as IDataContext)
    .then((data) => { setData(data); })
    .catch((error) => { console.error(error); });
  }, []);

  return (
    <div className='m-10 max-w-[1500px] w-full mx-auto px-8'>
      <DataContextProvider value={data}>
        <BuildContextProvider value={{ ...build, updateContext: newContextUpdate }}>
          <SnackArea />

          <h1 className='text-8xl mb-10 font-[900] leading-tight uppercase'>
            &#47;&#47; Štart simulácie
          </h1>
          <p className='text-xl text-white text-justify'>
            Vitaj v našom futbalovom neurónovom zážitku! Tu si môžeš odskúšať aký je to pocit trénovať
            neurónky na futbalovom ihrisku v jednoduchom a zábavno-prehľadnom prostredí. Len si vyber
            typ ovládača, jeden z našich pripravených futbalových svetov, pozorovania a metriky. Ak by
            ti nejaký pojem ušiel, ako lopta pri zlej prihrávke, stačí prejsť myšou nad daný element a
            nápoveda ti ho vysvetlí ako dobrý tréner.
          </p>
          <Link to={'/rebricek'} className='text-lg font-[700] bg-[#032d53] px-12 py-3 uppercase mt-10 inline-block rounded-full'>
            Pozri si výsledky iných vytvorených agentov
          </Link>

          <BlockDescriptor
            title='Výber ovládača'
            description={`
              Tvoj vytvorený ovládač bude odoslaný na naše servery, kde sa začne trénovať, ako by mal hrať
              priamo na Camp Nou. Po natrénovaní budeš ohodnotený a zobrazíš sa v rebríčku, kde môžeš
              porovnať svoje taktické schopnosti s inými virtuálnymi trénermi futbalových géniov. Týmto
              spôsobom môžeš otestovať, či si tvoj ovládač zaslúžil zlatú loptu, alebo skôr výprask od
              kapitána.`
            }
          >
            <ControllerSelect />
          </BlockDescriptor>

          <BlockDescriptor
            className='mt-10'
            title='Výber sveta'
            description={`
              Teraz prichádza zábavná časť - vyber si svet, v ktorom sa tvoji roboti pustia do divokého
              futbalového turnaja. Každý svet má svoj vlastný rebríček, takže sa môžeš pokúsiť o
              nastavenie simulácie viackrát a získať titul najväčšieho robotického futbalového majstra vo
              viacerých svetoch!`
            }
          >
            <WorldSelect />
          </BlockDescriptor>

          <BlockDescriptor
            className='mt-20'
            title='Výber pozorovaní'
            description={`
              Pozorovania sú ako robotov denník plný dobrodružstiev na ihrisku. Predstavte si, že váš
              robot vraví: "Dnes som videl takú loptu! A ešte väčšiu bránku!" Na základe týchto
              zážitkov sa PPO agent bude učiť ako školák a s nadšením vyberať svoje ďalšie kroky, takže si
              vyberajte múdro - predsa len, kto by nechcel mať robota s pútavým denníkom?`
            }
          >
            <ObservationSelector />
          </BlockDescriptor>

          <BlockDescriptor
            className='mt-20'
            title='Editovanie odmeňovacieho vzorca'
            description={`UŽ ČOSKORO`}
          >
            <RewardEditor />
          </BlockDescriptor>

          <StartSimulation />
        </BuildContextProvider>
      </DataContextProvider>


    </div>
  )
}

export default App
