import { Button, ButtonProps, useMantineTheme } from '@mantine/core';
import * as React from 'react';
import { FC } from 'react';
import { useStringControl } from '../../main';
import { useCheckboxControl } from '../../main/controls/checkboxControl';
import { useRadioControl } from '../../main/controls/radioControl';
import { useRecordRadioControl } from '../../main/controls/keyValueRadioControl';
import { useSwitchControl } from '../../main/controls/switchControl';
import { useColorRadioControl } from '../../main/controls/colorRadioControl';

export const ButtonStory: FC = () => {
  const theme = useMantineTheme();

  const [stringControl] = useStringControl({
    defaultValue: 'John',
    name: 'String control',
    rowsCount: 1,
    regex: undefined,
  });

  const [checkboxValue] = useCheckboxControl({
    defaultValue: [],
    name: 'Button style',
    options: ['Disabled', 'Compact'],
  });

  const [radioValue] = useRadioControl({
    defaultValue: 'Filled',
    name: 'Variant',
    options: ['Filled', 'Light', 'Outline', 'Default', 'Subtle'],
  });

  const [recordRadioValue] = useRecordRadioControl({
    defaultValue: { key: 'White', value: 'gray' },
    name: 'Color',
    options: [
      { key: 'White', value: 'gray' },
      { key: 'Black', value: 'dark' },
    ],
  });

  const [uppercaseValue] = useSwitchControl({
    defaultValue: false,
    name: 'Uppercase',
  });

  const [colorValue] = useColorRadioControl({
    defaultValue: theme.colors.grape[3],
    name: 'Color',
    options: [theme.colors.dark[2], theme.colors.grape[3]],
    //or options: ['#FFFFFF', '#000000'],
  });

  return (
    <div>
      <Button
        color={recordRadioValue.value}
        uppercase={uppercaseValue}
        variant={radioValue.toLowerCase() as ButtonProps['variant']}
        disabled={checkboxValue.includes('Disabled')}
        compact={checkboxValue.includes('Compact')}
        style={{ backgroundColor: colorValue }}
      >
        {stringControl}
      </Button>
    </div>
  );
};
