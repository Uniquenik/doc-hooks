import { Button } from '@mantine/core';
import * as React from 'react';
import { FC } from 'react';
import { useStringControl } from '../../main';
import { useCheckboxControl } from '../../main/controls/checkboxControl';

export const ButtonStory: FC = () => {
  const [stringControl] = useStringControl({
    defaultValue: 'John',
    name: 'String control',
    minLength: 3,
    maxLength: 1000,
    regex: undefined,
  });

  const [value] = useCheckboxControl({
    defaultValue: ['Disabled'],
    name: 'Button style',
    options: ['Disabled', 'Compact'],
  });

  console.log(value);

  return (
    <div>
      <Button disabled={value.includes('Disabled')}>{stringControl}</Button>
    </div>
  );
};
