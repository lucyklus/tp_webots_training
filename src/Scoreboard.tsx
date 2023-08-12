import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { WEBEApiControllerGetResponse, WebotsWorld } from './types';
import { ESTATE_NAMES } from './types/consts';

// GET api/leaderboard
type WEBEApiLeaderboardGetResponseAdjusted = Omit<WEBEApiControllerGetResponse, 'meta'>;
type WEBEApiLeaderboardGetResponseImproved = WEBEApiLeaderboardGetResponseAdjusted & { createdAt: Date };
type WEBEApiLeaderboardGetResponse = WEBEApiLeaderboardGetResponseImproved[]
type TSorts = 'position' | 'score' | 'name' | 'status' | 'createdAt';

const WorldNames: Record<WebotsWorld, string> = {
  'goal-only': 'Jednoduchý svet',
  'goal-random-ball': 'Náhodná lopta',
  'goal-and-obstacles': 'Prekážky',
  'soccer': 'Tím vs. tím'
}

const SORTERS: Record<TSorts, (asc: boolean) => (a: WEBEApiLeaderboardGetResponseImproved, b: WEBEApiLeaderboardGetResponseImproved) => number> = {
  'position': (asc) => (a, b) => asc ? a.score - b.score : b.score - a.score,
  'score': (asc) => (a, b) => asc ? a.score - b.score : b.score - a.score,
  'name': (asc) => (a, b) => asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
  'status': (asc) => (a, b) => asc ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status),
  // date compare
  'createdAt': (asc) => (a, b) => asc ? b.createdAt.getTime() - a.createdAt.getTime() : a.createdAt.getTime() - b.createdAt.getTime()
}

const dtFormatter = new Intl.DateTimeFormat('sk-SK', { dateStyle: 'short', timeStyle: 'short' });

const Scoreboard: React.FC = () => {

  const [data, setData] = useState<WEBEApiLeaderboardGetResponse | null>(null);
  const [selectedWorld, setSelectedWorld] = useState<WebotsWorld>('goal-only');
  const [selectedSorter, setSelectedSorter] = useState<TSorts>('createdAt');
  const [selectedASC, setSelectedASC] = useState<boolean>(true);
  const navigate = useNavigate();

  const selectSorter = (sorter: TSorts): void => {
    setSelectedASC(sorter === selectedSorter ? !selectedASC : true);
    setSelectedSorter(sorter);
  };

  const fetchAndSetData: () => void = () => {
    fetch('/api/leaderboard')
      .then(async (res) => (await res.json()) as WEBEApiLeaderboardGetResponseAdjusted[])
      .then((data) => data.map((item) => ({ ...item, createdAt: new Date(item.createdAt) })) as WEBEApiLeaderboardGetResponseImproved[] )
      .then((data) => { setData(data); })
      .catch((err) => { console.error(err) });
  };

  useEffect(() => {
    fetchAndSetData();
    const interval = setInterval(() => { fetchAndSetData(); }, 10000);
    return () => { clearInterval(interval) };
  }, []);

  const showData = useMemo(() => data === null ? null : data
    .filter((item) => item.world === selectedWorld)
    .sort(SORTERS[selectedSorter](selectedASC))
  , [data, selectedWorld, selectSorter, selectedASC]);

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
            {showData !== null && (
              <tr>
                <th className="px-4 py-2 w-4">#</th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => { selectSorter('name') }}>Názov {selectedSorter === 'name' && <span>{ selectedASC ? '▼' : '▲' }</span>}</th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => { selectSorter('status') }}>Status {selectedSorter === 'status' && <span>{ selectedASC ? '▼' : '▲' }</span>}</th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => { selectSorter('score') }}>Body {selectedSorter === 'score' && <span>{ selectedASC ? '▼' : '▲' }</span>}</th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => { selectSorter('createdAt') }}>Dátum vytvorenia {selectedSorter === 'createdAt' && <span>{ selectedASC ? '▼' : '▲' }</span>}</th>
              </tr>
            )}
          </thead>
          <tbody>
            {showData === null && <tr><td colSpan={5} className="p-4 text-center uppercase">
              <div
                className="h-8 w-8 rounded-full animate-spin bg-transparent border border-transparent border-t-webotsGreen mx-auto motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
                role="status"
              ></div>
            </td></tr>}
            {showData?.length === 0 && <tr><td colSpan={5} className="border p-4 text-center">Nie sú k dispozícii žiadne údaje</td></tr>}
            {showData?.map((row, index) => (
              <tr key={row.uuid} className="font-medium even:bg-[#02192f]">
                <td className="border border-neutral-500 px-4 py-2 w-4">{index + 1}</td>
                <td className="border border-neutral-500 px-4 py-2 cursor-pointer hover:text-webotsGreen" onClick={() => { navigate(`/robot/${row.name}`) }}>{row.name}</td>
                <td className="border border-neutral-500 px-4 py-2">{ESTATE_NAMES[row.status]}</td>
                <td className="border border-neutral-500 px-4 py-2 text-right">{row.score === 0 ? '-' : row.score}</td>
                <td className="border border-neutral-500 px-4 py-2 text-right">{dtFormatter.format(row.createdAt)}</td>
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