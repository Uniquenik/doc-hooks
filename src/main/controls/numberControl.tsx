import { BaseControl, createControlHook } from './index';
import React, { FC, useEffect } from 'react';
import { NumberInput, Slider, Stack, Text } from '@mantine/core';
import { ControlComponent } from './components/controlComponent';

export interface NumberControl extends BaseControl<number> {
  type: 'number';
  max?: number;
  min?: number;
  step?: number;
  isInput?: boolean;
  isPositive?: boolean;
  marks?: { value: number; label: string }[];
}

type UseNumberControlParams = {
  name: string;
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
  isInput?: boolean;
  isPositive?: boolean;
  marks?: { value: number; label: string }[];
};

type UseNumberControlReturn = [number, (newValue: number) => void];
export const useNumberControl: (params: UseNumberControlParams) => UseNumberControlReturn =
  createControlHook<NumberControl>('number', ['min', 'max']);

export const RenderNumberControl: FC<NumberControl> = props => {
  const { name, value, setValue, min, max, step = 1, isInput, marks, isPositive } = props;

  //Effects
  /*  useEffect(() => {
    setValue(Number(localValue));
  }, [localValue]);*/

  useEffect(() => {
    if (min && value <= min) {
      setValue(min);
      return;
    }

    if (max && value >= max) {
      setValue(max);
    }

    if (isPositive && value < 0) {
      setValue(0);
    }
  }, [min, max, isPositive]);

  //Handlers
  const onChange = (value: string) => {
    setValue(Number(value));
  };

  const onInputChange = (value: number | '') => {
    onChange(String(value) || '');
  };

  const onSliderChange = (value: number | undefined) => {
    setValue(value || 0);
  };

  //Render
  return (
    <Stack py={20} px={4}>
      <ControlComponent
        leftSide={<Text size={'lg'}>{name}</Text>}
        rightSide={
          <>
            {isInput ? (
              <NumberInput min={min} max={max} step={step} value={value} onChange={onInputChange} />
            ) : (
              <Slider
                labelAlwaysOn
                min={min}
                max={max}
                step={step}
                defaultValue={value}
                marks={marks}
                onChange={onSliderChange}
              />
            )}
          </>
        }
      />
    </Stack>
  );
};
