import { BaseControl, createControlHook } from './index';
import React, { ChangeEventHandler, FC } from 'react';
import { Checkbox, Group, Stack, Text } from '@mantine/core';
import { ControlComponent } from './components/controlComponent';

type UseCheckboxControlParams = {
  name: string;
  defaultValue: string[];
  options: string[];
};

type UseCheckboxControlReturn = [string[], (newValue: string[]) => void];

export interface CheckboxControl extends BaseControl<string[]> {
  type: 'checkbox';
  options: string[];
}

export const useCheckboxControl: (params: UseCheckboxControlParams) => UseCheckboxControlReturn =
  createControlHook<CheckboxControl>('checkbox');

export const RenderCheckboxControl: FC<CheckboxControl> = props => {
  const { name, value, setValue, options } = props;

  //Handlers
  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { checked } = e.currentTarget;

    if (checked) {
      setValue([...value, e.currentTarget.value]);
    } else {
      setValue(value.filter(item => item !== e.currentTarget.value));
    }
  };

  //Render
  return (
    <Stack py={20} px={4}>
      <ControlComponent
        leftSide={<Text size={'lg'}>{name}</Text>}
        rightSide={
          <Group>
            {options.map(option => (
              <Checkbox
                key={option}
                value={option}
                label={option}
                checked={value.includes(option)}
                onChange={onChange}
              />
            ))}
          </Group>
        }
      />
    </Stack>
  );
};
