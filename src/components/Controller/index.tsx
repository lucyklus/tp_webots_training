import React from 'react';

import cl from 'classnames';

import { images } from '../../images'
import type { IController } from '../../types'
import { useData } from '../../hooks/useData'
import { useBuild } from '../../hooks/useBuild'

export const ControllerSelect: React.FC = () => {
  const data = useData();
  const build = useBuild();

  const handleSelect = (controller: IController): void => {
    if (!controller.disabled)
      build.updateContext({ controller: controller.name });
  };

  return (
    <div className='flex flex-row gap-8 my-5 mt-10'>
      {data?.controllers.map((c) => (
        <div
          key={c.name}
          className={cl(
            'relative w-1/5 border rounded-xl',
            (c.name === build.controller
              ? `border-webotsGreen after:content-[''] after:rounded-xl after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-gradient-to-t after:from-webotsGreen after:to-transparent`
              : 'border-white'),
            (c.disabled ? 'opacity-50 cursor-not-allowed' : ' cursor-pointer')
          )}
          onClick={() => { handleSelect(c); }}
        >
          <img
            src={images[c.image]}
            alt={c.name}
            draggable={false}
            className={'w-full h-full object-cover rounded-xl'}
          />
          {c.name === build.controller && (
            <span className='absolute flex items-center justify-center rounded-full w-8 h-8 -top-4 -right-4 bg-webotsGreen z-20 font-bold text-[#021727] text-lg'>
              ✓
            </span>
          )}
          <p
            className={cl(
              'absolute bottom-5 left-5 right-5 m-auto  h-fit z-10 font text-sm',
              (c.name === build.controller ? 'text-[#021727]' : 'text-white')
            )}
          >
            <span className='font-bold text-lg block mb-1'>{c.title}</span>
            <span>{c.description}</span>
          </p>
        </div>

      ))}
    </div>
  )
}
