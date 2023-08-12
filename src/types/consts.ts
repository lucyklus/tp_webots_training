import type { TState } from '.';

export const ESTATE_NAMES: Record<TState, string> = {
  'created': 'Vytvorený',
  'in-queue': 'Na rade',
  'in-progress': 'V simulácii',
  'finished': 'Vyhodnotený',
  'error': 'Chyba'
};
