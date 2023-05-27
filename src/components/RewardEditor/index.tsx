import React from 'react'
import { useBuild } from '../../hooks/useBuild';
import CodeEditor from '@uiw/react-textarea-code-editor'

const codeStyle = {
  fontFamily: '"ui-monospace", "SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", "Menlo", "monospace"',
  fontSize: '0.875rem',
};

const codePlaceholder = '# Keep this empty to use default reward function\n# or write your own here';


export const RewardEditor: React.FC = () => {
  const build = useBuild();

  return (
    <>
      <span className='bg-[#010d17] p-8 text-red-600 block lg:hidden'>Editovanie odmeňovacieho vzorca nie je dostupne na mobilnych zariadeniach</span>
      <span className='hidden lg:block text-lg mb-4'>
        V svojom vzorci na odmenovanie robotov vo futbale by si mal vziať do úvahy konštanty, ako napríklad veľkosť robota, veľkosť ihriska a podobne, ktore sa nachádzaju v premennej .
        Týmto spôsobom budeš mať rovnaké premenné ako my a ostatní tréneri. Pomôžu ti zaručiť konzistentnosť v tréningu, aby všetci mali rovnaké podmienky
        a výsledky sa hodnotili na základe tvojho premyslenia. A ak si chceš získať ďalšiu inšpiráciu, môžeš sa pozrieť aj na existujúce vzorce a konštanty
        a inšpirovať sa <a href="WeBots-summary.pdf" className='text-webotsGreen' target='_blank'>na tomto odkaze</a>.
      </span>
      <p className='bg-[#010d17] p-8 mb-4 hidden lg:block'>
        V triede SoccerRobot máme úžasný atribút s názvom isee. Nebojte sa, nie je to nová okuliarová značka, ide o spôsob, ako uchovávať informácie o tom, čo robot práve vidí vo svojej kamere. Je to akoby kľúč k jeho futbalovému svetu, kde rozpoznáva objekty a ukladá si ich do pamäti. <br /><br />
        Ak chceme byť formálni, je to objekt, ktorého hodnota je pole, ktoré obsahuje zopár parametrov. Kľúčom je názov rozpoznaného objektu, čo môže byt napríklad &quot;Blue Goal&quot; (global GOAL_SELF alebo GOAL_OPP) <br /><br />
        Prvý parameter, isee[NAZOV_OBJEKTU][0], je vzdialenosť. Áno, robot si meria vzdialenosť od objektu a ukladá ju sem. Akože, pýta sa sám seba: &quot;Ako ďaleko som od toho?&quot; A on si na to odpovie číselnou hodnotou. Trochu také filozofické, že? <br /><br />
        Druhý parameter isee[NAZOV_OBJEKTU][1],nám hovorí o polohe objektu v priestore. Je to taká tá poloha [x, y], vieš, ako keď hľadáš poklad na mape a označíš si miesto na ktorom ho máš nájsť. Robot takto označuje, kde sa objekt nachádza v priestore. Toto si môžeme predstaviť ako akýsi zvýraznený bod na mape. <br /><br />
        No a tretí parameter isee[NAZOV_OBJEKTU][2] je o polohe objektu na snímke. Takže, ak by ste si predstavili, že tá kamera je robotovým fotoaparátom, tak toto nám hovorí o tom, kde sa objekt nachádza na tej fotke. Máme tu bod [x, y] - takže to je akoby malý kruh s popiskom &quot;Objekt tu!&quot; <br /><br />
        A na záver, štvrtý parameter isee[NAZOV_OBJEKTU][3] nám hovorí o veľkosti objektu na snímke. Ako keď si kupujete tričko a hľadáte tú správnu veľkosť. Robot to zaznamenáva vo formáte [šírka, výška], takže vie, ako veľký ten objekt je. <br /><br />
        PS: Tieto informácie vieš využiť na vzorček pre odmenu.
      </p>
      <div className='bg-[#010d17] p-8 text-[#ffc2c2] text-sm hidden lg:block' style={codeStyle}>
        <span className='block'>
          import consts<br />
          <br />
          GOAL_SELF = # Názov modely vlastnej bránky <br />
          GOAL_OPP = # Názov modelu bránky protihráča <br />
          GOAL_OPP_POS = # Pozícia bránky protihráča v tvare [x, y]<br />
          <br />
          SOCC_BALL = # Názov modelu lopty <br />
          OBSTACLE = # Názov modelu prekážky <br />
          <br />
          MAX_SPEED = # Maximálna rýchlosť <br />
          <br />
          class SoccerRobot(RobotSupervisor):
        </span>
        <span className='block pl-[2.5em]'>
          def __init__(self):<br />
          def get_observations(self):<br />
          ...<br />
          isee # what controller sees<br />
          ...<br />
        </span>
        <span className='block pl-[2.5em]'>
          def get_reward(self):
        </span>
        <span className='block pl-[5em] mb-3'>
          rewards = [0.0]
        </span>
        <CodeEditor
          value={''}
          language='python'
          placeholder={codePlaceholder}
          onChange={(x) => {
            build.updateContext({ rewardFn: x.target.value });
          }}
          padding={15}
          minHeight={200}
          className='bg-transparent text-sm ml-[calc(5em-15px)] border border-[#ffc2c2]'
          style={codeStyle}
        />
        <span className='block pl-[5em] mt-3'>
          return sum(rewards)
        </span>
      </div>
    </>
  )
}
