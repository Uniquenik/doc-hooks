import { StringControl } from './stringControl';

import { ControlsContext } from '../context';
import { initialKeys, UseDefaultControl } from '../type';
import { uid } from '../utils';
import { useContext, useEffect, useState } from 'react';
import { pick } from '../context/subject';
import { CheckboxControl } from './checkboxControl';
import { RadioControl } from './radioControl';
import { KeyValueRadioControl } from './keyValueRadioControl';
import { SwitchControl } from './switchControl';
import { ColorRadioControl } from './colorRadioControl';

export interface BaseControl<T> {
  id: string;
  type: string;
  name: string;
  defaultValue: T;
  value: T;
  setValue: (newValue: T) => void;
}

export type Control =
  | StringControl
  | CheckboxControl
  | RadioControl
  | KeyValueRadioControl
  | SwitchControl
  | ColorRadioControl;

export const createControlHook = <T extends Control>(
  type: T['type'],
  updateOnChange: Array<keyof Pick<T, initialKeys<T>>> = [],
): UseDefaultControl<T> => {
  return control => {
    const { deleteControl, createControl, updateControl, inContext } = useContext(ControlsContext);
    const [value, setValue] = useState(control.defaultValue);
    const [idRef, setIdRef] = useState<string>();

    useEffect(() => {
      if (idRef) updateControl(idRef, { value });
    }, [value]);

    useEffect(() => {
      if (idRef) {
        updateControl(idRef, pick(control as T, updateOnChange as string[]));
      }
    }, []);

    useEffect(() => {
      checkContext(inContext);
      const id = uid();
      setIdRef(id);
      createControl(id, { ...control, type, value, setValue, id } as T);
      return () => deleteControl(id);
    }, []);

    return [value, setValue];
  };
};

export const checkContext = (() => {
  let called = false;
  return (inContext: boolean) => {
    if (!called && !inContext) {
      console.error('Hook use without component');
      called = true;
    }
  };
})();
