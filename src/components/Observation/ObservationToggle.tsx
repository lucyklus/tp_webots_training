import React from 'react'

import { type Observation } from '../../types/types'

interface IObservationProps {
  observation: Observation
  index: number
  handleDisplayToggleDescription: (observation: Observation) => void
  handleHideToggleDescription: () => void
  check: (position: number, state: boolean) => void
  checked: boolean
}

export const ObservationToggle: React.FC<IObservationProps> = ({
  observation,
  index,
  handleDisplayToggleDescription,
  handleHideToggleDescription,
  check,
  checked,
}) => {
  return (
    <span
      key={observation.type}
      onMouseEnter={() => {
        handleDisplayToggleDescription(observation)
      }}
      onMouseLeave={() => {
        handleHideToggleDescription()
      }}
      className={
        'rounded-lg p-3 border border-solid border-white flex justify-start items-center' +
        (checked ? ' bg-webotsGreen' : '')
      }
    >
      <span
        className={'mr-3 text-lg font-medium  w-2/3 ' + (checked ? 'text-[#021727]' : 'text-white')}
      >
        {observation.type}
      </span>
      <label className='inline-flex items-center cursor-pointer w-1/3'>
        <input
          type='checkbox'
          value=''
          className='sr-only peer'
          onChange={(e) => {
            check(index, (e.target as HTMLInputElement).checked)
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
  )
}
