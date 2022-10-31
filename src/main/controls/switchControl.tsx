import { BaseControl, createControlHook } from './index';
import { ChangeEventHandler, FC } from 'react';
import { Stack, Switch } from '@mantine/core';

type UseSwitchControlParams = {
  name: string;
  defaultValue: boolean;
};

type UseSwitchControlReturn = [boolean, (newValue: boolean) => void];

export interface SwitchControl extends BaseControl<boolean> {
  type: 'switch';
}

export const RenderSwitchControl: FC<SwitchControl> = props => {
  const { name, value, setValue } = props;

  //Handlers
  const onChange: ChangeEventHandler<HTMLInputElement> = e => setValue(e.currentTarget.checked);

  //Render
  return (
    <Stack py={16} px={4}>
      <Switch checked={value} label={name} onChange={onChange} />
    </Stack>
  );
};

export const useSwitchControl: (params: UseSwitchControlParams) => UseSwitchControlReturn =
  createControlHook<SwitchControl>('switch');
