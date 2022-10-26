import { createContext } from 'react';
import { Control, ControlsContextType } from '../type';
import { Subject } from './subject';

export const ControlsContext = createContext<ControlsContextType>({
  controls: new Subject<Record<string, Control>>({}),
  updateControl: () => {},
  deleteControl: () => {},
  createControl: () => {},
});
