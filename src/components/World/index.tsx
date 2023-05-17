import React from 'react'
import { useData } from '../../hooks/useData';
import { WorldCard } from './WorldCard';

export const WorldSelect: React.FC = () => {
  const data = useData();

  return (
    <div className='flex flex-row gap-8'>
      {data?.worlds.map((w) => (
        <WorldCard key={w.name} world={w} />
      ))}
    </div>
  )
}
