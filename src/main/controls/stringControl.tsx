import React, { ChangeEventHandler, FC } from 'react';
import { Text, Textarea } from '@mantine/core';
import { StringControl } from '../controlHooks';

export const RenderStringControl: FC<StringControl> = props => {
  const { name, value, setValue, minLength, maxLength, regex } = props;

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    const updated: string = regex ? e.target.value.replace(regex, '') : e.target.value;
    if (maxLength && updated.length > maxLength) return;
    if (minLength && updated.length < minLength) return;
    setValue(updated);
  };

  return (
    <>
      <Text>{name}</Text>
      <Textarea value={value} onChange={onChange} />
    </>
  );
};
