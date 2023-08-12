import { useContext } from 'react';
import { BuildContext, type IBuildContext } from '../contexts/BuildContext';

export function useBuild(): IBuildContext {
  return useContext(BuildContext);
}
