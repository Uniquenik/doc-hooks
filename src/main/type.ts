import { Control } from './controls';

export type initialKeys<T> = Exclude<keyof T, '' | 'type' | 'id' | 'value' | 'setValue'>;

export type UseDefaultControl<ControlType extends Control> = (
  control: Pick<ControlType, initialKeys<ControlType>>,
) => [ControlType['value'], ControlType['setValue']];
