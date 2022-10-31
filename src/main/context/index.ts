import { createContext } from 'react';
import { Subject } from './subject';
import { Control } from '../controls';

export type ControlsContextType = {
  controls: Subject<Record<string, Control>>;
  createControl: (id: string, control: Control) => void;
  //если Partial - ругается, что используемое свойство может быть undefined
  updateControl: (id: string, partial: { [P in keyof Control]?: Control[P] }) => void;
  deleteControl: (id: string) => void;
};

export const ControlsContext = createContext<ControlsContextType>({
  controls: new Subject<Record<string, Control>>({}),
  updateControl: () => {},
  deleteControl: () => {},
  createControl: () => {},
});
