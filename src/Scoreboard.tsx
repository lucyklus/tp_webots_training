import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { WEBEApiControllerGetResponse, WebotsWorld } from './types';
import { ESTATE_NAMES } from './types/consts';

// GET api/leaderboard
type WEBEApiLeaderboardGetResponse = WEBEApiControllerGetResponse[]

const WorldNames: Record<WebotsWorld, string> = {
  'goal-only': 'Jednoduchý svet',
  'goal-random-ball': 'Náhodná lopta',
  'goal-and-obstacles': 'Prekážky',
  'soccer': 'Tím vs. tím'
}

const Scoreboard: React.FC = () => {

  const [data, setData] = useState<WEBEApiLeaderboardGetResponse>([]);
  const [selectedWorld, setSelectedWorld] = useState<WebotsWorld>('goal-only');

  const fetchAndSetData: () => void = () => {
    fetch('http://localhost:3010/leaderboard')
      .then(async (res) => await res.json() as WEBEApiLeaderboardGetResponse)
      .then((data) => { setData(data); })
      .catch((err) => { console.error(err) });
  };

  useEffect(() => {
    fetchAndSetData();
    const interval = setInterval(() => { fetchAndSetData(); }, 10000);
    return () => { clearInterval(interval) };
  }, []);

  const showData = useMemo(() => data.filter((item) => item.world === selectedWorld), [data, selectedWorld]);

  return (
    <main className="pt-16 max-w-[1500px] w-full mx-auto px-4 md:px-8">
      <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-8xl uppercase leading-tight font-[900]">
        &#47;&#47; Výsledky simulácie
      </h1>

      <div className="flex flex-col md:flex-row md:justify-center items-start md:items-center gap-4 md:gap-9 my-8 mt-14 w-full md:w-fit md:mx-auto">
        {(Object.keys(WorldNames) as WebotsWorld[]).map((key) => (
          <button
            key={key}
            type="button"
            className={`border-2 rounded-full text-[#021727] px-6 py-2 uppercase inline-block md:mx-auto font-[700] ${selectedWorld === key ? 'bg-webotsGreen text-[#021727] border-webotsGreen' : 'bg-transparent text-white'}`}
            onClick={() => { setSelectedWorld(key); }}
          >{WorldNames[key]}</button>
        ))}
      </div>

      <div className="w-full max-w-4xl mx-auto overflow-x-auto mt-14">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 w-4">#</th>
              <th className="px-4 py-2">Názov</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Body</th>
              {/* <th className="px-4 py-2">Cas</th> */}
            </tr>
          </thead>
          <tbody>
            {showData.length === 0 && <tr><td colSpan={4} className="border p-4 text-center">Nie sú k dispozícii žiadne údaje</td></tr>}
            {showData.map((row, index) => (
              <tr key={row.uuid} className="font-medium even:bg-[#02192f]">
                <td className="border border-neutral-500 px-4 py-2 w-4">{index + 1}</td>
                <td className="border border-neutral-500 px-4 py-2">{row.name}</td>
                <td className="border border-neutral-500 px-4 py-2">{ESTATE_NAMES[row.status]}</td>
                <td className="border border-neutral-500 px-4 py-2 text-right">{row.score === 0 ? '-' : row.score}</td>
                {/* <td className="border px-4 py-2">{row.meta}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-24">
        <Link to={'/'} className='rounded-full bg-webotsGreen text-[#021727] text-2xl px-8 py-3 uppercase inline-block mx-auto font-[900]'>
          Spustiť novú vlastnú simuláciu
        </Link>
      </div>
    </main>
  )
};

export default Scoreboard;