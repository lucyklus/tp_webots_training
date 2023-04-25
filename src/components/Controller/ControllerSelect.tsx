import React, { useState } from 'react'
import type { Controller } from '../../types/types'

import deepbots from './images/ppoagent.png'
import ppoAgent from './images/deepbots.png'

interface IControllerProps {
  controller: Controller
  selected: boolean
  handleSelect: () => void
}

export const ControllerSelect: React.FC<IControllerProps> = ({
  controller,
  selected,
  handleSelect,
}) => {
  return (
    <div
      key={controller.type}
      className={
        'relative w-1/5 border rounded-xl ' +
        (selected
          ? " border-webotsGreen after:content-[''] after:rounded-xl after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-gradient-to-t after:from-webotsGreen after:to-transparent"
          : ' border-white')
      }
      onClick={() => {
        handleSelect()
      }}
    >
      <img
        src={controller.image as unknown as string}
        alt={controller.type}
        draggable={false}
        className={'w-full h-full object-cover rounded-xl'}
      />
      {selected && (
        <span className='absolute flex items-center justify-center rounded-full w-8 h-8 -top-4 -right-4 bg-webotsGreen z-20 font-bold text-[#021727] text-lg'>
          ✓
        </span>
      )}
      <p
        className={
          'absolute bottom-10 left-5 right-5 m-auto  h-fit z-10 font text-sm ' +
          (selected ? 'text-[#021727]' : 'text-white')
        }
      >
        <span className='font-bold text-lg'>{controller.title}</span> <br />
        {controller.description}
      </p>
    </div>
  )
}
