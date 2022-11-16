import React, { useCallback, useMemo } from 'react';
import { ColorScheme, ColorSchemeProvider, MantineProvider, MantineThemeOverride } from '@mantine/core';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorScreen } from './layout/components/errorScreen';
import { StoryWindow } from './layout/storyWindow';
import { ControlsContext, ControlsContextType } from './context';
import { useCreateSubject } from './context/useSubject';
import { Control } from './controls';

//for split pane
import 'allotment/dist/style.css';
import { useLocalStorage } from '@mantine/hooks';
import { ReactDocHooksOptions, StoryItem } from './index';

interface IReactDocHooksProps {
  stories: Array<StoryItem>;
  options?: ReactDocHooksOptions;
  overrideTheme?: MantineThemeOverride;
}

export const ReactDocHooks = (props: IReactDocHooksProps) => {
  const { options, overrideTheme, stories } = props;

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
  const createControl: ControlsContextType['createControl'] = useCallback((id, control) => {
    setControls(prev => ({ ...prev, [id]: control }));
  }, []);

  const updateControl: ControlsContextType['updateControl'] = useCallback((id, partial) => {
    if (id) {
      //@ts-ignore
      setControls(prev => ({ ...prev, [id]: { ...prev[id], ...partial } }));
    }
  }, []);

  const deleteControl: ControlsContextType['deleteControl'] = useCallback(id => {
    setControls(prev => {
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
          <StoryWindow stories={withBoundaryStories} options={options} />
        </ControlsContext.Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
