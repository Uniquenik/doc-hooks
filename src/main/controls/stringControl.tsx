import React, { ChangeEventHandler, FC } from 'react';
import { Group, Text, Textarea } from '@mantine/core';
import { BaseControl, createControlHook } from './index';
import { ControlComponent } from './components/controlComponent';

type UseStringControlParams = {
  name: string;
  defaultValue: string;
  rowsCount?: number;
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
};

export interface StringControl extends BaseControl<string> {
  type: 'string';
  rowsCount?: number;
  maxLength?: number;
  minLength?: number;
  regex?: RegExp;
}

type UseStringControlReturn = [string, (newValue: string) => void];

export const RenderStringControl: FC<StringControl> = props => {
  const { name, value, setValue, minLength, maxLength, rowsCount, regex } = props;

  //Handlers
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    const updated: string = regex ? e.target.value.replace(regex, '') : e.target.value;
    if (maxLength && updated.length > maxLength) return;
    if (minLength && updated.length < minLength) return;
    setValue(updated);
  };

  //Render
  return (
    <Group py={16} px={4}>
      <ControlComponent
        leftSide={<Text size={'lg'}>{name}</Text>}
        rightSide={
          <Textarea size={'sm'} value={value} variant={'filled'} minRows={rowsCount || 3} onChange={onChange} />
        }
      />
    </Group>
  );
};

export const useStringControl: (params: UseStringControlParams) => UseStringControlReturn =
  createControlHook<StringControl>('string', ['maxLength', 'minLength', 'regex']);
