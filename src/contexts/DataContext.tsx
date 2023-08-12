import React, { type PropsWithChildren, createContext } from 'react';
import type { IController, IWorld } from '../types';

export interface IDataContext {
  worlds: IWorld[],
  controllers: IController[]
}

export const DataContext = createContext<IDataContext | undefined>(undefined);
export const DataContextProvider: React.FC<{ value: IDataContext } & PropsWithChildren> = ({ children, value }) => {
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}