/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { TState, WEBEApiControllerGetResponse, WebotsWorld } from './types';
import type { IDataContext } from './contexts/DataContext';
import { ReactComponent as BgSvg } from './images/bg.svg';
import cl from 'classnames';
import { ESTATE_NAMES } from './types/consts';

const stateWidth: Record<TState, string> = {
  'created': 'grow-[0]',
  'in-queue': 'grow-[1]',
  'in-progress': 'grow-[3]',
  'finished': 'grow-[1]',
  'error': ''
};

const Bakery: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();

  const [dataInfo, setDataInfo] = useState<IDataContext>({ worlds: [], controllers: []});
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<WEBEApiControllerGetResponse | undefined>(undefined);

  const fetchAndSetData: () => void = () => {
    fetch(`http://localhost:3010/controller?uuid=${uuid ?? ''}`)
      .then(async (res) => await res.json() as WEBEApiControllerGetResponse)
      .then((data) => { setData(data); })
      // .then((data) => { setData({ ...data, status: 'created' }); })
      // .then((data) => { setData({ ...data, status: 'in-queue' }); })
      // .then((data) => { setData({ ...data, status: 'in-progress' }); })
      // .then((data) => { setData({ ...data, status: 'finished' }); })
      // .then((data) => { setData({ ...data, meta: '# Error\nROOOOOO\n  Tech stack trace: asdasd asdas dasdasdasda sdasdasdasd sdasdasdasdasd asdasdasdasdasd    llooo', status: 'error' }); })
      .catch((err) => { console.error(err) })
      .finally(() => { setLoaded(true); });
  };

  useEffect(() => {
    fetchAndSetData();
    // const interval = setInterval(() => { fetchAndSetData(); }, 10000);
    // return () => { clearInterval(interval) };
  }, []);

  useEffect(() => {
    fetch('http://localhost:3010/baseInfo', { method: 'GET' })
    .then(async (response) => await response.json() as IDataContext)
    .then((data) => { setDataInfo(data); })
    .catch((error) => { console.error(error); });
  }, []);

  const states = useMemo<TState[]>(() => {
    if (data === undefined)
      return [];

    if (data.status === 'error')
      return ['error'];

    return ['created', 'in-queue', 'in-progress', 'finished'];
  }, [data]);

  const curState = useMemo<number>(() => {
    if (data === undefined)
      return 0;

    return states.indexOf(data.status);
  }, [data]);

  if (loaded && data === undefined)
    return (
      <main className="pt-16 max-w-[1500px] w-full mx-auto px-4 md:px-8 min-h-screen">
        <h1 className="text-3xl sm:text-5xl uppercase font-[900] text-center text-red-500">404 Not Found</h1>
      </main>
    );

  if (loaded && data !== undefined)
    return (
      <main className="pt-16 max-w-[1500px] w-full mx-auto px-4 md:px-8 min-h-screen">
        <BgSvg className="absolute top-0 left-0 w-full h-full -z-[1]" />

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl uppercase leading-tight font-[900]">&#47;&#47; Výsledok </h1>
        <h2 className="text-xl md:text-3xl leading-tight font-[700] mt-8 text-center block">Ovládač <span className='text-webotsGreen'>{data.name}</span>{data.status === 'finished' && (<><br />ziskal</>)}</h2>
        {data.status === 'finished' && (
          <div className="mt-12 text-center">
            <h3 className="text-4xl md:text-7xl font-[700] text-webotsGreen">{data.score.toFixed(2)} bodov</h3>
            <span className='mt-8 text-center block'>vo svete <span className='text-webotsGreen'>{dataInfo.worlds.find(w => w.name === data.world)?.title}</span></span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 w-full max-w-4xl mx-auto mt-12">
          {states.map((state, i) => (
            <div key={state} className={cl(
              'flex-1 text-sm flex sm:block',
              stateWidth[state],
              data.status === 'error' ? '!text-red-600 font-[700]' : 'text-neutral-400',
              i === curState && 'text-white font-[700] sm:font-normal',
              (i === curState && data.status === 'finished') && 'font-[700] text-white',
            )}>
              <div className={cl(
                'w-1 h-auto sm:w-auto sm:h-1 border-0',
                data.status === 'error' && '!bg-red-600 after:animate-none after:bgg-red after:bg-red-600',
                i < curState && 'bg-webotsGreen',
                (i === curState) && 'btn-rainbow before:hidden',
                i > curState && 'bg-neutral-400'
              )} />
              <span className='sm:mt-2 p-2 py-4 sm:py-2 block text-center uppercase'>{ESTATE_NAMES[state]}</span>
            </div>
          ))}
        </div>


        {data.status === 'error' && (
          <div className="mt-6 md:mt-12 text-sm text-neutral-200 p-4 md:p-8 bg-[#010d17] overflow-x-auto max-w-4xl mx-auto whitespace-pre font-[monospace]">
            <p>{data.meta}</p>
          </div>
        )}


        <div className="flex justify-center mt-16 md:mt-24">
          <Link to={'/'} className='rounded-full bg-webotsGreen text-[#021727] text-xl md:text-2xl px-8 py-3 uppercase inline-block mx-auto font-[900]'>
            Spustiť novú vlastnú simuláciu
          </Link>
        </div>
      </main>
    )

  return null;
};

export default Bakery;