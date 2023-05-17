import { useContext } from 'react';
import { DataContext, type IDataContext } from '../contexts/DataContext';

export function useData(): IDataContext | undefined {
  return useContext(DataContext);
}
