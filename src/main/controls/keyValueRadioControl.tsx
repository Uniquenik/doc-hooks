import { BaseControl, createControlHook } from './index';
import React, { FC } from 'react';
import { Radio, Stack, Text } from '@mantine/core';
import { ControlComponent } from './components/controlComponent';

type KeyValueRadioControlType = { key: string; value: string };

type UseKeyValueRadioControlParams = {
  name: string;
  defaultValue: KeyValueRadioControlType;
  options: KeyValueRadioControlType[];
};

type UseKeyValueRadioControlReturn = [KeyValueRadioControlType, (newKey: KeyValueRadioControlType) => void];

export interface KeyValueRadioControl extends BaseControl<KeyValueRadioControlType> {
  type: 'keyValueRadio';
  options: KeyValueRadioControlType[];
}

export const useRecordRadioControl: (params: UseKeyValueRadioControlParams) => UseKeyValueRadioControlReturn =
  createControlHook<KeyValueRadioControl>('keyValueRadio');

export const RenderKeyValueRadioControl: FC<KeyValueRadioControl> = props => {
  const { name, value, setValue, options } = props;

  //Handlers
  const onChange = (newKey: string) => {
    const item = options.find(obj => obj.key === newKey);

    if (item) {
      setValue(item);
    }
  };

  //Render
  return (
    <Stack py={16} px={4}>
      <ControlComponent
        leftSide={<Text size={'lg'}>{name}</Text>}
        rightSide={
          <Radio.Group value={value.key} onChange={onChange}>
            {options.map(option => (
              <Radio key={option.key} value={option.key} label={option.key} />
            ))}
          </Radio.Group>
        }
      />
    </Stack>
  );
};
