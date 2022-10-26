import { createControlHook, StringControl } from './index';

type UseStringControlParams = {
  name: string;
  defaultValue: string;
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
};

type UseStringControlReturn = [string, (newValue: string) => void];

export const useStringControl: (params: UseStringControlParams) => UseStringControlReturn =
  createControlHook<StringControl>('string', ['maxLength', 'minLength', 'regex']);
