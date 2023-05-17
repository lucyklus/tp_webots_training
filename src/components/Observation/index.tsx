import React, { useState } from 'react';
import cl from 'classnames';
import { type IObservation } from '../../types';
import { images } from '../../images';
import { useData } from '../../hooks/useData';
import { useBuild } from '../../hooks/useBuild';

let timer: number;

export const ObservationSelector: React.FC = () => {
  const data = useData();
  const build = useBuild();
  const selectedController = data?.controllers.find((controller) => controller.name === build.controller && !controller.disabled);

  const [observationHelperShown, setObservationHelperShown] = useState<boolean>(false);
  const [currentObservation, setCurrentObservation] = useState<IObservation | null>(null);

  const displayToggleDescription = (observation: IObservation): void => {
    clearTimeout(timer);
    setTimeout(() => {
      setObservationHelperShown(true);
      setCurrentObservation(observation)
    }, currentObservation === null ? 300 : 0);
  }

  const hideToggleDescription = (): void => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      setObservationHelperShown(false);
      setCurrentObservation(null);
    }, 600);
  }

  const check = (observation: IObservation, enabled: boolean): void => {
    if (enabled && !build.observations.includes(observation.name))
      build.updateContext({ observations: [...build.observations, observation.name] });
    else if (!enabled && build.observations.includes(observation.name))
      build.updateContext({ observations: build.observations.filter((name) => name !== observation.name) });
  }

  if (selectedController == null)
    return null;

  return (
    <>
      <div
        className={cl(
          'fixed -top-12 transition-transform left-0 right-0 py-6 w-full text-white bg-[#021727] bg-opacity-90 flex justify-center items-center z-20',
          { 'translate-y-12' : observationHelperShown }
        )}
        onMouseEnter={() => { clearTimeout(timer); }}
        onMouseLeave={() => { hideToggleDescription(); }}
      >
        {currentObservation !== null && (
          <div className='flex justify-start gap-4 w-[50%]'>
            <img
              alt={currentObservation.name}
              src={images[currentObservation.image]}
              className='h-56 w-56'
            />
            <div className='flex flex-col justify-center'>
              <b className='font-bold font-xl text-white'>{currentObservation.title}</b>
              <span className='text-white'>{currentObservation.description}</span>
            </div>
          </div>
        )}
      </div>

      <div className='grid grid-cols-4 gap-8 content-center mt-12'>
        {!selectedController.disabled && selectedController.observations.map((obs) => {
          const checked = build.observations.includes(obs.name);
          return (
            <span
              key={obs.name}
              onMouseEnter={() => {
                displayToggleDescription(obs)
              }}
              onMouseLeave={() => {
                hideToggleDescription()
              }}
              className={cl(
                'rounded-lg p-3 border border-solid border-white flex justify-start items-center',
                { 'bg-webotsGreen border-transparent': checked }
              )}
          >
            <span
              className={'mr-3 text-lg font-medium  w-2/3 ' + (checked ? 'text-[#021727]' : 'text-white')}
            >
              {obs.title}
            </span>
            <label className='inline-flex items-center justify-end cursor-pointer w-1/3'>
              <input
                type='checkbox'
                value={checked ? 'true' : 'false'}
                className='sr-only peer'
                onChange={(e) => {
                  check(obs, (e.target as HTMLInputElement).checked)
                }}
              />
              <div
                className="w-12 h-6 relative bg-[#021727] border border-solid border-white rounded-full peer
                        peer-checked:after:translate-x-[22px] peer-checked:after:border-white after:content-[''] after:absolute
                        after:top-[1px] after:left-[2px] after:bg-white after:border peer-checked:after:bg-webotsGreen  after:rounded-full
                        after:h-5 after:w-5 after:transition-all peer-checked:border-transparent peer-checked:after:border-transparent"
              ></div>
            </label>
          </span>
          )}
        )}
      </div>
    </>
  )
}
