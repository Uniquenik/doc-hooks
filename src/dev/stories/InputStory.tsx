import * as React from 'react';
import { FC } from 'react';
import { useStringControl } from '../../main';

export const InputStory: FC = () => {
  const [stringControl] = useStringControl({
    defaultValue: 'John',
    name: 'String control',
    minLength: 3,
    maxLength: 1000,
  });

  return (
    <div>
      <input value={stringControl} />
    </div>
  );
};

export const InputStoryMarkdown: string = `## Заголовок
    текст

  -список

  -список
`;
