import React, { useContext, useEffect, useState } from 'react';
import { ControlsContext } from '../context';
import { useSubjectValue } from '../context/useSubject';
import { ControlRender } from '../controls/controlRender';
import { StoryItem } from '../type';
import StoriesHelper from '../stories/storiesHelper';
import ReactMarkdown from 'react-markdown';
import { Box, ScrollArea, Stack } from '@mantine/core';

export type IControlLayoutProps = {
  activeStoryKey: string;
  storiesList: Array<StoryItem>;
};

export const ControlLayout: React.FC<IControlLayoutProps> = props => {
  const { activeStoryKey, storiesList } = props;

  const { controls: controlsSubject } = useContext(ControlsContext);
  const controls = useSubjectValue(controlsSubject);

  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    const currentItem = StoriesHelper.getStoryById(activeStoryKey, storiesList);
    if (currentItem?.markdownFile) {
      fetch(currentItem.markdownFile)
        .then(resp => {
          return resp.text();
        })
        .then(text => {
          setMarkdown(text);
        });
    } else if (currentItem?.markdownString) {
      setMarkdown(currentItem.markdownString);
    } else {
      setMarkdown('');
    }
  }, [activeStoryKey]);

  //Renders
  return (
    <ScrollArea>
      <Box p={16}>
        {Object.entries(controls).map(([id, control]) => (
          <ControlRender key={id} control={control} />
        ))}
        <ReactMarkdown children={markdown} />
      </Box>
    </ScrollArea>
  );
};
