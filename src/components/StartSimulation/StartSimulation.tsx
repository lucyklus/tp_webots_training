import React from 'react'
import { useBuild } from '../../hooks/useBuild';
import type { IControllerGeneratorConfig } from '../../types';
import { DEFAULT_BUILD_CONTEXT } from '../../contexts/BuildContext';
import { useNavigate } from 'react-router-dom';

export const StartSimulation: React.FC = () => {
  const build = useBuild();
  const navigate = useNavigate();

  const handler = (): void => {
    if (build.observations.length === 0) {
      build.updateContext({ error: 'Je potrebné vybrať aspoň jedno pozorovanie!' });
      return;
    }

    const config: IControllerGeneratorConfig = {
      controller: build.controller,
      world: build.world,
      observations: build.observations,
      rewardFn: build.rewardFn
    };

    fetch('/api/controller', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    })
    .then(async (response) => await response.json() as { name: string, uuid: string })
    .then((data) => {
      build.updateContext({
        ...DEFAULT_BUILD_CONTEXT,
        success: `Agent ${data.name} úspešne vytvorený!`
      });
      setTimeout(() => {
        navigate(`robot/${data.name}`);
      }, 500)
    })
    .catch((error) => { console.error(error); });
  }

  return (
    <div className='flex justify-center mt-16'>
      <button
        className={`rounded-full min-w-1/4 bg-webotsGreen text-[#021727] text-2xl px-12 py-3 uppercase font-[900] ${build.observations.length > 0 ? 'btn-rainbow' : ''}`}
        onClick={handler}
      >
        Štart simulácie
      </button>
    </div>
  )
}
