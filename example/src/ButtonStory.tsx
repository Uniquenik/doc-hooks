import { Button, ButtonProps, MantineSize, useMantineTheme } from '@mantine/core';
import * as React from 'react';
import { FC } from 'react';
import {
  useCheckboxControl,
  useColorRadioControl,
  useNumberControl,
  useRadioControl, useStringControl,
  useSwitchControl,
} from 'react-doc-hooks';

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
    options: Object.keys(theme.colors).map(item => { return theme.colors[item][5]}),
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

  //Render
  return (
    <div>
      <Button
        sx={{backgroundColor: colorValue}}
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
