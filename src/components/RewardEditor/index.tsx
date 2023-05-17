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
      <h3>Description docs here</h3>
      <div className='bg-[#010d17] p-8 text-[#ffc2c2] text-sm' style={codeStyle}>
        <span className='block'>
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
          className='bg-transparent text-sm ml-[calc(5em-15px)]'
          style={codeStyle}
        />
        <span className='block pl-[5em] mt-3'>
          return sum(rewards)
        </span>
      </div>
    </>
  )
}
