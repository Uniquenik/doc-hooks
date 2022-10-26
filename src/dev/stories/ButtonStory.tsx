import * as React from 'react';
import { FC } from 'react';
import { useStringControl } from '../../main';

export const ButtonStory: FC = () => {
  const [stringControl] = useStringControl({
    defaultValue: 'John',
    name: 'String control',
    minLength: 3,
    maxLength: 1000,
    washRegex: undefined,
  });

  return (
    <div>
      <button>{stringControl}</button>
    </div>
  );
};
