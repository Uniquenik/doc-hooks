import { StringControl } from './stringControl';

import { ControlsContext } from '../context';
import { initialKeys, UseDefaultControl } from '../type';
import { uid } from '../utils';
import { useContext, useEffect, useRef, useState } from 'react';
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
    const idRef = useRef<string>();

    useEffect(() => {
      if (idRef.current) updateControl(idRef.current, { value });
    }, [value]);

    useEffect(
      () => {
        if (idRef.current) {
          updateControl(idRef.current, pick(control as T, updateOnChange as string[]));
        }
      },
      updateOnChange.map(key => control[key]),
    );

    useEffect(() => {
      checkContext(inContext);
      const id = uid();
      idRef.current = id;
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
