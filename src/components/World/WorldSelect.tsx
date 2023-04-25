import React from 'react'
import type { World } from '../../types/types'
import { images } from '../../images'

interface IWorldProps {
  world: World
  selected: boolean
  handleSelect: () => void
}

export const WorldSelect: React.FC<IWorldProps> = ({ world, selected, handleSelect }) => {
  return (
    <div
      key={world.type}
      className={
        'relative border rounded-xl ' +
        (selected
          ? " border-webotsGreen after:content-[''] after:rounded-xl after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-gradient-to-t after:from-webotsGreen after:to-transparent"
          : ' border-white')
      }
      onClick={() => {
        handleSelect()
      }}
    >
      <img
        src={images[world.image]}
        alt={world.type}
        draggable={false}
        className={'w-[400px] h-[300px] object-fit rounded-xl'}
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
        <span className='font-bold text-lg'>{world.title}</span> <br />
        {world.description}
      </p>
    </div>
  )
}
