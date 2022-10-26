import { Subject } from './context/subject';

export interface BaseControl<T> {
  id: string;
  type: string;
  name: string;
  defaultValue: T;
  value: T;
  setValue: (newValue: T) => void;
}

export interface StringControl extends BaseControl<string> {
  type: 'string';
  maxLength?: number;
  minLength?: number;
  washRegex?: RegExp;
}

export type Control = StringControl;

export type ControlsContextType = {
  controls: Subject<Record<string, Control>>;
  createControl: (id: string, control: Control) => void;
  updateControl: (id: string, partial: Partial<Control>) => void;
  deleteControl: (id: string) => void;
};

export type UseControl<ControlType extends Control, OmitTypes extends string = ''> = (
  control: Omit<ControlType, 'type' | 'id' | 'value' | 'setValue' | OmitTypes>,
) => [ControlType['value'], ControlType['setValue']];
