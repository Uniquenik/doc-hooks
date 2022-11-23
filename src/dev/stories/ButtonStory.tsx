import { Button, ButtonProps, MantineSize, useMantineTheme } from '@mantine/core';
import * as React from 'react';
import { FC } from 'react';
import { useNumberControl, useStringControl } from '../../main';
import { useCheckboxControl } from '../../main';
import { useRadioControl } from '../../main';
import { useRecordRadioControl } from '../../main';
import { useSwitchControl } from '../../main';
import { useColorRadioControl } from '../../main';

export const ButtonStory: FC = () => {
  const theme = useMantineTheme();

  const [variantValue] = useRadioControl({
    defaultValue: 'Filled',
    name: 'Button variant',
    options: ['Filled', 'Light', 'Outline', 'Default', 'Subtle'],
  });

  const [colorValue] = useColorRadioControl({
    defaultValue: 'red',
    name: 'Color',
    options: Object.keys(theme.colors).map(item => theme.colors[item][5]),
    //or options: ['#FFFFFF', '#000000'],
    //or options: [theme.colors...]
  });

  const [radiusValue] = useNumberControl({
    defaultValue: 10,
    name: 'Radius',
    step: 1,
    min: 0,
    max: 20,
  });

  const sliderMarks = [
    { value: 0, label: 'xs' },
    { value: 25, label: 'sm' },
    { value: 50, label: 'md' },
    { value: 75, label: 'lg' },
    { value: 100, label: 'xl' },
  ];
  const [sizeValue] = useNumberControl({
    defaultValue: 50,
    name: 'Size button',
    step: 25,
    marks: sliderMarks,
  });

  const [checkboxValue] = useCheckboxControl({
    defaultValue: [],
    name: 'Button style',
    options: ['Disabled', 'Compact', 'Loading'],
  });

  const [uppercaseValue] = useSwitchControl({
    defaultValue: false,
    name: 'Uppercase',
  });

  const [stringControl] = useStringControl({
    defaultValue: 'Name',
    name: 'Button name',
    rowsCount: 1,
  });

  const [recordRadioValue] = useRecordRadioControl({
    defaultValue: { key: 'White', value: 'gray' },
    name: 'Color',
    options: [
      { key: 'White', value: 'gray' },
      { key: 'Black', value: 'dark' },
    ],
  });

  //Render
  return (
    <div>
      <Button
        color={colorValue}
        radius={radiusValue}
        uppercase={uppercaseValue}
        compact={checkboxValue.includes('Compact')}
        loading={checkboxValue.includes('Loading')}
        disabled={checkboxValue.includes('Disabled')}
        variant={variantValue.toLowerCase() as ButtonProps['variant']}
        size={sliderMarks.find(item => item.value === sizeValue)?.label as MantineSize}
      >
        {stringControl}
      </Button>
    </div>
  );
};
