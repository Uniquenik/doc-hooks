import React, { ChangeEventHandler, FC } from 'react';
import { StringControl } from '../type';
import { Text, Textarea } from '@mantine/core';

export const RenderStringControl: FC<StringControl> = props => {
  const { name, value, setValue, minLength, maxLength, washRegex } = props;

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    const updated: string = washRegex ? e.target.value.replace(washRegex, '') : e.target.value;
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
