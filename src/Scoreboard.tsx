import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type WebotsWorld =  'goal-only' | 'goal-random-ball' | 'goal-and-obstacles' | 'soccer';

interface WEBEApiControllerGetResponse {
  uuid: string,
  name: string,
  world: WebotsWorld,
  status: string,
  score: number,
  meta: string // json like
}

// GET api/leaderboard
type WEBEApiLeaderboardGetResponse = WEBEApiControllerGetResponse[]

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
    <main className="mt-16 max-w-[1500px] mx-auto">
      <h1 className="text-8xl uppercase leading-tight font-[900]">
        &#47;&#47; Výsledky simulácie
      </h1>

      <div className="flex justify-center items-center gap-9 my-8 mt-14 w-fit mx-auto">
        <button
          type="button"
          className={`border-2 rounded-full text-[#021727] px-6 py-2 uppercase inline-block mx-auto font-[700] ${selectedWorld === 'goal-only' ? 'bg-webotsGreen text-[#021727] border-webotsGreen' : 'bg-transparent text-white'}`}
          onClick={() => { setSelectedWorld('goal-only'); }}
        >
          Jednoduchý svet
        </button>
        <button
          type="button"
          className={`border-2 rounded-full text-[#021727] px-6 py-2 uppercase inline-block mx-auto font-[700] ${selectedWorld === 'goal-random-ball' ? 'bg-webotsGreen text-[#021727] border-webotsGreen' : 'bg-transparent text-white'}`}
          onClick={() => { setSelectedWorld('goal-random-ball'); }}
        >
          Náhodná lopta
        </button>
        <button
          type="button"
          className={`border-2 rounded-full text-[#021727] px-6 py-2 uppercase inline-block mx-auto font-[700] ${selectedWorld === 'goal-and-obstacles' ? 'bg-webotsGreen text-[#021727] border-webotsGreen' : 'bg-transparent text-white'}`}
          onClick={() => { setSelectedWorld('goal-and-obstacles'); }}
        >
          Prekážky
        </button>
        <button
          type="button"
          className={`border-2 rounded-full text-[#021727] px-6 py-2 uppercase inline-block mx-auto font-[700] ${selectedWorld === 'soccer' ? 'bg-webotsGreen text-[#021727] border-webotsGreen' : 'bg-transparent text-white'}`}
          onClick={() => { setSelectedWorld('soccer'); }}
        >
          Tím vs. tím
        </button>
      </div>

      <table className="w-full mt-14 max-w-4xl mx-auto">
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
              <td className="border border-neutral-500 px-4 py-2">{row.status}</td>
              <td className="border border-neutral-500 px-4 py-2 text-right">{row.score === 0 ? '-' : row.score}</td>
              {/* <td className="border px-4 py-2">{row.meta}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-24">
        <Link to={'/'} className='rounded-full bg-webotsGreen text-[#021727] text-2xl px-8 py-3 uppercase inline-block mx-auto font-[900]'>
          Spustiť novú vlastnú simuláciu
        </Link>
      </div>
    </main>
  )
};

export default Scoreboard;