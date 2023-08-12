import React, { type PropsWithChildren, createContext } from 'react';
import type { IControllerGeneratorConfig } from '../types';

export interface IBuildContext extends IControllerGeneratorConfig {
  error: string | null,
  success: string | null,
  updateContext: (newContext: Partial<Omit<IBuildContext, 'updateContext'>>) => IBuildContext
}

export const DEFAULT_BUILD_CONTEXT: IBuildContext = {
  error: null,
  success: null,
  controller: 'deepbots',
  world: 'goal-only',
  observations: [],
  rewardFn: '',
  updateContext: (newContext) => ({ ...DEFAULT_BUILD_CONTEXT, ...newContext })
};

export const BuildContext = createContext<IBuildContext>(DEFAULT_BUILD_CONTEXT);
export const BuildContextProvider: React.FC<{ value: IBuildContext } & PropsWithChildren> = ({ children, value }) => {
  return (
    <BuildContext.Provider value={value}>
      {children}
    </BuildContext.Provider>
  );
}