import * as React from 'react';
import { FC } from 'react';
import { useNumberControl, useStringControl, useSwitchControl } from '../../main';
import {PinInput} from '@mantine/core'

export const InputStory: FC = () => {
  const [placeholderControl] = useStringControl({
    defaultValue: '*',
    name: 'Placeholder',
    maxLength: 1,
    rowsCount: 1
  });

  const [disableControl] = useSwitchControl({
    defaultValue: false,
    name: 'Disable control',
  })

  const [errorControl] = useSwitchControl({
    defaultValue: false,
    name: 'Error control',
  })

  const [lengthControl] = useNumberControl({
    defaultValue: 4,
    min: 4,
    max: 12,
    name: 'Length'
  })

  return (
    <div>
      <PinInput length={lengthControl} placeholder={placeholderControl} disabled={disableControl} error={errorControl}/>
    </div>
  );
};

export const InputStoryMarkdown: string = `## Заголовок
    текст

  -список

  -список
`;

