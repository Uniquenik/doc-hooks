import React, { useContext, useEffect, useState } from 'react';
import { ControlsContext } from '../context';
import { useSubjectValue } from '../context/useSubject';
import { ControlRender } from '../controls/controlRender';
import StoriesHelper from '../stories/storiesHelper';
import ReactMarkdown from 'react-markdown';
import { Box, createStyles, Loader, ScrollArea, Stack, Tabs } from '@mantine/core';
import { IconAdjustments, IconFileInfo } from '@tabler/icons';
import { StoryItem } from '../index';

export type IControlLayoutProps = {
  activeStoryKey: string;
  storiesList: Array<StoryItem>;
};

export const ControlLayout: React.FC<IControlLayoutProps> = props => {
  const { activeStoryKey, storiesList } = props;

  const { controls: controlsSubject } = useContext(ControlsContext);

  const controls = useSubjectValue(controlsSubject);

  const [markdown, setMarkdown] = useState<string>('');
  const [markdownLoading, setMarkdownLoading] = useState<boolean>(false);

  const { classes } = useStyles();

  //Effects
  useEffect(() => {
    setMarkdownLoading(true);
    const currentItem = StoriesHelper.getStoryById(activeStoryKey, storiesList);
    if (currentItem?.markdownFile) {
      fetch(currentItem.markdownFile)
        .then(resp => {
          return resp.text();
        })
        .then(text => {
          setMarkdown(text);
          setMarkdownLoading(false);
        });
    } else if (currentItem?.markdownString) {
      setMarkdown(currentItem.markdownString);
      setMarkdownLoading(false);
    } else {
      setMarkdown('');
      setMarkdownLoading(false);
    }
  }, [activeStoryKey]);

  //Renders
  const renderControls = () => {
    return (
      <ScrollArea>
        <Box px={16} py={8}>
          {Object.entries(controls).map(([id, control]) => (
            <ControlRender key={id} control={control} />
          ))}
        </Box>
      </ScrollArea>
    );
  };

  return (
    <Box className={classes.container}>
      {!markdown && !markdownLoading ? (
        renderControls()
      ) : (
        <Tabs defaultValue={'settings'} inverted className={classes.container}>
          <Tabs.List grow={true}>
            <Tabs.Tab value="settings" icon={<IconAdjustments size={25} />}></Tabs.Tab>
            <Tabs.Tab value="docs" icon={<IconFileInfo size={25} />}></Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="settings" className={classes.container}>
            {renderControls()}
          </Tabs.Panel>

          <Tabs.Panel value="docs" className={classes.container}>
            <ScrollArea>
              <Box px={16}>
                {markdownLoading ? (
                  <Stack align={'center'}>
                    <Loader />
                  </Stack>
                ) : (
                  <ReactMarkdown children={markdown} />
                )}
              </Box>
            </ScrollArea>
          </Tabs.Panel>
        </Tabs>
      )}
    </Box>
  );
};

const useStyles = createStyles(theme => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',
  },
}));
