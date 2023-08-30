import { BaseControl, createControlHook } from './index';
import React, { FC } from 'react';
import { Radio, Stack, Text } from '@mantine/core';
import { ControlComponent } from './components/controlComponent';

type UseRadioControlParams = {
  name: string;
  defaultValue: string;
  options: string[];
};

type UseRadioControlReturn = [string, (newValue: string) => void];

export interface RadioControl extends BaseControl<string> {
  type: 'radio';
  options: string[];
}

export const useRadioControl: (params: UseRadioControlParams) => UseRadioControlReturn =
  createControlHook<RadioControl>('radio');

export const RenderRadioControl: FC<RadioControl> = props => {
  const { name, value, setValue, options } = props;

  //Handlers
  const onChange = (value: string) => {
    setValue(value);
  };

  //Render
  return (
    <Stack py={16} px={4}>
      <ControlComponent
        leftSide={<Text size={'lg'}>{name}</Text>}
        rightSide={
          <Radio.Group sx={{display: 'flex'}} value={value} onChange={onChange}>
            {options.map(option => (
              <Radio pr={12} pb={8} key={option} value={option} label={option} />
            ))}
          </Radio.Group>
        }
      />
    </Stack>
  );
};
