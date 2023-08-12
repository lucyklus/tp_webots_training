import React, { useRef, useState } from 'react';
import { type IWorld } from '../../types';
import { useBuild } from '../../hooks/useBuild';
import cl from 'classnames';
import { videos } from '../../videos';
import { images } from '../../images';

export const WorldCard: React.FC<{ world: IWorld }> = ({ world }) => {
  const build = useBuild();
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const run = (): void => {
    if (videoRef.current === null)
      return;

    videoRef.current.playbackRate = 12;
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
      key={world.name}
      className={cl(
        `relative cursor-pointer border rounded-xl w-full after:content-[''] after:rounded-xl after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-gradient-to-t after:to-transparent`,
        (build.world === world.name
          ? 'border-webotsGreen after:from-webotsGreen'
          : 'border-white after:from-neutral-800')
      )}
      onClick={() => {
        build.updateContext({ world: world.name });
      }}
      onMouseEnter={() => { setHovered(true); run(); } }
      onMouseLeave={() => { setHovered(false); stop(); } }
    >
      <div className='w-full h-0 relative pb-[70%]'>
        <video
          src={videos[world.image]}
          loop
          muted
          className={`absolute top-0 left-0 w-full h-full object-cover rounded-xl ${hovered ? 'block' : 'hidden'}`}
          ref={videoRef}
        />
        <img
          src={images[world.image]}
          alt={world.name}
          draggable={false}
          className={`absolute top-0 left-0 w-full h-full object-fit rounded-xl ${hovered ? 'hidden' : 'block'}`}
        />
        {build.world === world.name && (
          <span className='absolute flex items-center justify-center rounded-full w-8 h-8 -top-4 -right-4 bg-webotsGreen z-20 font-bold text-[#021727] text-lg'>
            ✓
          </span>
        )}
        <p
          className={
            'absolute bottom-4 left-4 right-4 m-auto h-fit z-10 font text-sm ' +
            (build.world === world.name ? 'text-[#021727]' : 'text-white')
          }
        >
          <span className='font-bold text-lg'>{world.title}</span> <br />
          {world.description}
        </p>
      </div>
    </div>
  );
};
