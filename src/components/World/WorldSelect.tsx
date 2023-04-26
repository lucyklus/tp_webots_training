import React, { useRef, useState } from 'react'
import type { World } from '../../types/types'
import { images } from '../../images'
import { videos } from '../../videos'

interface IWorldProps {
  world: World
  selected: boolean
  handleSelect: () => void
}

export const WorldSelect: React.FC<IWorldProps> = ({ world, selected, handleSelect }) => {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const run = (): void => {
    if (videoRef.current === null)
      return;

    videoRef.current.playbackRate = 3;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    videoRef.current?.play().catch(() => { });
  }

  const stop = (): void => {
    if (videoRef.current === null)
      return;

    videoRef.current.currentTime = 0;
    videoRef.current?.pause();
  }

  return (
    <div
      key={world.type}
      className={
        "relative cursor-pointer border rounded-xl w-full after:content-[''] after:rounded-xl after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-gradient-to-t after:to-transparent" +
        (selected
          ? " border-webotsGreen after:from-webotsGreen"
          : ' border-white after:from-neutral-800')
      }
      onClick={() => {
        handleSelect()
      }}
      onMouseEnter={() => { setHovered(true); run(); } }
      onMouseLeave={() => { setHovered(false); stop(); } }
    >
      <div className='w-full h-0 relative pb-[70%]'>
        <video
          src={videos[world.image]}
          loop
          muted
          className={`absolute top-0 left-0 w-full h-full object-fit rounded-xl ${hovered ? 'block' : 'hidden'}`}
          ref={videoRef}
        />
        <img
          src={images[world.image]}
          alt={world.type}
          draggable={false}
          className={`absolute top-0 left-0 w-full h-full object-fit rounded-xl ${hovered ? 'hidden' : 'block'}`}
        />
        {selected && (
          <span className='absolute flex items-center justify-center rounded-full w-8 h-8 -top-4 -right-4 bg-webotsGreen z-20 font-bold text-[#021727] text-lg'>
            ✓
          </span>
        )}
        <p
          className={
            'absolute bottom-4 left-4 right-4 m-auto h-fit z-10 font text-sm ' +
            (selected ? 'text-[#021727]' : 'text-white')
          }
        >
          <span className='font-bold text-lg'>{world.title}</span> <br />
          {world.description}
        </p>
      </div>
    </div>
  )
}
