import React, { ChangeEventHandler, FC } from 'react';
import { Text, Textarea } from '@mantine/core';
import { BaseControl, createControlHook } from './index';

type UseStringControlParams = {
  name: string;
  defaultValue: string;
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
};

export interface StringControl extends BaseControl<string> {
  type: 'string';
  maxLength?: number;
  minLength?: number;
  regex?: RegExp;
}

type UseStringControlReturn = [string, (newValue: string) => void];

export const RenderStringControl: FC<StringControl> = props => {
  const { name, value, setValue, minLength, maxLength, regex } = props;

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    const updated: string = regex ? e.target.value.replace(regex, '') : e.target.value;
    if (maxLength && updated.length > maxLength) return;
    if (minLength && updated.length < minLength) return;
    setValue(updated);
  };

  return (
    <>
      <Text>{name}</Text>
      <Textarea value={value} onChange={onChange} />
    </>
  );
};

export const useStringControl: (params: UseStringControlParams) => UseStringControlReturn =
  createControlHook<StringControl>('string', ['maxLength', 'minLength', 'regex']);
