import { createContext } from 'react';
import { Subject } from './subject';
import { Control } from '../controlHooks';

export type ControlsContextType = {
  controls: Subject<Record<string, Control>>;
  createControl: (id: string, control: Control) => void;
  updateControl: (id: string, partial: Partial<Control>) => void;
  deleteControl: (id: string) => void;
};

export const ControlsContext = createContext<ControlsContextType>({
  controls: new Subject<Record<string, Control>>({}),
  updateControl: () => {},
  deleteControl: () => {},
  createControl: () => {},
});
