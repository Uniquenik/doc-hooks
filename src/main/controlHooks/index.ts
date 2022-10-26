import { ControlsContext } from '../context';
import { Control, UseControl } from '../type';
import { uid } from '../utils';
import { useContext, useEffect, useRef, useState } from 'react';
import { pick } from '../context/subject';

type initialKeys<T> = Exclude<keyof T, '' | 'type' | 'id' | 'value' | 'setValue'>;

export const createControlHook = <T extends Control>(
  type: T['type'],
  updateOnChange: Array<keyof Pick<T, initialKeys<T>>> = [],
): UseControl<T> => {
  return control => {
    const { deleteControl, createControl, updateControl } = useContext(ControlsContext);
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
      const id = uid();
      idRef.current = id;
      createControl(id, { ...control, type, value, setValue, id } as T);
      return () => deleteControl(id);
    }, []);

    return [value, setValue];
  };
};
