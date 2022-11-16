import React, { useEffect, useState } from 'react';
import { ControlLayout } from './controlLayout';
import { ActiveStory } from './components/activeStory';
import { NavigationLayout } from './navigationLayout';
import { HeaderLayout } from './headerLayout';
import { AppShell, createStyles, useMantineTheme } from '@mantine/core';
import StoriesHelper from '../stories/storiesHelper';
import { Allotment } from 'allotment';
import { useMediaQuery } from '@mantine/hooks';
import { ReactDocHooksOptions, StoryItem } from '../index';

export type StoryWindowProps<T> = {
  stories: Array<StoryItem>;
  options?: ReactDocHooksOptions;
};

export const StoryWindow = <T,>(props: StoryWindowProps<T>) => {
  const { stories, options } = props;

  const theme = useMantineTheme();
  const isSM = useMediaQuery('(min-width: 800px)');

  const [open, setOpen] = useState(true);
  const [activeStoryKey, setActiveStoryKey] = useState<string>('');

  useEffect(() => {
    setActiveStoryKey(stories[0].id || '');
  }, []);

  const { classes } = useStyles();

  return (
    <AppShell
      padding={0}
      style={{ '--focus-border': theme.primaryColor } as React.CSSProperties}
      header={
        <HeaderLayout
          open={open}
          logo={options?.headerLogo}
          rightContent={options?.headerRightContent}
          onClick={() => setOpen(!open)}
        />
      }
    >
      <Allotment minSize={200} separator={open}>
        <Allotment.Pane preferredSize={250} visible={open}>
          <NavigationLayout storiesList={stories} activeKey={activeStoryKey} setActiveKey={setActiveStoryKey} />
        </Allotment.Pane>
        <Allotment.Pane minSize={300} visible={isSM || !open}>
          <Allotment vertical={true} minSize={100}>
            <ActiveStory Story={StoriesHelper.getStoryById(activeStoryKey, stories)?.component} />
            <div className={classes.containPane}>
              <ControlLayout storiesList={stories} activeStoryKey={activeStoryKey} />
            </div>
          </Allotment>
        </Allotment.Pane>
      </Allotment>
    </AppShell>
  );
};

const useStyles = createStyles(theme => ({
  containPane: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
}));
