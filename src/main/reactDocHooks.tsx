import React, { useCallback, useMemo } from 'react';
import { ColorScheme, ColorSchemeProvider, MantineProvider, MantineThemeOverride } from '@mantine/core';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorScreen } from './layout/components/errorScreen';
import { StoryWindow } from './layout/storyWindow';
import { ControlsContext, ControlsContextType } from './context';
import { useCreateSubject } from './context/useSubject';
import { Control } from './controls';
import { StoryItem } from './type';

//for split pane
import 'allotment/dist/style.css';
import { useLocalStorage } from '@mantine/hooks';

interface IReactDocHooksProps {
  stories: Array<StoryItem>;
  overrideTheme?: MantineThemeOverride;
}

export const ReactDocHooks = (props: IReactDocHooksProps) => {
  const { overrideTheme, stories } = props;

  //Change theme (dark/light)
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  //Initialize controls
  const [controls, setControls] = useCreateSubject<Record<string, Control>>({});
  const firstStoryKey = stories[0].id || '';

  //Errors inside story components
  const withBoundaryStories = useMemo(() => {
    const result: Array<StoryItem> = [];
    stories.map(Story => {
      result.push({
        ...Story,
        component: () => (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <ErrorScreen error={error} tryAgain={resetErrorBoundary} storyKey={Story.id} />
            )}
          >
            <Story.component />
          </ErrorBoundary>
        ),
      });
    });
    return result;
  }, []);

  //Handlers
  const updateControl: ControlsContextType['updateControl'] = useCallback((id, partial) => {
    if (id) {
      console.log(partial);
      //@ts-ignore
      setControls(prev => ({ ...prev, [id]: { ...prev[id], ...partial } }));
    }
  }, []);

  const createControl: ControlsContextType['createControl'] = useCallback((id, control) => {
    console.log(control);
    setControls(prev => ({ ...prev, [id]: control }));
  }, []);

  const deleteControl: ControlsContextType['deleteControl'] = useCallback(id => {
    setControls(prev => {
      console.log(id);
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }, []);

  //Render
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ ...overrideTheme, colorScheme }} withGlobalStyles withNormalizeCSS>
        <ControlsContext.Provider value={{ createControl, deleteControl, updateControl, controls, inContext: true }}>
          <StoryWindow stories={withBoundaryStories} defaultStoryKey={firstStoryKey} />
        </ControlsContext.Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
