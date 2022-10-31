import { BaseControl, createControlHook } from './index';
import { ChangeEventHandler, FC } from 'react';
import { Checkbox, Text } from '@mantine/core';

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

export const RenderCheckboxControl: FC<CheckboxControl> = ({ name, value, setValue, options }) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { checked } = e.currentTarget;

    if (checked) {
      setValue([...value, e.currentTarget.value]);
    } else {
      setValue(value.filter(item => item !== e.currentTarget.value));
    }
  };

  return (
    <div>
      <Text>{name}</Text>
      <div>
        {options.map(option => (
          <Checkbox
            name={option}
            label={<Text>{option}</Text>}
            key={option}
            checked={value.includes(option)}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
};
