import { BaseControl, createControlHook } from './index';
import React, { FC } from 'react';
import { CheckIcon, ColorSwatch, Group, Stack, Text } from '@mantine/core';
import { ControlComponent } from './components/controlComponent';

type UseColorRadioControlParams = {
  name: string;
  defaultValue: string;
  options: string[];
};

type UseColorRadioControlReturn = [string, (newValue: string) => void];

export interface ColorRadioControl extends BaseControl<string> {
  type: 'colorRadio';
  options: string[];
}

export const useColorRadioControl: (params: UseColorRadioControlParams) => UseColorRadioControlReturn =
  createControlHook<ColorRadioControl>('colorRadio');

export const RenderColorRadioControl: FC<ColorRadioControl> = props => {
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
          <Group spacing="xs">
            {options.map(color => (
              <ColorSwatch
                key={color}
                size={30}
                component="button"
                color={color}
                onClick={() => onChange(color)}
                sx={{ color: '#fff', cursor: 'pointer' }}
              >
                {value === color && <CheckIcon width={15} />}
              </ColorSwatch>
            ))}
          </Group>
        }
      />
    </Stack>
  );
};
