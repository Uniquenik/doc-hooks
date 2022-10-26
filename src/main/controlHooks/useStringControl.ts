import { StringControl } from '../type';
import { createControlHook } from './index';

type UseStringControlParams = {
  name: string;
  defaultValue: string;
  minLength?: number;
  maxLength?: number;
  washRegex?: RegExp;
};

type UseStringControlReturn = [string, (newValue: string) => void];

export const useStringControl: (params: UseStringControlParams) => UseStringControlReturn =
  createControlHook<StringControl>('string', ['maxLength', 'minLength', 'washRegex']);
