import React, { FC, useState } from 'react';
import { ControlLayout } from './controlLayout';
import { ActiveStory } from './components/activeStory';
import { NavigationLayout } from './navigationLayout';
import { HeaderLayout } from './headerLayout';
import { AppShell } from '@mantine/core';

export type StoryWindowProps = {
  stories: Record<string, FC>;
  defaultStoryKey?: string;
};

export const StoryWindow: FC<StoryWindowProps> = ({ stories, defaultStoryKey }) => {
  const [open, setOpen] = useState(true);

  const firstStoryKey = () => defaultStoryKey ?? Object.entries(stories)[0][0] ?? '';
  const [activeStoryKey, setActiveStoryKey] = useState<string>(firstStoryKey);

  return (
    <AppShell
      padding="md"
      navbar={
        (open && (
          <NavigationLayout
            activeKey={activeStoryKey}
            setActiveKey={setActiveStoryKey}
            storiesList={Object.entries(stories)}
          />
        )) || <></>
      }
      header={<HeaderLayout open={open} onClick={() => setOpen(!open)} />}
    >
      <ActiveStory Story={stories[activeStoryKey]} />
      <ControlLayout
        storiesList={Object.entries(stories)}
        setActiveStoryKey={setActiveStoryKey}
        activeStoryKey={activeStoryKey}
      />
    </AppShell>
  );
};
